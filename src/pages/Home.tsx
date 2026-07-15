import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import ParticleField from '../three/ParticleField';
import Hero from '../sections/Hero';
import SelectedWork from '../sections/SelectedWork';
import Services from '../sections/Services';
import Technology from '../sections/Technology';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Process from '../sections/Process';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

interface HomeProps {
  onViewCaseStudy: (id: string) => void;
}

export const Home = ({ onViewCaseStudy }: HomeProps) => {
  // Handle hash route scrolling on load (e.g. from case study page back to home)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white selection:bg-accent-purple/35 select-none">
      {/* 3D Global Particles Background */}
      <ParticleField />

      {/* Global Interactive cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* Core Scrolling Viewports */}
      <main className="relative z-10">
        <Hero
          onScrollToWork={() => scrollToSection('work')}
          onScrollToContact={() => scrollToSection('contact')}
        />
        <SelectedWork onViewCaseStudy={onViewCaseStudy} />
        <Services />
        <Technology />
        <About onScrollToContact={() => scrollToSection('contact')} />
        <Experience />
        <Process />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
