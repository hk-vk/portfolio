import React, { useState, useEffect, useRef } from 'react';
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

const SpeedReaderControls = ({ isActive, setIsActive, wordsPerMinute, setWordsPerMinute }) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-muted/30 rounded-lg mb-6">
    <button 
      onClick={() => setIsActive(!isActive)}
      className={`button-primary px-4 py-2 rounded-md flex items-center justify-center ${isActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
    >
      {isActive ? (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Stop
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Speed Read
        </>
      )}
    </button>
    
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Speed:</span>
      <input 
        type="range" 
        min="100" 
        max="800" 
        step="50" 
        value={wordsPerMinute} 
        onChange={(e) => setWordsPerMinute(parseInt(e.target.value))} 
        className="w-32 accent-primary"
      />
      <span className="text-xs font-mono bg-background px-2 py-1 rounded border border-border">{wordsPerMinute} WPM</span>
    </div>
  </div>
);

const SpeedReader = ({ content, isActive, wordsPerMinute }) => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  // Process content into words when it changes
  useEffect(() => {
    // Split content into paragraphs, then into words
    const allWords = content
      .split('\n')
      .filter(para => para.trim())
      .flatMap(para => para.trim().split(/\s+/));
    
    setWords(allWords);
  }, [content]);

  // Handle speed reading animation
  useEffect(() => {
    if (isActive && words.length > 0) {
      // Clear any existing intervals
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      setIsComplete(false);
      
      // Calculate interval based on WPM (60000ms / WPM = ms per word)
      const interval = 60000 / wordsPerMinute;
      
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= words.length) {
            clearInterval(intervalRef.current);
            setIsComplete(true);
            return 0;
          }
          return nextIndex;
        });
      }, interval);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, words, wordsPerMinute]);
  
  if (!isActive) {
    return null;
  }
  
  return (
    <div className="p-6 bg-card border border-border rounded-lg mb-8 relative min-h-48 flex items-center justify-center">
      {isComplete ? (
        <div className="text-center">
          <p className="text-muted-foreground">Speed reading complete!</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="w-16 h-1 bg-muted"></div>
            <div className="relative px-8">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="text-4xl font-serif font-bold text-primary"
              >
                {words[currentIndex]}
              </motion.div>
            </div>
            <div className="w-16 h-1 bg-muted"></div>
          </div>
          <div className="text-xs text-muted-foreground">
            Word {currentIndex + 1} of {words.length}
          </div>
        </div>
      )}
    </div>
  );
};

const BlogPostPage = () => {
  const { postId } = useParams();
  const post = blogPostsData.find(p => p.id === postId);
  
  // Speed reading state
  const [isSpeedReading, setIsSpeedReading] = useState(false);
  const [wordsPerMinute, setWordsPerMinute] = useState(300);

  if (!post) {
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
          
          {/* Speed Reading Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <SpeedReaderControls 
              isActive={isSpeedReading}
              setIsActive={setIsSpeedReading}
              wordsPerMinute={wordsPerMinute}
              setWordsPerMinute={setWordsPerMinute}
            />
          </motion.div>
          
          {/* Speed Reader */}
          <SpeedReader 
            content={post.content}
            isActive={isSpeedReading}
            wordsPerMinute={wordsPerMinute}
          />

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