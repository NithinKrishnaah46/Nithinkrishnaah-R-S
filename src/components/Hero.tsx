import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ReadingTimeBadge } from './ReadingTimeBadge';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  FileText,
  Copy,
  Check,
  MapPin,
  Sparkles,
  Layers,
  Code2
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 dark:border-slate-800/60">
      {/* Background radial accent glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 dark:bg-indigo-950/20 blur-[130px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Typographic impact & bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {/* Status kicker - unboxed text with typographic separator */}
            <motion.div variants={itemVariants} className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Software Engineering Roles</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <MapPin className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                {PERSONAL_INFO.location}
              </span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <ReadingTimeBadge targetId="about" defaultMinutes={1} />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl font-display leading-[1.1] text-balance"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-3 text-lg sm:text-xl font-medium text-indigo-600 dark:text-indigo-400"
            >
              {PERSONAL_INFO.displayRole}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl"
            >
              {PERSONAL_INFO.summary}
            </motion.p>

            {/* Quick Proof Highlights */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-l-2 border-indigo-500/50 pl-4 py-1"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-200">IEEE TQCEBT’26</span>
                <span className="ml-1 text-slate-500 dark:text-slate-400">Published Author</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">|</span>
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-200">B.E. CSE</span>
                <span className="ml-1 text-slate-500 dark:text-slate-400">CGPA 7.06 (2022–2026)</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">|</span>
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-200">32+ AI Certifications</span>
                <span className="ml-1 text-slate-500 dark:text-slate-400">Infosys & Industry</span>
              </div>
            </motion.div>

            {/* Prominent Action Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              >
                <FileText className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                <span>View Full Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:border-transparent dark:bg-transparent dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900/60 transition-colors"
              >
                <span>Get in Touch</span>
              </a>
            </motion.div>

            {/* Prominent Social Profiles & Quick Contact Row */}
            <motion.div variants={itemVariants} className="mt-10 border-t border-slate-200 dark:border-slate-800/80 pt-6">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Connect & Verify Profiles
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white dark:hover:bg-slate-900 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white dark:hover:bg-slate-900 transition-colors"
                >
                  <Github className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                  <span>GitHub Repositories</span>
                </a>

                <div className="flex items-center rounded-lg border border-slate-200 bg-white text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-2 px-3 py-2 font-medium hover:text-indigo-600 dark:hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    <span>{PERSONAL_INFO.email}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                    title="Copy email to clipboard"
                    className="border-l border-slate-200 dark:border-slate-800 px-2 py-2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedField === 'email' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="flex items-center rounded-lg border border-slate-200 bg-white text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 px-3 py-2 font-medium hover:text-emerald-600 dark:hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                    title="Copy phone to clipboard"
                    className="border-l border-slate-200 dark:border-slate-800 px-2 py-2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedField === 'phone' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Architectural Engineering Terminal Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl">
              {/* Header bar of window */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">nithinkrishnaah.engineer</span>
                </div>
                <span className="font-mono text-xs text-indigo-400">v2026.1</span>
              </div>

              {/* Code/Architecture Summary Matrix */}
              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="text-slate-400">
                  <span className="text-purple-400">const</span> <span className="text-sky-300">engineer</span> = &#123;
                </div>
                <div className="pl-4 space-y-1 text-slate-300">
                  <div>
                    <span className="text-slate-400">name:</span> <span className="text-emerald-300">&quot;Nithinkrishnaah R S&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">degree:</span> <span className="text-emerald-300">&quot;B.E. Computer Science&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">university:</span> <span className="text-emerald-300">&quot;Sathyabama Institute (CGPA 7.06)&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">specializations:</span> [
                    <span className="text-amber-300">&quot;Full-Stack&quot;</span>,{' '}
                    <span className="text-amber-300">&quot;FastAPI/Kotlin&quot;</span>,{' '}
                    <span className="text-amber-300">&quot;AI/CNN&quot;</span>],
                  </div>
                  <div>
                    <span className="text-slate-400">researchPaper:</span> &#123;
                    <div className="pl-4">
                      <span className="text-slate-400">title:</span> <span className="text-emerald-300">&quot;FreshMorph CNN Detection&quot;</span>,
                      <br />
                      <span className="text-slate-400">conference:</span> <span className="text-indigo-300">&quot;IEEE TQCEBT&apos;26&quot;</span>
                    </div>
                    &#125;,
                  </div>
                  <div>
                    <span className="text-slate-400">internship:</span> <span className="text-emerald-300">&quot;Green Heap Enterprise&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">passion:</span> <span className="text-emerald-300">&quot;Scalable Systems & Problem Solving&quot;</span>
                  </div>
                </div>
                <div className="text-slate-400">&#125;;</div>
              </div>

              {/* Core Stacks Micro Grid */}
              <div className="mt-6 border-t border-slate-800/80 pt-4">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Primary Tech Pillars
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                    <div className="flex items-center gap-1.5 font-medium text-slate-200">
                      <Code2 className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Full-Stack Web</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-tight">
                      React, Node.js, Express, MongoDB & MySQL
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                    <div className="flex items-center gap-1.5 font-medium text-slate-200">
                      <Layers className="h-3.5 w-3.5 text-sky-400" />
                      <span>Mobile & Microservices</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-tight">
                      Kotlin, Android SDK, FastAPI & Retrofit
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                    <div className="flex items-center gap-1.5 font-medium text-slate-200">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>Deep Learning & CV</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-tight">
                      TensorFlow, Keras, OpenCV, CNN
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                    <div className="flex items-center gap-1.5 font-medium text-slate-200">
                      <span className="h-3.5 w-3.5 font-mono text-[10px] text-emerald-400 font-bold">AR</span>
                      <span>Spatial Design</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-tight">
                      Figma UI/UX, Augmented Reality prototypes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
