import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ReadingTimeBadge } from './ReadingTimeBadge';
import {
  Github,
  ExternalLink,
  Cpu,
  Smartphone,
  Globe,
  Glasses,
  CheckCircle2,
  X,
  Layers,
  ArrowUpRight,
  Check
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Clear, intuitive category filters: 'Web', 'Mobile', 'AI' alongside 'All' & 'Design / AR'
  const filterOptions = [
    { id: 'All', label: 'All Projects', icon: Layers },
    { id: 'Web', label: 'Web', icon: Globe },
    { id: 'Mobile', label: 'Mobile', icon: Smartphone },
    { id: 'AI', label: 'AI & ML', icon: Cpu },
    { id: 'AR', label: 'Design / AR', icon: Glasses }
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Web') {
      return (
        project.category === 'Full-Stack Web' ||
        project.technologies.some((t) => ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML5', 'CSS3'].includes(t))
      );
    }
    if (activeFilter === 'Mobile') {
      return (
        project.category === 'Mobile & Backend' ||
        project.technologies.some((t) => ['Kotlin', 'Android Studio', 'Retrofit'].includes(t))
      );
    }
    if (activeFilter === 'AI') {
      return (
        project.category === 'AI & Machine Learning' ||
        project.technologies.some((t) => ['TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'CNN', 'Artificial Intelligence'].includes(t))
      );
    }
    if (activeFilter === 'AR') {
      return project.category === 'AR & UI/UX';
    }
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI & Machine Learning':
        return <Cpu className="h-4 w-4 text-amber-500 dark:text-amber-400" />;
      case 'Mobile & Backend':
        return <Smartphone className="h-4 w-4 text-sky-500 dark:text-sky-400" />;
      case 'Full-Stack Web':
        return <Globe className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />;
      case 'AR & UI/UX':
        return <Glasses className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <Layers className="h-4 w-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 border-b border-slate-200/80 bg-white dark:border-slate-800/60 dark:bg-slate-950 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Engineering Showcase
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <ReadingTimeBadge targetId="projects" defaultMinutes={3} />
            </div>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
              Featured Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-normal leading-relaxed">
              Production-grade applications and peer-reviewed research implementations spanning deep learning, distributed backend microservices, and modern web architectures.
            </p>
          </div>

          {/* Interactive Technology Category Filter */}
          <div
            role="toolbar"
            aria-label="Filter projects by technology category"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start md:self-auto shadow-xs"
          >
            {filterOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveFilter(opt.id)}
                  aria-pressed={isActive}
                  aria-label={`Filter projects by ${opt.label}${isActive ? ' (currently active)' : ''}`}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} aria-hidden="true" />
                  <span>{opt.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterIndicator"
                      className="absolute inset-0 rounded-lg bg-indigo-600 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Results Counter */}
        <div
          aria-live="polite"
          className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono"
        >
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'} in <strong className="text-indigo-600 dark:text-indigo-400">{filterOptions.find(o => o.id === activeFilter)?.label}</strong>
          </span>
          {activeFilter !== 'All' && (
            <button
              onClick={() => setActiveFilter('All')}
              aria-label="Clear active category filter and show all projects"
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-sans"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Animated Project Grid */}
        <motion.div
          layout
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              // Assemble all content strings for the project entry to compute precise reading time
              const projectText = [
                project.title,
                project.subtitle,
                project.description,
                project.metrics,
                ...project.bullets,
                project.architectureDetails
              ];

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.12), 0 10px 15px -5px rgba(99, 102, 241, 0.08)',
                    transition: { duration: 0.22, ease: 'easeOut' }
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 transition-colors hover:border-indigo-300/80 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-indigo-500/40 dark:hover:bg-slate-900/90"
                >
                  <div>
                    {/* Top metadata row with per-project reading time badge */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(project.category)}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <ReadingTimeBadge content={projectText} prefix="" />
                      </div>
                      <span className="font-mono text-slate-400 dark:text-slate-500">0{idx + 1}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors font-display tracking-tight">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {project.subtitle}
                    </p>

                    {/* Brief description */}
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                      {project.description}
                    </p>

                    {/* Key Metric Highlight */}
                    <div className="mt-4 rounded-lg border border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950/60 px-3.5 py-2 text-xs flex items-center justify-between">
                      <span className="font-medium text-slate-500 dark:text-slate-400">Key Outcome: </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">{project.metrics}</span>
                    </div>

                    {/* Contributions list */}
                    <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                      {project.bullets.slice(0, 3).map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                          <span className="leading-normal">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
                    {/* Technology stack tags */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 dark:text-slate-400 mb-4 font-mono">
                      {project.technologies.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors">{tech}</span>
                          {tIdx < project.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                      >
                        <span>Architecture Deep-Dive</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white transition-colors"
                          >
                            <Github className="h-3.5 w-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.demoUrl && (
                          <button
                            onClick={() => setSelectedProject(project)}
                            aria-label={`${project.title} specifications`}
                            className="flex h-8 items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 text-xs font-medium text-indigo-700 hover:bg-indigo-600 hover:text-white dark:bg-indigo-600/20 dark:border-indigo-500/30 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Specs</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 p-4 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-6 sm:p-8 shadow-2xl my-8 transition-colors">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              {getCategoryIcon(selectedProject.category)}
              <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedProject.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">{selectedProject.metrics}</span>
              <span aria-hidden="true">·</span>
              <ReadingTimeBadge
                content={[
                  selectedProject.title,
                  selectedProject.subtitle,
                  selectedProject.description,
                  selectedProject.architectureDetails,
                  ...selectedProject.bullets
                ]}
                prefix=""
              />
            </div>

            <h3 id="modal-project-title" className="text-2xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
              {selectedProject.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{selectedProject.subtitle}</p>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Technical Architecture
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  {selectedProject.architectureDetails}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Key Implemented Capabilities
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {selectedProject.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Complete Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950/80 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons inside Modal */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Close Window
                </button>
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
