import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';

const Blog = () => {
  const samplePost = {
    title: "My First Blog Post",
    date: "October 26, 2023",
    content: `
      This is the content of my very first blog post. I'm excited to start sharing my thoughts and experiences.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `
  };

  return (
    <div className="pt-32 pb-20">
      <AnimatedSection animation="fadeUp">
        <div className="content-container text-center mb-16">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            BLOG
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Thoughts, stories, and ideas.
          </motion.p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.3}>
        <div className="content-container max-w-3xl mx-auto">
          <article className="bg-card p-6 md:p-8 rounded-lg shadow-lg">
            <motion.h2 
              className="text-3xl font-bold mb-3 text-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {samplePost.title}
            </motion.h2>
            <motion.p 
              className="text-sm text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {samplePost.date}
            </motion.p>
            <motion.div 
              className="prose prose-lg max-w-none dark:prose-invert text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {samplePost.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </motion.div>
          </article>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Blog; 