import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SKILLS_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';
import { ReadingTimeBadge } from './ReadingTimeBadge';
import { Award, Code, CheckCircle, Sparkles, Filter } from 'lucide-react';

interface TechTag {
  id: string;
  name: string;
  category: string;
  level: string;
  related: string[];
}

const ALL_TECH_TAGS: TechTag[] = [
  // Programming Languages
  { id: 'java', name: 'Java', category: 'Language', level: 'Advanced', related: ['oop', 'dsa', 'mysql', 'core-java'] },
  { id: 'kotlin', name: 'Kotlin', category: 'Mobile & Language', level: 'Proficient', related: ['android', 'fastapi', 'retrofit', 'rest-api'] },
  { id: 'python', name: 'Python', category: 'Language & AI', level: 'Advanced', related: ['tensorflow', 'keras', 'opencv', 'fastapi', 'cnn', 'numpy'] },
  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'Language & Web', level: 'Proficient', related: ['react', 'nodejs', 'express', 'rest-api', 'html-css'] },

  // AI & Data
  { id: 'tensorflow', name: 'TensorFlow', category: 'AI & Deep Learning', level: 'Advanced', related: ['python', 'keras', 'cnn', 'opencv', 'numpy'] },
  { id: 'keras', name: 'Keras', category: 'AI & Deep Learning', level: 'Advanced', related: ['tensorflow', 'python', 'cnn', 'numpy'] },
  { id: 'opencv', name: 'OpenCV', category: 'Computer Vision', level: 'Advanced', related: ['python', 'tensorflow', 'cnn', 'numpy'] },
  { id: 'cnn', name: 'CNN (Deep Learning)', category: 'Computer Vision', level: 'Advanced', related: ['tensorflow', 'keras', 'opencv', 'python'] },
  { id: 'numpy', name: 'NumPy', category: 'Data & AI', level: 'Advanced', related: ['python', 'tensorflow', 'opencv'] },

  // Backend & APIs
  { id: 'fastapi', name: 'FastAPI', category: 'Backend', level: 'Proficient', related: ['python', 'rest-api', 'kotlin', 'mysql'] },
  { id: 'nodejs', name: 'Node.js', category: 'Backend', level: 'Advanced', related: ['javascript', 'express', 'mongodb', 'rest-api'] },
  { id: 'express', name: 'Express.js', category: 'Backend', level: 'Advanced', related: ['nodejs', 'javascript', 'mongodb', 'rest-api'] },
  { id: 'rest-api', name: 'REST APIs', category: 'Backend & Architecture', level: 'Advanced', related: ['fastapi', 'express', 'nodejs', 'retrofit'] },

  // Frontend & Design
  { id: 'react', name: 'React.js', category: 'Frontend', level: 'Advanced', related: ['javascript', 'html-css', 'tailwind', 'nodejs'] },
  { id: 'html-css', name: 'HTML5 & CSS3', category: 'Frontend', level: 'Advanced', related: ['react', 'javascript', 'tailwind', 'figma'] },
  { id: 'tailwind', name: 'Tailwind CSS & Bootstrap', category: 'Frontend', level: 'Advanced', related: ['react', 'html-css'] },
  { id: 'figma', name: 'Figma & UI/UX', category: 'Design', level: 'Proficient', related: ['html-css', 'react', 'ar'] },
  { id: 'ar', name: 'AR & Spatial Concepts', category: 'Design & Emerging Tech', level: 'Proficient', related: ['figma', 'android'] },

  // Mobile
  { id: 'android', name: 'Android SDK & Studio', category: 'Mobile', level: 'Proficient', related: ['kotlin', 'retrofit', 'rest-api', 'fastapi'] },
  { id: 'retrofit', name: 'Retrofit Networking', category: 'Mobile & API', level: 'Proficient', related: ['android', 'kotlin', 'fastapi', 'rest-api'] },

  // Database
  { id: 'mysql', name: 'MySQL', category: 'Database', level: 'Advanced', related: ['fastapi', 'java', 'nodejs', 'oop'] },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', level: 'Proficient', related: ['nodejs', 'express', 'react', 'javascript'] },

  // Foundations
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'Core Concept', level: 'Proficient', related: ['java', 'python', 'oop'] },
  { id: 'oop', name: 'Object-Oriented Design', category: 'Core Concept', level: 'Advanced', related: ['java', 'kotlin', 'python', 'dsa'] },
  { id: 'git', name: 'Git & GitHub', category: 'Tooling', level: 'Advanced', related: ['javascript', 'python', 'java', 'react'] }
];

