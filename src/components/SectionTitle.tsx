import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTitleProps {
  label: string;
  title: string;
  className?: string;
}

export const SectionTitle = ({ label, title, className = '' }: SectionTitleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  // Split title by words or lines to reveal them cleanly
  const words = title.split(' ');

  return (
    <div ref={containerRef} className={`mb-12 md:mb-20 select-none ${className}`}>
      {/* Label (e.g., 01 / SELECTED WORK) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 0.6, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-xs md:text-sm font-mono text-accent-blue font-bold tracking-widest uppercase mb-4"
      >
        {label}
      </motion.div>

      {/* Main Title Heading with Word Reveal */}
      <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-tight">
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-3">
            <motion.span
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                delay: index * 0.05,
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
};

export default SectionTitle;
