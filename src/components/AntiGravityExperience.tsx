import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Cpu,
  Globe,
  Smartphone,
  Sparkles,
  Terminal,
  Database,
  ArrowDown,
  Layers,
  Zap,
  Code2,
  Workflow
} from 'lucide-react';

interface FloatingOrbitNode {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  metrics: string;
  tech: string[];
  icon: React.ElementType;
  initialX: number; // % horizontal
  initialY: number; // % vertical
  scrollIn: number;
  scrollPeak: number;
  scrollOut: number;
  driftRange: [number, number, number]; // [entryY, peakY, exitY]
  rotationRange: [number, number];
  accentGlow: string;
  badgeColor: string;
  accentBorder: string;
}

const ORBIT_NODES: FloatingOrbitNode[] = [
  {
    id: 'agentic-cv',
    tag: 'MODULE 01 // DEEP LEARNING',
    title: 'FreshMorph Vision Core',
    subtitle: 'Autonomous CNN Classification Engine',
    metrics: '96.4% Inference Accuracy · Sub-20ms',
    tech: ['TensorFlow', 'MobileNetV2', 'OpenCV', 'Keras'],
    icon: Cpu,
    initialX: 18,
    initialY: 24,
    scrollIn: 0.08,
    scrollPeak: 0.28,
    scrollOut: 0.54,
    driftRange: [120, 0, -80],
    rotationRange: [-6, 4],
    accentGlow: 'from-amber-500/20 via-orange-500/10 to-transparent',
    badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-500/30',
    accentBorder: 'hover:border-amber-500/50'
  },
  {
    id: 'agentic-microservices',
    tag: 'MODULE 02 // DISTRIBUTED BACKEND',
    title: 'Asynchronous API Mesh',
    subtitle: 'Zero-Block Microservice Orchestration',
    metrics: '< 120ms Latency · High Throughput',
    tech: ['FastAPI', 'Python 3.11', 'AsyncIO', 'Uvicorn'],
    icon: Terminal,
    initialX: 78,
    initialY: 20,
    scrollIn: 0.22,
    scrollPeak: 0.44,
    scrollOut: 0.68,
    driftRange: [130, 0, -85],
    rotationRange: [6, -5],
    accentGlow: 'from-sky-500/20 via-cyan-500/10 to-transparent',
    badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-500/30',
    accentBorder: 'hover:border-sky-500/50'
  },
  {
    id: 'agentic-client',
    tag: 'MODULE 03 // NATIVE CLIENT',
    title: 'Kotlin Android Client',
    subtitle: 'Coroutines, Room DB & Live Telemetry',
    metrics: 'Offline-First · Retrofit Live Sync',
    tech: ['Kotlin', 'Android SDK', 'Jetpack', 'MVVM'],
    icon: Smartphone,
    initialX: 15,
    initialY: 74,
    scrollIn: 0.38,
    scrollPeak: 0.60,
    scrollOut: 0.82,
    driftRange: [140, 0, -90],
    rotationRange: [-8, 6],
    accentGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30',
    accentBorder: 'hover:border-emerald-500/50'
  },
  {
    id: 'agentic-web',
    tag: 'MODULE 04 // FULL-STACK REACT',
    title: 'MERN Web Architecture',
    subtitle: 'Reactive State & JWT Security Layer',
    metrics: 'SSR / SPA · WebSocket Ready',
    tech: ['React 18', 'Node.js', 'Express', 'Tailwind'],
    icon: Globe,
    initialX: 80,
    initialY: 70,
    scrollIn: 0.52,
    scrollPeak: 0.74,
    scrollOut: 0.92,
    driftRange: [130, 0, -85],
    rotationRange: [5, -7],
    accentGlow: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    badgeColor: 'text-indigo-400 bg-indigo-400/10 border-indigo-500/30',
    accentBorder: 'hover:border-indigo-500/50'
  },
  {
    id: 'agentic-data',
    tag: 'MODULE 05 // PERSISTENCE MESH',
    title: 'Transactional Database',
    subtitle: 'ACID Relational Schemas & Indexing',
    metrics: 'Zero Data Loss · Optimized Query Plan',
    tech: ['MySQL', 'DDL/DML', 'MongoDB', 'Redis'],
    icon: Database,
    initialX: 48,
    initialY: 86,
    scrollIn: 0.68,
    scrollPeak: 0.88,
    scrollOut: 0.99,
    driftRange: [135, 0, -60],
    rotationRange: [-5, 5],
    accentGlow: 'from-purple-500/20 via-pink-500/10 to-transparent',
    badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-500/30',
    accentBorder: 'hover:border-purple-500/50'
  }
];

