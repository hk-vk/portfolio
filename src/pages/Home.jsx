import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import HandIllustration from '../components/HandIllustration';
import SparkleIllustration from '../components/SparkleIllustration';
import HeroHighlightLine from '../components/HeroHighlightLine';
import MagnetLines from '../components/MagnetLines';

const Home = () => {
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
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
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
    <div className="pt-32 pb-20">
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

          <div className="fancy-border p-4 md:p-8 mb-16 relative">
            <HeroHighlightLine />

            <div className="border border-border flex flex-col md:flex-row items-center justify-between">
              <div className="p-6 md:p-10 flex-1 relative">
                {/* MagnetLines Component */}
                <div className="absolute inset-0 -left-10 -top-10 -z-10 overflow-hidden opacity-75">
                  <MagnetLines 
                    rows={7} 
                    columns={7} 
                    containerSize="100%" 
                    lineColor="hsl(var(--primary) / 0.3)" 
                    lineWidth="0.5vmin" 
                    lineHeight="4vmin" 
                    baseAngle={-5} 
                  />
                </div>
                
                <div className="relative mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.6,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="absolute -top-8 -left-4 text-primary"
                  >
                    <SparkleIllustration size={24} />
                  </motion.div>

                  <motion.h1
                    className="text-6xl md:text-8xl font-bold mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-gradient">HARI</span>
                    <br />
                    <span className="relative">
                      KRISHNAN
                      <motion.div
                        className="absolute -right-6 -bottom-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <SparkleIllustration className="text-accent" size={16} />
                      </motion.div>
                    </span>
                  </motion.h1>
                </div>

                <motion.div
                  className="hidden md:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 8,
                    transition: { duration: 0.3 }
                  }}
                >
                  <HandIllustration className="w-40 mb-4 transform rotate-6" />
                </motion.div>
              </div>

              <div className="p-6 md:p-10 flex-1 md:border-l border-border">
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
                      className="button-primary font-medium"
                    >
                      View Projects
                    </Link>
                    <Link
                      to="/contact"
                      className="button-secondary font-medium"
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
                          transition={{ type: "spring", stiffness: 400 }}
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
            </div>
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
                  transition: { duration: 0.2 }
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
              className="button-primary inline-flex items-center"
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

      {/* Hire Me Section */}
      <AnimatedSection>
        <div className="content-container relative py-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 rounded-3xl -z-10"></div>
          
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 transform-gpu"
            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <SparkleIllustration className="text-primary" size={48} />
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Add Some Sparkle to Your Team?
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My code is clean, my jokes are... well, they exist!
            I build cool things and occasionally talk to my rubber duck.
            Let's create something awesome together!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 150 }}
          >
            <Link
              to="/contact"
              className="button-primary text-lg font-semibold px-10 py-4 inline-flex items-center group rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
            >
              HIRE ME!
              <span className="ml-3 text-2xl transform transition-transform duration-300 group-hover:rotate-[360deg] group-hover:scale-125">🚀</span>
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p>(Warning: May spontaneously burst into creative solutions or dad jokes. You've been warned.)</p>
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
    title: 'yeah yeah',
    tags: ['TypeScript', 'Fake News Detection', 'Web App'],
  },
  {
    id: '02',
    title: 'commitstorygen',
    tags: ['JavaScript', 'GitHub API', 'Story Generation'],
  },
  {
    id: '03',
    title: 'pdfX',
    tags: ['TypeScript', 'PDF Processing', 'Offline Tools'],
  },
  {
    id: '04',
    title: 'Portfolio',
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
