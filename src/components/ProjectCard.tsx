import React, { useState } from 'react';
import { Play, Video, ExternalLink } from 'lucide-react';
import { Project } from '../types/project';
import { getCloudinaryThumbnailUrl } from '../utils/videoUtils';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [imageError, setImageError] = useState(false);

  const thumbnail = project.thumbnailUrl || getCloudinaryThumbnailUrl(project.videoUrl) || (project as any).posterImage || '';
  const description = project.description || (project as any).shortDescription || '';
  const tools = project.toolsUsed || (project as any).tools || [];

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative flex flex-col bg-zinc-950/80 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-amber-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      aria-label={`View ${project.title} video project`}
    >
      {/* Thumbnail Container (16:9) with lazy loading and fallback */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {!imageError && thumbnail ? (
          <img
            src={thumbnail}
            alt={project.title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          /* High-aesthetic styled fallback container */
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-center p-6 text-center">
            <Video className="w-10 h-10 text-amber-400 mb-2 opacity-80" />
            <span className="text-sm font-semibold text-zinc-200">{project.title}</span>
            <span className="text-xs text-zinc-500 mt-1">{project.category}</span>
          </div>
        )}

        {/* Measured Scrim Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/80 group-hover:via-black/15 transition-colors pointer-events-none" />

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shadow-xl shadow-black/60 group-hover:scale-110 group-hover:bg-amber-300 transition-all duration-200">
            <Play className="w-7 h-7 fill-current ml-0.5" />
          </div>
        </div>

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-semibold text-amber-400 border border-amber-500/20">
          {project.category}
        </div>

        {/* Duration badge */}
        {project.duration && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono tabular-nums text-zinc-300 border border-zinc-800">
            {project.duration}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2.5">
            <span className="text-zinc-300 font-medium">{project.year}</span>
            {project.client && (
              <>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-zinc-400 truncate max-w-[180px]">{project.client}</span>
              </>
            )}
          </div>

          {/* Project Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight mb-2.5">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-5">
            {description}
          </p>
        </div>

        {/* Tools and Trigger Footer */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>

          <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1 shrink-0 ml-3">
            <span>Play Video</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
