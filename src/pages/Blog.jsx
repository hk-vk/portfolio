import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SparkleIllustration from '../components/SparkleIllustration';
import SEOHead from '../components/SEOHead';

// Enhanced Blog Post Card component with improved aesthetics
const BlogPostCard = ({ post }) => (
  <motion.div
    className="group h-full"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3, transition: { duration: 0.15 } }}
  >
    <Link to={`/blog/${post.id}`} className="block h-full">
      <div className="border border-border/50 p-6 h-full flex flex-col bg-card/80 backdrop-blur-sm
                      hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 
                      transition-all duration-300 rounded-xl 
                      group-hover:bg-card/90">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
        ) : (
          <div className="w-full h-48 rounded-md mb-4 relative overflow-hidden 
                          flex flex-col items-center justify-center 
                          bg-gradient-to-br from-muted/30 via-background to-muted/10 
                          border border-border/30 group-hover:border-primary/20 
                          transition-all duration-300">
            
            {/* Subtle decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.02] to-accent/[0.02]"></div>
            
            {/* Single sparkle accent */}
            <SparkleIllustration 
              size={20} 
              className="text-primary/40 mb-4 group-hover:text-primary/60 transition-colors duration-300" 
            />
            
            {/* Clean typography */}
            <div className="relative z-10 px-4">
              <h3 className="text-sm font-medium text-muted-foreground/80 text-center leading-relaxed">
                {post.title}
              </h3>
              <div className="w-8 h-px bg-primary/30 mx-auto mt-3 group-hover:w-12 group-hover:bg-primary/50 transition-all duration-300"></div>
            </div>
          </div>
        )}
        <div className="flex-grow">
          <h2 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary/90 transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-xs text-muted-foreground/80 mb-3 uppercase tracking-wider font-medium">
            {post.date}
          </p>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-auto pt-4 border-t border-border/30">
          <span className="inline-flex items-center text-primary/80 hover:text-primary text-sm font-medium 
                           group-hover:translate-x-1 transition-all duration-300">
            Read Article
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m7-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Blog = () => {
  const blogPosts = [
    {
      id: "portfolio-speed-reader-blog",
      title: "Don't spend too much time reading my blogs.",
      date: "May 11, 2025",
      excerpt: "Seriously, who has time for long reads? Use my speed reader and get on with your day. Here's why it's awesome.",
      imageUrl: null,
      content: `
# Don't spend too much time reading my blogs.

Seriously. You've got stuff to do. I've got stuff to do. Let's not make this a whole thing.

That's why I built a speed reader into this site. It's that little button up there. Click it.

## Why Bother?

*   **Time:** You get the gist, fast.
*   **Focus:** No distractions, just words.
*   **Magic:** Okay, not magic, but it feels pretty cool.

## How It Works (The TL;DR Version)

It flashes words at you. Your brain does the rest. Science! (Sort of). You can control the speed. Faster is... well, faster.

## So, Go Ahead.

Try the speed reader on this very post. See? Done. Now go build something amazing. Or take a nap. Your call.
      `
    }
    // Add more blog posts here as needed // Ensure this comment remains if you want to add more later, or remove it if this is the only post.
  ];

  return (
    <>
      <SEOHead 
        title="Blog | Harikrishnan V K"
        description="Read my thoughts on web development, programming, and technology. Discover insights about React, Node.js, and modern web development practices."
        url="/blog"
        type="website"
        image="/api/og?type=blog"
      />
      <div className="pt-32 pb-20 min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
      <AnimatedSection animation="fadeUp">
        <div className="content-container text-center mb-20">
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SparkleIllustration className="text-primary mr-3" size={24} />
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
              BLOG
            </h1>
          </motion.div>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Thoughts, stories, and ideas worth sharing.
          </motion.p>
          <motion.div
            className="w-16 h-px bg-primary/40 mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.3}>
        <div className="content-container">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <BlogPostCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <motion.h2
                className="text-2xl font-semibold text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                No blog posts yet.
              </motion.h2>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Check back soon for new articles!
              </motion.p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
    </>
  );
};

export default Blog; 