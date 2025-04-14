import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SparkleIllustration from './SparkleIllustration';
import FlowerIllustration from './FlowerIllustration';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/hk-vk', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hk-vk/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'CodePen', url: 'https://codepen.io/hk-vk', icon: 'M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.029.022-.01.008-6.782 4.522a.637.637 0 01-.708 0L4.864 14.79l-.01-.008a.599.599 0 01-.065-.052l-.026-.025-.032-.034-.021-.028a.588.588 0 01-.067-.11l-.014-.031a.644.644 0 01-.017-.047l-.01-.03c-.004-.018-.008-.036-.01-.054l-.006-.028a.628.628 0 01-.006-.083V9.739c0-.028.002-.055.006-.083l.005-.027.011-.054.01-.03a.574.574 0 01.12-.217l.031-.034.026-.025a.62.62 0 01.065-.052l.01-.008 6.782-4.521a.638.638 0 01.708 0l6.782 4.521.01.008.03.022.035.03c.01.008.017.016.026.025a.545.545 0 01.08.1l.019.03a.633.633 0 01.021.043l.014.03c.007.016.012.032.017.047l.01.031c.004.018.008.036.01.054l.006.027a.619.619 0 01.006.083zM12 0C5.373 0 0 5.372 0 12 0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m0 10.492L9.745 12 12 13.51 14.255 12zm.638 4.124v2.975l4.996-3.33-2.232-1.493zm-6.272-.356l4.996 3.33v-2.974l-2.764-1.849zm11.268-4.52l-4.996-3.33v2.974l2.764 1.85zm-6.272-.356V6.41L6.366 9.74l2.232 1.493zm-5.506 1.549v2.134L7.45 12Z' }
  ];

  const categories = [
    { name: 'UI DESIGN', path: '/ui-design' },
    { name: 'FRONTEND', path: '/frontend' },
    { name: 'BACKEND', path: '/backend' },
    { name: 'ANIMATION', path: '/animation' },
    { name: 'DATABASES', path: '/databases' },
    { name: 'DEPLOYMENT', path: '/deployment' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  // Animation variants for the flower
  const flowerAnimationVariants = {
    animate: {
      rotate: [0, 10, -10, 10, 0],
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 15
      }
    }
  };

  return (
    <footer className="bg-background border-t border-border py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="pattern-dots w-40 h-40 top-0 right-0 absolute opacity-30"></div>
      <div className="pattern-dots w-40 h-40 bottom-0 left-0 absolute opacity-30"></div>

      <motion.div
        className="absolute -top-10 left-[20%] opacity-20 hidden md:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        transition={{ duration: 0.5 }}
        variants={flowerAnimationVariants}
        animate="animate"
      >
        <FlowerIllustration className="w-20 h-20" />
      </motion.div>

      <div className="content-container">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="mb-12 md:mb-0" variants={childVariants}>
            <Link to="/" className="font-bold text-2xl tracking-tighter mb-6 inline-block">
              <span className="relative group">
                PORT
                <motion.span
                  className="absolute -top-2 -right-4 text-primary"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <SparkleIllustration size={14} />
                </motion.span>
                <br />
                FOLIO
                <span className="text-primary text-xs align-top ml-1">©</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs mb-6">
              Building modern digital experiences with clean code and thoughtful design.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  aria-label={link.name}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={link.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-x-16 gap-y-8"
            variants={childVariants}
          >
            <div>
              <h3 className="font-bold mb-6 flex items-center">
                <SparkleIllustration className="text-primary mr-2" size={14} />
                NAVIGATION
              </h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors animated-underline">
                    Home
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors animated-underline">
                    About
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors animated-underline">
                    Projects
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors animated-underline">
                    Contact
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 flex items-center">
                <SparkleIllustration className="text-primary mr-2" size={14} />
                EXPERTISE
              </h3>
              <ul className="space-y-3">
                {categories.slice(0, 4).map((category) => (
                  <motion.li
                    key={category.path}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link to={category.path} className="text-muted-foreground hover:text-primary transition-colors text-sm animated-underline">
                      {category.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>© {currentYear} PORTFOLIO. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
