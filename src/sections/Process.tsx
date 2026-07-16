import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { SectionTitle } from '../components/SectionTitle';
import { Process3D } from '../three/Process3D';
import { useIsMobile } from '../hooks/useMediaQuery';
import { motion } from 'framer-motion';

interface StepProps {
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  onVisible: () => void;
}

const StepCard = ({ number, title, description, isActive, onVisible }: StepProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: false,
    margin: '-35% 0px -35% 0px', // Triggers when in the center of the viewport
  });

  useEffect(() => {
    if (isInView) {
      onVisible();
    }
  }, [isInView, onVisible]);

  return (
    <div
      ref={cardRef}
      className={`min-h-[200px] py-8 border-l border-text-primary/5 pl-6 md:pl-10 transition-all duration-500 relative select-none ${
        isActive ? 'border-accent-blue' : 'opacity-30'
      }`}
    >
      {/* Indicator Dot */}
      <div className={`absolute top-8 left-0 -translate-x-[4px] w-2 h-2 rounded-full transition-colors duration-300 ${
        isActive ? 'bg-accent-blue glow-blue' : 'bg-text-primary/10'
      }`} />

      <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan">
        {number}
      </span>
      <h3 className={`text-xl md:text-2xl font-extrabold tracking-tight mt-1 transition-colors ${
        isActive ? 'text-text-primary' : 'text-text-primary/60'
      }`}>
        {title}
      </h3>
      <p className="text-text-secondary text-sm md:text-base font-light leading-relaxed mt-3 max-w-sm">
        {description}
      </p>
    </div>
  );
};

export const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useIsMobile();

  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      description: 'We discuss your idea, business problem, and product goals to align on a roadmap.',
    },
    {
      number: '02',
      title: 'PLAN',
      description: 'I design the technical architecture, data model, and development sprints.',
    },
    {
      number: '03',
      title: 'BUILD',
      description: 'The product is developed using modern frontend frameworks, backend APIs, and vector indexing.',
    },
    {
      number: '04',
      title: 'TEST',
      description: 'The systems are tested extensively for query speeds, prompt security, and reliability under load.',
    },
    {
      number: '05',
      title: 'LAUNCH',
      description: 'The final product is deployed to scalable servers, ready to drive startup business value.',
    },
  ];

  return (
    <section id="process" className="w-full py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Title */}
      <SectionTitle
        label="06 / PROCESS"
        title="HOW WE TURN YOUR IDEA INTO REALITY."
      />

      {/* Desktop/Tablet: Split 3D Sticky scroll. Mobile: Static Vertical Cards */}
      {!isMobile ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-12 md:mt-16">
          {/* Left Side: Sticky 3D Process Object */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-[300px] md:h-[450px] flex items-center justify-center bg-[#0A0A0A]/40 rounded-3xl border border-text-primary/5 overflow-hidden">
            <Process3D activeStep={activeStep} />
          </div>

          {/* Right Side: Scroll Steps */}
          <div className="lg:col-span-7 flex flex-col pl-4 lg:pl-12">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                isActive={activeStep === index}
                onVisible={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass p-6 rounded-2xl border border-text-primary/5 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-accent-blue font-bold tracking-widest">
                  {step.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight text-text-primary uppercase">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm font-light leading-relaxed mt-2">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Process;
