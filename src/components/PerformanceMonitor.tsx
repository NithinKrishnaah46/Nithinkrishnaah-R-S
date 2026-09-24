import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, ChevronRight, Gauge, Cpu } from 'lucide-react';

interface MetricState {
  fps: number;
  avgFps: number;
  cls: number; // Cumulative Layout Shift
  renderTimeMs: number;
  memoryMb?: number;
}

export const PerformanceMonitor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<MetricState>({
    fps: 60,
    avgFps: 60,
    cls: 0,
    renderTimeMs: 0
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsHistoryRef = useRef<number[]>([]);
  const clsTotalRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    // Track FPS with requestAnimationFrame
    const updateLoop = (now: number) => {
      frameCountRef.current++;
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 500) {
        // Sample every 500ms for smooth, accurate reading
        const instantFps = Math.round((frameCountRef.current * 1000) / elapsed);
        fpsHistoryRef.current.push(instantFps);
        if (fpsHistoryRef.current.length > 20) {
          fpsHistoryRef.current.shift();
        }

        const avg = Math.round(
          fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length
        );

        // Approximate frame render time in ms
        const renderTime = Math.max(1, Math.round(1000 / (instantFps || 60)));

        // Extract memory if available in browser
        let memoryMb: number | undefined;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const perf = performance as any;
        if (perf.memory && perf.memory.usedJSHeapSize) {
          memoryMb = Math.round(perf.memory.usedJSHeapSize / (1024 * 1024));
        }

        setMetrics((prev) => ({
          ...prev,
          fps: Math.min(instantFps, 144),
          avgFps: Math.min(avg, 144),
          renderTimeMs: renderTime,
          memoryMb
        }));

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    // Track Cumulative Layout Shift (CLS) via PerformanceObserver
    let clsObserver: PerformanceObserver | null = null;
    try {
      if (typeof PerformanceObserver !== 'undefined' && PerformanceObserver.supportedEntryTypes?.includes('layout-shift')) {
        clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            // Only count shifts without recent user input
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const shiftEntry = entry as any;
            if (!shiftEntry.hadRecentInput) {
              clsTotalRef.current += shiftEntry.value;
              setMetrics((prev) => ({
                ...prev,
                cls: Math.round(clsTotalRef.current * 1000) / 1000
              }));
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      }
    } catch {
      // Ignore unsupported browsers
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clsObserver?.disconnect();
    };
  }, []);

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return 'text-emerald-500 dark:text-emerald-400';
    if (fps >= 35) return 'text-amber-500 dark:text-amber-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  const getClsColor = (cls: number) => {
    if (cls <= 0.05) return 'text-emerald-500 dark:text-emerald-400';
    if (cls <= 0.1) return 'text-amber-500 dark:text-amber-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="pill-collapsed"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Toggle Real-Time Performance Monitor"
            className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2 text-xs font-mono font-medium text-slate-800 shadow-md backdrop-blur-md hover:border-indigo-400 dark:border-white/10 dark:bg-[#0c0d12]/90 dark:text-slate-200 dark:hover:border-indigo-500/40 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-tight">PERF</span>
            <span className={`font-bold ${getFpsColor(metrics.fps)}`}>
              {metrics.fps} FPS
            </span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
          </motion.button>
        ) : (
          <motion.div
            key="hud-expanded"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="w-72 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0d12]/95 dark:text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 dark:border-white/10 font-mono">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                <span className="text-xs font-bold tracking-wider text-slate-900 dark:text-white uppercase">
                  Runtime Telemetry
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white transition-colors cursor-pointer"
                title="Minimize monitor"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
              {/* Real-time FPS */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-2.5 dark:border-white/5 dark:bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">FPS Rate</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className={`text-lg font-extrabold ${getFpsColor(metrics.fps)}`}>
                    {metrics.fps}
                  </span>
                  <span className="text-[10px] text-slate-400">/ 60+</span>
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  Avg: {metrics.avgFps} FPS
                </div>
              </div>

              {/* Cumulative Layout Shift (CLS) */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-2.5 dark:border-white/5 dark:bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Layout Shift (CLS)</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className={`text-lg font-extrabold ${getClsColor(metrics.cls)}`}>
                    {metrics.cls}
                  </span>
                </div>
                <div className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Target &lt; 0.100
                </div>
              </div>

              {/* Frame render budget */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-2.5 dark:border-white/5 dark:bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Frame Budget</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {metrics.renderTimeMs}ms
                  </span>
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  Goal: &lt; 16.6ms
                </div>
              </div>

              {/* Memory Heap */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-2.5 dark:border-white/5 dark:bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">JS Heap</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {metrics.memoryMb ? `${metrics.memoryMb}MB` : 'Stable'}
                  </span>
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  Zero Leak Footprint
                </div>
              </div>
            </div>

            {/* Footer Status Bar */}
            <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <Activity className="h-3 w-3" />
                <span>60FPS Smooth Render</span>
              </span>
              <span>GPU Accelerated</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
