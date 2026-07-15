import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { MagneticButton } from '../components/MagneticButton';

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const formRef = useRef<HTMLDivElement>(null);

  const handleStartProjectClick = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" className="w-full py-20 relative select-none">
      
      {/* Cinematic CTA Segment */}
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center min-h-[70vh] border-b border-text-primary/5 pb-20 relative"
      >
        {/* Soft background light */}
        <div className="absolute w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 0.6, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-mono text-accent-cyan font-bold tracking-widest uppercase mb-4"
        >
          HAVE AN IDEA?
        </motion.div>

        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-text-primary leading-tight max-w-4xl">
          LET'S BUILD<br />SOMETHING<br />
          <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            PEOPLE REMEMBER.
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-text-secondary text-base md:text-lg max-w-md mt-6 leading-relaxed font-light"
        >
          Have a startup idea, AI product, or web application in mind? Let's turn it into a working digital product.
        </motion.p>

        <div className="flex flex-col items-center mt-10 space-y-4">
          <MagneticButton strength={0.25}>
            <button
              onClick={handleStartProjectClick}
              className="bg-text-primary text-background font-extrabold tracking-widest text-xs px-10 py-5 rounded-full hover:bg-accent-blue hover:text-text-primary transition-all duration-500 shadow-xl shadow-text-primary/5 flex items-center space-x-2"
            >
              <span>START A PROJECT</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </MagneticButton>

          <a
            href="mailto:meshr.gagan@gmail.com"
            className="text-xs font-semibold tracking-wider text-text-secondary hover:text-text-primary border-b border-text-primary/10 hover:border-text-primary pb-0.5 transition-colors duration-300"
          >
            OR EMAIL ME DIRECTLY
          </a>
        </div>
      </div>

      {/* Inquiry Form Segment */}
      <div ref={formRef} className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-2 select-none">
            TELL ME ABOUT YOUR PROJECT.
          </h2>
        </div>

        <ContactForm />
      </div>

    </section>
  );
};

export default Contact;
