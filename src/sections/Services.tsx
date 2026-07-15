import { services } from '../data/services';
import { ServiceRow } from '../components/ServiceRow';
import { SectionTitle } from '../components/SectionTitle';

export const Services = () => {
  return (
    <section id="services" className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Title */}
      <SectionTitle
        label="02 / WHAT I DO"
        title="FROM IDEA TO WORKING PRODUCT."
      />

      {/* Service List Accordion */}
      <div className="flex flex-col border-t border-text-primary/10 mt-12 md:mt-16">
        {services.map((service) => (
          <ServiceRow key={service.number} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
