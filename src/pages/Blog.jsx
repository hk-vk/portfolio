import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
          <div className="w-full h-48 bg-muted/50 flex flex-col items-center justify-center rounded-md mb-4 p-4 text-center">
            <svg className="w-12 h-12 text-muted-foreground/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 className="text-sm font-medium text-muted-foreground/70">{post.title}</h3>
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
      title: "Super Speedy Reading on My Site! How I Did It",
      date: "May 11, 2025",
      excerpt: "Ever wanted to read blog posts super fast? I added a speed reader to my portfolio, and here\'s how I did it, keeping it simple!",
      imageUrl: null,
      content: `
        Hey everyone!

        So, I had this cool idea: what if you could read stuff on my blog, like, REALLY fast? That\'s where a speed reader comes in! It flashes words at you one by one, so you can zoom through text.

        Why a speed reader, you ask?
        Well, sometimes you just want to get the main points SUPER quick, right? Or maybe you\'re just curious to see how fast you can actually read. Plus, it\'s a fun little techy thing to add to a portfolio.

        How I built it (the simple version!):
        Okay, so making a speed reader sounds complicated, but the basic idea isn\'t too crazy.

        1.  **Get the Text:** First, the code grabs all the words from the blog post. Easy peasy.
        2.  **Split it Up:** Then, it breaks that big chunk of text into single words. Like making a list of every word.
        3.  **Flash Them:** This is the fun part! The code takes each word from the list and shows it on the screen for a tiny moment. Then it shows the next word, and the next, and so on.
        4.  **You Control the Speed:** I added a little button or slider so YOU can decide how fast the words appear. Want to go super slow? Cool. Want to feel like a reading superhero? Crank it up!

        Some thoughts and ideas I had:
        *   **Where to put it?** I thought about having a button on each blog post like "Read with Speed Reader!"
        *   **Making it look good:** The words need to be easy to see, maybe big and in the middle of the screen.
        *   **Pausing and Playing:** Definitely need a way to stop and start it, in case you get a phone call or something.

        It was a neat little project! It makes you think about how we read and how tech can change that. Maybe not everyone will use it all the time, but it\'s a cool feature to have, and it was fun to figure out how to make it work.

        Let me know if you try it out and what you think!
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