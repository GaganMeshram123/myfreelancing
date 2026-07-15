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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <button onClick={onBackToHome} className="mt-4 text-accent-blue">Back to Home</button>
      </div>
    );
  }

  // Find next project
  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="relative min-h-screen bg-transparent text-text-primary selection:bg-accent-purple/35 select-none">
      
      {/* 3D background */}
      <ParticleField />

      {/* Interactive cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar isCaseStudyPage={true} />

      {/* Main Case Study Layout */}
      <main className="relative z-10 pt-32 pb-20">
        
        {/* Header container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back button */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          {/* Project Title and Category */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-text-primary/5 pb-12">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono text-accent-cyan tracking-wider font-bold">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-text-primary mt-3">
                {project.title}
              </h1>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end gap-4">
              {project.githubUrl && (
                <MagneticButton strength={0.2}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass border border-text-primary/10 text-text-primary font-bold tracking-widest text-xs px-6 py-3.5 rounded hover:border-text-primary transition-colors flex items-center space-x-2"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span>GITHUB</span>
                  </a>
                </MagneticButton>
              )}
              {project.liveUrl && (
                <MagneticButton strength={0.2}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black font-bold tracking-widest text-xs px-6 py-3.5 rounded hover:bg-accent-blue hover:text-text-primary transition-colors flex items-center space-x-2"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-4.5 h-4.5" />
                  </a>
                </MagneticButton>
              )}
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
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-accent-blue/15 via-accent-purple/15 to-accent-cyan/15 flex flex-col items-center justify-center border border-text-primary/5 relative">
                <span className="text-xl font-mono tracking-widest text-text-secondary opacity-60 uppercase">{project.title}</span>
                <div className="absolute w-36 h-36 rounded-full bg-accent-blue/10 blur-2xl"></div>
              </div>
            )}
          </div>
        </div>

        {/* Content body layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Metadata */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            {/* Tech stack metadata box */}
            <div className="glass-premium p-6 rounded-xl border border-text-primary/5 space-y-6">
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-accent-blue uppercase mb-2">
                  Role
                </h3>
                <p className="text-sm font-medium text-text-primary">
                  Lead Software Developer / AI Engineer
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-widest text-accent-blue uppercase mb-2">
                  Timeline
                </h3>
                <p className="text-sm font-medium text-text-primary">
                  2-3 Months Sprints
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-widest text-accent-blue uppercase mb-2">
                  Stack
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
                <h3 className="text-sm font-semibold tracking-widest text-red-400 uppercase">
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

            {/* Section 4: System Architecture Diagram */}
            <div className="space-y-6 border-t border-text-primary/5 pt-10">
              <h2 className="text-xl font-bold tracking-widest text-accent-cyan uppercase">
                SYSTEM ARCHITECTURE
              </h2>
              <p className="text-text-secondary text-sm font-light leading-relaxed">
                {project.caseStudy.architectureDesc}
              </p>

              {/* Animated Interactive Flow Diagram */}
              <div className="glass-premium p-6 rounded-xl border border-text-primary/5 space-y-6 relative overflow-hidden">
                
                {/* SVG Flow Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <motion.path
                    d="M 50 80 Q 250 80 250 150 T 450 250 T 650 150"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.15)"
                    strokeWidth="3"
                  />
                  <motion.path
                    d="M 50 80 Q 250 80 250 150 T 450 250 T 650 150"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    strokeDasharray="10 30"
                    animate={{ strokeDashoffset: -200 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  />
                </svg>

                {/* Nodes rendering */}
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

            {/* Section 5: Solution & Key Features */}
            <div className="space-y-6 border-t border-text-primary/5 pt-10">
              <h2 className="text-xl font-bold tracking-widest text-accent-purple uppercase">
                THE SOLUTION & KEY FEATURES
              </h2>
              <p className="text-text-secondary text-base leading-relaxed font-light">
                {project.caseStudy.solution}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {project.caseStudy.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm font-light text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-2 shrink-0"></span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
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

        {/* Section 7: Next Project Navigation */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 border-t border-text-primary/5 mt-20 pt-16 text-center select-none">
          <span className="text-xs font-mono font-bold tracking-widest text-text-secondary">
            NEXT CASE STUDY
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-4 select-none uppercase hover:text-accent-blue transition-colors duration-300">
            {nextProject.title}
          </h2>

          <div className="mt-8">
            <MagneticButton strength={0.25}>
              <button
                onClick={() => onNavigateToCaseStudy(nextProject.id)}
                className="bg-white text-black font-extrabold tracking-widest text-xs px-8 py-4 rounded hover:bg-accent-blue hover:text-text-primary transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <span>CONTINUE READING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;
