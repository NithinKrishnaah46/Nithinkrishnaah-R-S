import React from 'react';
import { Clock } from 'lucide-react';
import { estimateReadingTime } from '../utils/readingTime';

interface ReadingTimeBadgeProps {
  /** Optional element ID to calculate from live DOM text */
  targetId?: string;
  /** Direct text or array of strings to calculate from */
  content?: string | (string | undefined | null)[];
  /** Default fallback minutes */
  defaultMinutes?: number;
  className?: string;
  prefix?: string;
}

export const ReadingTimeBadge: React.FC<ReadingTimeBadgeProps> = ({
  targetId,
  content,
  defaultMinutes = 1,
  className = '',
  prefix = '~'
}) => {
  const [readingText, setReadingText] = React.useState<string>(
    content ? estimateReadingTime(content).text : `${defaultMinutes} min read`
  );

  React.useEffect(() => {
    if (content) {
      setReadingText(estimateReadingTime(content).text);
      return;
    }

    if (targetId) {
      const calculateFromDom = () => {
        const el = document.getElementById(targetId);
        if (!el) return;
        const text = el.innerText || el.textContent || '';
        const { text: formatted } = estimateReadingTime(text);
        setReadingText(formatted);
      };

      calculateFromDom();
      const timer = setTimeout(calculateFromDom, 400);
      return () => clearTimeout(timer);
    }
  }, [targetId, content]);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-[11px] font-mono text-slate-600 dark:text-slate-300 font-medium tracking-tight ${className}`}
      title="Estimated reading/comprehension time"
    >
      <Clock className="h-3 w-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
      <span>
        {prefix}
        {readingText}
      </span>
    </span>
  );
};
