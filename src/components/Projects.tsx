import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project, ProjectFile } from '../types';
import { ReadingTimeBadge } from './ReadingTimeBadge';
import { useSocialModal } from '../context/SocialModalContext';
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
  Check,
  Code2,
  FileCode2,
  Copy,
  Star,
  GitFork
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const { openProfile } = useSocialModal();

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
        project.technologies.some((t) => ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN'].includes(t))
      );
    }
    if (activeFilter === 'AR') {
      return (
        project.category === 'AR & UI/UX' ||
        project.technologies.some((t) => ['Figma', 'UI/UX Design', 'AR Concepts'].includes(t))
      );
    }
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI & Machine Learning':
        return <Cpu className="h-4 w-4 text-emerald-500" />;
      case 'Mobile & Backend':
        return <Smartphone className="h-4 w-4 text-sky-500" />;
      case 'Full-Stack Web':
        return <Globe className="h-4 w-4 text-indigo-500" />;
      case 'AR & UI/UX':
        return <Glasses className="h-4 w-4 text-purple-500" />;
      default:
        return <Layers className="h-4 w-4 text-slate-400" />;
    }
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    if (project.files && project.files.length > 0) {
      setActiveFile(project.files[0]);
    } else {
      setActiveFile(null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="projects" className="py-24 border-b border-slate-200/80 bg-slate-50/50 dark:border-slate-800/60 dark:bg-slate-900/30 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Engineering Showcase
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <ReadingTimeBadge targetId="projects" defaultMinutes={5} />
            </div>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
              Technical Projects & Implementations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Production-grade applications spanning deep learning computer vision, high-concurrency microservices, and reactive user interfaces.
            </p>
          </div>

          {/* Interactive GitHub Hub Button */}
          <button
            onClick={() => openProfile('github')}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 shadow-sm hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400 cursor-pointer self-start md:self-auto transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Interactive Repository Hub</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {filterOptions.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all hover:border-indigo-300 hover:shadow-lg dark:border-slate-800/90 dark:bg-slate-900/60 dark:hover:border-indigo-500/40"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      {getCategoryIcon(project.category)}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{project.category}</span>
                    </div>

                    {project.repoStats && (
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500" />
                          {project.repoStats.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3 text-indigo-500" />
                          {project.repoStats.forks}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-display">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {project.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
                      onClick={() => handleOpenProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      <span>Architecture & Source Code</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenProject(project)}
                        aria-label={`Inspect ${project.title} source code`}
                        className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <Code2 className="h-3.5 w-3.5 text-indigo-500" />
                        <span>View Code</span>
                      </button>

                      <a
                        href={project.githubUrl || 'https://github.com/nithinkrishnaah'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="flex h-8 items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 text-xs font-medium text-indigo-700 hover:bg-indigo-600 hover:text-white dark:bg-indigo-600/20 dark:border-indigo-500/30 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Architecture Deep-Dive & Source Code Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setSelectedProject(null)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-white/10 dark:bg-[#0c0d12] dark:text-slate-100 max-h-[90vh] overflow-y-auto my-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white transition-colors cursor-pointer"
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

            <div className="mt-6 space-y-6">
              {/* Technical Architecture */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Technical Architecture
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5">
                  {selectedProject.architectureDetails}
                </p>
              </div>

              {/* Source Code File Explorer */}
              {selectedProject.files && selectedProject.files.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-indigo-500" />
                      <span>Production Source Code & Configuration</span>
                    </h4>
                    {activeFile && (
                      <button
                        onClick={() => handleCopyCode(activeFile.codeSnippet)}
                        className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                      >
                        {copiedCode ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-900 text-slate-100 overflow-hidden shadow-inner">
                    {/* Tabs */}
                    <div className="flex items-center bg-slate-950 px-3 py-2 border-b border-slate-800 overflow-x-auto gap-1.5">
                      {selectedProject.files.map((file) => (
                        <button
                          key={file.name}
                          onClick={() => setActiveFile(file)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                            activeFile?.name === file.name
                              ? 'bg-slate-800 text-indigo-400 font-semibold'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                          }`}
                        >
                          <FileCode2 className="h-3.5 w-3.5" />
                          <span>{file.name}</span>
                        </button>
                      ))}
                    </div>

                    {activeFile && (
                      <div className="px-4 py-2 bg-slate-800/40 border-b border-slate-800 text-[11px] font-mono text-indigo-300">
                        {activeFile.description}
                      </div>
                    )}

                    <div className="p-4 overflow-x-auto max-h-64 text-xs font-mono leading-relaxed bg-[#0d1117] text-slate-200 selection:bg-indigo-600 selection:text-white">
                      <pre>{activeFile?.codeSnippet}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Implemented Capabilities */}
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

              {/* Technology Stack */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Complete Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons inside Modal */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    openProfile('github');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  <Code2 className="h-4 w-4" />
                  <span>Browse all repos in GitHub modal</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href={selectedProject.githubUrl || 'https://github.com/nithinkrishnaah'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>Open GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
