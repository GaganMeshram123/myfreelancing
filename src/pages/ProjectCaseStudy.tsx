import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import ParticleField from '../three/ParticleField';
import Footer from '../components/Footer';
import MagneticButton from '../components/MagneticButton';

interface ProjectCaseStudyProps {
  projectId: string;
  onBackToHome: () => void;
  onNavigateToCaseStudy: (id: string) => void;
}

export const ProjectCaseStudy = ({
  projectId,
  onBackToHome,
  onNavigateToCaseStudy,
}: ProjectCaseStudyProps) => {
  const project = projects.find((p) => p.id === projectId);
  const [imageError, setImageError] = useState(false);

  // Scroll to top on mount or project slug changes, and set page title
  useEffect(() => {
    window.scrollTo(0, 0);
    
    let titleStr = "Gagan Meshram | Software Developer & AI Engineer";
    if (projectId === "kashi-bite") titleStr = "Kashi Bite Case Study | Gagan Meshram";
    else if (projectId === "gud-roots") titleStr = "Gud Roots Case Study | Gagan Meshram";
    else if (projectId === "collegespace") titleStr = "CollegeSpace Case Study | Gagan Meshram";
    
    document.title = titleStr;

    return () => {
      document.title = "Gagan Meshram | Software Developer & AI Engineer";
    };
  }, [projectId]);

  // Premium Project Not Found State
  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F9F9FB] flex flex-col items-center justify-center px-6 select-none font-mono">
        <h2 className="text-3xl font-black text-accent-cyan tracking-widest uppercase animate-pulse">
          PROJECT NOT FOUND
        </h2>
        <p className="text-text-secondary text-xs mt-3 uppercase tracking-widest text-center">
          The requested case study slug does not exist or has been curated.
        </p>
        <button
          onClick={onBackToHome}
          className="mt-8 border border-text-primary/25 hover:border-text-primary px-6 py-3 rounded-full text-xs font-bold tracking-widest text-text-primary transition-all duration-300"
        >
          RETURN TO HOMEPAGE
        </button>
      </div>
    );
  }

  // Find next and previous projects to build cyclic navigation loop
  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <div className="relative min-h-screen bg-transparent text-text-primary selection:bg-accent-purple/35 select-none">
      
      {/* 3D Background */}
      <ParticleField />

      {/* Interactive custom cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar isCaseStudyPage={true} />

      {/* Main Container */}
      <main className="relative z-10 pt-28 pb-16">
        
        {/* Case Study Header Row */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-16">
          
          {/* Back button */}
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-text-secondary hover:text-text-primary text-xs font-bold tracking-widest uppercase transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          {/* Grid title & summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-text-primary/5 pb-12">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-black tracking-tight text-text-primary leading-none uppercase">
                {project.title}
              </h1>
              <p className="text-sm font-mono tracking-widest text-text-secondary uppercase">
                {project.status}
              </p>
              <h2 className="text-lg md:text-xl font-light text-text-secondary mt-4 leading-relaxed font-mono">
                {project.headline}
              </h2>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <MagneticButton strength={0.2}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass border border-text-primary/10 text-text-primary font-bold tracking-widest text-xs px-6 py-3.5 rounded hover:border-text-primary transition-colors flex items-center space-x-2"
                >
                  <span>VISIT LIVE WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Cinematic Cover Image */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 my-12 md:my-16">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden border border-text-primary/5 shadow-2xl">
            {!imageError ? (
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover animate-pulse-slow"
                style={{ animationDuration: '6s' }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-accent-blue/15 via-accent-purple/15 to-accent-cyan/15 flex flex-col items-center justify-center border border-text-primary/5 relative">
                <span className="text-xl font-mono tracking-widest text-text-secondary opacity-60 uppercase">{project.title}</span>
                <div className="absolute w-36 h-36 rounded-full bg-accent-blue/10 blur-2xl animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

        {/* Content body layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Metadata */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <div className="glass-premium p-6 rounded-xl border border-text-primary/5 space-y-6">
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-accent-blue uppercase mb-2">
                  Role
                </h3>
                <p className="text-sm font-medium text-text-primary">
                  {project.id === 'collegespace' ? 'Full Stack Developer' : 'Lead Software Developer & Performance Engineer'}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-widest text-accent-blue uppercase mb-2">
                  Timeline
                </h3>
                <p className="text-sm font-medium text-text-primary">
                  Production Sprint Releases
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-widest text-accent-blue uppercase mb-2">
                  Capabilities
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t) => (
                    <span key={t} className="bg-text-primary/5 px-2.5 py-1 rounded text-xs font-mono text-text-primary/80 border border-text-primary/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case study details */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section 1: Overview */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-widest text-accent-cyan uppercase">
                OVERVIEW
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light">
                {project.caseStudy.overview}
              </p>
            </div>

            {/* Section 2: Problem & Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-text-primary/5 pt-10">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-widest text-accent-blue uppercase">
                  THE PROBLEM
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {project.caseStudy.problem}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-widest text-accent-purple uppercase">
                  THE CHALLENGE
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                  {project.caseStudy.challenge}
                </p>
              </div>
            </div>

            {/* Section 3: My Approach */}
            <div className="space-y-4 border-t border-text-primary/5 pt-10">
              <h2 className="text-xl font-bold tracking-widest text-accent-blue uppercase">
                MY APPROACH
              </h2>
              <p className="text-text-secondary text-base leading-relaxed font-light">
                {project.caseStudy.approach}
              </p>
            </div>

            {/* Section 4: Optional System Architecture Diagram */}
            {project.caseStudy.architectureSteps && project.caseStudy.architectureDesc && (
              <div className="space-y-6 border-t border-text-primary/5 pt-10">
                <h2 className="text-xl font-bold tracking-widest text-accent-cyan uppercase">
                  SYSTEM ARCHITECTURE
                </h2>
                <p className="text-text-secondary text-sm font-light leading-relaxed">
                  {project.caseStudy.architectureDesc}
                </p>

                {/* Animated Interactive Flow Diagram */}
                <div className="glass-premium p-6 rounded-xl border border-text-primary/5 space-y-6 relative overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {project.caseStudy.architectureSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass p-4 rounded-lg border border-text-primary/5 flex items-start space-x-4 hover:border-accent-purple/20 transition-all"
                      >
                        <span className="text-xs font-mono font-bold bg-accent-blue/10 text-accent-cyan px-2 py-0.5 rounded">
                          0{idx + 1}
                        </span>
                        <p className="text-xs text-text-secondary leading-relaxed font-light">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Payment Integration Flow Section */}
            {project.caseStudy.paymentWorkflow && (
              <div className="space-y-6 border-t border-text-primary/5 pt-10">
                <h2 className="text-xl font-bold tracking-widest text-accent-cyan uppercase">
                  BUILDING THE PAYMENT EXPERIENCE
                </h2>
                <p className="text-text-secondary text-sm font-light leading-relaxed">
                  Integrating Razorpay or payment-related services requires a secure, failure-tolerant commerce workflow:
                </p>
                <div className="glass-premium p-6 rounded-xl border border-text-primary/5 flex flex-col items-center justify-center space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 w-full text-center">
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-text-primary border border-text-primary/10">CUSTOMER</div>
                    <div className="text-accent-blue font-bold">➔</div>
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-text-primary border border-text-primary/10">CHECKOUT</div>
                    <div className="text-accent-blue font-bold">➔</div>
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-accent-cyan border border-accent-cyan/20">PAYMENT INITIATION</div>
                  </div>
                  <div className="text-accent-purple font-bold">▼</div>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 w-full text-center">
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-accent-blue border border-accent-blue/20">RAZORPAY WORKFLOW</div>
                    <div className="text-accent-purple font-bold">➔</div>
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-text-primary border border-text-primary/10">PAYMENT RESULT</div>
                    <div className="text-accent-purple font-bold">➔</div>
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-green-400 border border-green-500/20">SUCCESS / FAILURE</div>
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Performance optimization section */}
            {project.caseStudy.performanceStat && (
              <div className="space-y-6 border-t border-text-primary/5 pt-10">
                <h2 className="text-xl font-bold tracking-widest text-accent-purple uppercase">
                  PERFORMANCE IS PART OF THE PRODUCT EXPERIENCE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 flex flex-col items-center justify-center bg-text-primary/5 border border-text-primary/5 rounded-xl p-6 text-center select-none">
                    <span className="text-6xl font-black tracking-tight text-accent-blue font-mono">
                      {project.caseStudy.performanceStat}
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-text-secondary mt-2">
                      LOAD TIME IMPROVEMENT
                    </span>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
                      Performance work focused on assets optimization, cold-chain metadata management, database query indexing, and client-side bundle splitting. This directly improved the application's loading experience by 35%, ensuring high user retention.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CollegeSpace Architecture flow */}
            {project.id === 'collegespace' && (
              <div className="space-y-6 border-t border-text-primary/5 pt-10">
                <h2 className="text-xl font-bold tracking-widest text-accent-cyan uppercase">
                  FULL STACK ARCHITECTURE
                </h2>
                <div className="glass-premium p-6 rounded-xl border border-text-primary/5 flex flex-col items-center justify-center space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 w-full text-center">
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-text-primary border border-text-primary/10">REACT.JS FRONTEND</div>
                    <div className="text-accent-blue font-bold">➔</div>
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-accent-cyan border border-accent-cyan/20">REST API</div>
                    <div className="text-accent-blue font-bold">➔</div>
                    <div className="glass px-4 py-2 rounded font-mono text-xs text-text-primary border border-text-primary/10">NODE.JS / EXPRESS.JS BACKEND</div>
                  </div>
                  <div className="text-accent-purple font-bold">▼</div>
                  <div className="glass px-6 py-2 rounded font-mono text-xs text-accent-purple border border-accent-purple/20">DATA LAYER</div>
                </div>
              </div>
            )}

            {/* Section 5: Solution */}
            <div className="space-y-6 border-t border-text-primary/5 pt-10">
              <h2 className="text-xl font-bold tracking-widest text-accent-purple uppercase">
                THE SOLUTION
              </h2>
              <p className="text-text-secondary text-base leading-relaxed font-light">
                {project.caseStudy.solution}
              </p>

              {project.caseStudy.keyFeatures && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {project.caseStudy.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-3 text-sm font-light text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-2 shrink-0"></span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 6: Results & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-text-primary/5 pt-10">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-widest text-accent-cyan uppercase">
                  RESULTS
                </h3>
                <div className="space-y-2">
                  {project.caseStudy.results.map((res, i) => (
                    <p key={i} className="text-xs text-text-primary/90 leading-relaxed font-semibold">
                      🚀 {res}
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-widest text-accent-blue uppercase">
                  WHAT I LEARNED
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed font-light">
                  {project.caseStudy.whatILearned}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 7: Next & Previous Cyclic Navigation */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-24 pt-16 border-t border-text-primary/5 flex flex-col md:flex-row items-center justify-between gap-8 select-none">
          <button
            onClick={() => onNavigateToCaseStudy(prevProject.id)}
            className="flex flex-col items-center md:items-start group hover:text-accent-purple transition-colors text-center md:text-left"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-text-secondary uppercase">
              ← PREVIOUS PROJECT
            </span>
            <span className="text-lg font-black text-text-primary group-hover:text-accent-purple mt-2 uppercase">
              {prevProject.title}
            </span>
          </button>

          <div className="text-center">
            <span className="text-xs font-mono font-bold tracking-widest text-text-secondary uppercase block mb-3">
              NEXT CASE STUDY
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-text-primary uppercase hover:text-accent-blue transition-colors duration-300">
              {nextProject.title}
            </h2>
            <div className="mt-6">
              <MagneticButton strength={0.25}>
                <button
                  onClick={() => onNavigateToCaseStudy(nextProject.id)}
                  className="bg-text-primary text-background font-extrabold tracking-widest text-xs px-8 py-4 rounded hover:bg-accent-blue hover:text-white transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <span>CONTINUE READING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Massive Final CTA */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-12 border-t border-text-primary/5 text-center">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-4xl md:text-7xl font-black text-text-primary hover:text-accent-cyan tracking-tighter uppercase transition-colors duration-300 hover:scale-102"
          >
            EXPLORE {project.title} ↗
          </a>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;
