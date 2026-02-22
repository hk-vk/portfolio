import { motion, AnimatePresence } from '../lib/motion';
import { usePostHog } from '@posthog/react';
import {
  duration,
  entrance,
  stagger,
  container
} from '../utils/motionSettings';
import { useMotionSafe } from '../utils/useMotionSafe';
import { cardMotion, motionTransition, sequenceDelay } from '../utils/motionContract';
import { Link } from 'react-router-dom';
import { lazy, Suspense, memo, useMemo, useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../utils/usePerformanceHooks';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import SEOHead from '../components/SEOHead';
import { Icon } from '@iconify/react';
import { HoverPreviewProvider, HoverPreviewLink } from '../components/HoverPreview';
import Waves from '../components/Waves/Waves';
import SparkleIllustration from '../components/SparkleIllustration';
import HeroHighlightLine from '../components/HeroHighlightLine';
import MagnetLines from '../components/MagnetLines';

// Lazy load heavy components for better performance
const AnimatedSection = lazy(() => import('../components/AnimatedSection'));

// Optimized project card with intersection observer and image loading
const ProjectCard = memo(({ project, motionSafe, isVisible }) => {
  const posthog = usePostHog();

  const cardVariants = cardMotion.itemVariants;

  return (
    <motion.div
      className="group relative flex flex-col h-full bg-card/40 backdrop-blur-md border border-border/40 rounded-xl overflow-hidden hover:border-primary/20 hover:bg-card/60 transition-all duration-300 cursor-pointer"
      variants={cardVariants}
      whileHover={motionSafe ? cardMotion.hover : undefined}
      whileTap={motionSafe ? cardMotion.press : undefined}
      layout
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Top ID Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-background/90 backdrop-blur text-[10px] font-mono font-bold tracking-wider px-2 py-1 rounded border border-border/50 text-foreground shadow-sm">
            {project.id}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex-grow">
          <h3 className="text-lg font-bold mb-2 text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>

          {project.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={`${project.id}-${tag}`} 
              className="px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground bg-muted/30 border border-border/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions Footer */}
        <div className="flex items-center gap-3 pt-4 mt-auto border-t border-border/30">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                posthog?.capture('featured_project_link_clicked', {
                  link_type: 'live_demo',
                  project_id: project.id,
                  project_title: project.title,
                  link_url: project.liveUrl,
                });
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-background border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 hover:scale-110"
              title="Live Demo"
            >
              <Icon icon="tabler:external-link" className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                posthog?.capture('featured_project_link_clicked', {
                  link_type: 'source_code',
                  project_id: project.id,
                  project_title: project.title,
                  link_url: project.githubUrl,
                });
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-background border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200 hover:scale-110"
              title="Source Code"
            >
              <Icon icon="tabler:brand-github" className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Ultra-fast skill tag with reduced animations
// Skills data with icons and brand colors
const skillsData = [
  { name: "React", icon: "simple-icons:react", color: "#61DAFB" },
  { name: "TypeScript", icon: "simple-icons:typescript", color: "#3178C6" },
  { name: "Python", icon: "simple-icons:python", color: "#3776AB" },
  { name: "JavaScript", icon: "simple-icons:javascript", color: "#F7DF1E" },
  { name: "Vue", icon: "simple-icons:vuedotjs", color: "#4FC08D" },
  { name: "Node.js", icon: "simple-icons:nodedotjs", color: "#339933" },
  { name: "FastAPI", icon: "simple-icons:fastapi", color: "#009688" },
  { name: "Tailwind", icon: "simple-icons:tailwindcss", color: "#06B6D4" },
];

const SkillTag = memo(({ skill, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  const skillVariants = useMemo(() => ({
    initial: entrance.scaleUp.initial,
    animate: {
      ...entrance.scaleUp.animate,
      transition: {
        delay: sequenceDelay(index),
        duration: duration.quick / 1000,
        ease: motionTransition.componentEnter.ease
      }
    },
    hover: {
      scale: 1.03,
      y: -2,
      transition: { duration: duration.instant / 1000 }
    }
  }), [index]);

  return (
    <motion.span
      className="skill-tag inline-flex items-center gap-1.5 cursor-default"
      variants={skillVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? `${skill.color}50` : undefined,
      }}
    >
      <Icon
        icon={skill.icon}
        className="w-3.5 h-3.5 transition-colors duration-200"
        style={{ color: isHovered ? skill.color : undefined, opacity: isHovered ? 1 : 0.6 }}
      />
      {skill.name}
    </motion.span>
  );
});

SkillTag.displayName = 'SkillTag';

// Experience item with spotlight effect and card-wide click
const ExperienceItem = memo(({ item, index, isVisible, isCurrent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      className="pb-6 last:pb-0"
      initial={entrance.fadeUp.initial}
      animate={isVisible ? entrance.fadeUp.animate : entrance.fadeUp.initial}
      transition={{
        duration: 0.6,
        delay: sequenceDelay(index),
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      <div 
        ref={divRef}
        onClick={() => item.details && setIsExpanded(!isExpanded)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-xl p-0.5 overflow-hidden transition-all duration-300 ${item.details ? 'cursor-pointer' : ''}`}
      >
        {/* Spotlight Border Layer */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(var(--primary) / 0.15), transparent 40%)`
          }}
        />
        
        {/* Main Content Card */}
        <div className="relative z-10 bg-card/80 backdrop-blur-sm rounded-[10px] border border-border/40 p-5 h-full transition-colors hover:bg-card/90">
          <div className="flex items-start justify-between gap-4">
            {/* Left: Title + Company */}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground leading-[1.25] pb-[0.05em]">{item.title}</p>
                {isCurrent && <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded hidden sm:inline-block">Current</span>}
              </div>
              <div className="mt-0.5">
                <span className="text-muted-foreground/60 text-sm">at </span>
                <span onClick={(e) => e.stopPropagation()}>
                  <HoverPreviewLink previewKey={item.companyKey}>
                    {item.company}
                  </HoverPreviewLink>
                </span>
              </div>
            </div>

            {/* Right: Date + Current label on mobile */}
            <div className="flex flex-col items-end shrink-0 pt-0.5 gap-1">
              <span className="text-xs text-muted-foreground">{item.date}</span>
              {isCurrent && <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded sm:hidden">Current</span>}
            </div>
          </div>

          {/* Collapsible details */}
          {item.details && (
            <>
              <div className="mt-3 flex items-center justify-between">
                <button
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors"
                  // Button is visual only now since card handles click, but kept for accessibility/semantics
                  type="button"
                >
                  <Icon
                    icon={isExpanded ? "tabler:chevron-up" : "tabler:chevron-down"}
                    className="w-3.5 h-3.5"
                  />
                  <span>{isExpanded ? 'Less' : 'Details'}</span>
                </button>
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: duration.standard / 1000, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-border/30 space-y-2" onClick={(e) => e.stopPropagation()}>
                      {item.details.map((detail) => (
                        <div key={detail.text} className="text-sm text-muted-foreground">
                          <span>{detail.text}</span>
                          {detail.linkText && (
                            <>
                              {' — '}
                              <HoverPreviewLink previewKey={detail.previewKey}>
                                {detail.linkText}
                              </HoverPreviewLink>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ExperienceItem.displayName = 'ExperienceItem';

const Home = memo(() => {
  const motionSafe = useMotionSafe();
  const posthog = usePostHog();
  const { lenis } = useSmoothScroll();

  // Use optimized intersection observer hooks
  const [heroRef] = useIntersectionObserver({ threshold: 0.1 });
  const [projectsRef, projectsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [experienceRef, experienceVisible] = useIntersectionObserver({ threshold: 0.1 });
  const experienceContentRef = useRef(null);
  const projectsContentRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [experienceReveal, setExperienceReveal] = useState(0.15);
  const [projectsReveal, setProjectsReveal] = useState(0.15);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const computeReveal = (element) => {
      if (!element) return 1;
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.98;
      const end = window.innerHeight * 0.45;
      return clamp((start - rect.top) / (start - end), 0, 1);
    };

    const updateReveal = () => {
      setExperienceReveal(computeReveal(experienceContentRef.current));
      setProjectsReveal(computeReveal(projectsContentRef.current));
    };

    updateReveal();

    if (lenis?.on) {
      lenis.on('scroll', updateReveal);
    } else {
      window.addEventListener('scroll', updateReveal, { passive: true });
    }
    window.addEventListener('resize', updateReveal);

    return () => {
      if (lenis?.off) {
        lenis.off('scroll', updateReveal);
      } else {
        window.removeEventListener('scroll', updateReveal);
      }
      window.removeEventListener('resize', updateReveal);
    };
  }, [lenis]);

  const experienceRevealStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${(1 - experienceReveal) * 14}px, 0)`,
      opacity: 0.9 + experienceReveal * 0.1,
      transition: 'transform 140ms linear, opacity 140ms linear',
    }),
    [experienceReveal],
  );

  const projectsRevealStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${(1 - projectsReveal) * 14}px, 0)`,
      opacity: 0.9 + projectsReveal * 0.1,
      transition: 'transform 140ms linear, opacity 140ms linear',
    }),
    [projectsReveal],
  );

  // Memoize section visibility for performance
  const sectionsVisible = useMemo(() => ({
    hero: true,
    projects: projectsVisible,
    experience: experienceVisible
  }), [projectsVisible, experienceVisible]);

  // Animation variants using Temporal Precision system
  const containerVariants = useMemo(() => ({
    hidden: container.hidden,
    visible: container.visible(stagger.quick)
  }), []);

  const childVariants = useMemo(() => ({
    hidden: entrance.fadeUp.initial,
    visible: entrance.fadeUp.animate
  }), []);

  const skills = skillsData;
  const memoizedProjects = featuredProjects;
  const repeatedSkills = useMemo(
    () =>
      Array.from({ length: 4 }).flatMap((_, cycle) =>
        skills.map((skill, skillIndex) => ({
          ...skill,
          marqueeKey: `${cycle}-${skill.name}`,
          baseIndex: skillIndex,
        })),
      ),
    [skills],
  );
  return (
    <>
      <SEOHead
        title="Harikrishnan V K | Full-Stack Developer Portfolio"
        description="Explore my portfolio showcasing modern web applications built with React, Node.js, and cutting-edge technologies. Full-stack developer passionate about creating exceptional user experiences."
        url="/"
      />
      <div className="pt-16 md:pt-24 pb-20 overflow-hidden relative">
        {/* Waves Background - hero section only */}
        <div ref={heroRef} className="mb-0 relative overflow-hidden">
          {/* Hero content container */}
          <div className="content-container relative">
            {/* Decorative Elements with conditional loading */}
            <motion.div
              className="absolute -right-10 top-20 opacity-80 z-10 hidden md:block"
              initial={false}
              animate={{ opacity: 0.8 }}
              transition={{ delay: sequenceDelay(1), duration: duration.standard / 1000, ease: motionTransition.componentEnter.ease }}
            >
              <SparkleIllustration className="transform rotate-12" size={24} />
            </motion.div>

            <div className="pattern-dots w-40 h-40 top-0 left-1/4 hidden md:block"></div>
            <div className="pattern-dots w-40 h-40 bottom-0 right-1/4 hidden md:block"></div>

            <motion.div
              className="relative mb-8 sm:mb-16 rounded-xl sm:rounded-2xl bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-border/40 p-4 sm:p-6 md:p-10 overflow-hidden"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.moderate / 1000, ease: motionTransition.componentEnter.ease }}
            >
              <div className="absolute inset-0 -z-10 pointer-events-none select-none">
                <Waves
                  lineColor={isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)'}
                  backgroundColor="transparent"
                  waveSpeedX={0.012}
                  waveSpeedY={0.006}
                  waveAmpX={35}
                  waveAmpY={22}
                  xGap={16}
                  yGap={26}
                />
              </div>

              <HeroHighlightLine />

              <div className="relative px-1 py-4 sm:p-6 md:p-10 flex flex-col items-start justify-center text-left">
                {/* Conditional MagnetLines for better performance */}
                {sectionsVisible.hero && (
                  <div className="absolute inset-0 -z-10 opacity-60 hidden md:block">
                    <MagnetLines
                      rows={8}
                      columns={8}
                      containerSize="100%"
                      lineColor="hsl(var(--primary) / 0.06)"
                      lineWidth="0.2vmin"
                      lineHeight="2.5vmin"
                      baseAngle={-15}
                    />
                  </div>
                )}

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full"
                >
                  {sectionsVisible.hero && (
                    <motion.div
                      className="relative mb-4"
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{ duration: duration.standard / 1000, delay: sequenceDelay(1), ease: motionTransition.componentEnter.ease }}
                    >
                      {/* Decorative sparkle - hidden on mobile */}
                      <SparkleIllustration className="text-primary absolute -left-7 top-1 hidden sm:block" size={20} />

                      {/* "HELLO, I am" - smaller intro text */}
                      <span className="block text-sm sm:text-base md:text-lg font-medium text-muted-foreground mb-1">
                        Hello, I am
                      </span>

                      {/* "HARIKRISHNAN" - dynamically sized hero name */}
                      <h1
                        className="font-bold tracking-tighter font-display bg-clip-text text-transparent w-full leading-[1.12] pb-[0.08em]"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 40%, hsl(var(--primary)) 100%)',
                          fontSize: 'clamp(1.5rem, 7vw, 4rem)',
                        }}
                      >
                        HARIKRISHNAN
                      </h1>

                      {/* Subtle accent line under name */}
                      <div className="mt-2 w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                    </motion.div>
                  )}

                  <motion.p
                    variants={childVariants}
                    className="mb-2 sm:mb-3 text-base sm:text-lg md:text-xl text-left"
                  >
                    Full-stack developer from India.
                    <br className="hidden sm:block" />
                    <span className="block sm:inline text-primary/85 font-medium"> I build simple, useful products from idea to deployment.</span>
                  </motion.p>

                  <motion.p
                    variants={childVariants}
                    className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground text-left"
                  >
                    I create responsive web applications that combine clean design with efficient code. My expertise ranges from interactive frontend interfaces to scalable backend systems.
                  </motion.p>

                  <motion.div variants={childVariants} className="w-full">
                    <h3 className="text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3 text-left text-muted-foreground">Skills</h3>
                    <div
                      className="skill-marquee"
                      onTouchStart={(e) => e.currentTarget.classList.toggle('is-paused')}
                    >
                      <div className="skill-marquee-track">
                        {repeatedSkills.map((skill) => (
                          <SkillTag
                            key={skill.marqueeKey}
                            skill={skill}
                            index={skill.baseIndex}
                            isVisible={sectionsVisible.hero}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Experience Section */}
        <div ref={experienceRef} className="py-12 md:py-16">
          <div ref={experienceContentRef} className="content-container" style={experienceRevealStyle}>
            <motion.div
              className="mb-8 flex items-center"
              initial={{ opacity: 0, y: 6 }}
              animate={sectionsVisible.experience ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.moderate / 1000, ease: motionTransition.componentEnter.ease }}
            >
              <SparkleIllustration className="text-primary mr-3" size={20} />
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight leading-[1.12] pb-[0.08em]">EXPERIENCE</h2>
            </motion.div>

            <HoverPreviewProvider data={companyPreviews}>
              <div className="space-y-3">
                {experienceItems.map((item, idx) => (
                  <ExperienceItem
                    key={item.title}
                    item={item}
                    index={idx}
                    isVisible={sectionsVisible.experience}
                    isCurrent={idx === 0}
                  />
                ))}
              </div>
            </HoverPreviewProvider>
          </div>
        </div>
        {/* Projects Preview Section */}
        <div ref={projectsRef} className="mb-12">
          <div ref={projectsContentRef} className="content-container mt-4" style={projectsRevealStyle}>
            <motion.div
              className="mb-10 md:mb-12 flex items-center"
              initial={{ opacity: 0, y: 6 }}
              animate={sectionsVisible.projects ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.moderate / 1000, ease: motionTransition.componentEnter.ease }}
            >
              <SparkleIllustration className="text-primary mr-4" size={24} />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.12] pb-[0.08em]">FEATURED PROJECTS</h2>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
              variants={cardMotion.gridVariants}
              initial="hidden"
              animate={sectionsVisible.projects ? "visible" : "hidden"}
            >
              {memoizedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  motionSafe={motionSafe}
                  isVisible={sectionsVisible.projects}
                />
              ))}
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={sectionsVisible.projects ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: sequenceDelay(1), duration: duration.standard / 1000, ease: motionTransition.componentEnter.ease }}
            >
              <Link
                to="/projects"
                onClick={() =>
                  posthog?.capture('home_view_all_projects_clicked', {
                    from_path: window.location.pathname,
                  })
                }
                className="button-primary btn-gloss inline-flex items-center group"
              >
                View All Projects
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
});

Home.displayName = 'Home';

// Sample data
const R2_BASE_URL = 'https://pub-cb8a9661c7ce4889b03ae3b69d7df50f.r2.dev';

const featuredProjects = [
  {
    id: '01',
    title: 'TXTSKILLS',
    description: 'Convert any llms.txt documentation into installable skills for AI agents like Claude Code, Cursor, Windsurf, and Copilot.',
    tags: ['Next.js', 'TypeScript', 'Cloudflare', 'AI Agents', 'Developer Tooling'],
    image: 'https://pub-cb8a9661c7ce4889b03ae3b69d7df50f.r2.dev/Screenshot%20from%202026-02-14%2023-14-57.png',
    liveUrl: 'https://txtskills.hari.works/',
    githubUrl: 'https://github.com/hk-vk/txtskills',
  },
  {
    id: '02',
    title: 'YEAH - Fake News Detector',
    description: 'This web app integrates text analysis, image recognition, URL examination, and reverse image search to effectively detect fake news.',
    tags: ['TypeScript', 'React', 'Fake News Detection', 'AI/ML', 'Computer Vision'],
    image: `${R2_BASE_URL}/yeahpreview.png`,
    liveUrl: 'https://www.yeahml.live',
    githubUrl: 'https://github.com/hk-vk/yeah',
  },
  {
    id: '03',
    title: 'PDFx - Offline PDF Toolkit',
    description: 'A fully offline PDF manipulation toolkit with all processing done in your browser',
    tags: ['TypeScript', 'WebAssembly', 'PDF', 'Privacy', 'Offline-First'],
    image: `${R2_BASE_URL}/image.png`,
    liveUrl: 'https://pdfx-8su.pages.dev/',
    githubUrl: 'https://github.com/hk-vk/pdfX',
  },
  {
    id: '04',
    title: 'Cricket Score Widget',
    description: 'An always-on-top Windows desktop application for live cricket scores built with Electron and React',
    tags: ['Electron', 'React', 'JavaScript', 'Desktop', 'System Tray', 'Windows'],
    image: `${R2_BASE_URL}/Screenshot-2025-07-06-020503.png`,
    githubUrl: 'https://github.com/hk-vk/cricket-score-widget',
  },
];

// Preview data for hover effect on links
const companyPreviews = {
  comini: {
    image: `${R2_BASE_URL}/Image-Editor.png`,
    title: 'Comini Learning',
    subtitle: 'Play-based microschool in Mumbai for ages 2-13',
  },
  labComini: {
    image: 'https://lab.comini.in/social-media-assets/bake-store-default.png',
    title: 'Comini Lab',
    subtitle: 'Hands-on learning games for children',
    url: 'https://lab.comini.in/',
  },
  tryRipples: {
    image: '/images/tryripples-preview.png',
    title: 'Try Ripples',
    subtitle: 'Math learning platform for children',
    url: 'https://tryripples.comini.in/',
  },
};

const experienceItems = [
  {
    date: 'Aug 2025 - Present',
    title: 'Full Stack Software Engineer',
    company: 'Comini Learning',
    companyKey: 'comini',
    details: [
      {
        text: 'Building end-to-end interactive learning games for children',
        linkText: 'Comini Lab',
        previewKey: 'labComini',
      },
    ],
  },
  {
    date: 'May 2025 - Jul 2025',
    title: 'Software Engineering Intern',
    company: 'Comini Learning',
    companyKey: 'comini',
    details: [
      {
        text: 'Worked on games and worksheets for child learning on our math learning platform',
        linkText: 'Ripples',
        previewKey: 'tryRipples',
      },
    ],
  },
];

export default Home;
