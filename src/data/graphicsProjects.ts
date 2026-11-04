import { GraphicsProject } from '../types/project';

/**
 * ============================================================================
 * CENTRALIZED GRAPHICS DESIGN DATABASE — graphicsProjects.ts
 * ============================================================================
 * 
 * Mary Irewunmi's graphic design, brand systems, typography, and vector works.
 * Hosted on Cloudinary.
 * ============================================================================
 */

export const GRAPHICS_PROJECTS: GraphicsProject[] = [
  {
    id: 'graphics-brand-identity-system',
    title: 'Brand Visual Identity & System Design',
    category: 'Brand Identity',
    description: 'Comprehensive brand identity framework featuring precision geometric marks, modernist typography, and cohesive visual language.',
    imageUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/f_auto/q_auto/1_sm4ljl.png',
    toolsUsed: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    year: '2026',
    client: 'Brand System',
    aspectRatio: 'square'
  },
  {
    id: 'graphics-dark-editorial-key-visual',
    title: 'Dark Celestial Editorial & Key Visual',
    category: 'Poster Art & Key Visuals',
    description: 'Editorial campaign key visual and social release featuring high-contrast typography, celestial atmosphere, and luxury dark aesthetics.',
    imageUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/f_auto/q_auto/Dark_New_Month_Greetings_Instagram_Post_gtmjqh.png',
    toolsUsed: ['Adobe Photoshop', 'Illustrator'],
    year: '2026',
    client: 'Editorial Series',
    aspectRatio: 'portrait'
  },
  {
    id: 'graphics-typography-editorial-spread',
    title: 'Kinetic Typography & Editorial Publication',
    category: 'Typography & Editorial',
    description: 'Editorial typography design exploring hierarchical structure, Swiss grid tension, and refined publication pacing.',
    imageUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/f_auto/q_auto/1_sm4ljl.png',
    toolsUsed: ['Adobe InDesign', 'Illustrator', 'Figma'],
    year: '2026',
    client: 'Publication Layout',
    aspectRatio: 'square'
  },
  {
    id: 'graphics-celestial-campaign-print',
    title: 'New Month Greetings & Campaign Key Art',
    category: 'Packaging & Print',
    description: 'Luxury print-ready key art and commemorative campaign greeting balancing negative space, metallic accents, and elegant typography.',
    imageUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/f_auto/q_auto/Dark_New_Month_Greetings_Instagram_Post_gtmjqh.png',
    toolsUsed: ['Adobe Illustrator', 'Photoshop'],
    year: '2026',
    client: 'Commemorative Art',
    aspectRatio: 'portrait'
  },
  {
    id: 'graphics-digital-vector-composition',
    title: 'Geometric Vector Composition & Brand Mark',
    category: 'Digital Vector Art',
    description: 'Digital vector art piece exploring mathematical symmetry, clean curve construction, and scalable brand mark aesthetics.',
    imageUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/f_auto/q_auto/1_sm4ljl.png',
    toolsUsed: ['Adobe Illustrator', 'Figma'],
    year: '2026',
    client: 'Vector Art',
    aspectRatio: 'square'
  }
];
