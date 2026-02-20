import React, { useState, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from '../lib/motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEOHead from '../components/SEOHead';
import { duration } from '../utils/motionSettings';

// Utility function to strip Markdown syntax
const stripMarkdown = (markdownText) => {
  if (!markdownText) return '';
  
  // Replace headers
  let plainText = markdownText.replace(/^#{1,6}\s+/gm, '');
  
  // Replace bold and italic
  plainText = plainText.replace(/\*\*(.+?)\*\*/g, '$1'); // Bold
  plainText = plainText.replace(/\*(.+?)\*/g, '$1'); // Italic
  plainText = plainText.replace(/_(.+?)_/g, '$1'); // Italic with underscores
  plainText = plainText.replace(/__(.*?)__/g, '$1'); // Bold with underscores
  
  // Replace links
  plainText = plainText.replace(/\[(.+?)\]\(.+?\)/g, '$1');
  
  // Replace lists
  plainText = plainText.replace(/^[\*\-\+]\s+/gm, ''); // Unordered lists
  plainText = plainText.replace(/^\d+\.\s+/gm, ''); // Ordered lists
  
  // Replace blockquotes
  plainText = plainText.replace(/^>\s+/gm, '');
  
  // Replace code blocks and inline code
  plainText = plainText.replace(/```[a-z]*\n[\s\S]*?\n```/g, ''); // Code blocks
  plainText = plainText.replace(/`([^`]+)`/g, '$1'); // Inline code
  
  // Replace images
  plainText = plainText.replace(/!\[.*?\]\(.*?\)/g, '');
  
  // Remove any HTML tags
  plainText = plainText.replace(/<[^>]*>/g, '');
  
  // Fix consecutive spaces
  plainText = plainText.replace(/\s+/g, ' ');
  
  // Special case: Remove the underscore in the Toffler quote
  plainText = plainText.replace(/^_(.*)_$/gm, '$1');
  
  return plainText.trim();
};

// Temporary: Define posts here. In a real app, this would come from a CMS, API, or context.
const blogPostsData = [
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

const SpeedReaderControls = ({ 
  isActive, 
  setIsActive, 
  wordsPerMinute, 
  setWordsPerMinute,
  chunkSize,
  setChunkSize,
  readerMode,
  setReaderMode
}) => (
  <div className="flex flex-col gap-4 p-4 bg-muted/40 rounded-lg mb-8 shadow-sm">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <button 
        onClick={() => setIsActive(!isActive)}
        className={`button-primary px-4 py-2 rounded-md flex items-center justify-center min-w-[160px] text-base transition-colors ${isActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'hover:bg-primary/90'}`}
      >
        {isActive ? (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Stop Reading
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
        <span className="text-sm font-medium text-muted-foreground">Mode:</span>
        <div className="flex rounded-md border border-border bg-background p-0.5">
          <button 
            onClick={() => setReaderMode('rsvp')} 
            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${readerMode === 'rsvp' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
          >
            RSVP
          </button>
          <button 
            onClick={() => setReaderMode('guided')} 
            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${readerMode === 'guided' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
          >
            Guided Scroll
          </button>
        </div>
      </div>
    </div>

    <div className="flex flex-col xs:flex-row items-center gap-x-4 gap-y-3 w-full">
      <div className="flex items-center gap-2 w-full xs:w-auto flex-1">
        <label htmlFor="wpm-slider" className="text-sm text-muted-foreground whitespace-nowrap">WPM:</label>
        <input 
          id="wpm-slider"
          type="range" 
          min="100" 
          max="1000" 
          step="50" 
          value={wordsPerMinute} 
          onChange={(e) => setWordsPerMinute(parseInt(e.target.value))} 
          className="w-full accent-primary h-4"
        />
        <span className="text-xs font-mono bg-background px-1.5 py-0.5 rounded border border-border min-w-[45px] text-center">{wordsPerMinute}</span>
      </div>

      {readerMode === 'rsvp' && (
        <div className="flex items-center gap-2 w-full xs:w-auto flex-1">
          <label htmlFor="chunk-slider" className="text-sm text-muted-foreground whitespace-nowrap">Words/Flash:</label>
          <input 
            id="chunk-slider"
            type="range" 
            min="1" 
            max="5" 
            step="1" 
            value={chunkSize} 
            onChange={(e) => setChunkSize(parseInt(e.target.value))} 
            className="w-full accent-primary h-4"
          />
          <span className="text-xs font-mono bg-background px-1.5 py-0.5 rounded border border-border min-w-[45px] text-center">{chunkSize}</span>
        </div>
      )}
      {readerMode === 'guided' && <div className="flex-1"></div>} 
    </div>
  </div>
);

const SpeedReader = ({ content, isActive, wordsPerMinute, chunkSize }) => {
  const [wordChunks, setWordChunks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const intervalRef = useRef(null);
  const totalWordsRef = useRef(0);

  useEffect(() => {
    // Strip markdown syntax before processing
    const plainTextContent = stripMarkdown(content);
    
    const allWords = plainTextContent
      .split('\n')
      .filter(para => para.trim())
      .flatMap(para => para.trim().split(/\s+/))
      .filter(word => word.length > 0);
    
    totalWordsRef.current = allWords.length;
    
    const chunks = [];
    for (let i = 0; i < allWords.length; i += chunkSize) {
      chunks.push(allWords.slice(i, i + chunkSize));
    }
    setWordChunks(chunks);
    setCurrentIndex(0);
    setIsComplete(false);
  }, [content, chunkSize]);

  useEffect(() => {
    if (totalWordsRef.current > 0 && wordsPerMinute > 0) {
      const time = Math.ceil((totalWordsRef.current / wordsPerMinute) * 60);
      setEstimatedTime(time);
    }
  }, [wordsPerMinute, wordChunks]);

  useEffect(() => {
    if (isActive && wordChunks.length > 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsComplete(false);
      setCurrentIndex(0);

      const interval = (60000 * chunkSize) / wordsPerMinute;
      
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= wordChunks.length) {
            clearInterval(intervalRef.current);
            setIsComplete(true);
            return prevIndex;
          }
          const wordsRead = (nextIndex + 1) * chunkSize;
          const remainingWords = Math.max(0, totalWordsRef.current - wordsRead);
          setEstimatedTime(Math.ceil((remainingWords / wordsPerMinute) * 60));
          return nextIndex;
        });
      }, interval);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (totalWordsRef.current > 0 && wordsPerMinute > 0) {
        setEstimatedTime(Math.ceil((totalWordsRef.current / wordsPerMinute) * 60));
      }
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, wordChunks, wordsPerMinute, chunkSize]);
  
  if (!isActive) {
    return null;
  }
  
  const currentChunkText = wordChunks[currentIndex]?.join(' ') || '';

  return (
    <div className="p-6 bg-card border border-border rounded-lg mb-8 relative min-h-48 flex flex-col items-center justify-center">
      {isComplete ? (
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Speed reading complete!</p>
        </div>
      ) : wordChunks.length > 0 && currentChunkText ? (
        <div className="text-center w-full">
          <div className="mb-6 flex items-center justify-center">
            <div className="w-16 h-1 bg-muted"></div>
            <div className="relative px-4 sm:px-8 min-w-0 flex-1">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: duration.standard / 1000, ease: 'easeOut' }}
                className="text-3xl sm:text-4xl font-serif font-bold text-primary truncate"
              >
                {currentChunkText}
              </motion.div>
            </div>
            <div className="w-16 h-1 bg-muted"></div>
          </div>
          <div className="text-xs text-muted-foreground">
            Chunk {currentIndex + 1} of {wordChunks.length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Time Remaining: ~{Math.floor(estimatedTime / 60)}m {estimatedTime % 60}s
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground">Preparing content...</p>
        </div>
      )}
    </div>
  );
};

// Enhanced guided reading component with formatted content and word highlighting
const HighlightableMarkdown = ({ content, currentWordIndex, wordRefs }) => {
  const [wordElements, setWordElements] = useState([]);
  
  useEffect(() => {
    // Extract all words from the plain text version for indexing
    const plainText = stripMarkdown(content);
    const words = plainText.split(/\s+/).filter(w => w.length > 0);
    setWordElements(words);
  }, [content]);

  // Custom text renderer that adds word highlighting
  const renderText = (text, elementType = 'span') => {
    const words = text.split(/(\s+)/);
    let wordIndex = 0;
    
    return words.map((part, i) => {
      if (/\s/.test(part)) {
        return part; // Return whitespace as-is
      }
      
      // Find the global word index
      const globalWordIndex = wordElements.findIndex((word, idx) => 
        idx >= wordIndex && word.toLowerCase() === part.toLowerCase()
      );
      
      if (globalWordIndex !== -1) {
        wordIndex = globalWordIndex + 1;
        const isHighlighted = globalWordIndex === currentWordIndex;
        const wordId = `word-${globalWordIndex}`;
        
        return (
          <motion.span
            key={`${wordId}-${i}`}
            ref={el => {
              if (wordRefs.current && wordId) {
                wordRefs.current[wordId] = { current: el };
              }
            }}
            className={`guided-word cursor-pointer transition-[background-color,color,box-shadow,transform] duration-150 ease-out ${
              isHighlighted 
                ? 'bg-primary/40 text-primary-foreground rounded-md px-1 py-0.5 shadow-md font-medium' 
                : 'hover:bg-muted/20 rounded-sm'
            }`}
            animate={isHighlighted ? {
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(var(--primary), 0.4)'
            } : {
              scale: 1,
              boxShadow: '0 0px 0px rgba(var(--primary), 0)'
            }}
            transition={{ duration: duration.quick / 1000, ease: 'easeOut' }}
          >
            {part}
          </motion.span>
        );
      }
      
      return part;
    });
  };

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert text-foreground blog-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Enhanced text rendering with word highlighting
          p: ({ children }) => (
            <p className="mb-6 leading-relaxed tracking-wide">
              {typeof children === 'string' ? renderText(children) : children}
            </p>
          ),
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-10 leading-tight">
              {typeof children === 'string' ? renderText(children) : children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-bold mb-5 mt-8 leading-tight">
              {typeof children === 'string' ? renderText(children) : children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-bold mb-4 mt-6">
              {typeof children === 'string' ? renderText(children) : children}
            </h3>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-primary">
              {typeof children === 'string' ? renderText(children) : children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-accent">
              {typeof children === 'string' ? renderText(children) : children}
            </em>
          ),
          code: ({ children }) => (
            <code className="bg-muted/70 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),
          li: ({ children }) => (
            <li className="mb-2">
              {typeof children === 'string' ? renderText(children) : children}
            </li>
          ),
          ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
          a: ({ children, href }) => (
            <a href={href} className="text-primary hover:text-primary/80 hover:underline transition-colors">
              {typeof children === 'string' ? renderText(children) : children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-6">
              {children}
            </blockquote>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const GuidedHighlighter = ({ content, isActive, wordsPerMinute }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [totalWords, setTotalWords] = useState(0);
  const [progress, setProgress] = useState(0);
  const wordRefs = useRef({});
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Count total words for progress tracking
    const plainText = stripMarkdown(content);
    const words = plainText.split(/\s+/).filter(w => w.length > 0);
    setTotalWords(words.length);
    setCurrentWordIndex(-1);
    setProgress(0);
  }, [content]);

  useEffect(() => {
    if (isActive && totalWords > 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentWordIndex(0);

      const interval = 60000 / wordsPerMinute;
      intervalRef.current = setInterval(() => {
        setCurrentWordIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= totalWords) {
            clearInterval(intervalRef.current);
            setProgress(100);
            return prevIndex;
          }
          
          // Update progress
          const newProgress = Math.round((nextIndex / totalWords) * 100);
          setProgress(newProgress);
          
          // Auto-scroll to current word
          const wordId = `word-${nextIndex}`;
          const wordElement = wordRefs.current[wordId]?.current;
          if (wordElement && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const wordRect = wordElement.getBoundingClientRect();
            
            if (wordRect.top < containerRect.top + 100 || wordRect.bottom > containerRect.bottom - 100) {
              wordElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
              });
            }
          }
          
          return nextIndex;
        });
      }, interval);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, totalWords, wordsPerMinute]);

  if (!isActive) return null;
  if (totalWords === 0) return <p className="text-muted-foreground">Preparing guided reading...</p>;

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="mb-6 p-4 bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Reading Progress</span>
          <span className="text-sm text-muted-foreground">
            {currentWordIndex + 1} / {totalWords} words ({progress}%)
          </span>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: duration.standard / 1000, ease: 'easeOut' }}
            style={{ originX: 0 }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Est. time remaining: ~{Math.ceil((totalWords - currentWordIndex) / wordsPerMinute)}m</span>
          <span>{wordsPerMinute} WPM</span>
        </div>
      </div>

      {/* Enhanced Content with Formatting Preserved */}
      <div 
        ref={containerRef} 
        className="relative bg-card/30 backdrop-blur-sm border border-border/20 rounded-xl p-6 
                   max-h-[60vh] overflow-auto shadow-inner"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--primary) / 0.3) transparent'
        }}
      >
        <HighlightableMarkdown 
          content={content}
          currentWordIndex={currentWordIndex}
          wordRefs={wordRefs}
        />
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isSpeedReadingActive, setIsSpeedReadingActive] = useState(false);
  const [wordsPerMinute, setWordsPerMinute] = useState(300);
  const [chunkSize, setChunkSize] = useState(1);
  const [readerMode, setReaderMode] = useState('rsvp');

  useEffect(() => {
    // Simulate fetching post data
    const foundPost = blogPostsData.find(p => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
    } else {
      // If post not found, setPost to a specific state or handle as error
      setPost(null); // Or some indicator for 'not found'
    }
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    if (post && post.title) {
      const originalTitle = document.title;
      document.title = post.title;
      return () => {
        document.title = originalTitle;
      };
    }
  }, [post]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center">
        <p className="text-xl text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    // Post not found after loading, redirect
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEOHead 
        title={`${post.title} | Harikrishnan V K`}
        description={post.excerpt || stripMarkdown(post.content).substring(0, 160) + '...'}
        url={`/blog/${post.id}`}
        type="article"
        image={post.imageUrl || "/og.jpg"}
      />
      <div className="pt-32 pb-20">
      <AnimatedSection animation="fadeUp">
        <div className="content-container max-w-3xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold uppercase mb-4 text-primary font-serif"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.moderate / 1000, ease: 'easeOut' }}
          >
            {post.title}
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.04, duration: duration.standard / 1000, ease: 'easeOut' }}
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
              transition={{ delay: 0.08, duration: duration.moderate / 1000, ease: 'easeOut' }}
            />
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: duration.moderate / 1000, ease: 'easeOut' }}
          >
            <SpeedReaderControls 
              isActive={isSpeedReadingActive}
              setIsActive={setIsSpeedReadingActive}
              wordsPerMinute={wordsPerMinute}
              setWordsPerMinute={setWordsPerMinute}
              chunkSize={chunkSize}
              setChunkSize={setChunkSize}
              readerMode={readerMode}
              setReaderMode={setReaderMode}
            />
          </motion.div>
          
          {readerMode === 'rsvp' && isSpeedReadingActive && (
            <SpeedReader 
              content={post.content}
              isActive={isSpeedReadingActive}
              wordsPerMinute={wordsPerMinute}
              chunkSize={chunkSize}
            />
          )}

          {readerMode === 'guided' && isSpeedReadingActive && (
             <GuidedHighlighter
              content={post.content}
              isActive={isSpeedReadingActive}
              wordsPerMinute={wordsPerMinute}
            />
          )}

          { !(readerMode === 'guided' && isSpeedReadingActive) && (
            <motion.div
              className="prose prose-lg max-w-none dark:prose-invert text-foreground blog-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: duration.moderate / 1000, ease: 'easeOut' }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </motion.div>
          )}
        </div>
      </AnimatedSection>
    </div>
    </>
  );
};

export default BlogPostPage; 
