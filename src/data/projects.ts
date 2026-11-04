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
    id: 'project-neural-motion',
    title: 'Neural Motion & Kinetic Flow',
    category: 'AI Motion Graphics',
    description: 'AI motion graphics and visual storytelling piece exploring fluid dynamics, abstract geometric forms, and kinetic rhythm.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/2026-11-03-163847909_1_ceciig.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/2026-11-03-163847909_1_ceciig.jpg',
    toolsUsed: ['Runway Gen-3', 'After Effects', 'Cinema 4D'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Motion Showcase',
    isPlaceholder: false
  },
  {
    id: 'project-kinetic-symphony',
    title: 'Kinetic Motion & Visual Symphony',
    category: 'AI Video Production',
    description: 'Kinetic motion sequence combining rhythmic pacing, dynamic visual transitions, and atmospheric effects.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165753_yiklxc.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165753_yiklxc.jpg',
    toolsUsed: ['Runway Gen-3', 'After Effects', 'Premiere Pro'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Motion Showcase',
    isPlaceholder: false
  },
  {
    id: 'project-cinematic-vision',
    title: 'Cinematic Vision & Creative Realms',
    category: 'Cinematic AI Videos',
    description: 'Cinematic video production exploring dynamic camera kinetics, atmospheric lighting, and visual environment design.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165705_nkq1hy.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165705_nkq1hy.jpg',
    toolsUsed: ['Runway Gen-3', 'After Effects', 'DaVinci Resolve'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Creative Piece',
    isPlaceholder: false
  },
  {
    id: 'project-fluid-aesthetics',
    title: 'Fluid Aesthetics & Motion Dynamics',
    category: 'Creative Visuals',
    description: 'Creative visual motion piece blending high-concept materiality, fluid surfaces, and precision kinetic choreography.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165723_fxasih.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165723_fxasih.jpg',
    toolsUsed: ['Midjourney V6', 'ComfyUI', 'After Effects'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Visual Exploration',
    isPlaceholder: false
  },
  {
    id: 'project-brand-kinetic-spot',
    title: 'Brand Film & Kinetic Sequence',
    category: 'Product Advertisements',
    description: 'Dynamic brand film combining photorealistic lighting, precision camera motion, and high-energy visual rhythm.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165739_xhjph0.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165739_xhjph0.jpg',
    toolsUsed: ['Runway Gen-3', 'After Effects', 'Cinema 4D'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Commercial Sequence',
    isPlaceholder: false
  },
  {
    id: 'project-rhythmic-ai-motion',
    title: 'Rhythmic AI Motion & Spatial Dynamics',
    category: 'AI Motion Graphics',
    description: 'Dynamic kinetic AI motion sequence exploring spatial transitions, generative illumination, and fluid visual choreography.',
    videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165934_ria93i.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165934_ria93i.jpg',
    toolsUsed: ['Runway Gen-3', 'After Effects', 'Cinema 4D'],
    year: '2026',
    featured: true,
    duration: '00:30',
    client: 'Featured Showcase',
    isPlaceholder: false
  }
];

export const HERO_BACKGROUND_VIDEO = {
  id: 'project-rhythmic-ai-motion',
  title: 'Rhythmic AI Motion & Spatial Dynamics',
  videoUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/q_auto,f_auto/lv_0_20261103165934_ria93i.mp4',
  posterUrl: 'https://res.cloudinary.com/qfne5rap/video/upload/so_0,q_auto,f_auto/lv_0_20261103165934_ria93i.jpg'
};

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
