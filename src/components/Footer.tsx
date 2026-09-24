import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 dark:border-slate-800/80 dark:bg-slate-950 py-12 text-slate-500 dark:text-slate-400 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-slate-200 dark:border-slate-800/80">
          {/* Brand and Summary */}
          <div className="max-w-md">
            <a
              href="#"
              className="text-lg font-bold text-slate-900 dark:text-white font-display hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {PERSONAL_INFO.name}
            </a>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Computer Science Engineering graduate specializing in Full-Stack web systems, mobile applications (FastAPI + Kotlin), and deep learning computer vision architectures.
            </p>
          </div>

          {/* Prominent Social Profiles in Footer */}
          <div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Professional Profiles
            </div>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-600/10 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email Contact"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-600/10 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                aria-label="Phone Contact"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-600/10 dark:hover:text-emerald-400 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <span>© {new Date().getFullYear()} Nithinkrishnaah R S</span>
            <span aria-hidden="true">·</span>
            <span>Chennai, Tamil Nadu, India</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenResume}
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Digital CV
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
