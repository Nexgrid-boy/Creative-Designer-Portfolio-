import React from 'react';
import { ArrowUp, Video } from 'lucide-react';
import { DESIGNER_INFO } from '../data/projects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#050507] border-t border-zinc-900 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-sm"></span>
            <span className="font-bold text-white tracking-tight">MARY IREWUNMI</span>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="text-zinc-400">Creative Designer</span>
          </div>

          {/* Clean text nav links */}
          <nav className="flex items-center gap-6 text-zinc-400 font-medium">
            <a href="#projects" className="hover:text-white transition-colors">
              Project Works
            </a>
            <a href="#graphics" className="hover:text-white transition-colors">
              Graphics Design
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#pipeline" className="hover:text-white transition-colors">
              Pipeline
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Socials, Contact Email, Copyright & Back to Top */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3 text-xs">
              <a
                href={`mailto:${DESIGNER_INFO.contactEmail}`}
                className="text-zinc-400 hover:text-amber-400 transition-colors font-mono hidden sm:inline"
              >
                {DESIGNER_INFO.contactEmail}
              </a>
              <span className="text-zinc-700 hidden sm:inline">·</span>
              <a
                href="https://www.youtube.com/@thedigitaire"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors"
              >
                YouTube
              </a>
              <a
                href="https://tiktok.com/@thedigitairee"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                TikTok
              </a>
            </div>

            <span className="text-zinc-500">
              © {new Date().getFullYear()} {DESIGNER_INFO.name}
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
