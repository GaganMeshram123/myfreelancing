import { ArrowUp, Mail } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const Footer = () => {
  const socialLinks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      url: 'https://github.com/GaganMeshram123',
      label: 'GitHub'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      url: 'https://www.linkedin.com/in/gagan-meshram-7a2102246/',
      label: 'LinkedIn'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
      url: 'https://www.youtube.com/@GAGANMESHRAM8255',
      label: 'YouTube'
    },
    { icon: <Mail className="w-5 h-5" />, url: 'mailto:meshram.gagan.510@gmail.com', label: 'Email' },
  ];

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full bg-background-secondary border-t border-text-primary/5 pt-16 pb-8 px-6 md:px-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Large Brand Text */}
        <h2 className="text-4xl md:text-8xl lg:text-[140px] font-black tracking-tighter text-text-primary/5 text-center uppercase pointer-events-none select-none">
          GAGAN MESHRAM
        </h2>

        {/* Info Rows */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-12 pb-12 border-b border-text-primary/5">
          {/* Titles */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold tracking-widest text-text-primary uppercase">
              SOFTWARE DEVELOPER
            </h3>
            <p className="text-xs text-text-secondary mt-1 tracking-wider">
              AI ENGINEER / FREELANCER
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-12 h-12 rounded-full border border-text-primary/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors duration-300 min-w-[48px] min-h-[48px]"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <div className="flex justify-center md:justify-end">
            <MagneticButton strength={0.25}>
              <button
                onClick={handleBackToTop}
                className="w-12 h-12 rounded-full border border-text-primary/10 flex items-center justify-center text-text-primary hover:bg-text-primary hover:text-background hover:border-text-primary transition-colors duration-300 min-w-[48px] min-h-[48px]"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary mt-8 gap-4 font-light">
          <div>
            © {new Date().getFullYear()} GAGAN MESHRAM. ALL RIGHTS RESERVED.
          </div>
          <div className="tracking-widest uppercase text-[10px] font-semibold text-accent-cyan">
            BUILDING DIGITAL PRODUCTS FROM INDIA.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
