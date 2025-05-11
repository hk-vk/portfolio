import React from 'react';
import { motion } from 'framer-motion';
import SparkleIllustration from './SparkleIllustration';

const ProfileCard = () => {
  const skills = ['React', 'Next.js', 'FastAPI', 'TypeScript'];
  
  const socialLinks = [
    { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', href: 'https://github.com/' },
    { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', href: 'https://linkedin.com/in/' },
    { name: 'Twitter', icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z', href: 'https://twitter.com/' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
    >
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary/30 rounded-full blur-[2px] z-0"></div>
        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-accent/30 rounded-full blur-[3px] z-0"></div>
        
        {/* Main card with fancy gradient border */}
        <div className="relative p-[2px] rounded-xl bg-gradient-to-br from-primary/50 via-border to-accent/50 shadow-xl z-10">
          <div className="bg-card rounded-xl flex flex-col h-full backdrop-blur-sm overflow-hidden">
            {/* Top accent bar - this can remain if desired, or be removed if it clashes with the new image header */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-xl z-10"></div>
            
            {/* Profile Image Header */}
            <div className="relative w-full h-48 sm:h-56 md:h-60">
                <img 
                  src="/profile-placeholder.webp" 
                  alt="Harikrishnan V K" 
                  className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/400x240?text=Profile+Image';}}
                />
              {/* Scrim for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              {/* Name and Title Overlay */}
              <div className="absolute bottom-0 left-0 p-4 sm:p-5 md:p-6">
                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
                Harikrishnan V K
                </motion.h2>
                <motion.p 
                  className="text-sm sm:text-md font-medium text-gray-200 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                Full Stack Developer & Student
                </motion.p>
              </div>
            </div>

            {/* Content Section Below Image */}
            <div className="p-4 sm:p-5 md:p-6 flex flex-col items-center text-center">
            {/* Bio with subtle highlight */}
            <motion.div 
                className="mb-5 sm:mb-6 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
                <div className="w-16 h-1 bg-gradient-to-r from-primary/50 to-accent/50 mx-auto mb-3 sm:mb-4 rounded-full"></div>
                <p className="text-xs sm:text-sm text-foreground/70 max-w-xs mx-auto leading-relaxed">
                Building digital experiences that combine clean code with intuitive design. Passionate about solving real problems with tech.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div 
                className="mb-5 sm:mb-6 w-full max-w-xs mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Key Skills</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={index} 
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary hover:text-primary-foreground text-xs font-medium border border-primary/20 transition-colors duration-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05, type: 'spring', stiffness: 400, damping: 15 }}
                    whileHover={{ y: -2, backgroundImage: 'linear-gradient(to right, var(--primary), var(--accent))', scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div 
                className="flex justify-center space-x-2 sm:space-x-3 mb-5 sm:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>

            {/* Call to action */}
            <motion.a
              href="#contact"
              className="relative overflow-hidden button-primary py-2.5 px-6 inline-flex items-center group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.03 }}
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ backgroundPosition: "0% 0%" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <SparkleIllustration size={12} className="relative z-10 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard; 