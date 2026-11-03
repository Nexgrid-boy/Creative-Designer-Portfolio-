import { Project } from '../types/project';

/**
 * ============================================================================
 * CENTRALIZED VIDEO PROJECTS DATABASE — projects.ts
 * ============================================================================
 * 
 * Contains Mary Irewunmi's verified original works hosted on Cloudinary.
 * 
 * To add new projects in the future:
 * Add an object to the `PROJECTS` array below with your Cloudinary video URL.
 * ============================================================================
 */

export const PROJECTS: Project[] = [
  {
    id: 'genesis-neural-motion',
    title: 'Genesis: Neural Motion & Kinetic Flow',
    category: 'AI Motion Graphics',
    description: 'Original AI motion graphics and visual storytelling piece by Mary Irewunmi, exploring fluid neural dynamics, futuristic geometry, and kinetic rhythm.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/2026-11-03-163847909_1_ceciig.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/2026-11-03-163847909_1_ceciig.jpg',
    toolsUsed: ['Runway Gen-3', 'Adobe After Effects', 'Cinema 4D', 'ComfyUI'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Mary Irewunmi Original',
    isPlaceholder: false
  },
  {
    id: 'lumina-kinetic-symphony',
    title: 'Lumina: Kinetic Motion & Visual Symphony',
    category: 'AI Video Production',
    description: 'AI-driven kinetic motion piece and visual storytelling sequence by Mary Irewunmi, combining rhythmic pacing, dynamic fluid transitions, and atmospheric visual effects.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165753_yiklxc.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165753_yiklxc.jpg',
    toolsUsed: ['Runway Gen-3', 'Adobe After Effects', 'Cinema 4D', 'Premiere Pro'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Mary Irewunmi Original',
    isPlaceholder: false
  },
  {
    id: 'solaris-cinematic-vision',
    title: 'Solaris: Cinematic Vision & Dynamic Realms',
    category: 'Cinematic AI Videos',
    description: 'Cinematic AI video production by Mary Irewunmi, exploring futuristic environments, continuous camera kinetics, and surreal atmospheric lighting.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165705_nkq1hy.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165705_nkq1hy.jpg',
    toolsUsed: ['Runway Gen-3', 'Adobe After Effects', 'Cinema 4D', 'DaVinci Resolve'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Mary Irewunmi Original',
    isPlaceholder: false
  },
  {
    id: 'metamorphosis-creative-motion',
    title: 'Metamorphosis: Fluid Aesthetics & Abstract Motion',
    category: 'Creative Visuals',
    description: 'Creative visual motion experiment directed by Mary Irewunmi, blending high-concept materiality, generative fluid surfaces, and precision kinetic choreography.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165723_fxasih.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165723_fxasih.jpg',
    toolsUsed: ['Midjourney V6', 'ComfyUI', 'Adobe After Effects', 'Premiere Pro'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Mary Irewunmi Original',
    isPlaceholder: false
  },
  {
    id: 'apex-brand-kinetic-spot',
    title: 'Apex: Dynamic Brand Film & Kinetic Sequence',
    category: 'Product Advertisements',
    description: 'Commercial brand film and dynamic kinetic sequence directed by Mary Irewunmi, combining photorealistic generative lighting, precision camera motion, and high-energy visual rhythm.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165739_xhjph0.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165739_xhjph0.jpg',
    toolsUsed: ['Runway Gen-3', 'Adobe After Effects', 'Cinema 4D', 'Premiere Pro'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Mary Irewunmi Original',
    isPlaceholder: false
  }
];

export const DESIGNER_INFO = {
  name: 'Mary Irewunmi',
  role: 'Creative Designer',
  title: 'Creative Designer',
  photoUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/v1793735279/IMG-20261103-WA0011_ywymdw.jpg',
  tagline: 'Transforming ideas into extraordinary visual experiences through AI, motion and creativity.',
  location: 'Worldwide Remote',
  bio: 'Mary Irewunmi is a Creative Designer specializing in Graphics Design, Motion Design, and AI Motion Design. Blending design fundamentals, kinetic animation timing, and generative AI video tools, she transforms concepts into extraordinary visual experiences.',
  jobs: [
    'Graphics Design',
    'Motion Design',
    'AI Motion Design'
  ],
  socials: [
    { platform: 'YouTube', url: 'https://www.youtube.com/@thedigitaire', username: '@thedigitaire' },
    { platform: 'TikTok', url: 'https://tiktok.com/@thedigitairee', username: '@thedigitairee' }
  ],
  contactEmail: 'maryrewunmi.15@gmail.com'
};

export const INITIAL_PROJECTS = PROJECTS;
