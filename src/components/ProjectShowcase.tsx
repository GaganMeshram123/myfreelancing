import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectData } from '../data/projects';
import { MagneticButton } from './MagneticButton';

interface ProjectShowcaseProps {
  project: ProjectData;
  onViewCaseStudy: (id: string) => void;
}

export const ProjectShowcase = ({ project, onViewCaseStudy }: ProjectShowcaseProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll entry for text animation reveals
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: '-5%' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Apply tilt angles
    setTilt({
      x: y * -12, // Tilt vertical
      y: x * 12,  // Tilt horizontal
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={inViewRef}
      className="w-full py-8 md:py-20 md:min-h-screen flex flex-col justify-center border-b border-text-primary/5 last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Project Info Panel */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 items-center lg:items-start text-center lg:text-left">
          {/* Number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 0.15, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-8xl md:text-[120px] font-black tracking-tighter text-text-primary font-mono select-none"
          >
            {project.number}
          </motion.div>

          {/* Status Label (E.g. Live Product • Client Work) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="flex items-center space-x-2 mt-4 text-xs font-mono font-bold tracking-widest text-text-secondary uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>{project.status}</span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mt-3">
            <motion.h3
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-primary"
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Headline (masked text reveal) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-accent-cyan mt-3 uppercase font-mono leading-relaxed"
          >
            {project.headline}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-text-secondary mt-6 text-base leading-relaxed font-light"
          >
            {project.description}
          </motion.p>

          {/* Technologies/Capabilities used */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="glass px-3 py-1 rounded text-xs font-medium text-text-primary/70"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full"
          >
            <MagneticButton className="w-full sm:w-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-text-primary text-background font-bold tracking-widest text-xs px-6 py-3.5 rounded hover:bg-accent-blue hover:text-white transition-colors duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center min-h-[48px]"
              >
                <span>VISIT LIVE WEBSITE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton className="w-full sm:w-auto">
              <button
                onClick={() => onViewCaseStudy(project.id)}
                className="glass text-text-primary border border-text-primary/10 hover:border-text-primary font-bold tracking-widest text-xs px-6 py-3.5 rounded transition-colors duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center min-h-[48px]"
              >
                <span>VIEW CASE STUDY</span>
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Project Image Viewport (3D Tilt Container wrapped in Browser Frame) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="w-full bg-[#18181B] rounded-xl border border-text-primary/10 overflow-hidden shadow-2xl">
            {/* Browser Header Bar */}
            <div className="w-full h-10 px-4 flex items-center bg-[#09090B] border-b border-text-primary/10 select-none pointer-events-none">
              {/* Fake Window Dots */}
              <div className="flex space-x-1.5 mr-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60"></div>
              </div>
              {/* Fake URL Bar */}
              <div className="flex-1 max-w-[400px] h-6 bg-[#1F1F23] rounded-md text-[10px] text-text-secondary/50 font-mono flex items-center justify-center border border-text-primary/5">
                {project.liveUrl.replace('https://', '').replace('/', '')}
              </div>
            </div>

            {/* Tilt Frame capture container */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
              data-cursor="project"
              className="relative w-full aspect-[16/10] bg-background-secondary overflow-hidden cursor-pointer select-none"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* Sliding Image Reveal Mask */}
              <motion.div
                initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                animate={isInView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
                transition={{ delay: 0.1, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                {!imageError ? (
                  /* Image with zoom-on-hover transition */
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-accent-blue/15 via-accent-purple/15 to-accent-cyan/15 flex flex-col items-center justify-center border border-text-primary/5 relative overflow-hidden">
                    <motion.span 
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="text-sm font-mono tracking-widest text-text-secondary opacity-60 uppercase z-10"
                    >
                      {project.title}
                    </motion.span>
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="absolute w-28 h-28 rounded-full bg-accent-blue/20 blur-xl"
                    ></motion.div>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                      className="absolute w-[180px] h-[180px] rounded-full border border-text-primary/5 border-dashed"
                    ></motion.div>
                  </div>
                )}
                
                {/* Overlay shadow highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
