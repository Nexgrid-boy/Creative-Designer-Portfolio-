import React from 'react';
import { ArrowUpRight, Check, Palette, PlaySquare, Wand2, Layers } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const SERVICES = [
  {
    number: '01',
    title: 'Graphics Design & Brand Systems',
    category: 'Graphics Design',
    description:
      'Complete visual identity systems, Swiss-inspired typographic architecture, editorial layouts, poster art, packaging, and digital key visuals crafted with meticulous attention to form and detail.',
    deliverables: [
      'Comprehensive Brand Identity & Guidelines',
      'Custom Typography & Vector Iconography',
      'Editorial Layouts & Digital Marketing Collateral',
      'Print-Ready & Web Vector Assets (Figma, AI, PDF)'
    ],
    timeline: '1–2 weeks turnaround'
  },
  {
    number: '02',
    title: 'Motion Design & Dynamic Animation',
    category: 'Motion Design',
    description:
      'Expressive 2D and 3D kinetic typography, broadcast openers, event title packages, dynamic logo animations, and smooth UI motion designed to captivate viewers with flawless timing and weight.',
    deliverables: [
      '2D/3D Kinetic Typography & Logo Animation',
      'Broadcast Packaging & Conference Stingers',
      'Commercial Social Motion Reels & Promo Edits',
      'Vector Animation & ProRes 4444 Alpha Channel Output'
    ],
    timeline: '5–10 business days'
  },
  {
    number: '03',
    title: 'AI Motion Design & Generative Video',
    category: 'AI Motion Design',
    description:
      'Next-generation video production powered by neural diffusion models. From prompt-crafted cinematic commercials to surreal narrative shorts, character consistency, and atmospheric worldbuilding.',
    deliverables: [
      'AI Script-to-Screen Direction & Storyboarding',
      'Neural Video Generation (Runway Gen-3, ComfyUI, Kling)',
      'Character & Aesthetic Continuity Across Scenes',
      '4K HDR Video Output & Original Audio Synchronization'
    ],
    timeline: '1–3 weeks turnaround'
  },
  {
    number: '04',
    title: 'Integrated Creative Direction',
    category: 'Hybrid Direction',
    description:
      'The ultimate synthesis of Graphics Design, Motion Design, and AI Motion Design. End-to-end creative leadership for brand launches, album campaigns, and high-stakes multimedia experiences.',
    deliverables: [
      'Full Creative Concept & Art Direction',
      'Unified Static & Kinetic Asset Suite',
      'Multi-Format Deliverables (16:9, 9:16, 1:1)',
      'Direct Collaboration & Dedicated Review Iterations'
    ],
    timeline: '2–4 weeks turnaround'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 sm:py-32 relative bg-[#070709] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
            <span>Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Creative Services</span>
            <span aria-hidden="true">·</span>
            <span>Graphics · Motion · AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Creative Design Services
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
            Tailored creative services across graphics design, motion design, and generative AI motion design for global brands, agencies, and innovative creators.
          </p>
        </div>

        {/* 2x2 Services Grid with Single Elevation and Natural Editorial Numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Natural Editorial Numbering */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                    {service.number}. {service.category}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {service.timeline}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 mb-8 pt-4 border-t border-zinc-900">
                  <span className="text-xs uppercase font-mono tracking-wider text-zinc-500 block mb-2">
                    Key Deliverables:
                  </span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Action */}
              <button
                type="button"
                onClick={() => onSelectService(service.title)}
                className="inline-flex items-center justify-between w-full px-4 py-3 text-xs font-semibold text-zinc-200 bg-zinc-900 group-hover:bg-zinc-800 border border-zinc-800 group-hover:border-zinc-700 rounded-xl transition-all"
              >
                <span>Inquire About This Service</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
