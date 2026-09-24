import React from 'react';
import { EXPERIENCE_DATA, EDUCATION_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { ReadingTimeBadge } from './ReadingTimeBadge';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle } from 'lucide-react';

export const ExperienceEducation: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800/60 dark:bg-slate-900/40 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-10 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Background & Milestones
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <ReadingTimeBadge targetId="experience" defaultMinutes={2} />
          </div>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
            Experience & Education
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            My professional software engineering internship, formal Computer Science degree, and academic research publication.
          </p>
        </div>

        {/* Featured Milestone Card: Research Paper Presentation */}
        <div className="mt-10 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/30 p-6 sm:p-8 dark:border-indigo-900/60 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/20 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                <Award className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                <span>Peer-Reviewed IEEE Conference Publication</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 dark:text-slate-400">TQCEBT’26</span>
                <span aria-hidden="true">·</span>
                <ReadingTimeBadge
                  content={[
                    ACHIEVEMENTS_DATA[0].title,
                    ACHIEVEMENTS_DATA[0].venue,
                    ACHIEVEMENTS_DATA[0].description
                  ]}
                  prefix=""
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                {ACHIEVEMENTS_DATA[0].title}
              </h3>
              <p className="mt-1 text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                {ACHIEVEMENTS_DATA[0].venue}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {ACHIEVEMENTS_DATA[0].description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="text-slate-800 dark:text-slate-300 font-medium">Domain:</span>
                <span>Computer Vision & Deep Learning</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-800 dark:text-slate-300 font-medium">Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Presented & Included in Proceedings</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center">
              <span className="rounded-lg border border-indigo-300 bg-white/80 px-4 py-2 text-xs font-mono font-semibold text-indigo-700 dark:border-indigo-500/40 dark:bg-indigo-900/30 dark:text-indigo-200">
                IEEE TQCEBT’26
              </span>
            </div>
          </div>
        </div>

        {/* Dual Grid: Experience and Education */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2.5 mb-6 text-slate-900 dark:text-slate-200 font-semibold text-lg font-display">
              <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>Work Experience</span>
            </div>

            <div className="space-y-6">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                    <span className="flex items-center gap-1 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{exp.company}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      {exp.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <ReadingTimeBadge content={[exp.role, exp.company, ...exp.highlights]} prefix="" />
                  </div>

                  <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-1" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="text-slate-400 dark:text-slate-500">Stacks:</span>
                      {exp.technologies.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span className="text-slate-700 dark:text-slate-300">{tech}</span>
                          {tIdx < exp.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Record */}
          <div>
            <div className="flex items-center gap-2.5 mb-6 text-slate-900 dark:text-slate-200 font-semibold text-lg font-display">
              <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>Education</span>
            </div>

            <div className="space-y-6">
              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {edu.degree}
                    </h4>
                    <span className="flex items-center gap-1 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                      <Calendar className="h-3 w-3" />
                      {edu.period}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{edu.institution}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      {edu.location}
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Cumulative Grade Point Average</span>
                      <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{edu.cgpa}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Coursework emphasis: Object-Oriented Programming (Java), Data Structures & Algorithms, Database Management Systems (MySQL), Operating Systems, Software Engineering, and Computer Networks.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
