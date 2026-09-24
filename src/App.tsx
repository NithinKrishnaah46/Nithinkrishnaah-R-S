import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgress } from './components/ScrollProgress';
import { ParallaxBackground } from './components/ParallaxBackground';
import { FadeInSection } from './components/FadeInSection';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AntiGravityExperience } from './components/AntiGravityExperience';
import { Projects } from './components/Projects';
import { ExperienceEducation } from './components/ExperienceEducation';
import { SkillsCertifications } from './components/SkillsCertifications';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

function PortfolioContent() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Scroll-triggered multi-layer parallax background */}
      <ParallaxBackground />

      {/* Scroll progress indicator bar */}
      <ScrollProgress />

      {/* Navigation Header with Light/Dark Mode Toggle */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Content Sections with Framer Motion scroll entrance animations */}
      <main className="relative z-10 flex-1">
        <FadeInSection>
          <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
        </FadeInSection>

        {/* Anti-Gravity Scroll Physics Experience Section */}
        <AntiGravityExperience />

        <FadeInSection>
          <Projects />
        </FadeInSection>

        <FadeInSection>
          <ExperienceEducation />
        </FadeInSection>

        <FadeInSection>
          <SkillsCertifications />
        </FadeInSection>

        <FadeInSection>
          <ContactSection />
        </FadeInSection>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <FadeInSection>
          <Footer onOpenResume={() => setIsResumeModalOpen(true)} />
        </FadeInSection>
      </div>

      {/* Digital Resume & CV Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
