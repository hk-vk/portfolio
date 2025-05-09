import React from 'react';
import { motion } from 'framer-motion';
import SparkleIllustration from './SparkleIllustration';

const ProfileCard = () => {
  const skills = ['React', 'Next.js', 'FastAPI', 'TypeScript'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fancy-border p-0.5 w-full max-w-md mx-auto"
    >
      <div className="border border-border bg-card p-6 md:p-8 rounded-lg shadow-xl h-full flex flex-col items-center text-center">
        {/* Profile Image Placeholder */}
        <motion.div 
          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-2 border-primary shadow-lg bg-muted flex items-center justify-center"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Replace with your actual image. Ensure it is in the public folder or imported correctly */}
          <img 
            src="/profile-placeholder.webp" 
            alt="Harikrishnan V K" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/160?text=Profile';}} // Fallback placeholder
          />
        </motion.div>

        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-foreground mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Harikrishnan V K
        </motion.h2>
        
        <motion.p 
          className="text-md text-primary mb-4 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Full Stack Developer & Student
        </motion.p>

        <motion.p 
          className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Building digital experiences that combine clean code with intuitive design. Passionate about solving real problems with tech.
        </motion.p>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Key Skills</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <motion.span 
                key={index} 
                className="skill-tag bg-primary/10 text-primary text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05, type: 'spring', stiffness: 400, damping: 15 }}
                whileHover={{ y: -2, backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.a
          href="#contact" // Assuming you have a contact section with id="contact" on the page or direct to contact page
          className="button-primary mt-auto text-sm py-2.5 px-6 inline-flex items-center group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(var(--primary-rgb), 0.3)" }}
        >
          Get in Touch
          <SparkleIllustration size={12} className="ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProfileCard; 