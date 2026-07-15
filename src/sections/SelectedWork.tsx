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
        title="WORK THAT SPEAKS FOR ITSELF."
      />

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
