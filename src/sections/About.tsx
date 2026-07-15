import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

const StatCounter = ({ value, suffix, label }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 1200; // Counter animation duration in ms
    const incrementTime = Math.max(Math.floor(duration / end), 15);

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="border-l-2 border-accent-blue/35 pl-4 py-2 select-none">
      <div className="text-3xl md:text-5xl font-black tracking-tight text-text-primary font-mono">
        {count}
        <span className="text-accent-purple">{suffix}</span>
      </div>
      <p className="text-[10px] md:text-xs font-semibold tracking-wider text-text-secondary uppercase mt-1">
        {label}
      </p>
    </div>
  );
};

interface AboutProps {
  onScrollToContact: () => void;
}

export const About = ({ onScrollToContact }: AboutProps) => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isLeftInView = useInView(leftRef, { once: true, margin: '-10%' });
  const isRightInView = useInView(rightRef, { once: true, margin: '-10%' });

  const stats = [
    { value: 150, suffix: '+', label: 'DSA PROBLEMS SOLVED' },
    { value: 3, suffix: '', label: 'FEATURED PRODUCTS' },
    { value: 3, suffix: '+', label: 'PROFESSIONAL EXPERIENCES' },
    { value: 100, suffix: '%', label: 'BUILDING & LEARNING' },
  ];

  return (
    <section id="about" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-text-primary/5 last:border-b-0">
      
      {/* Label Title */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs md:text-sm font-mono text-accent-blue font-bold tracking-widest uppercase mb-12"
      >
        04 / ABOUT
      </motion.div>

      {/* Split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left Col: Giant Typography */}
        <div ref={leftRef} className="lg:col-span-5 select-none">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.08]">
            <span className="inline-block overflow-hidden mr-3">
              <motion.span
                initial={{ y: '100%' }}
                animate={isLeftInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block"
              >
                I DON'T JUST
              </motion.span>
            </span>
            <br />
            <span className="inline-block overflow-hidden mr-3">
              <motion.span
                initial={{ y: '100%' }}
                animate={isLeftInView ? { y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent"
              >
                WRITE CODE.
              </motion.span>
            </span>
            <br />
            <span className="inline-block overflow-hidden mr-3">
              <motion.span
                initial={{ y: '100%' }}
                animate={isLeftInView ? { y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block"
              >
                I BUILD
              </motion.span>
            </span>
            <br />
            <span className="inline-block overflow-hidden mr-3">
              <motion.span
                initial={{ y: '100%' }}
                animate={isLeftInView ? { y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent"
              >
                SOLUTIONS.
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Right Col: Paragraph description & Stats */}
        <div ref={rightRef} className="lg:col-span-7 flex flex-col space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isRightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-text-secondary text-base md:text-lg leading-relaxed font-light"
          >
            <p>
              I'm Gagan Meshram, a Software Developer and AI Engineer focused on building real digital products.
            </p>
            <p>
              My work spans production e-commerce platforms, full-stack applications, backend systems, and AI-powered software.
            </p>
            <p>
              I focus on understanding the problem first, designing the right technical approach, and turning ideas into working products.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-text-primary/5">
            {stats.map((stat, i) => (
              <StatCounter
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isRightInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="pt-6"
          >
            <MagneticButton strength={0.2}>
              <button
                onClick={onScrollToContact}
                className="glass border border-text-primary/10 hover:border-text-primary text-text-primary font-bold tracking-widest text-xs px-6 py-3 rounded hover:bg-text-primary hover:text-background transition-colors duration-300 flex items-center space-x-2"
              >
                <span>MORE ABOUT ME</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
