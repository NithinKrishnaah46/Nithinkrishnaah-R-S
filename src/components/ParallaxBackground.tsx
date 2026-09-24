import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();

  // Slow, floating cosmic drift physics (antigravity weightless feel)
  const smoothY = useSpring(scrollY, {
    stiffness: 30,
    damping: 26,
    mass: 1.4,
    restDelta: 0.0005
  });

  // Layer 1: Slow-moving deep atmospheric nebulae (gentle weightless drift)
  const orb1Y = useTransform(smoothY, [0, 4000], [0, 280]);
  const orb2Y = useTransform(smoothY, [0, 4000], [0, -220]);
  const orb3Y = useTransform(smoothY, [0, 4000], [0, 360]);

  // Layer 2: Floating architectural geometric glyphs with gentle celestial rotation
  const glyph1Y = useTransform(smoothY, [0, 4000], [0, 520]);
  const glyph1Rotate = useTransform(smoothY, [0, 4000], [0, 100]);
  const glyph2Y = useTransform(smoothY, [0, 4000], [0, -380]);
  const glyph2Rotate = useTransform(smoothY, [0, 4000], [0, -110]);
  const glyph3Y = useTransform(smoothY, [0, 4000], [0, 620]);

  // Layer 3: Faint technical dot matrix parallax shift
  const gridY = useTransform(smoothY, [0, 4000], [0, 150]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Antigravity technical coordinate grid lines */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-x-0 -top-40 -bottom-40 opacity-[0.025] dark:opacity-[0.04]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </motion.div>

      {/* Atmospheric Weightless Nebulae (Gemini/Antigravity spectrum) */}
      {/* Orb 1: Upper-Right Indigo/Cyan Nebula */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-24 -right-28 h-[650px] w-[650px] rounded-full bg-gradient-to-br from-indigo-500/10 via-sky-500/8 to-transparent blur-[140px] dark:from-indigo-600/15 dark:via-cyan-600/10"
      />

      {/* Orb 2: Mid-Left Emerald / Purple Aura */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[38%] -left-36 h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-sky-400/8 via-purple-400/6 to-transparent blur-[150px] dark:from-sky-500/10 dark:via-purple-500/8"
      />

      {/* Orb 3: Lower-Right Amber / Violet Aura */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[68%] -right-32 h-[680px] w-[680px] rounded-full bg-gradient-to-bl from-amber-400/5 via-indigo-500/6 to-transparent blur-[160px] dark:from-amber-500/8 dark:via-indigo-600/10"
      />

      {/* Antigravity Celestial Orbit Ring 1 */}
      <motion.div
        style={{ y: glyph1Y, rotate: glyph1Rotate }}
        className="absolute top-[20%] left-[6%] h-44 w-44 rounded-full border border-indigo-400/10 dark:border-white/5 border-dashed"
      />

      {/* Antigravity Celestial Orbit Ring 2 */}
      <motion.div
        style={{ y: glyph2Y, rotate: glyph2Rotate }}
        className="absolute top-[55%] right-[8%] h-56 w-56 rounded-full border border-sky-400/10 dark:border-white/5"
      >
        <div className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/10 dark:border-white/5" />
      </motion.div>

      {/* Tech Axis Calibrator 3 */}
      <motion.div
        style={{ y: glyph3Y }}
        className="absolute top-[80%] left-[10%] h-28 w-28 border-l border-t border-indigo-400/10 dark:border-white/5"
      />
    </div>
  );
};
