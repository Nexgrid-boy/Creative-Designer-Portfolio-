import React, { useState, useEffect } from 'react';
import { Project, GraphicsProject } from './types/project';
import { INITIAL_PROJECTS } from './data/projects';
import { GRAPHICS_PROJECTS } from './data/graphicsProjects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { GraphicsGallery } from './components/GraphicsGallery';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PipelineSection } from './components/PipelineSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { GraphicsModal } from './components/GraphicsModal';

export default function App() {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGraphicsProject, setSelectedGraphicsProject] = useState<GraphicsProject | null>(null);
  const [graphicsProjects] = useState<GraphicsProject[]>(GRAPHICS_PROJECTS);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Clear any stale local cache from previous development cycles
  useEffect(() => {
    try {
      localStorage.removeItem('aether_portfolio_projects');
    } catch (e) {
      // ignore
    }
  }, []);

  // Open featured showreel
  const handleWatchShowreel = () => {
    const showreelProject = projects.find((p) => p.featured) || projects[0];
    if (showreelProject) {
      setSelectedProject(showreelProject);
    }
  };

  // Select service from Services section and scroll to Contact
  const handleSelectService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-zinc-950">
      {/* Top Bar Navigation */}
      <Navbar onOpenShowreel={handleWatchShowreel} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Central Attraction: Selected Projects Video Gallery */}
        <ProjectGallery
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* 3. Graphics Design Gallery (Brand Systems, Typography, Packaging & Posters) */}
        <GraphicsGallery
          projects={graphicsProjects}
          onSelectProject={(proj) => setSelectedGraphicsProject(proj)}
        />

        {/* 4. About Me Section */}
        <AboutSection />

        {/* 5. Creative Services & Capabilities */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 6. Production Pipeline & Workflow */}
        <PipelineSection />

        {/* 7. Contact & Booking Inquiry Section */}
        <ContactSection preselectedService={preselectedService} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cinema Video Modal Lightbox */}
      <VideoModal
        project={selectedProject}
        projects={projects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* High-Resolution Graphics Design Lightbox Modal */}
      <GraphicsModal
        project={selectedGraphicsProject}
        projects={graphicsProjects}
        onClose={() => setSelectedGraphicsProject(null)}
        onSelectProject={(proj) => setSelectedGraphicsProject(proj)}
      />
    </div>
  );
}
