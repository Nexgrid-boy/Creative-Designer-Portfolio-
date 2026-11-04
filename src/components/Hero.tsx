import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { DESIGNER_INFO, HERO_BACKGROUND_VIDEO } from '../data/projects';

interface HeroProps {
  onWatchHeroVideo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchHeroVideo }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Check user accessibility preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Ensure autoplay starts reliably
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted until user interaction
        setIsPlaying(false);
      });
    }
  }, [prefersReducedMotion]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Ambient Kinetic Motion Graphics Canvas (Abstract particles and undulating light ribbons)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle field
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(245, 158, 11,' : 'rgba(56, 189, 248,' // amber & cyan
    }));

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw undulating kinetic wave ribbons
      const drawWave = (
        baseY: number,
        amplitude: number,
        frequency: number,
        phase: number,
        strokeColor: string,
        lineWidth: number
      ) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const y =
            baseY +
            Math.sin(x * frequency + time + phase) * amplitude +
            Math.cos((x * frequency * 0.5) + time * 0.8) * (amplitude * 0.5);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      // Multi-layered abstract curves
      drawWave(height * 0.52, 60, 0.0018, 0, 'rgba(245, 158, 11, 0.18)', 2.5);
      drawWave(height * 0.55, 75, 0.0014, 1.8, 'rgba(217, 119, 6, 0.12)', 2);
      drawWave(height * 0.48, 50, 0.0022, 3.2, 'rgba(56, 189, 248, 0.12)', 1.5);
      drawWave(height * 0.60, 85, 0.0011, 4.5, 'rgba(251, 191, 36, 0.08)', 1);

      // 2. Render kinetic glowing particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#070709]">
      {/* 1. CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster={HERO_BACKGROUND_VIDEO.posterUrl}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 scale-[1.02] filter brightness-[0.72] contrast-[1.08] ${
            isVideoLoaded ? 'opacity-80' : 'opacity-40'
          }`}
        >
          <source src={HERO_BACKGROUND_VIDEO.videoUrl} type="video/mp4" />
        </video>

        {/* Ambient Generative Motion Particle Overlay on top of video */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Multi-Layer Dark Transparent Overlays to ensure pristine text contrast */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-gradient-to-b from-[#070709]/85 via-[#070709]/55 to-[#070709]/95 z-10 pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,7,9,0.35)_0%,rgba(7,7,9,0.85)_100%)] z-10 pointer-events-none" 
      />

      {/* Subtle warm amber glowing ambient light behind headline */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-500/12 blur-[160px] pointer-events-none rounded-full z-10" 
      />

      {/* Floating Background Video Controls (Bottom-Right on desktop, Bottom-Right on mobile) */}
      <div className="absolute bottom-8 right-6 sm:right-8 z-30 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md shadow-xl text-xs text-zinc-300">
          <span className="relative flex h-2 w-2 mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="hidden sm:inline font-mono text-[11px] text-zinc-400 uppercase tracking-wider mr-1">
            BG REEL
          </span>

          {/* Play / Pause toggle */}
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 transition-colors"
            title={isPlaying ? 'Pause background video' : 'Play background video'}
            aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Mute / Unmute toggle */}
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 transition-colors"
            title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Fullscreen Theater Preview button if provided */}
          {onWatchHeroVideo && (
            <button
              onClick={onWatchHeroVideo}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 transition-colors ml-0.5"
              title="Open video in cinema theater"
              aria-label="Open video in cinema theater"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. HERO CONTENT CONTAINER */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 py-32 text-center flex flex-col items-center">
        {/* The 3 jobs / capabilities badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-700/60 backdrop-blur-md mb-6 animate-in fade-in duration-500 shadow-lg shadow-black/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs uppercase tracking-widest font-semibold text-zinc-300">
            Graphics Design · Motion Design · AI Motion Design
          </span>
        </div>

        {/* WEBSITE OWNER NAME: MARY IREWUNMI */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase mb-4 drop-shadow-2xl">
          <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {DESIGNER_INFO.name}
          </span>
        </h1>

        {/* OWNER TITLE: CREATIVE DESIGNER */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-[0.25em] uppercase text-amber-400/95 font-mono">
            {DESIGNER_INFO.title}
          </h2>
        </div>

        {/* EXACT TAGLINE / QUOTE */}
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light max-w-3xl leading-relaxed mb-10 tracking-wide">
          &ldquo;Transforming ideas into extraordinary visual experiences through AI, motion and creativity.&rdquo;
        </p>

        {/* TWO PROMINENT BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Button 1: EXPLORE MY WORKS (Smoothly scrolls to Selected Works gallery) */}
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>EXPLORE MY WORKS</span>
            <ArrowDown className="w-4 h-4 text-zinc-950" />
          </a>

          {/* Button 2: LET'S WORK TOGETHER (Smoothly scrolls to Contact section) */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white hover:text-amber-300 border border-zinc-700/80 hover:border-amber-400/50 font-bold text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>LET&apos;S WORK TOGETHER</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>
      </div>

      {/* Floating Scroll Down Indicator (Bottom Center) */}
      <a
        href="#projects"
        onClick={(e) => scrollToSection(e, 'projects')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors group cursor-pointer"
        aria-label="Scroll to Project Works section"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em]">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1 group-hover:border-amber-400 transition-colors">
          <div className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
        </div>
      </a>
    </section>
  );
};
