import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ServiceData } from '../data/services';

interface ServiceRowProps {
  service: ServiceData;
}

export const ServiceRow = ({ service }: ServiceRowProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border-b border-text-primary/10 last:border-b-0 py-8 md:py-12 cursor-pointer transition-all duration-500 group"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Number & Title */}
        <div className="flex items-center space-x-6 md:space-x-12">
          {/* Number */}
          <span className="text-sm font-mono text-accent-blue font-bold tracking-widest block transition-transform duration-300 group-hover:-translate-y-1">
            {service.number}
          </span>
          
          {/* Title */}
          <h3 className="text-xl md:text-3xl font-extrabold tracking-tight text-text-primary group-hover:text-accent-purple transition-colors duration-300">
            {service.title}
          </h3>
        </div>

        {/* Description (Desktop: visible, Mobile: visible) */}
        <p className="text-text-secondary text-sm md:text-base max-w-md font-light leading-relaxed">
          {service.description}
        </p>

        {/* Interactive Arrow Icon */}
        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-text-primary/10 group-hover:border-text-primary group-hover:bg-text-primary group-hover:text-background transition-all duration-300">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Expandable Capabilities Row */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isHovered ? { height: 'auto', opacity: 1, marginTop: 24 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap gap-3 pt-2 md:pl-20">
          {service.capabilities.map((capability) => (
            <span
              key={capability}
              className="bg-accent-blue/10 border border-accent-blue/20 text-accent-cyan px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              {capability}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceRow;
