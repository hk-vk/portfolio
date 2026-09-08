import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "../lib/motion";
import { MetalFx } from "metal-fx";
import { Icon } from "@iconify/react";
import ThemeToggle from "./ThemeToggle";
import SocialPopover from "./SocialPopover";
import { useSocialPopover } from "../context/SocialPopoverContext";
import { useMotionSafe } from "../utils/useMotionSafe";
import { motionInteraction, motionTransition } from "../utils/motionContract";
import { posthog } from "../utils/analytics";

const mainLinks = [
  { name: "Home", path: "/", icon: "hugeicons:home-01" },
  { name: "Work", path: "/projects", icon: "hugeicons:code-folder" },
  { name: "Blog", path: "/blog", icon: "hugeicons:book-open-01" },
  { name: "Connect", path: "/contact", icon: "hugeicons:mail-01" },
];

const MetalNavItem = ({ active, motionSafe, theme, ready, children }) => {
  if (!ready) return children;

  return (
  <MetalFx
    key={`${theme}-${active ? "active" : "inactive"}`}
    preset="silver"
    variant="button"
    theme={theme}
    className={active ? "metal-nav-active" : "metal-nav-inactive"}
    strength={0.65}
    glowGain={1.35}
    paused={!motionSafe || !active}
    disableGlow={!active}
    innerShadow={active}
    borderRadius={16}
    style={{ overflow: "hidden", borderRadius: 16, isolation: "isolate" }}
  >
    {children}
  </MetalFx>
  );
};

const Navbar = () => {
  const motionSafe = useMotionSafe();
  const [layoutReady, setLayoutReady] = useState(false);

  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const location = useLocation();
  const { socialOpen, toggleSocialPopover, closeSocialPopover, triggerRef } = useSocialPopover();
  const socialPopoverId = "navbar-social-popover";

  useEffect(() => {
    let frame;
    let cancelled = false;

    document.fonts.ready.then(() => {
      frame = requestAnimationFrame(() => {
        if (!cancelled) setLayoutReady(true);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const updateTheme = () =>
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const itemClass = (active) =>
    `nav-control group flex h-10 items-center justify-center rounded-2xl text-foreground transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-12 ${
      active ? "w-[6.5rem] gap-1.5 bg-card px-2.5 shadow-lg sm:w-32 sm:gap-2.5 sm:px-5" : "w-10 hover:bg-muted/50 sm:w-12"
    }`;

  return (
    <motion.header
      initial={motionSafe ? { y: 60, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 }}
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-0 z-50 flex justify-center px-2 sm:px-4"
    >
      <nav
        aria-label="Primary navigation"
        className="relative flex max-w-full items-center gap-1 rounded-[1.2rem] bg-background/90 p-1.5 shadow-xl ring-1 ring-border/30 backdrop-blur-xl sm:gap-1.5 sm:rounded-[1.35rem] sm:p-2"
      >
        {mainLinks.map((link) => {
          const active = socialOpen ? link.name === "Connect" : isActive(link.path);
          const content = (
            <span className="nav-content flex items-center gap-1.5 sm:gap-2.5">
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
              {active && (
                <motion.span
                  initial={motionSafe ? { opacity: 0, transform: "translateX(-4px)" } : false}
                  animate={{ opacity: 1, transform: "translateX(0)" }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="whitespace-nowrap text-sm font-medium sm:text-base"
                >
                  {link.name}
                </motion.span>
              )}
            </span>
          );

          return link.name === "Connect" ? (
            <MetalNavItem key={link.path} active={active} motionSafe={motionSafe} theme={theme} ready={layoutReady}>
              <button
                ref={triggerRef}
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
            <MetalNavItem key={link.path} active={active} motionSafe={motionSafe} theme={theme} ready={layoutReady}>
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

        <motion.div
          whileHover={{ ...motionInteraction.hoverIcon, rotate: 2 }}
          whileTap={motionInteraction.press}
          transition={motionTransition.microEnter}
          className="ml-0 flex size-10 shrink-0 items-center justify-center rounded-2xl hover:bg-muted/50 sm:ml-0.5 sm:size-12"
        >
          <ThemeToggle />
        </motion.div>

        <SocialPopover
          id={socialPopoverId}
          isOpen={socialOpen}
          onClose={closeSocialPopover}
          triggerRef={triggerRef}
        />
      </nav>
    </motion.header>
  );
};

export default Navbar;
