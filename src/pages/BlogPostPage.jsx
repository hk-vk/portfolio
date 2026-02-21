import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Navigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from '../lib/motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEOHead from '../components/SEOHead';
import { duration } from '../utils/motionSettings';
import { Icon } from "@iconify/react";

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
];

const SpeedReaderOverlay = ({ 
  isActive, 
  onClose,
  content,
  wordsPerMinute, 
  setWordsPerMinute,
  readerMode,
  setReaderMode
}) => {
  const [chunkSize, setChunkSize] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isActive) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl"
    >
      {/* Header / Close */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/10">
        <div className="flex items-center gap-2">
          <Icon icon="tabler:eye-bolt" className="text-primary text-xl" />
          <span className="font-medium tracking-wide text-sm uppercase text-muted-foreground">Focus Mode</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-2 text-xs text-muted-foreground/60">
            <kbd className="px-1.5 py-0.5 bg-muted/30 border border-border/30 rounded text-[10px] font-mono shadow-sm">ESC</kbd>
            <span>to exit</span>
          </span>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted/20 rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <Icon icon="tabler:x" className="text-xl" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-5xl mx-auto px-4 overflow-hidden">
        {readerMode === 'rsvp' ? (
          <RSVPReader 
            content={content} 
            isPlaying={isPlaying} 
            wordsPerMinute={wordsPerMinute} 
            chunkSize={chunkSize}
            onComplete={() => setIsPlaying(false)}
          />
        ) : (
          <GuidedReader 
             content={content}
             isPlaying={isPlaying}
             wordsPerMinute={wordsPerMinute}
             onComplete={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* Controls Bar */}
      <div className="pb-8 pt-4 px-4 w-full flex justify-center">
        <div className="bg-card/50 border border-border/20 backdrop-blur-md shadow-2xl rounded-2xl p-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full max-w-2xl">
          
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/20"
          >
            <Icon icon={isPlaying ? "tabler:pause" : "tabler:play"} className="text-2xl" />
          </button>

          <div className="h-8 w-px bg-border/40 hidden sm:block"></div>

          {/* Mode Switcher */}
          <div className="flex bg-muted/30 p-1 rounded-lg">
             <button 
                onClick={() => setReaderMode('rsvp')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${readerMode === 'rsvp' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                RSVP
              </button>
              <button 
                onClick={() => setReaderMode('guided')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${readerMode === 'guided' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Guided
              </button>
          </div>

          <div className="h-8 w-px bg-border/40 hidden sm:block"></div>

          {/* Speed Controls */}
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setWordsPerMinute(Math.max(100, wordsPerMinute - 50))}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              <Icon icon="tabler:minus" />
            </button>
            <div className="flex flex-col items-center w-16">
              <span className="text-lg font-bold font-mono leading-none">{wordsPerMinute}</span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground">WPM</span>
            </div>
            <button 
              onClick={() => setWordsPerMinute(Math.min(1000, wordsPerMinute + 50))}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              <Icon icon="tabler:plus" />
            </button>
          </div>
          
          {/* Chunk Size (RSVP only) */}
          {readerMode === 'rsvp' && (
            <>
              <div className="h-8 w-px bg-border/40 hidden sm:block"></div>
              <div className="flex flex-col items-center gap-1 min-w-[60px]">
                 <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Chunk</span>
                 <div className="flex items-center gap-2">
                   <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1" 
                    value={chunkSize} 
                    onChange={(e) => setChunkSize(parseInt(e.target.value))} 
                    className="w-16 h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-xs font-mono">{chunkSize}</span>
                 </div>
              </div>
            </>
          )}

          {/* Exit Button */}
          <div className="h-8 w-px bg-border/40 hidden sm:block"></div>
          <button 
            onClick={onClose}
            className="flex flex-col items-center gap-1 group text-muted-foreground hover:text-destructive transition-colors p-2"
          >
            <Icon icon="tabler:logout" className="text-xl group-hover:scale-110 transition-transform" />
            <span className="text-[9px] uppercase tracking-wider font-medium">Exit</span>
          </button>

        </div>
      </div>
    </motion.div>,
    document.body
  );
};

const RSVPReader = ({ content, isPlaying, wordsPerMinute, chunkSize, onComplete }) => {
  const [wordChunks, setWordChunks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const plainTextContent = stripMarkdown(content);
    const allWords = plainTextContent
      .split('\n')
      .filter(para => para.trim())
      .flatMap(para => para.trim().split(/\s+/))
      .filter(word => word.length > 0);
    
    const chunks = [];
    for (let i = 0; i < allWords.length; i += chunkSize) {
      chunks.push(allWords.slice(i, i + chunkSize));
    }
    setWordChunks(chunks);
    setCurrentIndex(0);
  }, [content, chunkSize]);

  useEffect(() => {
    if (isPlaying && wordChunks.length > 0) {
      const interval = (60000 * chunkSize) / wordsPerMinute;
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= wordChunks.length) {
            clearInterval(intervalRef.current);
            onComplete?.();
            return prev;
          }
          setProgress((next / wordChunks.length) * 100);
          return next;
        });
      }, interval);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, wordChunks, wordsPerMinute, chunkSize, onComplete]);

  const currentChunk = wordChunks[currentIndex] || [];
  
  // Helper to highlight the middle character (ORP - Optimal Recognition Point)
  const renderWord = (word) => {
    if (!word) return null;
    if (word.length === 1) return <span className="inline-block"><span className="text-primary">{word}</span></span>;
    
    const middleIndex = Math.ceil(word.length / 2) - 1;
    const start = word.slice(0, middleIndex);
    const middle = word[middleIndex];
    const end = word.slice(middleIndex + 1);
    
    return (
      <span className="inline-block mx-1">
        <span className="opacity-90">{start}</span>
        <span className="text-primary font-bold scale-110 inline-block transform">{middle}</span>
        <span className="opacity-90">{end}</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
       {/* Focus Guides */}
      <div className="relative w-full h-[40vh] flex items-center justify-center">
         <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-background/95 to-transparent pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/95 to-transparent pointer-events-none"></div>
         
         {/* The Reader Window */}
         <div className="relative">
            {/* Top/Bottom Lines */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/20 rounded-full"></div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/20 rounded-full"></div>
            
            <div className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-center leading-normal select-none py-4 px-8 min-h-[1.5em] flex items-center justify-center whitespace-nowrap">
              {currentChunk.map((word, idx) => (
                <React.Fragment key={idx}>
                  {renderWord(word)}
                </React.Fragment>
              ))}
            </div>
         </div>
      </div>

      {/* Progress Line */}
      <div className="w-full max-w-md mt-12 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
      <div className="mt-2 text-xs text-muted-foreground font-mono">
        {currentIndex + 1} / {wordChunks.length} chunks
      </div>
    </div>
  );
};

const GuidedReader = ({ content, isPlaying, wordsPerMinute, onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState([]);
  const wordRefs = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
    const plainText = stripMarkdown(content);
    setWords(plainText.split(/\s+/).filter(w => w.length > 0));
    setCurrentWordIndex(0);
  }, [content]);

  useEffect(() => {
    if (isPlaying && words.length > 0) {
      const interval = 60000 / wordsPerMinute;
      const timer = setInterval(() => {
        setCurrentWordIndex(prev => {
          const next = prev + 1;
          if (next >= words.length) {
            clearInterval(timer);
            onComplete?.();
            return prev;
          }
          
          // Auto-scroll
          const el = wordRefs.current[`word-${next}`];
          if (el && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            
            // Keep current word in middle third of screen
            if (elRect.top < containerRect.top + containerRect.height / 3 || 
                elRect.bottom > containerRect.bottom - containerRect.height / 3) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          return next;
        });
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isPlaying, words, wordsPerMinute, onComplete]);

  return (
    <div ref={containerRef} className="w-full h-[70vh] overflow-y-auto px-4 md:px-20 scroll-smooth">
      <div className="max-w-2xl mx-auto py-20 text-xl md:text-2xl leading-relaxed text-muted-foreground/50 transition-colors duration-500">
        {words.map((word, idx) => {
          const isActive = idx === currentWordIndex;
          const isPast = idx < currentWordIndex;
          
          return (
            <span 
              key={idx}
              ref={el => (wordRefs.current[`word-${idx}`] = el)}
              onClick={() => setCurrentWordIndex(idx)}
              className={`inline-block mr-2 mb-2 transition-all duration-200 cursor-pointer rounded px-1
                ${isActive ? 'text-foreground scale-110 font-medium bg-muted/50 shadow-sm' : ''}
                ${isPast ? 'text-muted-foreground/80' : ''}
                ${!isActive && !isPast ? 'opacity-30 blur-[0.5px]' : ''}
              `}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};


const BlogPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Speed Reader State
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [wordsPerMinute, setWordsPerMinute] = useState(300);
  const [readerMode, setReaderMode] = useState('guided');

  // Text-to-Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVoiceLoaded, setHasVoiceLoaded] = useState(false);
  
  // Ensure voices are loaded (browsers load them asynchronously)
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setHasVoiceLoaded(true);
      }
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const text = stripMarkdown(post.content);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Use system default voice for en-US
      const voices = window.speechSynthesis.getVoices();
      // Try to find a high-quality Google voice first
      const preferredVoice = voices.find(v => v.name.includes('Google US English')) || 
                           voices.find(v => v.lang === 'en-US');
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    // Simulate fetching post data
    const foundPost = blogPostsData.find(p => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
    } else {
      setPost(null); 
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
      
      <AnimatePresence>
        {isReaderOpen && (
          <SpeedReaderOverlay 
            isActive={isReaderOpen}
            onClose={() => setIsReaderOpen(false)}
            content={post.content}
            wordsPerMinute={wordsPerMinute}
            setWordsPerMinute={setWordsPerMinute}
            readerMode={readerMode}
            setReaderMode={setReaderMode}
          />
        )}
      </AnimatePresence>

      <div className="pt-32 pb-20">
      <AnimatedSection animation="fadeUp">
        <div className="content-container max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground font-serif tracking-tight leading-none"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.moderate / 1000, ease: 'easeOut' }}
          >
            {post.title}
          </motion.h1>
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground mb-12 border-b border-border/40 pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.04, duration: duration.standard / 1000, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-border"></span>
              <span>{Math.max(1, Math.ceil(stripMarkdown(post.content).split(/\s+/).length / 200))} min read</span>
              <span className="w-1 h-1 rounded-full bg-border"></span>
              <span className="text-primary">{post.category || "Article"}</span>
            </div>
            
            <div className="hidden sm:block w-px h-4 bg-border/60 mx-1"></div>
            
            <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-auto">
              <button 
                onClick={() => setIsReaderOpen(true)}
                className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer group"
                title="Enter Speed Reader Mode"
              >
                <Icon icon="tabler:eye-bolt" className="text-lg group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold">SPEED READ</span>
              </button>

              {/* Text-to-Speech Button - Commented out for now due to voice quality issues on Firefox
              <button 
                onClick={toggleSpeech}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer group ${isSpeaking ? 'text-primary' : 'hover:text-primary'}`}
                title={isSpeaking ? "Stop Listening" : "Listen to Article"}
              >
                <div className="relative">
                  <Icon icon={isSpeaking ? "tabler:player-stop" : "tabler:volume"} className="text-lg group-hover:scale-110 transition-transform relative z-10" />
                  {isSpeaking && (
                    <span className="absolute -inset-2 rounded-full bg-primary/20 animate-ping z-0"></span>
                  )}
                </div>
                <span className="text-[10px] font-bold">{isSpeaking ? "STOP LISTENING" : "LISTEN"}</span>
              </button> 
              */}
            </div>
          </motion.div>

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
            className="prose prose-lg sm:prose-xl max-w-none dark:prose-invert text-foreground/90 blog-content leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: duration.moderate / 1000, ease: 'easeOut' }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
    </>
  );
};

export default BlogPostPage; 
