import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink,
  Cpu,
  Layers,
  SlidersHorizontal,
  Cloud
} from 'lucide-react';
import { Project } from '../types/project';
import { getEmbedUrl, formatTime, getCloudinaryMp4Url, getCloudinaryThumbnailUrl } from '../utils/videoUtils';

interface VideoModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenConfigurator: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject,
  onOpenConfigurator
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'specs'>('overview');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find index for prev/next navigation
  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    onClose();
  }, [onClose]);

  const handleNext = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (nextProject) {
      onSelectProject(nextProject);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [nextProject, onSelectProject]);

  const handlePrev = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (prevProject) {
      onSelectProject(prevProject);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [prevProject, onSelectProject]);

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  // Reset video state when project changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [project?.id]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.volume = volume || 0.7;
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  const copyConfigSnippet = () => {
    if (!project) return;
    const tools = project.toolsUsed || (project as any).tools || [];
    const snippet = `// In src/data/projects.ts:
{
  id: '${project.id}',
  title: '${project.title}',
  category: '${project.category}',
  description: '${project.description || (project as any).shortDescription}',
  videoUrl: '${project.videoUrl}',
  thumbnailUrl: '${project.thumbnailUrl || (project as any).posterImage}',
  toolsUsed: ${JSON.stringify(tools)},
  year: '${project.year}',
  featured: ${project.featured ?? true}
}`;
    navigator.clipboard.writeText(snippet);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  if (!project) return null;

  const resolvedVideoUrl = getCloudinaryMp4Url(project.videoUrl) || project.videoUrl;
  const thumbnail = project.thumbnailUrl || getCloudinaryThumbnailUrl(project.videoUrl) || (project as any).posterImage;
  const description = project.description || (project as any).shortDescription;
  const tools = project.toolsUsed || (project as any).tools || [];
  const isEmbed = project.videoType === 'youtube' || project.videoType === 'vimeo';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} video player`}
    >
      {/* Lightbox Shell */}
      <div
        className="relative w-full max-w-5xl my-auto bg-[#0a0a0d] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
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
            {/* Prev / Next Controls */}
            <button
              onClick={handlePrev}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
              title="Previous project (Left arrow)"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
              title="Next project (Right arrow)"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Close Button */}
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

        {/* Video Player Display Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden"
        >
          {/* HTML5 Native Video Player for Cloudinary MP4 */}
          {!isEmbed ? (
            <>
              <video
                ref={videoRef}
                src={resolvedVideoUrl}
                poster={thumbnail}
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
                loop={isLooping}
                playsInline
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Central big play/pause button when paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shadow-2xl shadow-amber-500/30 hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-9 h-9 fill-current ml-1" />
                </button>
              )}

              {/* Custom Cinema Bottom Control Bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-200 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Progress Scrub Bar */}
                <div className="relative flex items-center mb-3 group/scrub">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-amber-400 group-hover/scrub:h-2.5 transition-all"
                    aria-label="Seek video progress"
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-zinc-300 text-xs">
                  <div className="flex items-center gap-4">
                    {/* Play / Pause button */}
                    <button
                      onClick={togglePlay}
                      className="p-1 hover:text-amber-400 transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    {/* Volume and Mute */}
                    <div className="flex items-center gap-2 group/vol">
                      <button
                        onClick={toggleMute}
                        className="p-1 hover:text-amber-400 transition-colors cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        aria-label="Volume slider"
                      />
                    </div>

                    {/* Timestamp */}
                    <div className="font-mono tabular-nums text-zinc-400 text-xs">
                      <span className="text-white">{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Cloudinary indicator */}
                    <div className="hidden sm:flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                      <Cloud className="w-3 h-3 text-sky-400" />
                      <span>Cloudinary MP4</span>
                    </div>

                    {/* Playback speed selector */}
                    <button
                      onClick={handleSpeedChange}
                      className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-[11px] transition-colors cursor-pointer"
                      title="Toggle playback speed"
                    >
                      {playbackRate}x
                    </button>

                    {/* Loop toggle */}
                    <button
                      onClick={() => setIsLooping(!isLooping)}
                      className={`p-1 transition-colors cursor-pointer ${isLooping ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                      title={isLooping ? 'Looping enabled' : 'Looping disabled'}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Fullscreen toggle */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1 hover:text-amber-400 transition-colors cursor-pointer"
                      title="Fullscreen"
                      aria-label="Toggle fullscreen"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* External Embed Player (if YouTube or Vimeo is specified) */
            <iframe
              src={getEmbedUrl(project.videoType!, project.videoUrl, true)}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Project Details Pane */}
        <div className="p-6 bg-zinc-950 text-zinc-300">
          {/* Detail Tabs */}
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Overview & Concept
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'workflow'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              AI Workflow & Tools
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Delivery Specifications
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-150">
              <div className="md:col-span-2">
                <h4 className="text-sm font-semibold text-white mb-2">Project Synopsis</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/80 text-xs">
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-mono">Client / Context</span>
                  <span className="text-zinc-200 font-medium">{project.client || 'Portfolio Production'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-mono">Year & Duration</span>
                  <span className="text-zinc-200 font-medium font-mono">{project.year} · {project.duration || '00:30'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-mono">Hosting</span>
                  <span className="text-zinc-200 font-medium font-mono text-[11px] truncate block">
                    Cloudinary Secure CDN
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: AI Workflow */}
          {activeTab === 'workflow' && (
            <div className="space-y-4 animate-in fade-in duration-150 text-sm">
              <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                <h5 className="text-xs uppercase font-mono tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Tools & Generative Pipeline</span>
                </h5>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Engineered using a hybrid pipeline of {tools.join(', ')}. Chaining diffusion models with vector typography, 3D tracking, and high-retention editing.
                </p>
              </div>

              <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                <h5 className="text-xs uppercase font-mono tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Creative Direction</span>
                </h5>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {project.workflowNotes || 'Curated color science, dynamic speed ramps, and frame-accurate timing to eliminate AI artifacts and preserve broadcast fidelity.'}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Technical Specs */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in duration-150">
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 text-[11px] block font-mono uppercase">Master Codec</span>
                <span className="text-zinc-200 font-semibold text-sm font-mono">H.264 / MP4 (4K)</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 text-[11px] block font-mono uppercase">CDN Delivery</span>
                <span className="text-zinc-200 font-semibold text-sm font-mono">Cloudinary q_auto</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 text-[11px] block font-mono uppercase">Audio Fidelity</span>
                <span className="text-zinc-200 font-semibold text-sm font-mono">24-bit 48kHz Stereo</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 text-[11px] block font-mono uppercase">Color Grading</span>
                <span className="text-zinc-200 font-semibold text-sm font-mono">DaVinci Resolve ACES</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