const FloatingModuleCard: React.FC<{
  node: FloatingOrbitNode;
  progress: ReturnType<typeof useSpring>;
  index: number;
}> = ({ node, progress, index }) => {
  const Icon = node.icon;

  // Ultra-gradual, weightless opacity transition reminiscent of antigravity.google
  const opacity = useTransform(
    progress,
    [node.scrollIn - 0.12, node.scrollIn, node.scrollPeak, node.scrollOut],
    [0, 1, 1, 0.75]
  );

  // Smooth floating scale
  const scale = useTransform(
    progress,
    [node.scrollIn - 0.12, node.scrollIn, node.scrollPeak, node.scrollOut],
    [0.72, 1.02, 1, 0.94]
  );

  // Gentle, atmospheric vertical drift
  const y = useTransform(
    progress,
    [node.scrollIn - 0.12, node.scrollIn, node.scrollPeak, node.scrollOut],
    [node.driftRange[0], node.driftRange[1], 0, node.driftRange[2]]
  );

  // Subtle rotational tilt
  const rotate = useTransform(
    progress,
    [node.scrollIn - 0.12, node.scrollOut],
    node.rotationRange
  );

  return (
    <motion.div
      style={{
        left: `${node.initialX}%`,
        top: `${node.initialY}%`,
        y,
        opacity,
        scale,
        rotate
      }}
      whileHover={{ scale: 1.05, y: -6, zIndex: 40 }}
      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0d12]/90 transition-all ${node.accentBorder} z-20 w-[290px] sm:w-[330px] group`}
    >
      {/* Subtle interior ambient glow */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${node.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`}
      />

      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-wider font-semibold ${node.badgeColor}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
          {node.tag}
        </span>
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-600">
          0{index + 1}/05
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-800 dark:bg-white/5 dark:border-white/10 dark:text-white group-hover:scale-105 transition-transform">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display tracking-tight truncate">
            {node.title}
          </h4>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400 truncate">
            {node.subtitle}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <Zap className="h-3 w-3 shrink-0" />
            <span className="truncate">{node.metrics}</span>
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-white/5 flex flex-wrap items-center gap-1.5">
        {node.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400 border border-slate-200/60 dark:border-white/5"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const AntiGravityExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Antigravity.google physics: ultra-smooth, low-stiffness, weightless spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 24,
    mass: 1.3,
    restDelta: 0.0001
  });

  // Central Core transformations
  const coreScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.04, 0.88]);
  const coreRotate = useTransform(smoothProgress, [0, 1], [-6, 8]);
  const coreOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.3]);
  const ringRotate = useTransform(smoothProgress, [0, 1], [0, 180]);
  const ringRotateRev = useTransform(smoothProgress, [0, 1], [0, -180]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-36 md:py-56 border-b border-slate-200/80 dark:border-white/5 bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#06070a] dark:via-[#090b10] dark:to-[#06070a] transition-colors duration-500"
    >
      {/* Technical Grid Plane with Subtle Antigravity Perspective */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px, 120px 120px'
        }}
      />

      {/* Atmospheric Weightless Nebula */}
      <motion.div
        style={{ scale: coreScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-sky-500/15 blur-[160px] dark:from-indigo-600/20 dark:via-purple-600/20 dark:to-cyan-600/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top HUD Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 mb-10 font-mono border-b border-slate-200/80 dark:border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-slate-900 dark:text-white font-semibold tracking-wider">
              GOOGLE ANTIGRAVITY ENGINE
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-indigo-600 dark:text-indigo-400">G-FORCE: 0.00G</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
            <span>Scroll gently to traverse orbital layers</span>
            <ArrowDown className="h-3 w-3 animate-bounce text-indigo-500" />
          </div>
        </div>

        {/* Orbit Field Container */}
        <div className="relative min-h-[640px] md:min-h-[740px] w-full flex items-center justify-center">
          {/* Orbital Celestial Rings (Antigravity aesthetic) */}
          <motion.div
            style={{ rotate: ringRotate }}
            className="pointer-events-none absolute h-[540px] w-[540px] rounded-full border border-dashed border-slate-300/40 dark:border-white/5"
          />
          <motion.div
            style={{ rotate: ringRotateRev }}
            className="pointer-events-none absolute h-[720px] w-[720px] rounded-full border border-slate-200/40 dark:border-white/5"
          />

          {/* Central Core Gravitational Singularity (antigravity.google style) */}
          <motion.div
            style={{
              scale: coreScale,
              rotate: coreRotate,
              opacity: coreOpacity
            }}
            className="z-10 flex flex-col items-center text-center max-w-lg mx-auto p-8 sm:p-10 rounded-3xl border border-slate-200/90 bg-white/80 dark:border-white/10 dark:bg-[#0c0d12]/85 backdrop-blur-2xl shadow-2xl transition-colors"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-5 font-mono">
              <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '12s' }} />
              <span>ORBITAL FIELD SYSTEM</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
              Weightless Engineering Architecture
            </h3>

            <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Inspired by the Google Antigravity developer environment: every software tier floats in zero-gravity equilibrium, activating sequentially as you descend through deep learning inference, async microservices, native mobile, responsive web, and ACID persistence.
            </p>

            {/* Antigravity Real-Time HUD Specs */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-white/5 w-full grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Mass</div>
                <div className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">1.3M</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Damping</div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">24.0</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Stiffness</div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">35.0</div>
              </div>
            </div>
          </motion.div>

          {/* Staggered Orbital Floating Nodes (antigravity physics) */}
          {ORBIT_NODES.map((node, index) => (
            <FloatingModuleCard
              key={node.id}
              node={node}
              progress={smoothProgress}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
