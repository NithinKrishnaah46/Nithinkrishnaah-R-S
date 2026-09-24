import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BookOpen, CheckCircle } from 'lucide-react';

interface ArticleReadingProgressProps {
  /** Target ref for the container element being read */
  targetRef: React.RefObject<HTMLElement | null>;
  /** Optional title to show in the progress chip */
  title?: string;
  /** Estimated reading time string, e.g. "2 min read" */
  estimatedTime?: string;
  className?: string;
}

export const ArticleReadingProgress: React.FC<ArticleReadingProgressProps> = ({
  targetRef,
  title = 'Article Reading Progress',
  estimatedTime,
  className = ''
}) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Smooth spring for granular reading progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001
  });

  // Calculate percentage 0 - 100
  const progressPercent = useTransform(smoothProgress, (val) =>
    Math.round(Math.min(1, Math.max(0, val)) * 100)
  );

  const [percentDisplay, setPercentDisplay] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = progressPercent.on('change', (latest) => {
      setPercentDisplay(latest);
    });
    return () => unsubscribe();
  }, [progressPercent]);

  return (
    <div
      className={`sticky top-16 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-[#0c0d12]/85 border-y border-slate-200/80 dark:border-white/10 py-2 px-4 transition-colors ${className}`}
      aria-label="Granular article reading progress"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
          <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
            {title}
          </span>
          {estimatedTime && (
            <>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-slate-400 dark:text-slate-500 hidden sm:inline truncate">
                {estimatedTime}
              </span>
            </>
          )}
        </div>

        {/* Progress percent & status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 font-semibold">
            {percentDisplay >= 98 ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Finished</span>
              </span>
            ) : (
              <span className="text-indigo-600 dark:text-indigo-400">
                {percentDisplay}% read
              </span>
            )}
          </div>

          {/* Micro Progress Bar */}
          <div className="w-20 sm:w-32 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
