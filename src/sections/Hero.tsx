import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AICore } from '../three/AICore';
import { MagneticButton } from '../components/MagneticButton';

interface HeroProps {
  onScrollToWork: () => void;
  onScrollToContact: () => void;
}

export const Hero = ({ onScrollToWork, onScrollToContact }: HeroProps) => {
  const floatingKeywords = [
    { text: 'AI SYSTEMS', top: '15%', left: '10%', delay: 0 },
    { text: 'RAG', top: '25%', left: '45%', delay: 1.5 },
    { text: 'AGENTIC AI', top: '18%', left: '75%', delay: 0.8 },
    { text: 'REACT', top: '65%', left: '8%', delay: 2.2 },
    { text: 'FASTAPI', top: '78%', left: '42%', delay: 1.0 },
    { text: 'LANGGRAPH', top: '62%', left: '78%', delay: 1.8 },
    { text: 'LLMs', top: '48%', left: '85%', delay: 0.5 },
    { text: '3D WEB', top: '50%', left: '5%', delay: 1.2 },
  ];

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-center pt-24 pb-12 select-none overflow-hidden">
      
      {/* 3D floating technology words */}
      {floatingKeywords.map((kw, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] md:text-xs font-mono font-bold tracking-widest text-text-primary/15 pointer-events-none select-none z-0"
          style={{ top: kw.top, left: kw.left }}
          animate={{
            y: [0, -18, 0],
            x: [0, 10, 0],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: kw.delay,
            ease: 'easeInOut',
          }}
        >
          {kw.text}
        </motion.div>
      ))}

      {/* Hero Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
          
          {/* Availability Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center lg:justify-start space-x-2 border border-text-primary/5 bg-text-primary/[0.02] px-3.5 py-1.5 rounded-full w-fit mx-auto lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-text-secondary">
              AVAILABLE FOR FREELANCE PROJECTS
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.215, 0.610, 0.355, 1] }}
            className="text-4xl md:text-6xl lg:text-[76px] font-black tracking-tight text-text-primary leading-[1.05] mt-6 select-none"
          >
            I BUILD{' '}
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent animate-pulse-slow">
              DIGITAL<br className="hidden md:inline" /> EXPERIENCES
            </span>{' '}
            THAT ACTUALLY WORK.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-text-secondary text-base md:text-lg max-w-xl font-light leading-relaxed mt-6 mx-auto lg:mx-0"
          >
            Software Developer & AI Engineer building scalable web applications, AI-powered systems, and digital products for startups and businesses.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8"
          >
            <MagneticButton strength={0.25}>
              <button
                onClick={onScrollToContact}
                className="bg-text-primary text-background font-bold tracking-widest text-xs px-8 py-4 rounded hover:bg-accent-blue hover:text-text-primary transition-all duration-300 flex items-center space-x-2 w-[220px] sm:w-auto justify-center"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <button
                onClick={onScrollToWork}
                className="glass text-text-primary border border-text-primary/10 hover:border-text-primary font-bold tracking-widest text-xs px-8 py-4 rounded transition-all duration-300 flex items-center space-x-2 w-[220px] sm:w-auto justify-center"
              >
                <span>VIEW MY WORK</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: Interactive AICore 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="lg:col-span-5 h-[350px] md:h-[500px] w-full flex items-center justify-center order-1 lg:order-2"
        >
          <AICore />
        </motion.div>
      </div>

      {/* Bottom Marquee Strip */}
      <div className="w-full bg-[#0A0A0A] border-y border-text-primary/5 py-4 overflow-hidden mt-12 relative select-none">
        <div className="marquee-content flex">
          {/* Duplicate strings to ensure smooth infinite wrap loops */}
          <span className="text-xs md:text-sm font-bold tracking-widest text-text-primary/50 uppercase whitespace-nowrap px-4">
            AVAILABLE FOR STARTUPS • AI PRODUCTS • WEB APPLICATIONS • BACKEND SYSTEMS • MVP DEVELOPMENT • FREELANCE PROJECTS • AVAILABLE FOR STARTUPS • AI PRODUCTS • WEB APPLICATIONS • BACKEND SYSTEMS • MVP DEVELOPMENT • FREELANCE PROJECTS • AVAILABLE FOR STARTUPS • AI PRODUCTS • WEB APPLICATIONS • BACKEND SYSTEMS • MVP DEVELOPMENT • FREELANCE PROJECTS •
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
