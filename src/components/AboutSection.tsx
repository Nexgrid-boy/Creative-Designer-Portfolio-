import React from 'react';
import { Palette, PlaySquare, Wand2, Sparkles, Layers } from 'lucide-react';
import { DESIGNER_INFO } from '../data/projects';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#09090c] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3 font-mono">
            <span>Graphics Design</span>
            <span aria-hidden="true">·</span>
            <span>Motion Design</span>
            <span aria-hidden="true">·</span>
            <span>AI Motion Design</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Creative Designer
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed italic">
            &ldquo;{DESIGNER_INFO.tagline}&rdquo;
          </p>
        </div>

        {/* 2-Column Story and Portrait Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Identity Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
              {/* Owner Portrait Frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 mb-6 border border-zinc-800/80 group shadow-2xl">
                <img
                  src={DESIGNER_INFO.photoUrl}
                  alt={`${DESIGNER_INFO.name} - ${DESIGNER_INFO.title}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                {/* Subtle Cinematic Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Viewfinder Corner Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/80 pointer-events-none" />

                {/* Floating Identity Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-800 text-[11px] font-mono">
                  <span className="text-zinc-100 font-semibold truncate">{DESIGNER_INFO.name}</span>
                  <span className="text-amber-400 uppercase tracking-wider text-[10px]">{DESIGNER_INFO.title}</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {DESIGNER_INFO.name}
                </h3>
                <span className="text-xs text-amber-400 font-semibold block mt-1 tracking-wider uppercase font-mono">
                  {DESIGNER_INFO.role}
                </span>

                <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed">
                  {DESIGNER_INFO.bio}
                </p>

                {/* 3 Core Jobs Summary */}
                <div className="mt-6 pt-5 border-t border-zinc-900 space-y-2.5">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-zinc-500 block mb-1">
                    Core Capabilities
                  </span>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <strong className="text-white">Graphics Design:</strong> Brand identity, Swiss layout & vector systems
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <strong className="text-white">Motion Design:</strong> Kinetic typography, 3D titles & commercial video editing
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <strong className="text-white">AI Motion Design:</strong> Generative video direction, neural fluid simulations & visual storytelling
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Detailed Disciplines */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              {/* Job 1: Graphics Design */}
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                      <Palette className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      01. Graphics Design
                    </h4>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono uppercase">Visual Identity</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                  Crafting brand design systems, typographic hierarchies, editorial publications, digital marketing assets, and vector art. Anchored in clean geometry, proportion, and visual clarity.
                </p>
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                  <span>Adobe Illustrator</span>
                  <span aria-hidden="true">·</span>
                  <span>Photoshop</span>
                  <span aria-hidden="true">·</span>
                  <span>InDesign</span>
                  <span aria-hidden="true">·</span>
                  <span>Figma</span>
                </div>
              </div>

              {/* Job 2: Motion Design */}
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                      <PlaySquare className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      02. Motion Design
                    </h4>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono uppercase">Kinetic Animation</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                  Infusing design with motion, pacing, and dynamic weight. Developing broadcast title openers, animated logos, 2D/3D kinetic typography, and high-retention commercial video edits.
                </p>
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                  <span>Adobe After Effects</span>
                  <span aria-hidden="true">·</span>
                  <span>Cinema 4D</span>
                  <span aria-hidden="true">·</span>
                  <span>Premiere Pro</span>
                  <span aria-hidden="true">·</span>
                  <span>Redshift</span>
                </div>
              </div>

              {/* Job 3: AI Motion Design */}
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                      <Wand2 className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      03. AI Motion Design
                    </h4>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono uppercase">Neural Cinema</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                  Directing generative video diffusion models into cinematic motion. Orchestrating camera physics, lighting cues, temporal consistency, and prompt-driven visual storytelling to create extraordinary experiences.
                </p>
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                  <span>Runway Gen-3</span>
                  <span aria-hidden="true">·</span>
                  <span>ComfyUI</span>
                  <span aria-hidden="true">·</span>
                  <span>Midjourney V6</span>
                  <span aria-hidden="true">·</span>
                  <span>Kling AI</span>
                </div>
              </div>
            </div>

            {/* Production Arsenal Matrix */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-zinc-400 mb-4">
                Disciplines & Toolsets
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs font-semibold text-amber-400 block mb-2 font-mono">
                    Graphics Design
                  </span>
                  <ul className="text-xs text-zinc-400 space-y-1.5">
                    <li>Brand Identity Systems</li>
                    <li>Adobe Illustrator & Vector</li>
                    <li>Adobe Photoshop & Retouching</li>
                    <li>Typography & Editorial Layout</li>
                    <li>Figma Digital Design</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs font-semibold text-amber-400 block mb-2 font-mono">
                    Motion Design
                  </span>
                  <ul className="text-xs text-zinc-400 space-y-1.5">
                    <li>Adobe After Effects</li>
                    <li>Cinema 4D & Redshift</li>
                    <li>Kinetic Typography</li>
                    <li>Broadcast Packaging</li>
                    <li>Adobe Premiere Pro Editing</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs font-semibold text-amber-400 block mb-2 font-mono">
                    AI Motion Design
                  </span>
                  <ul className="text-xs text-zinc-400 space-y-1.5">
                    <li>Runway Gen-3 Alpha</li>
                    <li>ComfyUI Pipelines</li>
                    <li>Midjourney V6 Diffusion</li>
                    <li>Kling AI & Luma</li>
                    <li>Prompt Engineering & Motion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
