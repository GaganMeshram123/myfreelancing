import { useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { experiences } from '../data/experience';

interface TimelineItemProps {
  exp: typeof experiences[0];
  index: number;
}

const TimelineItem = ({ exp, index }: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-10%' });

  // Alternate alignments on desktop
  const isEven = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full my-12 md:my-16 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* 1. Connecting dot on the central line */}
      <div className="absolute left-[8px] md:left-1/2 top-1.5 md:top-auto md:left-1/2 transform -translate-x-[4px] md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="w-3.5 h-3.5 rounded-full bg-accent-blue border-4 border-background"
        />
      </div>

      {/* 2. Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`w-full md:w-[45%] pl-8 md:pl-0 ${
          isEven ? 'md:text-left' : 'md:text-right'
        }`}
      >
        <div className="glass-premium p-6 rounded-lg border border-text-primary/5 relative hover:border-accent-purple/30 transition-colors duration-300">
          <span className="text-xs font-mono text-accent-cyan tracking-wider font-bold">
            {exp.duration}
          </span>
          <h3 className="text-xl font-extrabold text-text-primary mt-1">
            {exp.company}
          </h3>
          <h4 className="text-sm font-semibold text-accent-blue uppercase tracking-widest mt-0.5">
            {exp.role}
          </h4>
          <p className="text-xs text-text-secondary mt-1 tracking-wider italic">
            {exp.tagline}
          </p>
          <p className="text-text-secondary text-sm font-light leading-relaxed mt-4">
            {exp.description}
          </p>
        </div>
      </motion.div>

      {/* Empty space card for desktop alignment balance */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

export const ExperienceTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress for line filling
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={timelineRef} className="relative w-full max-w-4xl mx-auto px-4 md:px-0">
      {/* Central Timeline Vertical Line */}
      <div className="absolute left-[13px] md:left-1/2 top-0 bottom-0 w-[2px] bg-text-primary/5 transform -translate-x-[1px]" />
      
      {/* Filled dynamic line on scroll */}
      <motion.div
        className="absolute left-[13px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan origin-top transform -translate-x-[1px]"
        style={{ scaleY }}
      />

      {/* Timeline entries */}
      <div className="relative">
        {experiences.map((exp, index) => (
          <TimelineItem key={index} exp={exp} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
