import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice } from '../hooks/useMediaQuery';

export const CustomCursor = () => {
  const isTouchDevice = useIsTouchDevice();
  const [hovered, setHovered] = useState(false);
  const [projectHovered, setProjectHovered] = useState(false);
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

      // Check if hovering over links, buttons, or custom interactive items
      const isLink = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      if (isLink) {
        setHovered(true);
      }

      // Check if hovering over project showcase container
      const isProject = target.closest('[data-cursor="project"]');
      if (isProject) {
        setProjectHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isLink = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      if (isLink) {
        setHovered(false);
      }

      const isProject = target.closest('[data-cursor="project"]');
      if (isProject) {
        setProjectHovered(false);
      }
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
        className="fixed top-0 left-0 rounded-full border border-accent-purple/60 pointer-events-none z-[9998] flex items-center justify-center overflow-hidden"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: projectHovered ? 90 : hovered ? 45 : 24,
          height: projectHovered ? 90 : hovered ? 45 : 24,
          backgroundColor: projectHovered
            ? 'rgba(139, 92, 246, 0.15)'
            : hovered
            ? 'rgba(59, 130, 246, 0.05)'
            : 'rgba(255, 255, 255, 0)',
          borderColor: projectHovered
            ? '#06B6D4'
            : hovered
            ? '#3B82F6'
            : '#8B5CF6',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
      >
        {projectHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-widest text-[#06B6D4] text-center uppercase whitespace-nowrap"
          >
            VIEW<br />PROJECT
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
