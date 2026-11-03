import React from 'react';
import { Lightbulb, Cpu, Layers, Disc3 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    name: 'Ideation & AI Storyboarding',
    icon: Lightbulb,
    description: 'We develop the core visual thesis, cinematic script, and moodboards using Midjourney V6 and custom style seeds to lock in character look, color temperature, and atmospheric tone.'
  },
  {
    step: '02',
    name: 'Neural Synthesis & Video Direction',
    icon: Cpu,
    description: 'Directing camera physics, lighting cues, and character motion in Runway Gen-3 Alpha and ComfyUI. We utilize speed ramps and optical motion brushes to prevent morphing.'
  },
  {
    step: '03',
    name: 'Motion Graphics & 3D Compositing',
    icon: Layers,
    description: 'Raw generative plates are brought into After Effects and Cinema 4D for 3D camera tracking, vector motion design, kinetic type, screen replacements, and UI telemetry passes.'
  },
  {
    step: '04',
    name: '4K Mastering & Sound Design',
    icon: Disc3,
    description: 'Color grading in DaVinci Resolve using ACES color space, AI neural upscaling to pristine 4K UHD 60fps, and custom sound design mixed to professional broadcast loudness.'
  }
];

export const PipelineSection: React.FC = () => {
  return (
    <section id="pipeline" className="py-24 sm:py-32 relative bg-[#09090c] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
            <span>Workflow</span>
            <span aria-hidden="true">·</span>
            <span>Production Pipeline</span>
            <span aria-hidden="true">·</span>
            <span>Quality Assurance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Creative Production Pipeline
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            A structured 4-phase methodology uniting precision graphic design, kinetic motion animation, and state-of-the-art AI video generation.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      STEP {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                      <IconComponent className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <span>PHASE {item.step} VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
