export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
}

export interface ProjectFile {
  name: string;
  type: 'code' | 'config' | 'doc';
  language?: string;
  description: string;
  codeSnippet: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Machine Learning' | 'Mobile & Backend' | 'Full-Stack Web' | 'AR & UI/UX';
  description: string;
  bullets: string[];
  technologies: string[];
  metrics: string;
  githubUrl?: string;
  demoUrl?: string;
  architectureDetails: string;
  featured: boolean;
  repoStats?: {
    stars: number;
    forks: number;
    watchers: number;
    branches: number;
    commits: number;
    license: string;
  };
  files?: ProjectFile[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  location: string;
}

export interface Achievement {
  title: string;
  venue: string;
  date: string;
  description: string;
  badge: string;
  doiOrLink?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  category: 'Cloud & Architecture' | 'AI & Data' | 'Software Engineering' | 'Design';
  count?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  type: string;
  message: string;
  timestamp: string;
}
