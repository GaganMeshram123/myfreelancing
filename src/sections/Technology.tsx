import { motion } from 'framer-motion';
import { technologies } from '../data/technologies';
import { SectionTitle } from '../components/SectionTitle';
import { TechUniverseScene } from '../three/TechUniverseScene';
import { useIsMobile } from '../hooks/useMediaQuery';

export const Technology = () => {
  const isMobile = useIsMobile();

  return (
    <section id="technology" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Title */}
      <SectionTitle
        label="03 / TECHNOLOGY"
        title="TOOLS I USE TO BUILD PRODUCTS."
      />

      {/* R3F Universe for desktop, Animated Grid for Mobile */}
      <div className="w-full mt-8 flex justify-center items-center">
        {!isMobile ? (
          // Desktop: 3D Universe
          <div className="w-full h-[550px] bg-[#0A0A0A]/40 rounded-3xl border border-text-primary/5 relative overflow-hidden shadow-2xl">
            <TechUniverseScene />
          </div>
        ) : (
          // Mobile: Optimized Grid
          <div className="grid grid-cols-2 gap-4 w-full">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="glass p-4 rounded-xl flex flex-col justify-between border border-text-primary/5 relative hover:border-accent-blue/30 active:border-accent-blue/30"
              >
                <div className="text-sm font-extrabold text-text-primary">
                  {tech.name.toUpperCase()}
                </div>
                <div className="text-[9px] font-mono font-bold tracking-wider text-accent-blue mt-2">
                  {tech.category}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Technology;
