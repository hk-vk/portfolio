import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../utils/motionSettings';
import { useMotionSafe } from '../utils/useMotionSafe';
import { Link } from 'react-router-dom';
import { lazy, Suspense, memo, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../utils/usePerformanceHooks';
import SEOHead from '../components/SEOHead';

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
      className="portfolio-item overflow-hidden group"
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={hoverVariants}
      layout
    >
      <div className="relative overflow-hidden aspect-video bg-muted">
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
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent flex items-end p-4"
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-full">
            <div className="flex flex-wrap gap-1 mb-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-background/90 text-foreground rounded-full backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-1">{project.title}</h3>
            <motion.div
              className="h-0.5 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={isVisible ? { width: "30%" } : { width: 0 }}
              transition={{ delay: 0.15 + (0.03 * index), duration: 0.25 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Ultra-fast skill tag with reduced animations
const SkillTag = memo(({ skill, index, isVisible }) => {
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
      className="skill-tag"
      variants={skillVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      whileHover="hover"
    >
      {skill}
    </motion.span>
  );
});

SkillTag.displayName = 'SkillTag';

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

  // Cached skills array
  const skills = useMemo(() => [
    "React", "TypeScript", "JavaScript", "Node.js", "UI/UX Design"
  ], []);

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
            className="relative mb-16 rounded-2xl bg-background/80 backdrop-blur-md shadow-xl ring-1 ring-border/40 p-6 md:p-12 overflow-hidden"
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

            <div className="relative p-6 md:p-12 flex flex-col items-start justify-center text-left">
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
                <motion.div
                  variants={childVariants}
                  className="flex items-center mb-4"
                >
                  <Suspense fallback={<QuickSparkle />}>
                    <SparkleIllustration className="text-primary mr-3" size={20} />
                  </Suspense>
                  {sectionsVisible.hero && (
                    <BlurText
                      text="HELLO, I am HARIKRISHNAN"
                      className="text-2xl md:text-3xl font-bold gradient-last-word"
                      animateBy="words"
                      delay={50}
                    />
                  )}
                </motion.div>

                <motion.p
                  variants={childVariants}
                  className="mb-6 text-xl text-left"
                >
                  I'm a Full Stack Developer based in India.
                  <br />
                  <span className="text-primary font-medium animated-underline">Focusing on building innovative digital solutions.</span>
                </motion.p>

                <motion.p
                  variants={childVariants}
                  className="mb-8 text-muted-foreground text-left"
                >
                  I create responsive web applications that combine clean design with efficient code.
                  My expertise ranges from interactive frontend interfaces to scalable backend systems.
                  I'm constantly learning and implementing new technologies to develop better solutions.
                </motion.p>

                <motion.div variants={childVariants} className="w-full">
                  <h3 className="text-sm uppercase tracking-widest mb-3 text-left">Main Skills</h3>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {skills.map((skill, index) => (
                      <SkillTag 
                        key={skill} 
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
      </div>        {/* Experience Section */}
        <div ref={experienceRef} className="py-12 md:py-16 bg-background">
          <div className="content-container">
            <motion.div
              className="mb-6 flex items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={sectionsVisible.experience ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={<QuickSparkle />}>
                <SparkleIllustration className="text-primary mr-3" size={20} />
              </Suspense>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">EXPERIENCE</h2>
            </motion.div>

            {/* Timeline of roles */}
            <div className="mb-8 space-y-6 pl-8">
                {experienceItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 w-full"
                    initial={{ opacity: 0, y: 8 }}
                    animate={sectionsVisible.experience ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.25, delay: 0.1 + idx * 0.05 }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {item.logo && (
                        <img
                          src={item.logo}
                          alt={`${item.company} logo`}
                          className="w-12 h-12 object-cover rounded-md shadow-sm shrink-0"
                        />
                      )}
                      <div className="text-left">
                        <h3 className="font-medium text-base text-foreground leading-none mb-0.5">
                          {item.company}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-none">
                          {item.title}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-auto">
                      {item.date}
                    </span>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>        {/* Projects Preview Section */}
        <div ref={projectsRef} className="mb-12">
          <div className="content-container mt-4">
            <motion.div
              className="mb-8 flex items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={sectionsVisible.projects ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={<QuickSparkle />}>
                <SparkleIllustration className="text-primary mr-3" size={20} />
              </Suspense>
              <h2 className="text-3xl font-bold">FEATURED PROJECTS</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    title: 'YEAH - FAKE NEWS DETECTOR',
    tags: ['TypeScript', 'AI/ML', 'Computer Vision'],
    image: '/projects/images/yeah-fake-news.jpg',
    liveUrl: 'https://yeah-fake-news-detector.vercel.app',
    githubUrl: 'https://github.com/yourusername/yeah-fake-news-detector',
  },
  {
    id: '02',
    title: 'COMMITSTORYGEN',
    tags: ['JavaScript', 'GitHub API', 'Story Generation'],
    image: '/projects/images/commitstorygen.jpg',
    liveUrl: 'https://commitstorygen.netlify.app',
    githubUrl: 'https://github.com/yourusername/commitstorygen',
  },
  {
    id: '03',
    title: 'PDFX TOOLKIT',
    tags: ['TypeScript', 'WebAssembly', 'Privacy'],
    image: '/projects/images/pdfx.jpg',
    liveUrl: 'https://pdfx-toolkit.vercel.app',
    githubUrl: 'https://github.com/yourusername/pdfx-toolkit',
  },
  {
    id: '04',
    title: 'AI CODE REVIEWER',
    tags: ['Python', 'Machine Learning', 'Code Analysis'],
    image: '/projects/images/ai-code-reviewer.jpg',
    liveUrl: 'https://ai-code-reviewer.streamlit.app',
    githubUrl: 'https://github.com/yourusername/ai-code-reviewer',
  },
];

const experienceItems = [
  {
    date: 'May 2025 - Present',
    title: 'Software Engineering Intern',
    company: 'Comini Learning',
    logo: 'https://i.ibb.co/bM9CVPGj/Image-Editor.png',
  },
];

export default Home;
