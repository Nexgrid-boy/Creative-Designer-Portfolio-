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
import { ProjectConfiguratorModal } from './components/ProjectConfiguratorModal';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('aether_portfolio_projects');
      if (saved) {
        const parsed: Project[] = JSON.parse(saved);
        const valid = parsed.filter((p) => !p.isPlaceholder);
        if (valid.length >= INITIAL_PROJECTS.length) {
          return valid;
        }
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_PROJECTS;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGraphicsProject, setSelectedGraphicsProject] = useState<GraphicsProject | null>(null);
  const [graphicsProjects] = useState<GraphicsProject[]>(GRAPHICS_PROJECTS);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Persist project list updates in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aether_portfolio_projects', JSON.stringify(projects));
    } catch (e) {
      // ignore
    }
  }, [projects]);

  // Open official showreel
  const handleWatchShowreel = () => {
    const showreelProject = projects.find((p) => p.featured) || projects[0];
    if (showreelProject) {
      setSelectedProject(showreelProject);
    }
  };

  // Add project to gallery preview
  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  // Remove project from gallery preview
  const handleRemoveProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
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
      <Navbar
        onOpenShowreel={handleWatchShowreel}
        onOpenConfigurator={() => setConfiguratorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Central Attraction: Selected Projects Video Gallery */}
        <ProjectGallery
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenConfigurator={() => setConfiguratorOpen(true)}
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
        onOpenConfigurator={() => {
          setSelectedProject(null);
          setConfiguratorOpen(true);
        }}
      />

      {/* High-Resolution Graphics Design Lightbox Modal */}
      <GraphicsModal
        project={selectedGraphicsProject}
        projects={graphicsProjects}
        onClose={() => setSelectedGraphicsProject(null)}
        onSelectProject={(proj) => setSelectedGraphicsProject(proj)}
      />

      {/* Project Configurator & URL Link Tester Drawer */}
      <ProjectConfiguratorModal
        isOpen={configuratorOpen}
        onClose={() => setConfiguratorOpen(false)}
        projects={projects}
        onAddProject={handleAddProject}
        onRemoveProject={handleRemoveProject}
      />
    </div>
  );
}
