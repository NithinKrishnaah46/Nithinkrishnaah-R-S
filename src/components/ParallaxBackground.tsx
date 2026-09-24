import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();

  // Smooth out scroll tracking for responsive, fluid 60fps parallax motion
  const smoothY = useSpring(scrollY, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001
  });

  // Layer 1: Slow-moving deep nebula orbs (drift at ~12% scroll velocity)
  const orb1Y = useTransform(smoothY, [0, 4000], [0, 500]);
  const orb2Y = useTransform(smoothY, [0, 4000], [0, -380]);
  const orb3Y = useTransform(smoothY, [0, 4000], [0, 650]);

  // Layer 2: Medium-drift architectural geometric glyphs (~25% scroll velocity)
  const glyph1Y = useTransform(smoothY, [0, 4000], [0, 1000]);
  const glyph1Rotate = useTransform(smoothY, [0, 4000], [0, 180]);
  const glyph2Y = useTransform(smoothY, [0, 4000], [0, -750]);
  const glyph2Rotate = useTransform(smoothY, [0, 4000], [0, -220]);
  const glyph3Y = useTransform(smoothY, [0, 4000], [0, 1200]);

  // Layer 3: Faint dotted matrix parallax shift (~8% scroll velocity)
  const gridY = useTransform(smoothY, [0, 4000], [0, 320]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Parallax Shifted Technical Dot Matrix Grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-x-0 -top-32 -bottom-32 opacity-[0.025] dark:opacity-[0.05]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, currentColor 1.25px, transparent 1.25px)',
            backgroundSize: '40px 40px'
          }}
        />
      </motion.div>

      {/* Parallax Atmospheric Radial Glow Orbs */}
      {/* Orb 1: Upper-Right Indigo Glow */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-20 -right-24 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-[120px] dark:from-indigo-600/15 dark:via-purple-600/10"
      />

      {/* Orb 2: Mid-Left Emerald / Cyan Aurora */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[42%] -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-sky-400/10 via-teal-400/10 to-transparent blur-[130px] dark:from-sky-500/12 dark:via-emerald-500/10"
      />

      {/* Orb 3: Lower-Right Amber / Rose Glow */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[70%] -right-28 h-[580px] w-[580px] rounded-full bg-gradient-to-bl from-amber-400/8 via-indigo-500/10 to-transparent blur-[140px] dark:from-amber-500/10 dark:via-indigo-600/12"
      />

      {/* Parallax Layer 2: Subtle Floating Tech Rings & Geometrics */}
      {/* Ring Glyph 1 */}
      <motion.div
        style={{ y: glyph1Y, rotate: glyph1Rotate }}
        className="absolute top-[22%] left-[8%] h-36 w-36 rounded-full border border-indigo-400/15 dark:border-indigo-400/20 border-dashed"
      />

      {/* Ring Glyph 2 */}
      <motion.div
        style={{ y: glyph2Y, rotate: glyph2Rotate }}
        className="absolute top-[58%] right-[10%] h-48 w-48 rounded-full border border-sky-400/15 dark:border-sky-400/20"
      >
        <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/10 dark:border-indigo-400/15" />
      </motion.div>

      {/* Square Bracket Glyph 3 */}
      <motion.div
        style={{ y: glyph3Y }}
        className="absolute top-[82%] left-[12%] h-24 w-24 border-l-2 border-t-2 border-indigo-400/15 dark:border-indigo-400/20"
      />
    </div>
  );
};
