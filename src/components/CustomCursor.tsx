import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice } from '../hooks/useMediaQuery';

export const CustomCursor = () => {
  const isTouchDevice = useIsTouchDevice();
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project' | 'explore' | 'open'>('default');
  const [visible, setVisible] = useState(false);

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for follower ring
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const exploreEl = target.closest('[data-cursor="explore"]') || (target.closest('button') && target.textContent?.includes('CASE STUDY'));
      const openEl = target.closest('[data-cursor="open"]') || (target.closest('a') && target.getAttribute('target') === '_blank');
      const isLink = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');

      if (projectEl) {
        setCursorType('project');
      } else if (exploreEl) {
        setCursorType('explore');
      } else if (openEl) {
        setCursorType('open');
      } else if (isLink) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Reset back to default if leaving interactive elements
      setCursorType('default');
    };

    const handleMouseLeaveWindow = () => {
      setVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Hide default cursor globally
    document.body.classList.add('cursor-hover-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.body.classList.remove('cursor-hover-active');
    };
  }, [isTouchDevice, visible, cursorX, cursorY]);

  if (isTouchDevice || !visible) return null;

  // Determine size, color, background, and border based on active type
  const isLarge = cursorType === 'project' || cursorType === 'explore' || cursorType === 'open';
  const width = isLarge ? 90 : cursorType === 'hover' ? 45 : 24;
  const height = isLarge ? 90 : cursorType === 'hover' ? 45 : 24;

  const getBackgroundColor = () => {
    switch (cursorType) {
      case 'project': return 'rgba(6, 182, 212, 0.12)';
      case 'explore': return 'rgba(139, 92, 246, 0.12)';
      case 'open': return 'rgba(16, 185, 129, 0.12)';
      case 'hover': return 'rgba(59, 130, 246, 0.05)';
      default: return 'rgba(255, 255, 255, 0)';
    }
  };

  const getBorderColor = () => {
    switch (cursorType) {
      case 'project': return '#06B6D4';
      case 'explore': return '#8B5CF6';
      case 'open': return '#10B981';
      case 'hover': return '#3B82F6';
      default: return '#8B5CF6';
    }
  };

  const getTextColor = () => {
    switch (cursorType) {
      case 'project': return '#06B6D4';
      case 'explore': return '#8B5CF6';
      case 'open': return '#10B981';
      default: return 'transparent';
    }
  };

  return (
    <>
      {/* Small center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-blue rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Larger circular follower */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] flex items-center justify-center overflow-hidden"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width,
          height,
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
      >
        {cursorType === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-widest text-center uppercase whitespace-nowrap font-mono"
            style={{ color: getTextColor() }}
          >
            VIEW<br />LIVE
          </motion.span>
        )}

        {cursorType === 'explore' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-widest text-center uppercase whitespace-nowrap font-mono"
            style={{ color: getTextColor() }}
          >
            EXPLORE
          </motion.span>
        )}

        {cursorType === 'open' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-widest text-center uppercase whitespace-nowrap font-mono"
            style={{ color: getTextColor() }}
          >
            OPEN ↗
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
