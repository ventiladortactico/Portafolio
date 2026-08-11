/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { CvModal } from './components/CvModal';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return saved !== null ? saved === 'dark' : true; // Default dark mode
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  useEffect(() => {
    localStorage.setItem('portfolio_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Section observer for active nav highlight
  useEffect(() => {
    const sections = ['inicio', 'proyectos', 'habilidades', 'contacto'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Smooth Custom Cursor - Always Active */}
      <CustomCursor darkMode={darkMode} />

      {/* Header Bar */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCvModal={() => setCvModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          darkMode={darkMode}
        />

        <ProjectsSection
          darkMode={darkMode}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <SkillsSection
          darkMode={darkMode}
        />

        <ContactSection
          darkMode={darkMode}
        />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        darkMode={darkMode}
      />

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}
