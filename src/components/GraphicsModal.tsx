import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Layers, Calendar, User, Palette } from 'lucide-react';
import { GraphicsProject } from '../types/project';

interface GraphicsModalProps {
  project: GraphicsProject | null;
  projects: GraphicsProject[];
  onClose: () => void;
  onSelectProject: (project: GraphicsProject) => void;
}

export const GraphicsModal: React.FC<GraphicsModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject
}) => {
  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleNext = useCallback(() => {
    if (nextProject) onSelectProject(nextProject);
  }, [nextProject, onSelectProject]);

  const handlePrev = useCallback(() => {
    if (prevProject) onSelectProject(prevProject);
  }, [prevProject, onSelectProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, handleNext, handlePrev]);

  // Lock scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} graphic design view`}
    >
      <div
        className="relative w-full max-w-5xl my-auto bg-[#0a0a0d] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-950/90 text-sm">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-xs uppercase font-mono tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {project.category}
            </span>
            <span className="font-semibold text-white truncate max-w-sm sm:max-w-md">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {projects.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                  title="Previous image (Left arrow)"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                  title="Next image (Right arrow)"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <button
              onClick={handleClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors ml-2"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* High Resolution Image Container */}
        <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Details Footer */}
        <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1.5">{project.title}</h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {project.toolsUsed.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
