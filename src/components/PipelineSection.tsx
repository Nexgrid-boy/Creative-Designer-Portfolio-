import React from 'react';
import { Lightbulb, Cpu, Layers, Disc3 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    name: 'Concept & Visual Direction',
    icon: Lightbulb,
    description: 'Developing the visual thesis, typographic structure, style frames, and color palettes to establish a cohesive aesthetic foundation.'
  },
  {
    step: '02',
    name: 'Generative Synthesis & Assets',
    icon: Cpu,
    description: 'Prompt crafting, neural video generation, and high-fidelity texture creation to produce rich cinematic plates and background elements.'
  },
  {
    step: '03',
    name: 'Motion Design & Choreography',
    icon: Layers,
    description: 'Kinetic typography, vector animation, 2D/3D motion passes, and camera staging crafted with fluid timing and rhythm in After Effects and Cinema 4D.'
  },
  {
    step: '04',
    name: 'Finishing & Multi-Format Delivery',
    icon: Disc3,
    description: 'Final color grading, sound synchronization, and multi-format exports optimized for web, social feeds (16:9, 9:16), and presentation.'
  }
];

export const PipelineSection: React.FC = () => {
  return (
    <section id="pipeline" className="py-24 sm:py-32 relative bg-[#09090c] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3 font-mono">
            <span>Workflow</span>
            <span aria-hidden="true">·</span>
            <span>Creative Process</span>
            <span aria-hidden="true">·</span>
            <span>Concept to Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Creative Production Workflow
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            A disciplined 4-step creative process translating ideas into polished graphics, kinetic motion, and generative visual stories.
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
