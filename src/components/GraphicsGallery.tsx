import React, { useState, useMemo } from 'react';
import { Palette, Search, ZoomIn, Layers, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { GraphicsProject, GraphicsCategory } from '../types/project';

interface GraphicsGalleryProps {
  projects: GraphicsProject[];
  onSelectProject: (project: GraphicsProject) => void;
}

const CATEGORIES: GraphicsCategory[] = [
  'All',
  'Brand Identity',
  'Typography & Editorial',
  'Packaging & Print',
  'Poster Art & Key Visuals',
  'Digital Vector Art'
];

export const GraphicsGallery: React.FC<GraphicsGalleryProps> = ({
  projects,
  onSelectProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GraphicsCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const titleMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const toolsMatch = project.toolsUsed.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchesCategory && (titleMatch || descMatch || toolsMatch);
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="graphics" className="py-24 sm:py-32 relative bg-[#09090c] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3 font-mono">
              <Palette className="w-3.5 h-3.5" />
              <span>Graphics Design Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Visual Identity & Typography</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Graphics Design
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Visual identity systems, editorial layouts, poster art, packaging, and digital vector artwork crafted with Swiss typographic discipline.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs & Search Bar */}
        {projects.length > 0 && (
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
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

            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search graphics by title, tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-900/80 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Projects Display Grid or Waiting Prompt */}
        {projects.length > 0 ? (
          filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group relative flex flex-col bg-zinc-950/80 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-amber-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                  aria-label={`View ${project.title}`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:from-black/70 transition-colors pointer-events-none" />

                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-12 h-12 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shadow-xl">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-semibold text-amber-400 border border-amber-500/20">
                      {project.category}
                    </div>

                    {/* Year badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-zinc-800">
                      {project.year}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                      <span className="text-zinc-500 font-medium">
                        {project.toolsUsed.join(' · ')}
                      </span>
                      <span className="text-amber-400 font-semibold group-hover:underline">
                        View Work &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-zinc-950/40 rounded-2xl border border-zinc-900">
              <AlertCircle className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-300">No matching graphics found</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                No works match the selected category &quot;{selectedCategory}&quot;.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-4 py-2 text-xs font-medium text-amber-400 bg-amber-400/10 rounded-lg hover:bg-amber-400/20 transition-colors cursor-pointer"
              >
                Show All Graphics
              </button>
            </div>
          )
        ) : (
          /* Waiting for User Images Banner */
          <div className="p-10 sm:p-14 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-center flex flex-col items-center justify-center max-w-3xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5 shadow-lg shadow-amber-500/10">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              Ready for Graphics Design Images
            </h3>
            <p className="text-sm text-zinc-400 max-w-lg leading-relaxed mb-6">
              Post your Cloudinary image links here in the chat (one by one or all together), and they will appear immediately in Mary&apos;s Graphics Design gallery.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>Awaiting your image URLs...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
