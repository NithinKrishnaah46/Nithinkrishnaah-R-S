import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import { Project, ProjectFile } from '../types';
import {
  Linkedin,
  Github,
  X,
  ExternalLink,
  Copy,
  Check,
  Star,
  GitFork,
  BookOpen,
  Award,
  Briefcase,
  Code2,
  Calendar,
  Sparkles,
  UserCheck,
  FileCode2,
  Terminal,
  Layers,
  ChevronRight
} from 'lucide-react';

export type ProfileTab = 'github' | 'linkedin';

interface SocialProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: ProfileTab;
}

export const SocialProfileModal: React.FC<SocialProfileModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'linkedin'
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync initial tab when opened
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setCopiedLink(false);
      setSelectedRepo(null);
      setSelectedFile(null);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const currentUrl =
    activeTab === 'linkedin'
      ? PERSONAL_INFO.socials.linkedin
      : PERSONAL_INFO.socials.github;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectRepo = (repo: Project) => {
    setSelectedRepo(repo);
    if (repo.files && repo.files.length > 0) {
      setSelectedFile(repo.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Profile Details Modal"
      >
        {/* Backdrop click to dismiss */}
        <div
          className="fixed inset-0 -z-10"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl dark:border-white/10 dark:bg-[#0c0d12] dark:text-slate-100 my-6 transition-colors max-h-[90vh] flex flex-col"
        >
          {/* Top Bar with Tab Switchers & Actions */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10 shrink-0">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
              <button
                onClick={() => {
                  setActiveTab('linkedin');
                  setSelectedRepo(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'linkedin'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn Profile</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('github');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'github'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub Repositories</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(currentUrl)}
                title="Copy profile link"
                className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto pr-1 mt-4">
            {/* TAB 1: LINKEDIN PROFILE DETAILS */}
            {activeTab === 'linkedin' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Profile Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 dark:border-blue-500/20 dark:bg-gradient-to-br dark:from-blue-950/20 dark:via-transparent dark:to-blue-950/10">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                      <Linkedin className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                          {PERSONAL_INFO.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-mono font-semibold">
                          <UserCheck className="h-3 w-3" />
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        {PERSONAL_INFO.displayRole}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                        Chennai, Tamil Nadu, India · 500+ Connections
                      </p>
                    </div>
                  </div>

                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
                  >
                    <span>Open in LinkedIn</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* LinkedIn Experience Highlights */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                    <span>Verified Professional Credentials</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 dark:border-white/5 dark:bg-white/5">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-blue-500" />
                        <span>Green Heap Enterprise</span>
                      </div>
                      <div className="mt-1 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                        Software Development Intern (Sep 2025 – Nov 2025)
                      </div>
                      <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        Geo Billing application architecture, REST API billing engines, and defect test suites.
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 dark:border-white/5 dark:bg-white/5">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>IEEE Research Publication</span>
                      </div>
                      <div className="mt-1 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                        TQCEBT’26 Proceedings Author
                      </div>
                      <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        FreshMorph deep learning fruit freshness detection with 96.4% empirical accuracy.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Profile Link Box */}
                <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 dark:border-white/5 dark:bg-white/5 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                  <span className="truncate">{PERSONAL_INFO.socials.linkedin}</span>
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 dark:text-blue-400 font-sans font-semibold shrink-0 ml-2 hover:underline flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            )}

            {/* TAB 2: GITHUB PROFILE & REPOSITORIES (WITH IN-APP CODE VIEWER) */}
            {activeTab === 'github' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md">
                      <Github className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                          {PERSONAL_INFO.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-semibold">
                          @nithinkrishnaah
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Deep Learning · Full-Stack Web · Android Kotlin & Microservices
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                        GitHub Profile: {PERSONAL_INFO.socials.github}
                      </p>
                    </div>
                  </div>

                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                  >
                    <span>Open GitHub Profile</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Sub-view: If a repository is chosen, display In-App Source Code Explorer */}
                {selectedRepo ? (
                  <div className="space-y-4">
                    {/* Breadcrumb Navigation back to all repos */}
                    <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <button
                          onClick={() => setSelectedRepo(null)}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-semibold"
                        >
                          ← Repositories
                        </button>
                        <span className="text-slate-400">/</span>
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                          {selectedRepo.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={PERSONAL_INFO.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>View on GitHub</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>

                    {/* Repository Meta Banner */}
                    <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-500/20">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                          {selectedRepo.title}
                        </h4>
                        {selectedRepo.repoStats && (
                          <div className="flex items-center gap-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 text-amber-500" />
                              {selectedRepo.repoStats.stars}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="h-3.5 w-3.5 text-indigo-500" />
                              {selectedRepo.repoStats.forks}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-white dark:bg-white/10 font-medium">
                              {selectedRepo.repoStats.license}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {selectedRepo.description}
                      </p>
                    </div>

                    {/* Source Code Files Tabs & Viewer */}
                    {selectedRepo.files && selectedRepo.files.length > 0 && (
                      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-900 text-slate-100 overflow-hidden shadow-inner">
                        {/* File Tabs */}
                        <div className="flex items-center justify-between bg-slate-950 px-3 py-2 border-b border-slate-800">
                          <div className="flex items-center gap-1.5 overflow-x-auto">
                            {selectedRepo.files.map((file) => (
                              <button
                                key={file.name}
                                onClick={() => setSelectedFile(file)}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                                  selectedFile?.name === file.name
                                    ? 'bg-slate-800 text-indigo-400 font-semibold'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                                }`}
                              >
                                <FileCode2 className="h-3.5 w-3.5" />
                                <span>{file.name}</span>
                              </button>
                            ))}
                          </div>

                          {selectedFile && (
                            <button
                              onClick={() => handleCopyCode(selectedFile.codeSnippet)}
                              className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
                            >
                              {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                            </button>
                          )}
                        </div>

                        {/* File Description */}
                        {selectedFile && (
                          <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800/80 text-[11px] font-mono text-indigo-300">
                            {selectedFile.description}
                          </div>
                        )}

                        {/* Syntax/Code Body */}
                        <div className="p-4 overflow-x-auto max-h-72 text-xs font-mono leading-relaxed bg-[#0d1117] text-slate-200 selection:bg-indigo-600 selection:text-white">
                          <pre>{selectedFile?.codeSnippet}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* List of Featured Repositories */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <Code2 className="h-3.5 w-3.5 text-indigo-500" />
                        <span>Interactive Source Code Repositories</span>
                      </h4>
                      <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                        Click any repo to view code
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {PROJECTS_DATA.map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => handleSelectRepo(proj)}
                          className="group p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-indigo-400 hover:shadow-md dark:border-white/5 dark:bg-[#12141a] dark:hover:border-indigo-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-indigo-500 shrink-0" />
                              <h5 className="font-mono text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {proj.id}
                              </h5>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400">
                                Public
                              </span>
                            </div>

                            {proj.repoStats && (
                              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-amber-500" />
                                  {proj.repoStats.stars}
                                </span>
                                <span className="flex items-center gap-1">
                                  <GitFork className="h-3 w-3 text-indigo-500" />
                                  {proj.repoStats.forks}
                                </span>
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                  {proj.metrics.split(' ')[0]}
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {proj.subtitle}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {proj.technologies.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <span className="flex items-center gap-1 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                              <span>Inspect Source Code</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer Direct Outbound Link */}
          <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500 shrink-0">
            <span>
              Direct link: <a href={currentUrl} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">{currentUrl}</a>
            </span>
            <button
              onClick={onClose}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer font-sans"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
