import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Failsafe timeout to force reveal after 2.5 seconds max
    const failsafeTimer = setTimeout(() => {
      console.warn("Loader failsafe triggered!");
      setShow(false);
      onComplete();
    }, 2500);

    // Count up from 0 to 100
    const duration = 1200; // Total loading time in ms
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          clearTimeout(failsafeTimer);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 500); // Trigger complete after slide out animation
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      clearTimeout(failsafeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#050505] z-[99999] flex flex-col justify-center items-center"
        >
          {/* Subtle bg glow */}
          <div className="absolute w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="text-center w-full max-w-xs relative z-10 px-6">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tighter text-text-primary uppercase select-none"
            >
              GAGAN<span className="text-accent-blue">.</span>
            </motion.h1>

            {/* Subtitle */}
            <p className="text-[10px] tracking-widest text-text-secondary mt-1 font-mono">
              INITIALIZING ENGINE
            </p>

            {/* Thin Progress bar */}
            <div className="w-full h-[1px] bg-text-primary/10 mt-8 relative rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage counter */}
            <div className="text-right mt-2 text-xs font-mono text-text-secondary select-none">
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
