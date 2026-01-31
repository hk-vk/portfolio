import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../utils/motionSettings';
import { useMotionSafe } from '../utils/useMotionSafe';
import { Link } from 'react-router-dom';
import { lazy, Suspense, memo, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../utils/usePerformanceHooks';
import SEOHead from '../components/SEOHead';
import { Icon } from '@iconify/react';
import { HoverPreviewProvider, HoverPreviewLink } from '../components/HoverPreview';

// Direct import Waves - no lazy loading to ensure immediate visibility
import Waves from '../components/Waves/Waves';

// Lazy load heavy components for better performance
const AnimatedSection = lazy(() => import('../components/AnimatedSection'));
const SparkleIllustration = lazy(() => import('../components/SparkleIllustration'));
const HeroHighlightLine = lazy(() => import('../components/HeroHighlightLine'));
const MagnetLines = lazy(() => import('../components/MagnetLines'));
const BlurText = lazy(() => import('../components/BlurText/BlurText'));

// Lightweight fallback components for instant loading
const QuickSparkle = memo(() => (
  <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
));
QuickSparkle.displayName = 'QuickSparkle';

const QuickLoader = memo(({ className }) => (
  <div className={`bg-gradient-to-r from-muted to-muted/50 animate-pulse rounded ${className}`}></div>
));
QuickLoader.displayName = 'QuickLoader';

// Optimized project card with intersection observer and image loading
const ProjectCard = memo(({ project, index, motionSafe, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * index, duration: 0.25, ease: "easeOut" }
    }
  }), [index]);

  const hoverVariants = useMemo(() => ({
    y: -2,
    rotateX: motionSafe ? -1 : 0,
    rotateY: motionSafe ? 1 : 0,
    scale: motionSafe ? 1.01 : 1,
    transition: { duration: 0.15, ease: "easeOut" }
  }), [motionSafe]);

  return (
    <motion.div
      className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={hoverVariants}
      layout
    >
      <div className="relative overflow-hidden aspect-video bg-muted">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
        </div>

        <AnimatePresence>
          {!imageLoaded && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-4xl font-bold text-primary/40">{project.id}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-background/90 text-foreground rounded-full backdrop-blur-sm border border-border/50 font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-foreground leading-tight">{project.title}</h3>

          {/* Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Animated underline */}
          <motion.div
            className="h-0.5 bg-primary rounded-full mb-4"
            initial={{ width: 0 }}
            animate={isVisible ? { width: "40%" } : { width: 0 }}
            transition={{ delay: 0.15 + (0.03 * index), duration: 0.25 }}
          />

          {/* Action buttons */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline transition-colors font-medium"
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
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
  { name: "JavaScript", icon: "simple-icons:javascript", color: "#F7DF1E" },
  { name: "Python", icon: "simple-icons:python", color: "#3776AB" },
  { name: "FastAPI", icon: "simple-icons:fastapi", color: "#009688" },
  { name: "Vue", icon: "simple-icons:vuedotjs", color: "#4FC08D" },
  { name: "Node.js", icon: "simple-icons:nodedotjs", color: "#339933" },
  { name: "Tailwind", icon: "simple-icons:tailwindcss", color: "#06B6D4" },
];

const SkillTag = memo(({ skill, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  const skillVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.6 + (index * 0.03), duration: 0.15, ease: "easeOut" }
    },
    hover: { scale: 1.03, y: -1, transition: { duration: 0.1 } }
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

// Experience item with expandable details
const ExperienceItem = memo(({ item, index, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.08 }}
    >
      {/* Header row */}
      <div
        className="flex items-center justify-between gap-4 py-4 cursor-pointer border-b border-border/20 hover:border-border/40 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Role at Company - single line with bullet */}
        <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <span className="font-medium text-foreground">{item.title}</span>
          <span className="text-muted-foreground/60">at</span>
          <HoverPreviewLink previewKey={item.companyKey}>
            {item.company}
          </HoverPreviewLink>
        </div>

        {/* Date + Expand */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {item.date}
          </span>
          <Icon
            icon="tabler:chevron-down"
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Expandable bullet points */}
      <AnimatePresence>
        {isExpanded && item.details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="py-3 pl-4">
              {item.details.map((detail, idx) => (
                <div key={idx} className="text-sm text-muted-foreground">
                  <span>{detail.text}</span>
                  {detail.link && (
                    <>
                      {' — '}
                      <HoverPreviewLink previewKey={detail.previewKey}>
                        <a
                          href={detail.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {detail.linkText}
                          <Icon icon="tabler:external-link" className="w-3 h-3" />
                        </a>
                      </HoverPreviewLink>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ExperienceItem.displayName = 'ExperienceItem';

const Home = memo(() => {
  const motionSafe = useMotionSafe();

  // Use optimized intersection observer hooks
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [projectsRef, projectsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [experienceRef, experienceVisible] = useIntersectionObserver({ threshold: 0.1 });

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Check initial state
    checkDarkMode();

    // Set up a MutationObserver to watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Memoize section visibility for performance
  const sectionsVisible = useMemo(() => ({
    hero: heroVisible,
    projects: projectsVisible,
    experience: experienceVisible
  }), [heroVisible, projectsVisible, experienceVisible]);

  // Ultra-fast animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05
      }
    }
  }), []);

  const childVariants = useMemo(() => ({
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }), []);

  // Use skills data
  const skills = useMemo(() => skillsData, []);

  // Memoized featured projects for this component
  const memoizedProjects = useMemo(() => featuredProjects, []);
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionsVisible.hero ? { opacity: 0.8, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <Suspense fallback={<QuickSparkle />}>
                <SparkleIllustration className="transform rotate-12" size={24} />
              </Suspense>
            </motion.div>

            <div className="pattern-dots w-40 h-40 top-0 left-1/4 hidden md:block"></div>
            <div className="pattern-dots w-40 h-40 bottom-0 right-1/4 hidden md:block"></div>

            <motion.div
              className="relative mb-8 sm:mb-16 rounded-xl sm:rounded-2xl bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-border/40 p-3 sm:p-6 md:p-10 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionsVisible.hero ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.005 }}
            >
              {/* Waves inside hero card */}
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

              <Suspense fallback={<QuickLoader className="h-1 w-full mb-4" />}>
                <HeroHighlightLine />
              </Suspense>

              <div className="relative px-0 py-2 sm:p-6 md:p-10 flex flex-col items-start justify-center text-left">
                {/* Conditional MagnetLines for better performance */}
                {sectionsVisible.hero && (
                  <div className="absolute inset-0 -z-10 opacity-60 hidden md:block">
                    <Suspense fallback={null}>
                      <MagnetLines
                        rows={8}
                        columns={8}
                        containerSize="100%"
                        lineColor="hsl(var(--primary) / 0.06)"
                        lineWidth="0.2vmin"
                        lineHeight="2.5vmin"
                        baseAngle={-15}
                      />
                    </Suspense>
                  </div>
                )}

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={sectionsVisible.hero ? "visible" : "hidden"}
                  className="w-full"
                >
                  {sectionsVisible.hero && (
                    <motion.div
                      className="relative mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Decorative sparkle - hidden on mobile */}
                      <Suspense fallback={<QuickSparkle />}>
                        <SparkleIllustration className="text-primary absolute -left-7 top-1 hidden sm:block" size={20} />
                      </Suspense>

                      {/* "HELLO, I am" - smaller intro text */}
                      <span className="block text-sm sm:text-base md:text-lg font-medium text-muted-foreground mb-1">
                        Hello, I am
                      </span>

                      {/* "HARIKRISHNAN" - dynamically sized hero name */}
                      <h1
                        className="font-bold tracking-tighter font-display bg-clip-text text-transparent w-full"
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
                    I'm a Full Stack Developer based in India.
                    <br className="hidden sm:block" />
                    <span className="text-primary font-medium"> Focusing on building innovative digital solutions.</span>
                  </motion.p>

                  <motion.p
                    variants={childVariants}
                    className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground text-left"
                  >
                    I create responsive web applications that combine clean design with efficient code.
                    <span className="hidden sm:inline"> My expertise ranges from interactive frontend interfaces to scalable backend systems.</span>
                  </motion.p>

                  <motion.div variants={childVariants} className="w-full">
                    <h3 className="text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3 text-left text-muted-foreground">Skills</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {skills.map((skill, index) => (
                        <SkillTag
                          key={skill.name}
                          skill={skill}
                          index={index}
                          isVisible={sectionsVisible.hero}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Background watermark */}
            <div className="pointer-events-none select-none absolute inset-0 -z-10">
              <h1 className="font-serif font-bold text-foreground/5 text-[22vw] leading-none absolute -top-20 -left-8">HARI</h1>
              <h1 className="font-serif font-bold text-foreground/5 text-[22vw] leading-none absolute -bottom-16 left-1/2 -translate-x-1/2">KRISHNAN</h1>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div ref={experienceRef} className="py-12 md:py-16">
          <div className="content-container">
            <motion.div
              className="mb-8 flex items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={sectionsVisible.experience ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={<QuickSparkle />}>
                <SparkleIllustration className="text-primary mr-3" size={20} />
              </Suspense>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight">EXPERIENCE</h2>
            </motion.div>

            <HoverPreviewProvider data={companyPreviews}>
              <div className="space-y-3">
                {experienceItems.map((item, idx) => (
                  <ExperienceItem
                    key={idx}
                    item={item}
                    index={idx}
                    isVisible={sectionsVisible.experience}
                  />
                ))}
              </div>
            </HoverPreviewProvider>
          </div>
        </div>        {/* Projects Preview Section */}
        <div ref={projectsRef} className="mb-12">
          <div className="content-container mt-4">
            <motion.div
              className="mb-12 flex items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={sectionsVisible.projects ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={<QuickSparkle />}>
                <SparkleIllustration className="text-primary mr-4" size={24} />
              </Suspense>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FEATURED PROJECTS</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {memoizedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  motionSafe={motionSafe}
                  isVisible={sectionsVisible.projects}
                />
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={sectionsVisible.projects ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              <Link
                to="/projects"
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
const featuredProjects = [
  {
    id: '01',
    title: 'YEAH - Fake News Detector',
    description: 'This web app integrates text analysis, image recognition, URL examination, and reverse image search to effectively detect fake news.',
    tags: ['TypeScript', 'React', 'Fake News Detection', 'AI/ML', 'Computer Vision'],
    image: 'https://i.ibb.co/8L95n5wZ/yeahpreview.png',
    liveUrl: 'https://www.yeahml.live',
    githubUrl: 'https://github.com/hk-vk/yeah',
  },
  {
    id: '02',
    title: 'CommitStoryGen',
    description: 'A web App that generates a storyline based on the commit history of a github repo',
    tags: ['JavaScript', 'Node.js', 'GitHub API', 'Story Generation', 'Data Visualization'],
    image: 'https://i.ibb.co/3mZDXJPg/image.png',
    liveUrl: 'https://commitstorygen.vercel.app/',
    githubUrl: 'https://github.com/hk-vk/commitstorygen',
  },
  {
    id: '03',
    title: 'PDFx - Offline PDF Toolkit',
    description: 'A fully offline PDF manipulation toolkit with all processing done in your browser',
    tags: ['TypeScript', 'WebAssembly', 'PDF', 'Privacy', 'Offline-First'],
    image: 'https://i.ibb.co/pvwgtwFx/image.png',
    liveUrl: 'https://pdfx-8su.pages.dev/',
    githubUrl: 'https://github.com/hk-vk/pdfX',
  },
  {
    id: '04',
    title: 'Cricket Score Widget',
    description: 'An always-on-top Windows desktop application for live cricket scores built with Electron and React',
    tags: ['Electron', 'React', 'JavaScript', 'Desktop', 'System Tray', 'Windows'],
    image: 'https://i.ibb.co/7dDSnW5j/Screenshot-2025-07-06-020503.png',
    githubUrl: 'https://github.com/hk-vk/cricket-score-widget',
  },
];

// Preview data for hover effect on links
const companyPreviews = {
  comini: {
    image: 'https://i.ibb.co/bM9CVPGj/Image-Editor.png',
    title: 'Comini Learning',
    subtitle: 'Play-based microschool in Mumbai for ages 2-13',
  },
  labComini: {
    image: 'https://lab.comini.in/social-media-assets/bake-store-default.png',
    title: 'Comini Lab',
    subtitle: 'Hands-on learning games for children',
  },
  tryRipples: {
    image: '/images/tryripples-preview.png',
    title: 'Try Ripples',
    subtitle: 'Math learning platform for children',
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
        link: 'https://lab.comini.in/',
        linkText: 'lab.comini.in',
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
        link: 'https://tryripples.comini.in/',
        linkText: 'tryripples.comini.in',
        previewKey: 'tryRipples',
      },
    ],
  },
];

export default Home;
