import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ progress }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="loader-wrapper"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999] select-none"
      >
        {/* Name with clean fill animation */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight font-display relative overflow-hidden">
            {/* Background text (unfilled) */}
            <span className="text-muted-foreground/15">HARIKRISHNAN</span>
            {/* Foreground text with gradient (fills based on progress) */}
            <span
              className="absolute inset-0 bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 40%, hsl(var(--primary)) 100%)',
                clipPath: `inset(0 ${100 - progress}% 0 0)`,
                transition: 'clip-path 0.1s ease-out',
              }}
            >
              HARIKRISHNAN
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-muted-foreground tracking-widest text-xs uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            Full Stack Developer
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="w-32 h-0.5 bg-muted/30 rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div
              className="h-full bg-foreground rounded-full"
              style={{
                width: `${progress}%`,
                transition: 'width 0.1s ease-out',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
