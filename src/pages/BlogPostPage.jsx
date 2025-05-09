import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';

// Temporary: Define posts here. In a real app, this would come from a CMS, API, or context.
const blogPostsData = [
  {
    id: "my-first-blog-post",
    title: "My First Blog Post",
    date: "October 26, 2023",
    excerpt: "This is a short summary of my very first blog post. I'm excited to start sharing my thoughts...",
    imageUrl: null,
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
    imageUrl: 'https://picsum.photos/seed/secondpost/600/400',
    content: `
      This is the main content for 'Another Cool Post'.
      It explores different ideas and provides more in-depth information.
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
    `
  },
];

const BlogPostPage = () => {
  const { postId } = useParams();
  const post = blogPostsData.find(p => p.id === postId);

  if (!post) {
    // Optionally, redirect to a 404 page or the main blog page
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-32 pb-20">
      <AnimatedSection animation="fadeUp">
        <div className="content-container max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-3 text-primary font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.title}
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Published on {post.date}
          </motion.p>

          {post.imageUrl && (
            <motion.img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          )}

          <motion.div
            className="prose prose-lg max-w-none dark:prose-invert text-foreground blog-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BlogPostPage; 