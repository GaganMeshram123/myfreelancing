import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { SectionTitle } from '../components/SectionTitle';

interface SelectedWorkProps {
  onViewCaseStudy: (id: string) => void;
}

export const SelectedWork = ({ onViewCaseStudy }: SelectedWorkProps) => {
  return (
    <section id="work" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Title */}
      <SectionTitle
        label="01 / SELECTED WORK"
        title="PRODUCTS I'VE BUILT FOR THE REAL WORLD."
      />

      {/* Curated selection description */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-text-secondary text-base md:text-lg max-w-2xl font-light -mt-8 mb-16 md:-mt-12 md:mb-20 leading-relaxed"
      >
        A selection of production websites and digital products I've built for businesses and real-world users.
      </motion.p>

      {/* Showcases */}
      <div className="flex flex-col">
        {projects.map((project) => (
          <ProjectShowcase
            key={project.id}
            project={project}
            onViewCaseStudy={onViewCaseStudy}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
