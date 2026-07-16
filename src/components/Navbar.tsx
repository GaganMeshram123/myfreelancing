import { useState, useEffect } from 'react';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  isCaseStudyPage?: boolean;
}

export const Navbar = ({ onNavigate, isCaseStudyPage = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'Work', target: 'work' },
    { label: 'Services', target: 'services' },
    { label: 'About', target: 'about' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    
    if (isCaseStudyPage) {
      // If we are on a case study page, navigate back to home with the hash
      window.location.href = `/#${target}`;
      return;
    }

    if (onNavigate) {
      onNavigate(target);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    if (isCaseStudyPage) {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-text-primary/5 py-4'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="text-2xl font-extrabold tracking-tighter text-text-primary cursor-pointer select-none"
          >
            GAGAN<span className="text-accent-blue">.</span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Controls (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="glass p-2.5 rounded-full hover:bg-text-primary hover:text-background transition-all duration-300 border border-text-primary/10 flex items-center justify-center text-text-primary"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="glass px-6 py-2.5 rounded-full text-xs font-semibold text-text-primary tracking-widest hover:bg-text-primary hover:text-background transition-all duration-300 flex items-center space-x-1 border border-text-primary/10 hover:border-text-primary"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="glass p-2 rounded-full border border-text-primary/10 flex items-center justify-center text-text-primary"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-primary p-3 focus:outline-none z-50 flex items-center justify-center min-w-[48px] min-h-[48px]"
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between items-end relative">
                <span className={`h-[2px] bg-text-primary transition-all duration-300 rounded-full ${mobileMenuOpen ? 'w-6 absolute top-2 rotate-45' : 'w-6'}`}></span>
                <span className={`h-[2px] bg-text-primary transition-all duration-300 rounded-full ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}`}></span>
                <span className={`h-[2px] bg-text-primary transition-all duration-300 rounded-full ${mobileMenuOpen ? 'w-6 absolute top-2 -rotate-45' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full h-screen bg-background z-40 flex flex-col justify-center px-8"
          >
            {/* Background cyber grid details in menu */}
            <div className="absolute inset-0 bg-radial-gradient from-accent-purple/5 to-transparent pointer-events-none"></div>

            <div className="flex flex-col space-y-6 max-w-md mx-auto w-full">
              {navItems.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  key={item.target}
                >
                  <button
                    onClick={() => handleLinkClick(item.target)}
                    className="text-4xl font-bold tracking-tight text-text-secondary hover:text-text-primary transition-colors text-left py-2 flex items-baseline space-x-4"
                  >
                    <span className="text-xs font-mono text-accent-blue">0{index + 1}</span>
                    <span>{item.label}</span>
                  </button>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.2 }}
                className="pt-8 border-t border-text-primary/5"
              >
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full text-center py-4 bg-text-primary text-background font-bold tracking-widest uppercase hover:bg-accent-blue hover:text-text-primary transition-colors duration-300 flex items-center justify-center space-x-2 rounded"
                >
                  <span>LET'S TALK</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
