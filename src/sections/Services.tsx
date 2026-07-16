import { services } from '../data/services';
import { ServiceRow } from '../components/ServiceRow';
import { SectionTitle } from '../components/SectionTitle';
import { useIsMobile } from '../hooks/useMediaQuery';
import { motion } from 'framer-motion';

export const Services = () => {
  const isMobile = useIsMobile();

  return (
    <section id="services" className="w-full py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Title */}
      <SectionTitle
        label="02 / WHAT I DO"
        title="FROM IDEA TO WORKING PRODUCT."
      />

      {/* Service List Accordion (Desktop) or Glass Cards (Mobile) */}
      {!isMobile ? (
        <div className="flex flex-col border-t border-text-primary/10 mt-12 md:mt-16">
          {services.map((service) => (
            <ServiceRow key={service.number} service={service} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass p-6 rounded-2xl border border-text-primary/5 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-accent-blue font-bold tracking-widest">
                  {service.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple"></span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight text-text-primary uppercase">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm font-light leading-relaxed mt-2">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-text-primary/5">
                {service.capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="bg-accent-blue/10 border border-accent-blue/20 text-accent-cyan px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Services;
