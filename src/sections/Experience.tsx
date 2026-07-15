import { SectionTitle } from '../components/SectionTitle';
import { ExperienceTimeline } from '../components/ExperienceTimeline';

export const Experience = () => {
  return (
    <section id="experience" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Title */}
      <SectionTitle
        label="05 / EXPERIENCE"
        title="WHERE I HAVE WORKED."
      />

      {/* Vertical timeline */}
      <div className="mt-8">
        <ExperienceTimeline />
      </div>
    </section>
  );
};

export default Experience;