export const SkillsCertifications: React.FC = () => {
  const [activeCertCategory, setActiveCertCategory] = useState<string>('All');
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);
  const [selectedTagCategory, setSelectedTagCategory] = useState<string>('All');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [4, -4]), {
    stiffness: 200,
    damping: 25
  });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-4, 4]), {
    stiffness: 200,
    damping: 25
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const hoveredTag = ALL_TECH_TAGS.find((t) => t.id === hoveredTechId);

  const tagCategories = ['All', 'Language', 'AI', 'Backend', 'Frontend', 'Mobile', 'Database'];

  const filteredTags = ALL_TECH_TAGS.filter((tag) => {
    if (selectedTagCategory === 'All') return true;
    if (selectedTagCategory === 'Language') return tag.category.includes('Language');
    if (selectedTagCategory === 'AI') return tag.category.includes('AI') || tag.category.includes('Vision');
    if (selectedTagCategory === 'Backend') return tag.category.includes('Backend');
    if (selectedTagCategory === 'Frontend') return tag.category.includes('Frontend') || tag.category.includes('Design');
    if (selectedTagCategory === 'Mobile') return tag.category.includes('Mobile');
    if (selectedTagCategory === 'Database') return tag.category.includes('Database');
    return tag.category.toLowerCase().includes(selectedTagCategory.toLowerCase());
  });

  const certCategories = ['All', 'AI & Data', 'Cloud & Architecture', 'Software Engineering', 'Design'];

  const filteredCerts =
    activeCertCategory === 'All'
      ? CERTIFICATIONS_DATA
      : CERTIFICATIONS_DATA.filter((c) => c.category === activeCertCategory);

  return (
    <section id="skills" className="py-24 border-b border-slate-200/80 bg-white dark:border-slate-800/60 dark:bg-slate-950 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-10 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Technical Competencies
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <ReadingTimeBadge targetId="skills" defaultMinutes={2} />
          </div>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
            Skills & Certifications
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            A comprehensive overview of programming languages, frameworks, cloud platforms, and verified industry credentials.
          </p>
        </div>

        {/* Interactive Framer-Motion Tag Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                <Sparkles className="h-4 w-4" />
                <span>Interactive Knowledge Graph</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Reactive Technology Tag Cloud
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Hover or tap any skill to illuminate interconnected stack dependencies and real-world architectures.
              </p>
            </div>

            {/* Tag Cloud Filter */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
              <span className="flex items-center gap-1 px-2 text-[11px] font-medium text-slate-400">
                <Filter className="h-3 w-3" />
                <span>Filter:</span>
              </span>
              {tagCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTagCategory(cat)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedTagCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/40 backdrop-blur-md shadow-lg transition-colors"
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {filteredTags.map((tech, index) => {
                const isHovered = hoveredTechId === tech.id;
                const isRelated = hoveredTag?.related.includes(tech.id);

                return (
                  <motion.button
                    key={tech.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => setHoveredTechId(isHovered ? null : tech.id)}
                    onMouseEnter={() => setHoveredTechId(tech.id)}
                    whileHover={{
                      scale: 1.08,
                      y: -2,
                      transition: { type: 'spring', stiffness: 400, damping: 25 }
                    }}
                    transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
                    className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium cursor-pointer transition-colors duration-200 ${
                      isHovered
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400'
                        : isRelated
                        ? 'bg-indigo-100 text-indigo-900 border border-indigo-300 dark:bg-indigo-950/80 dark:text-indigo-200 dark:border-indigo-500/60 ring-1 ring-indigo-400/40 shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 shadow-sm dark:bg-slate-900/90 dark:text-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
                    }`}
                  >
                    <span>{tech.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isHovered
                          ? 'bg-indigo-700 text-indigo-100'
                          : isRelated
                          ? 'bg-indigo-200/80 text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {tech.level}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Relationship Status HUD Bar */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              {hoveredTag ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {hoveredTag.name}
                  </span>
                  <span className="text-slate-400">({hoveredTag.category}) connects with:</span>
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                    {hoveredTag.related.map((relId) => {
                      const rel = ALL_TECH_TAGS.find((t) => t.id === relId);
                      return rel ? (
                        <span
                          key={relId}
                          className="rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 px-2 py-0.5 text-indigo-700 dark:text-indigo-300 font-medium"
                        >
                          {rel.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ) : (
                <span className="text-slate-500 dark:text-slate-400 italic">
                  Tip: Move your cursor across the cloud to visualize framework pipelines and library synergies.
                </span>
              )}

              <button
                onClick={() => setHoveredTechId(null)}
                className="text-[11px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer self-end sm:self-auto"
              >
                Clear Focus
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Matrix by Domain - One by one staggered card reveals */}
        <div className="mt-16">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-6">
            Domain Breakdowns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS_DATA.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: groupIdx * 0.12,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col justify-between hover:border-indigo-300/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-indigo-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {group.category}
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.name} className="border-b border-slate-200 dark:border-slate-800/60 pb-2.5 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-medium">{item.level}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                <Award className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                <span>Verified Credentials</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Industry Certifications & Courses
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {certCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCertCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeCertCategory === category
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCerts.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 6) * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300/70 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-500/30 dark:hover:bg-slate-900/80 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">{cert.issuer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cert.category}</span>
                  </div>
                  <h4 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {cert.name}
                  </h4>
                  {cert.count && (
                    <p className="mt-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      {cert.count}
                    </p>
                  )}
                </div>
                <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0 ml-2 mt-0.5" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
