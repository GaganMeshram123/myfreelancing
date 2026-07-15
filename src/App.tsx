import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Home } from './pages/Home';
import { ProjectCaseStudy } from './pages/ProjectCaseStudy';
import { Loader } from './components/Loader';
import { useSmoothScroll } from './hooks/useSmoothScroll';

interface PageRoute {
  page: 'home' | 'case-study';
  projectId?: string;
}

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState<PageRoute>({ page: 'home' });
  const overlayRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scrolling
  useSmoothScroll();

  // Route routing back-button support using hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#case-study/')) {
        const id = hash.replace('#case-study/', '');
        setRoute({ page: 'case-study', projectId: id });
      } else {
        setRoute({ page: 'home' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    const initialHash = window.location.hash;
    if (initialHash && initialHash.startsWith('#case-study/')) {
      const id = initialHash.replace('#case-study/', '');
      setRoute({ page: 'case-study', projectId: id });
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const triggerTransition = (targetRoute: PageRoute) => {
    if (!overlayRef.current) {
      setRoute(targetRoute);
      return;
    }

    const tl = gsap.timeline();

    // 1. Slide dark overlay up (cover screen)
    tl.to(overlayRef.current, {
      y: '0%',
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        // Change page state in callback
        setRoute(targetRoute);
        // Scroll to top instantly
        window.scrollTo(0, 0);

        // Update URL hash for sharing/back button
        if (targetRoute.page === 'case-study') {
          window.location.hash = `case-study/${targetRoute.projectId}`;
        } else {
          window.location.hash = '';
        }
      },
    });

    // 2. Animate next page transition reveal (slide overlay up and out)
    tl.to(overlayRef.current, {
      y: '-100%',
      duration: 0.6,
      ease: 'power3.inOut',
      delay: 0.25, // Premium hold duration
    });

    // 3. Reset overlay position silently for next navigation action
    tl.set(overlayRef.current, {
      y: '100%',
    });
  };

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Premium Loader screen */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Screen Overlay Page Transition */}
      <div
        ref={overlayRef}
        className="fixed inset-0 w-full h-screen bg-background-secondary z-[99998] transform translate-y-full flex flex-col items-center justify-center pointer-events-none select-none border-t border-accent-blue/10"
      >
        {/* Soft background glow */}
        <div className="absolute w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-text-primary uppercase relative z-10">
          GAGAN<span className="text-accent-blue">.</span>
        </h2>
      </div>

      {/* Page router view */}
      {!isLoading && (
        <>
          {route.page === 'home' ? (
            <Home
              onViewCaseStudy={(id) => triggerTransition({ page: 'case-study', projectId: id })}
            />
          ) : (
            <ProjectCaseStudy
              projectId={route.projectId || ''}
              onBackToHome={() => triggerTransition({ page: 'home' })}
              onNavigateToCaseStudy={(id) => triggerTransition({ page: 'case-study', projectId: id })}
            />
          )}
        </>
      )}
    </>
  );
};

export default App;
