import React, { useState, useMemo } from 'react';
import { Search, Film, AlertCircle } from 'lucide-react';
import { Project, ProjectCategory } from '../types/project';
import { ProjectCard } from './ProjectCard';

interface ProjectGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'AI Motion Graphics',
  'AI Video Production',
  'Product Advertisements',
  'Cinematic AI Videos',
  'Explainer Videos',
  'Creative Visuals'
];

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  onSelectProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const titleMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = (project.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      const toolsMatch = (project.toolsUsed || []).some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchesCategory && (titleMatch || descMatch || toolsMatch);
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 sm:py-32 relative bg-[#070709] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3 font-mono">
              <span>Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Selected Works</span>
              <span aria-hidden="true">·</span>
              <span>Motion & AI</span>
            </div>
            {/* Title requested by user: "Selected Works" */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Selected Works
            </h2>
            {/* Subtitle requested by user */}
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              A collection of visual stories, creative experiments and AI-powered motion graphics.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs & Live Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Functional Category Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-xl border border-zinc-800/80 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((category) => {
              const count =
                category === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono leading-none ${
                      selectedCategory === category
                        ? 'bg-amber-400 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search works by title, tool, client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-900/80 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
            />
          </div>
        </div>

        {/* Individual Video Project Showcase Grid (Each video displayed separately) */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-zinc-950/40 rounded-2xl border border-zinc-900">
            <AlertCircle className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-300">No matching works found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              No projects match the current filter &quot;{selectedCategory}&quot; and search query &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-amber-400 bg-amber-400/10 rounded-lg hover:bg-amber-400/20 transition-colors cursor-pointer"
            >
              Show All Works
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
