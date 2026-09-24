import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<'link' | 'card' | 'button' | 'default'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer fluid ring
  const ringX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.5 });

  // Tighter springs for inner dot
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 36, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 36, mass: 0.1 });

  useEffect(() => {
    // Only activate custom cursor on devices that support hover (not touch-only)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsPointerDevice(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen for hover on interactive elements via delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, [role="button"], .cursor-pointer, [data-cursor]'
      );

      if (interactive) {
        setIsHovered(true);
        if (interactive.tagName === 'A') {
          setHoverType('link');
        } else if (interactive.tagName === 'BUTTON') {
          setHoverType('button');
        } else {
          setHoverType('card');
        }
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Outer Floating Kinetic Ring */}
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovered ? (hoverType === 'card' ? 2.2 : 1.8) : 1,
          opacity: isVisible ? (isHovered ? 0.75 : 0.45) : 0,
          borderColor: isHovered
            ? 'rgba(99, 102, 241, 0.9)'
            : 'rgba(148, 163, 184, 0.5)'
        }}
        transition={{
          scale: { type: 'spring', stiffness: 350, damping: 22 },
          opacity: { duration: 0.15 }
        }}
        className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-indigo-500/60 dark:border-indigo-400/80 transition-colors ${
          isHovered
            ? 'h-10 w-10 bg-indigo-500/10 dark:bg-indigo-400/15 backdrop-blur-[1px]'
            : 'h-8 w-8 bg-transparent'
        }`}
      />

      {/* Inner Precision Dot */}
      <motion.div
        aria-hidden="true"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          scale: { type: 'spring', stiffness: 450, damping: 25 },
          opacity: { duration: 0.15 }
        }}
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-sm"
      />
    </>
  );
};
