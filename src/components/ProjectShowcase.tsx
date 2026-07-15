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
      className="w-full min-h-screen py-16 flex flex-col justify-center border-b border-text-primary/5 last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Project Info Panel */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          {/* Number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 0.15, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-8xl md:text-[120px] font-black tracking-tighter text-text-primary font-mono select-none"
          >
            {project.number}
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mt-2">
            <motion.h3
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-primary"
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs font-semibold tracking-widest text-accent-cyan mt-3 uppercase"
          >
            {project.category}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-text-secondary mt-6 text-base md:text-lg leading-relaxed font-light"
          >
            {project.description}
          </motion.p>

          {/* Technologies used */}
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
            className="flex flex-wrap gap-4 mt-8"
          >
            <MagneticButton>
              <button
                onClick={() => onViewCaseStudy(project.id)}
                className="bg-text-primary text-background font-bold tracking-widest text-xs px-6 py-3.5 rounded hover:bg-accent-blue hover:text-text-primary transition-colors duration-300 flex items-center space-x-2"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </MagneticButton>

            {project.githubUrl && (
              <MagneticButton>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass text-text-primary border border-text-primary/10 hover:border-text-primary font-bold tracking-widest text-xs px-6 py-3.5 rounded transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GITHUB</span>
                </a>
              </MagneticButton>
            )}
          </motion.div>
        </div>

        {/* Project Image Viewport (3D Tilt Container) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onViewCaseStudy(project.id)}
            data-cursor="project"
            className="relative w-full aspect-[16/10] bg-background-secondary rounded-xl overflow-hidden cursor-pointer shadow-2xl border border-text-primary/5 select-none"
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
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
