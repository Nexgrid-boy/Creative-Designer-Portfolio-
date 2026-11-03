import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Copy, 
  Check, 
  Video, 
  FileCode, 
  Trash2, 
  Cloud,
  Layers,
  Sparkles
} from 'lucide-react';
import { Project, ProjectCategory } from '../types/project';

interface ProjectConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onAddProject: (project: Project) => void;
  onRemoveProject: (id: string) => void;
}

const CATEGORIES: Exclude<ProjectCategory, 'All'>[] = [
  'AI Motion Graphics',
  'AI Video Production',
  'Product Advertisements',
  'Cinematic AI Videos',
  'Explainer Videos',
  'Creative Visuals'
];

export const ProjectConfiguratorModal: React.FC<ProjectConfiguratorModalProps> = ({
  isOpen,
  onClose,
  projects,
  onAddProject,
  onRemoveProject
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'guide'>('add');

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<ProjectCategory, 'All'>>('AI Motion Graphics');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');
  const [toolsStr, setToolsStr] = useState('Runway Gen-3, Adobe After Effects, Cinema 4D');
  const [year, setYear] = useState('2026');
  const [featured, setFeatured] = useState(false);
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('00:30');
  const [testPlaying, setTestPlaying] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const generateProjectSnippet = (p: Partial<Project>) => {
    const toolsArr = (toolsStr || 'Runway Gen-3, After Effects')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const safeTitle = p.title || 'My AI Video Project';
    const safeId = safeTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const safeVideo = p.videoUrl || 'https://res.cloudinary.com/your-cloud-name/video/upload/my_video.mp4';
    const safeThumb = p.thumbnailUrl || 'https://res.cloudinary.com/your-cloud-name/image/upload/my_thumb.jpg';

    return `  {
    id: '${safeId}',
    title: '${safeTitle}',
    category: '${p.category || 'AI Motion Graphics'}',
    description: '${p.description || 'Description of creative concept and motion craft.'}',
    videoUrl: '${safeVideo}',
    thumbnailUrl: '${safeThumb}',
    toolsUsed: ${JSON.stringify(toolsArr)},
    year: '${year || '2026'}',
    featured: ${featured}
  },`;
  };

  const handleCopySnippet = () => {
    const snippet = generateProjectSnippet({
      title,
      category,
      videoUrl,
      thumbnailUrl,
      description
    });
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveToPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) return;

    const toolsArr = toolsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject: Project = {
      id: `custom-${Date.now()}`,
      title,
      category,
      description: description || 'Custom AI video showcase project.',
      videoUrl,
      thumbnailUrl:
        thumbnailUrl ||
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><defs><linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%2309090b"/></linearGradient></defs><rect width="1280" height="720" fill="url(%23cg)"/><circle cx="640" cy="360" r="160" fill="none" stroke="%23f59e0b" stroke-width="2"/><text x="640" y="350" fill="%23ffffff" font-family="sans-serif" font-weight="700" font-size="36" text-anchor="middle">${encodeURIComponent(
          title
        )}</text><text x="640" y="395" fill="%2394a3b8" font-family="sans-serif" font-size="18" text-anchor="middle">${category}</text></svg>`,
      duration: duration || '00:30',
      year: year || '2026',
      client: client || 'Personal Reel',
      toolsUsed: toolsArr.length ? toolsArr : ['Runway Gen-3', 'After Effects'],
      featured,
      isPlaceholder: false
    };

    onAddProject(newProject);
    setActiveTab('list');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-auto bg-[#0c0c10] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Cloudinary Video Project Manager
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-zinc-800/80 bg-zinc-950/50">
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'add'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            + Test & Add Cloudinary Video
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'list'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Gallery Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Cloudinary Setup Guide
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* TAB 1: ADD & TEST CLOUDINARY VIDEO */}
          {activeTab === 'add' && (
            <form onSubmit={handleSaveToPreview} className="space-y-5">
              <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-xs text-sky-200">
                Paste your <strong>Cloudinary delivery URL</strong> (<code className="text-sky-300 font-mono">https://res.cloudinary.com/.../video.mp4</code>). The player will immediately validate HTML5 MP4 playback, controls, and volume.
              </div>

              {/* Video URL Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                  Cloudinary Video Delivery URL (MP4) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://res.cloudinary.com/<cloud-name>/video/upload/my_video.mp4"
                    value={videoUrl}
                    onChange={(e) => {
                      setVideoUrl(e.target.value);
                      setTestPlaying(false);
                    }}
                    className="flex-1 px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setTestPlaying(!testPlaying)}
                    disabled={!videoUrl}
                    className="px-4 py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {testPlaying ? 'Hide Test' : 'Test Playback'}
                  </button>
                </div>
              </div>

              {/* Live Test Player if active */}
              {testPlaying && videoUrl && (
                <div className="p-3 bg-black rounded-xl border border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-400 block mb-2">HTML5 Video Player Validation:</span>
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-950 flex items-center justify-center">
                    <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />
                  </div>
                </div>
              )}

              {/* Project Title and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina: Neural Fluidity"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                  Poster / Thumbnail URL (Image)
                </label>
                <input
                  type="url"
                  placeholder="https://res.cloudinary.com/<cloud-name>/image/upload/my_poster.jpg"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Short visual synopsis of the motion project..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Tools and Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Tools Used (comma separated)
                  </label>
                  <input
                    type="text"
                    value={toolsStr}
                    onChange={(e) => setToolsStr(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-zinc-400 mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="00:30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-900 text-amber-400 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="featuredToggle" className="text-xs text-zinc-300 cursor-pointer">
                  Mark as Featured Project in spotlight area
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'TypeScript Code Copied!' : 'Copy Code for projects.ts'}</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Live Gallery Preview</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: CURRENT PROJECTS LIST */}
          {activeTab === 'list' && (
            <div className="space-y-3">
              <span className="text-xs text-zinc-400 block mb-2">
                Currently loaded projects in your portfolio gallery:
              </span>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-400 border border-zinc-800 shrink-0">
                      MP4
                    </span>
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-bold text-white truncate">{proj.title}</h5>
                      <span className="text-[11px] text-zinc-500 truncate block">
                        {proj.category} · {proj.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {proj.featured && (
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Featured
                      </span>
                    )}
                    {proj.isPlaceholder && (
                      <span className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        Demo
                      </span>
                    )}
                    {projects.length > 1 && (
                      <button
                        onClick={() => onRemoveProject(proj.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
                        title="Remove from current gallery preview"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: CLOUDINARY SETUP GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  <span>How to Update projects.ts with Cloudinary</span>
                </h4>
                <p className="text-zinc-400 mb-3">
                  All projects are centralized in <code className="text-amber-300 font-mono">src/data/projects.ts</code>. You can paste your secure delivery URLs into the <code className="text-amber-300 font-mono">PROJECTS</code> array:
                </p>
                <div className="bg-zinc-900 p-3 rounded-lg font-mono text-[11px] text-zinc-300 overflow-x-auto">
                  <pre>{`// In src/data/projects.ts:
{
  id: 'my-commercial-spot',
  title: 'Cyberpunk Neon Genesis',
  category: 'AI Motion Graphics',
  description: 'High-retention 30s teaser spot.',
  videoUrl: 'https://res.cloudinary.com/<your-cloud-name>/video/upload/my_video.mp4',
  thumbnailUrl: 'https://res.cloudinary.com/<your-cloud-name>/image/upload/poster.jpg',
  toolsUsed: ['Runway Gen-3', 'After Effects', 'Cinema 4D'],
  year: '2026',
  featured: true
}`}</pre>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <h5 className="font-semibold text-white">Recommended Cloudinary URL parameters:</h5>
                <ul className="space-y-1.5 text-zinc-400 font-mono text-[11px]">
                  <li>• Use <code>q_auto,f_auto</code> for optimal compression and fast mobile streaming:</li>
                  <li className="text-sky-300 pl-4"><code>https://res.cloudinary.com/cloud/video/upload/q_auto,f_auto/video.mp4</code></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
