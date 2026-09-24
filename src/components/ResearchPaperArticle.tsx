import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { ReadingTimeBadge } from './ReadingTimeBadge';
import { ArticleReadingProgress } from './ArticleReadingProgress';
import {
  Award,
  BookOpen,
  ExternalLink,
  Layers,
  Cpu,
  CheckCircle2,
  FileCode,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export const ResearchPaperArticle: React.FC = () => {
  const articleRef = useRef<HTMLDivElement>(null);
  const paper = ACHIEVEMENTS_DATA[0];

  return (
    <div className="relative mt-12 mb-16">
      {/* Sticky Granular Reading Progress for this in-depth research paper article */}
      <ArticleReadingProgress
        targetRef={articleRef}
        title="Research Paper: FreshMorph CNN Detection"
        estimatedTime="3 min read"
      />

      {/* Main Article Container */}
      <article
        ref={articleRef}
        className="rounded-3xl border border-indigo-200/90 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-xl dark:border-indigo-900/60 dark:bg-[#0c0d12]/95 transition-colors"
      >
        {/* Article Meta Header */}
        <header className="border-b border-slate-200/80 dark:border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-semibold">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              <span>IEEE TQCEBT’26 PROCEEDINGS</span>
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-slate-600 dark:text-slate-400">Peer-Reviewed Conference Paper</span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <ReadingTimeBadge targetId="research-article-body" defaultMinutes={3} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
            FreshMorph: An Adaptive Deep Learning Algorithm for Multi-Spectral Freshness Detection in Produce
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm font-mono text-indigo-600 dark:text-indigo-400">
            Presented at the Third International IEEE Conference on Trends in Quantum Computing and Emerging Business Technologies (TQCEBT’26)
          </p>
        </header>

        {/* Article Body with Structured Technical Sections */}
        <div id="research-article-body" className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {/* Abstract */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
              <span>01. Executive Abstract</span>
            </h4>
            <p className="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-200/80 dark:border-white/5 font-sans leading-relaxed text-slate-800 dark:text-slate-200">
              {paper.description} Traditional shelf-life classification relies on manual visual audits prone to human error and cross-contamination. FreshMorph introduces a transfer-learning convolutional neural network pipeline specifically calibrated to analyze surface morphology discoloration, surface texture changes, and micro-blemishes under varied lighting conditions.
            </p>
          </section>

          {/* Key Architectural Innovations */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-sky-500" />
              <span>02. Methodology & Deep Learning Architecture</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-white/5">
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  MobileNetV2 Backbone & Depthwise Separable Convolutions
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                  Utilized lightweight parameter sets suited for edge deployments and mobile inspection devices, dropping floating-point operations while preserving high feature extraction fidelity.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-white/5">
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Synthetic Augmentation & Lighting Invariance
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                  Implemented affine rotations, Gaussian blur, CLAHE contrast enhancement, and multi-spectral color jittering to guarantee zero vulnerability to supermarket lighting discrepancies.
                </p>
              </div>
            </div>
          </section>

          {/* Benchmark Results */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span>03. Empirical Results & Performance Benchmarks</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-center">
                <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">96.4%</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Classification Accuracy</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center">
                <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">&lt; 20ms</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Per-Frame Inference Latency</div>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 text-center">
                <div className="text-2xl font-extrabold text-sky-700 dark:text-sky-300">100%</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">IEEE Peer-Reviewed</div>
              </div>
            </div>
          </section>

          {/* Practical Industry Impact */}
          <section className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>04. Supply Chain & Commercial Applications</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Automated checkout scanner integrations for real-time item grading and price adjustments.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Warehouse intake quality control gates that isolate spoiled produce batches before distribution.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Direct integration with FastAPI endpoints and Kotlin mobile clients for real-time field audits.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer info & Citation */}
        <footer className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            Citation: <span className="text-slate-800 dark:text-slate-200">Nithinkrishnaah R S et al., IEEE TQCEBT’26 Proceedings</span>
          </div>
          <span className="rounded-lg bg-slate-100 dark:bg-white/5 px-3 py-1 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5">
            Verified Presentation
          </span>
        </footer>
      </article>
    </div>
  );
};
