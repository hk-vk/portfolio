import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SparkleIllustration from '../components/SparkleIllustration';

// Placeholder for Blog Post Card component - will be created in a separate step
const BlogPostCard = ({ post }) => (
  <motion.div
    className="fancy-border group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Link to={`/blog/${post.id}`} className="block h-full">
      <div className="border border-border p-6 h-full flex flex-col bg-card hover:shadow-lg group-hover:shadow-xl transition-shadow duration-300 rounded-lg">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
        ) : (
          <div className="w-full h-48 rounded-md mb-4 p-6 text-center relative overflow-hidden 
                          flex flex-col items-center justify-center 
                          bg-gradient-to-br from-primary/5 via-accent/5 to-card">
            {/* Decorative Sparkles */}
            <SparkleIllustration size={16} className="absolute top-4 left-4 text-primary/30 opacity-70" />
            <SparkleIllustration size={12} className="absolute bottom-6 right-8 text-accent/30 opacity-60" />
            <SparkleIllustration size={10} className="absolute top-12 right-16 text-primary/20 opacity-50" />
            <SparkleIllustration size={8} className="absolute bottom-10 left-12 text-accent/20 opacity-40" />

            {/* Subtle background pattern (optional, can be complex to implement without new components) */}
            {/* <div className="absolute inset-0 pattern-dots opacity-5"></div> */}

            <div className="relative z-10">
              {/* You can add a more stylized icon here if desired, or remove the SVG altogether */}
              {/* For example, a simpler, abstract icon or just text */}
              <svg className="w-10 h-10 text-primary/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 17.25h6M9 17.25a2.25 2.25 0 002.25 2.25h1.5A2.25 2.25 0 0015 17.25M9 17.25V9.75M15 17.25V9.75m0-4.5c0-3.941-3.403-6-7.5-6S0 1.309 0 5.25M22.5 9.75c0-3.941-3.403-6-7.5-6S7.5 1.309 7.5 5.25M15 9.75c0 .75-.25 1.5-.656 2.118M9 9.75c0 .75.25 1.5.656 2.118" />              
              </svg>
              <h3 className="text-base font-light text-foreground/80 leading-snug">{post.title}</h3>
            </div>
          </div>
        )}
        <h2 className="text-xl font-bold mb-2 text-foreground">{post.title}</h2>
        <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
        <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">{post.excerpt}</p>
        <div className="mt-auto">
          <span className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-semibold group-hover:underline transition-colors duration-200">
            Read More 
            <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
    <div className="pt-32 pb-20">
      <AnimatedSection animation="fadeUp">
        <div className="content-container text-center mb-16">
          <motion.h1
            className="text-3xl md:text-4xl font-bold uppercase mb-6"
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
        <div className="content-container">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <motion.h2 
                className="text-2xl font-semibold text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                No blog posts yet.
              </motion.h2>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Check back soon for new articles!
              </motion.p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Blog; 