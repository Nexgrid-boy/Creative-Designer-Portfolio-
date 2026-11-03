/**
 * Project Data Types for Mary Irewunmi | Motion Graphics & AI Video Portfolio
 */

export type VideoType = 'mp4' | 'youtube' | 'vimeo';

export type ProjectCategory = 
  | 'All'
  | 'AI Motion Graphics'
  | 'AI Video Production'
  | 'Product Advertisements'
  | 'Cinematic AI Videos'
  | 'Explainer Videos'
  | 'Creative Visuals';

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  description: string;
  videoUrl: string; // Cloudinary secure delivery URL or MP4 stream
  thumbnailUrl: string; // Video thumbnail poster image URL
  toolsUsed: string[];
  year: string;
  featured: boolean;
  
  // Optional metadata for enhanced display & workflow
  client?: string;
  duration?: string;
  isPlaceholder?: boolean;
  placeholderNotice?: string;
  videoType?: VideoType;
  workflowNotes?: string;
  promptTechnique?: string;
}

export type GraphicsCategory = 
  | 'All'
  | 'Brand Identity'
  | 'Typography & Editorial'
  | 'Packaging & Print'
  | 'Poster Art & Key Visuals'
  | 'Digital Vector Art';

export interface GraphicsProject {
  id: string;
  title: string;
  category: Exclude<GraphicsCategory, 'All'>;
  description: string;
  imageUrl: string;
  toolsUsed: string[];
  year: string;
  client?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}
