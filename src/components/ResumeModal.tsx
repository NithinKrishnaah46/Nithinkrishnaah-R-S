import React from 'react';
import { PERSONAL_INFO, PROJECTS_DATA, EXPERIENCE_DATA, EDUCATION_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { X, Printer } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 p-4 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-4 sm:p-8 shadow-2xl my-8 transition-colors">
        {/* Actions bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white font-display">
              Curriculum Vitae Preview
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">· Official Sathyabama Format</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="rounded-xl border border-slate-200 bg-white text-slate-900 p-6 sm:p-10 shadow-lg text-xs leading-normal font-sans print:border-0 print:p-0 print:shadow-none">
          {/* Header */}
          <div className="text-center border-b border-slate-300 pb-4">
            <h1 className="text-2xl font-bold tracking-wider uppercase text-slate-900 font-serif">
              {PERSONAL_INFO.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-700">
              Computer Science Engineering Graduate
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
              <span>Chennai, Tamil Nadu</span>
              <span aria-hidden="true">—</span>
              <span>{PERSONAL_INFO.phone}</span>
              <span aria-hidden="true">—</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-indigo-700 hover:underline">
                {PERSONAL_INFO.email}
              </a>
              <span aria-hidden="true">—</span>
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">
                GitHub
              </a>
              <span aria-hidden="true">—</span>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-[11.5px] leading-relaxed text-slate-700">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="space-y-1 text-[11px] text-slate-700">
              <div>
                <strong className="text-slate-900">Programming Languages:</strong> Java, Kotlin, Python, JavaScript
              </div>
              <div>
                <strong className="text-slate-900">Frontend:</strong> React.js, HTML5, CSS3, Bootstrap, Tailwind CSS
              </div>
              <div>
                <strong className="text-slate-900">Backend:</strong> Node.js, Express.js, FastAPI, REST APIs
              </div>
              <div>
                <strong className="text-slate-900">Database:</strong> MySQL, MongoDB
              </div>
              <div>
                <strong className="text-slate-900">Mobile:</strong> Android Studio, Kotlin, Android SDK
              </div>
              <div>
                <strong className="text-slate-900">Tools:</strong> Git, GitHub, VS Code, Figma, Canva
              </div>
              <div>
                <strong className="text-slate-900">Core Concepts:</strong> OOP, Data Structures, Algorithms, REST APIs, Problem Solving
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-slate-900 text-[11.5px]">{proj.title}</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-slate-700">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="mt-1 text-[10.5px] text-slate-600">
                    <strong className="text-slate-900">Technologies:</strong> {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Experience
            </h2>
            {EXPERIENCE_DATA.map((exp, idx) => (
              <div key={idx}>
                <div className="flex items-baseline justify-between text-[11.5px]">
                  <span>
                    <strong className="text-slate-900">{exp.role}</strong> — {exp.company}
                  </span>
                  <span className="font-medium text-slate-600">{exp.period}</span>
                </div>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-slate-700">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            {EDUCATION_DATA.map((edu, idx) => (
              <div key={idx} className="flex items-baseline justify-between text-[11.5px]">
                <div>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-700 text-[11px]">{edu.institution}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-800">CGPA: {edu.cgpa.replace(' / 10.0', '')}</div>
                  <div className="text-[11px] text-slate-600">{edu.period}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Achievements
            </h2>
            <p className="text-[11px] leading-relaxed text-slate-700">
              • Presented the research paper &ldquo;FreshMorph: An Adaptive Deep Learning Algorithm for Multi-Spectral Freshness Detection in Fruits and Vegetables&rdquo; at the Third International IEEE Conference on Trends in Quantum Computing and Emerging Business Technologies (TQCEBT&apos;26).
            </p>
          </div>

          {/* Certifications */}
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Certifications
            </h2>
            <p className="text-[10.5px] leading-relaxed text-slate-700">
              Deloitte Data Analytics (Forage) — C &amp; C++ Programming (Bharathidhasan university) — UI/UX Design — Core Java — Full Stack Development — Oracle OCI — IBM Python &amp; SQL — Infosys Springboard AI (32 certificates) — AWS Solutions Architecture (Forage) — .NET Fundamentals — Introduction to Data Engineering and Bigdata
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
