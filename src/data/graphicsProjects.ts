import { GraphicsProject } from '../types/project';

/**
 * ============================================================================
 * CENTRALIZED GRAPHICS DESIGN DATABASE — graphicsProjects.ts
 * ============================================================================
 * 
 * Mary Irewunmi's graphic design, brand systems, typography, and vector works.
 * Hosted on Cloudinary. Contains exclusively the 4 user-specified projects.
 * ============================================================================
 */

export const GRAPHICS_PROJECTS: GraphicsProject[] = [
  {
    id: 'graphics-dark-new-month-greetings',
    title: 'Dark New Month Greetings — Editorial Post',
    category: 'Poster Art & Key Visuals',
    description: 'High-contrast dark editorial key visual and social campaign art featuring atmospheric lighting, layered depth, and luxury typography.',
    imageUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/f_auto/q_auto/Dark_New_Month_Greetings_Instagram_Post_gtmjqh.png',
    toolsUsed: ['Adobe Photoshop', 'Illustrator'],
    year: '2026',
    client: 'Editorial Series',
    aspectRatio: 'portrait'
  },
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
    id: 'graphics-farm-animals-modern-logo',
    title: 'Grey & Brown Farm Animals Modern Logo',
    category: 'Digital Vector Art',
    description: 'Minimalist brand emblem combining rustic warmth with contemporary geometric vector construction for an artisan agriculture brand.',
    imageUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/v1793741380/Grey_and_Brown_Farm_Animals_Modern_Logo_q1mq1c.png',
    toolsUsed: ['Adobe Illustrator', 'Vector Art'],
    year: '2026',
    client: 'Organic Agriculture',
    aspectRatio: 'square'
  },
  {
    id: 'graphics-fashion-brand-art-design-logo',
    title: 'Fashion Brand Art & Design Logo',
    category: 'Packaging & Print',
    description: 'High-fashion modern insignia and luxury typographic signature crafted for haute couture editorial and premium retail packaging.',
    imageUrl: 'https://res.cloudinary.com/qfne5rap/image/upload/v1793741380/Fashion_Brand_Art_Design_Logo_daxnb1.png',
    toolsUsed: ['Adobe Illustrator', 'Typography'],
    year: '2026',
    client: 'Haute Couture Label',
    aspectRatio: 'square'
  }
];
