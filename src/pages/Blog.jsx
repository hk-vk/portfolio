import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Placeholder for Blog Post Card component - will be created in a separate step
const BlogPostCard = ({ post }) => (
  <motion.div
    className="fancy-border"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Link to={`/blog/${post.id}`} className="block h-full">
      <div className="border border-border p-6 h-full flex flex-col bg-card hover:shadow-xl transition-shadow duration-300 rounded-lg">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center rounded-md mb-4">
            <h3 className="text-2xl font-bold text-primary text-center p-4 font-serif">{post.title}</h3>
          </div>
        )}
        <h2 className="text-xl font-bold mb-2 text-foreground">{post.title}</h2>
        <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
        <p className="text-muted-foreground mb-4 flex-grow text-sm">{post.excerpt}</p>
        <div className="mt-auto">
          <span className="text-primary hover:underline text-sm font-medium">Read More &rarr;</span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Blog = () => {
  const blogPosts = [
    {
      id: "my-first-blog-post",
      title: "My First Blog Post",
      date: "October 26, 2023",
      excerpt: "This is a short summary of my very first blog post. I'm excited to start sharing my thoughts...",
      imageUrl: null, // Or add a placeholder image URL e.g., 'https://picsum.photos/seed/firstpost/600/400'
      content: `
        This is the content of my very first blog post. I'm excited to start sharing my thoughts and experiences.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Further details and more paragraphs can go here. We can talk about various topics and share insights.
        The structure of the blog allows for multiple paragraphs and even embedded images or code snippets if needed later.
      `
    },
    {
      id: "another-cool-post",
      title: "Another Cool Post Title",
      date: "October 28, 2023",
      excerpt: "A brief look into another interesting topic, with more details inside the full post.",
      imageUrl: 'https://picsum.photos/seed/secondpost/600/400', // Example with an image
      content: `
        This is the main content for 'Another Cool Post'.
        It explores different ideas and provides more in-depth information.
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      `
    },
    // Add more blog posts here as needed
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