import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "../lib/motion";
import { Icon } from "@iconify/react";
import ThemeToggle from "./ThemeToggle";
import SocialPopover from "./SocialPopover";
import { useSocialPopover } from "../context/SocialPopoverContext";
import { useMotionSafe } from "../utils/useMotionSafe";
import { posthog } from "../utils/analytics";

const mainLinks = [
  { name: "Home", path: "/", icon: "hugeicons:home-01" },
  { name: "Work", path: "/projects", icon: "hugeicons:code-folder" },
  { name: "Blog", path: "/blog", icon: "hugeicons:book-open-01" },
  { name: "Connect", path: "/contact", icon: "hugeicons:at" },
];

const MetalNavItem = ({ active, children }) =>
  active ? <div className="metal-nav-active">{children}</div> : children;

const Navbar = () => {
  const motionSafe = useMotionSafe();

  const location = useLocation();
  const { socialOpen, toggleSocialPopover, closeSocialPopover, triggerRef } = useSocialPopover();
  const socialPopoverId = "navbar-social-popover";
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const itemClass = (active) =>
    `nav-control group relative flex h-10 items-center justify-center overflow-hidden rounded-2xl text-foreground transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-12 ${
      active ? "w-[6.5rem] gap-1.5 bg-card px-2.5 shadow-lg sm:w-32 sm:gap-2.5 sm:px-5" : "w-10 border border-border/50 bg-muted/40 hover:bg-muted/60 sm:w-12"
    }`;

  return (
    <motion.header
      initial={motionSafe ? { y: 60, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 }}
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-0 z-50 flex justify-center px-2 sm:px-4"
    >
      <div className="relative">
      <nav
        aria-label="Primary navigation"
        className="surface-shadow navbar-controls relative flex max-w-full items-center gap-1 rounded-[1.2rem] bg-background/90 p-1.5 backdrop-blur-xl sm:gap-1.5 sm:rounded-[1.35rem] sm:p-2"
      >
        {mainLinks.map((link) => {
          const active = socialOpen ? link.name === "Connect" : isActive(link.path);
          const content = (
            <>
              <span className="nav-content relative z-10 flex items-center gap-1.5 sm:gap-2.5">
                <motion.span
                  className="grid size-5 shrink-0 place-items-center"
                  animate={
                    motionSafe
                      ? {
                          transform: active
                            ? "translateY(-1px) scale(1.06)"
                            : "translateY(0) scale(1)",
                        }
                      : undefined
                  }
                  transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Icon icon={link.icon} className="size-[15px] sm:size-4" />
                </motion.span>
                <AnimatePresence initial={false} mode="popLayout">
                  {active && (
                    <motion.span
                      key={link.name}
                      initial={motionSafe ? { opacity: 0, transform: "translateX(-5px)" } : false}
                      animate={{ opacity: 1, transform: "translateX(0)" }}
                      exit={motionSafe ? { opacity: 0, transform: "translateX(-5px)" } : undefined}
                      transition={{ duration: 0.18, ease: [0.19, 1, 0.22, 1] }}
                      className="whitespace-nowrap text-sm font-medium sm:text-base"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </>
          );

          return link.name === "Connect" ? (
            <MetalNavItem key={link.path} active={active}>
              <button
                ref={(node) => {
                  triggerRef.current = node;
                }}
                type="button"
                aria-label="Open contact links"
                aria-expanded={socialOpen}
                aria-controls={socialPopoverId}
                className={itemClass(active)}
                onClick={() => {
                  posthog?.capture("navbar_connect_clicked", {
                    action: socialOpen ? "close" : "open",
                    from_path: location.pathname,
                  });
                  toggleSocialPopover();
                }}
              >
                {content}
              </button>
            </MetalNavItem>
          ) : (
            <MetalNavItem key={link.path} active={active}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                aria-label={link.name}
                className={itemClass(active)}
                onClick={() => {
                  closeSocialPopover();
                  posthog?.capture("navbar_link_clicked", {
                    link_name: link.name,
                    link_path: link.path,
                    from_path: location.pathname,
                  });
                }}
              >
                {content}
              </NavLink>
            </MetalNavItem>
          );
        })}

        <MetalNavItem active={false}>
          <ThemeToggle />
        </MetalNavItem>

        <SocialPopover
          id={socialPopoverId}
          isOpen={socialOpen}
          onClose={closeSocialPopover}
          triggerRef={triggerRef}
        />
      </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
