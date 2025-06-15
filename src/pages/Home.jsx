import { motion } from 'framer-motion';
import { spring } from '../utils/motionSettings';
import { useMotionSafe } from '../utils/useMotionSafe';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import SparkleIllustration from '../components/SparkleIllustration';
import HeroHighlightLine from '../components/HeroHighlightLine';
import MagnetLines from '../components/MagnetLines';

const Home = () => {
  const motionSafe = useMotionSafe();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: spring
    }
  };

  // Decoration animation variants
  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      x: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="pt-12 md:pt-20 pb-20">
      {/* Hero Section */}
      <AnimatedSection className="mb-24">
        <div className="content-container relative">
          {/* Decorative Elements */}
          <motion.div
            className="absolute -right-10 top-20 opacity-80 z-10 hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            variants={floatVariants}
            whileInView="animate"
            viewport={{ once: false }}
          >
            <SparkleIllustration className="transform rotate-12" size={24} />
          </motion.div>

          <div className="pattern-dots w-40 h-40 top-0 left-1/4 hidden md:block"></div>
          <div className="pattern-dots w-40 h-40 bottom-0 right-1/4 hidden md:block"></div>

          <motion.div
            className="relative mb-16 rounded-2xl bg-background/70 backdrop-blur-lg shadow-2xl ring-2 ring-primary/15 p-6 md:p-12"
            whileHover={{ scale: 1.02 }}
          >
            <HeroHighlightLine />

            <div className="relative p-6 md:p-12 flex flex-col items-start justify-center text-center md:text-left">
              {/* MagnetLines behind whole card */}
              <div className="absolute inset-0 -z-10 opacity-60 hidden md:block">
                <MagnetLines
                  rows={10}
                  columns={10}
                  containerSize="110%"
                  lineColor="hsl(var(--primary) / 0.08)"
                  lineWidth="0.25vmin"
                  lineHeight="3vmin"
                  baseAngle={-15}
                />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={childVariants}
                  className="flex items-center mb-4"
                >
                  <SparkleIllustration className="text-primary mr-2" size={16} />
                  <h2 className="text-2xl md:text-3xl font-bold">HELLO!</h2>
                </motion.div>

                <motion.p
                  variants={childVariants}
                  className="mb-6 text-xl"
                >
                  I'm a Full Stack Developer based in India.
                  <br />
                  <span className="text-primary font-medium animated-underline">Focusing on building innovative digital solutions.</span>
                </motion.p>

                <motion.p
                  variants={childVariants}
                  className="mb-8 text-muted-foreground"
                >
                  I create responsive web applications that combine clean design with efficient code.
                  My expertise ranges from interactive frontend interfaces to scalable backend systems.
                  I'm constantly learning and implementing new technologies to develop better solutions.
                </motion.p>

                <motion.div
                  variants={childVariants}
                  className="flex space-x-4 mb-8"
                >
                  <Link
                    to="/projects"
                    className="button-primary btn-gloss"
                  >
                    View Projects
                  </Link>
                  <Link
                    to="/contact"
                    className="button-secondary btn-gloss"
                  >
                    Get in Touch
                  </Link>
                </motion.div>

                <motion.div variants={childVariants}>
                  <h3 className="text-sm uppercase tracking-widest mb-3">Main Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "JavaScript", "Node.js", "UI/UX Design"].map((skill, index) => (
                      <motion.span
                        key={skill}
                        className="skill-tag"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={spring}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        custom={{ delay: 1 + (index * 0.1) }}
                      >
                        {skill}
                      </motion.span>
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
      </AnimatedSection>

      {/* Projects Preview Section */}
      <AnimatedSection className="mb-24">
        <div className="content-container">
          <motion.div
            className="mb-12 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SparkleIllustration className="text-primary mr-2" size={16} />
            <h2 className="text-3xl font-bold">FEATURED PROJECTS</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="portfolio-item overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  rotateX: motionSafe ? -3 : 0,
                  rotateY: motionSafe ? 3 : 0,
                  scale: motionSafe ? 1.03 : 1,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <div className="bg-muted w-full h-full flex items-center justify-center portfolio-image">
                    <span className="text-6xl font-bold text-primary opacity-20">{project.id}</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div>
                      <div className="flex space-x-2 mb-3">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="skill-tag bg-background/80 text-foreground">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <motion.div
                        className="w-0 h-0.5 bg-primary mt-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: "40%" }}
                        transition={{ delay: 0.3 + (0.1 * index), duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              to="/projects"
              className="button-primary btn-gloss inline-flex items-center"
            >
              View All Projects
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection className="py-16 md:py-24 bg-background">
        <div className="content-container text-center">
          <motion.div
            className="mb-8 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SparkleIllustration className="text-primary mr-3" size={20} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">EXPERIENCE</h2>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <SparkleIllustration className="text-accent ml-3" size={20} />
            </motion.span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I am currently seeking opportunities to gain professional experience and apply my skills
            in a real-world setting. If you have a project or an opening where I can contribute
            and grow, please feel free to reach out. Let's build something great together!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="button-primary btn-gloss inline-flex items-center text-lg group"
            >
              Contact Me
              <svg
                className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      
    </div>
  );
};

// Sample data
const featuredProjects = [
  {
    id: '01',
    title: 'YEAH',
    tags: ['TypeScript', 'Fake News Detection', 'Web App'],
  },
  {
    id: '02',
    title: 'COMMITSTORYGEN',
    tags: ['JavaScript', 'GitHub API', 'Story Generation'],
  },
  {
    id: '03',
    title: 'PDFX',
    tags: ['TypeScript', 'PDF Processing', 'Offline Tools'],
  },
  {
    id: '04',
    title: 'PORTFOLIO',
    tags: ['React', 'Framer Motion', 'Tailwind'],
  },
];

const experienceItems = [
  {
    date: '2022 - Present',
    title: 'Full Stack Developer',
    company: 'Freelance',
    description: 'Developing custom web applications with a focus on TypeScript, React, and Node.js. Creating solutions for various client needs.',
  },
  {
    date: '2021 - 2022',
    title: 'Frontend Developer',
    company: 'Tech Solutions',
    description: 'Built interactive web interfaces using modern JavaScript frameworks. Implemented responsive designs and optimized application performance.',
  },
  {
    date: '2020 - 2021',
    title: 'Web Developer',
    company: 'Digital Innovations',
    description: 'Developed and maintained web applications using JavaScript, HTML, and CSS. Collaborated with design teams to implement user interfaces.',
  },
  {
    date: '2018 - 2020',
    title: 'Junior Developer',
    company: 'Creative Technologies',
    description: 'Assisted in building websites and web applications. Gained experience in frontend development and UI implementation.',
  },
];

export default Home;
