import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Cpu, Globe, Smartphone, Sparkles, Terminal, Code2, Database } from 'lucide-react';

interface FloatingNode {
  id: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  initialX: number;
  initialY: number;
  driftRange: [number, number];
  rotateRange: [number, number];
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
}

const NODES: FloatingNode[] = [
  {
    id: 'n1',
    label: 'Deep Learning',
    sub: 'FreshMorph CNN · 96.4%',
    icon: Cpu,
    initialX: 20,
    initialY: 40,
    driftRange: [-60, 60],
    rotateRange: [-8, 12],
    color: 'text-amber-500 dark:text-amber-400',
    bgLight: 'bg-white/80',
    bgDark: 'dark:bg-slate-900/80',
    borderLight: 'border-amber-200/80',
    borderDark: 'dark:border-amber-500/30'
  },
  {
    id: 'n2',
    label: 'Async Backend',
    sub: 'FastAPI + Python · Sub-150ms',
    icon: Terminal,
    initialX: 72,
    initialY: 25,
    driftRange: [50, -50],
    rotateRange: [10, -6],
    color: 'text-sky-500 dark:text-sky-400',
    bgLight: 'bg-white/80',
    bgDark: 'dark:bg-slate-900/80',
    borderLight: 'border-sky-200/80',
    borderDark: 'dark:border-sky-500/30'
  },
  {
    id: 'n3',
    label: 'Native Android',
    sub: 'Kotlin Coroutines + Retrofit',
    icon: Smartphone,
    initialX: 12,
    initialY: 75,
    driftRange: [70, -40],
    rotateRange: [-12, 8],
    color: 'text-emerald-500 dark:text-emerald-400',
    bgLight: 'bg-white/80',
    bgDark: 'dark:bg-slate-900/80',
    borderLight: 'border-emerald-200/80',
    borderDark: 'dark:border-emerald-500/30'
  },
  {
    id: 'n4',
    label: 'Full-Stack MERN',
    sub: 'React + Node + Express',
    icon: Globe,
    initialX: 78,
    initialY: 72,
    driftRange: [-50, 70],
    rotateRange: [6, -10],
    color: 'text-indigo-500 dark:text-indigo-400',
    bgLight: 'bg-white/80',
    bgDark: 'dark:bg-slate-900/80',
    borderLight: 'border-indigo-200/80',
    borderDark: 'dark:border-indigo-500/30'
  },
  {
    id: 'n5',
    label: 'Relational DB',
    sub: 'MySQL Row Locks & ACID',
    icon: Database,
    initialX: 45,
    initialY: 88,
    driftRange: [-40, 40],
    rotateRange: [-5, 7],
    color: 'text-purple-500 dark:text-purple-400',
    bgLight: 'bg-white/80',
    bgDark: 'dark:bg-slate-900/80',
    borderLight: 'border-purple-200/80',
    borderDark: 'dark:border-purple-500/30'
  }
];

export const AntiGravityExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth out scroll progress for a buoyant, fluid anti-gravity feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001
  });

  // Central singularity gravitational shift
  const coreScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.08, 0.9]);
  const coreRotate = useTransform(smoothProgress, [0, 1], [-15, 20]);
  const coreGlowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.8, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-28 md:py-36 border-b border-slate-200/80 dark:border-slate-800/60 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 transition-colors duration-300"
    >
      {/* Dynamic gravitational field grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)',
          backgroundSize: '36px 36px, 120px 120px'
        }}
      />

      {/* Ambient shifting gravitational nebula aura */}
      <motion.div
        style={{
          scale: coreScale,
          opacity: coreGlowOpacity
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-400/20 to-purple-500/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Floating anti-gravity nodes driven by scroll velocity & offset */}
        <div className="relative min-h-[520px] md:min-h-[580px] w-full flex items-center justify-center">
          {/* Gravitational Core / Center Mass */}
          <motion.div
            style={{
              scale: coreScale,
              rotate: coreRotate
            }}
            className="z-10 flex flex-col items-center text-center max-w-md mx-auto p-8 rounded-3xl border border-slate-200/80 bg-white/70 dark:border-slate-800/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-4 font-mono">
              <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Anti-Gravity Physics Engine</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
              Zero-Friction Architecture
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Scroll up and down to observe engineering modules floating under differential gravitational drift. Microservices, AI models, and UI layers uncoupled from conventional static layouts.
            </p>

            <div className="mt-5 flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                G-Vector: -9.81 m/s²
              </span>
              <span>·</span>
              <span>Inertia: Dampened</span>
            </div>
          </motion.div>

          {/* Floating Satellites with custom scroll transform trajectories */}
          {NODES.map((node) => {
            const Icon = node.icon;

            // Compute independent drift and rotation as user scrolls
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const yDrift = useTransform(smoothProgress, [0, 1], node.driftRange);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const rot = useTransform(smoothProgress, [0, 1], node.rotateRange);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const floatScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.05, 0.98]);

            return (
              <motion.div
                key={node.id}
                style={{
                  left: `${node.initialX}%`,
                  top: `${node.initialY}%`,
                  y: yDrift,
                  rotate: rot,
                  scale: floatScale
                }}
                whileHover={{ scale: 1.15, zIndex: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing rounded-2xl border ${node.borderLight} ${node.borderDark} ${node.bgLight} ${node.bgDark} p-4 shadow-xl backdrop-blur-md transition-shadow hover:shadow-2xl z-20`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 ${node.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-display">
                      {node.label}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {node.sub}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
