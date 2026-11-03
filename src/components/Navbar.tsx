import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { DESIGNER_INFO } from '../data/projects';

interface NavbarProps {
  onOpenShowreel: () => void;
  onOpenConfigurator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShowreel, onOpenConfigurator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#070709]/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Owner Avatar */}
          <a
            href="#"
            className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
          >
            <img
              src={DESIGNER_INFO.photoUrl}
              alt={DESIGNER_INFO.name}
              className="w-7 h-7 rounded-full object-cover border border-amber-400/60 shadow-sm shrink-0"
            />
            <span>MARY IREWUNMI</span>
          </a>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a
              href="#projects"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Selected Works
            </a>
            <a
              href="#graphics"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Graphics Design
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#pipeline"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Pipeline
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Book Project
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 border-t border-zinc-800 bg-[#09090c] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in duration-150">
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-200 hover:text-amber-400 py-1"
            >
              Selected Works (Video)
            </a>
            <a
              href="#graphics"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-200 hover:text-amber-400 py-1"
            >
              Graphics Design
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-200 hover:text-amber-400 py-1"
            >
              About Me
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-200 hover:text-amber-400 py-1"
            >
              Creative Services
            </a>
            <a
              href="#pipeline"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-200 hover:text-amber-400 py-1"
            >
              Production Pipeline
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-200 hover:text-amber-400 py-1"
            >
              Contact & Inquiry
            </a>
            <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 text-sm font-semibold text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Book Project
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
