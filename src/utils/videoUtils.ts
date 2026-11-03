import { VideoType } from '../types/project';

/**
 * Parses Cloudinary player URL and extracts cloud_name and public_id
 */
export function parseCloudinaryUrl(url: string): { cloudName: string; publicId: string } | null {
  if (!url) return null;
  
  // Format 1: player.cloudinary.com/embed/?cloud_name=XXX&public_id=YYY
  if (url.includes('player.cloudinary.com/embed')) {
    try {
      const urlObj = new URL(url);
      const cloudName = urlObj.searchParams.get('cloud_name');
      const publicId = urlObj.searchParams.get('public_id');
      if (cloudName && publicId) {
        return { cloudName, publicId };
      }
    } catch (e) {
      // fallback regex
      const cloudMatch = url.match(/cloud_name=([^&]+)/);
      const idMatch = url.match(/public_id=([^&]+)/);
      if (cloudMatch && idMatch) {
        return { cloudName: cloudMatch[1], publicId: idMatch[1] };
      }
    }
  }

  // Format 2: res.cloudinary.com/<cloudName>/video/upload/.../<publicId>.(mp4|webm)
  const resMatch = url.match(/res\.cloudinary\.com\/([^/]+)\/video\/upload\/(?:(?:v\d+\/|[a-z0-9_,]+\/)*)([^./]+)/);
  if (resMatch) {
    return { cloudName: resMatch[1], publicId: resMatch[2] };
  }

  return null;
}

/**
 * Returns a direct MP4 streaming URL from any Cloudinary URL
 */
export function getCloudinaryMp4Url(url: string): string {
  const parsed = parseCloudinaryUrl(url);
  if (parsed) {
    return `https://res.cloudinary.com/${parsed.cloudName}/video/upload/q_auto,f_auto/${parsed.publicId}.mp4`;
  }
  return url;
}

/**
 * Returns an automatic thumbnail poster URL from a Cloudinary URL
 */
export function getCloudinaryThumbnailUrl(url: string): string {
  const parsed = parseCloudinaryUrl(url);
  if (parsed) {
    return `https://res.cloudinary.com/${parsed.cloudName}/video/upload/so_0,q_auto,f_auto/${parsed.publicId}.jpg`;
  }
  return '';
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

/**
 * Extracts Vimeo video ID from various Vimeo URL formats
 */
export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Automatically detects the video type based on the URL
 */
export function detectVideoType(url: string): VideoType {
  if (!url) return 'mp4';
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }
  return 'mp4';
}

/**
 * Returns clean embed URL with optimal player parameters
 */
export function getEmbedUrl(type: VideoType, url: string, autoplay = true): string {
  if (type === 'youtube') {
    const videoId = extractYouTubeId(url);
    if (!videoId) return url;
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
  }
  
  if (type === 'vimeo') {
    const videoId = extractVimeoId(url);
    if (!videoId) return url;
    return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&title=0&byline=0&portrait=0&color=f59e0b`;
  }

  // Cloudinary embed player support
  if (url.includes('player.cloudinary.com/embed')) {
    return `${url}&autoplay=${autoplay ? 'true' : 'false'}`;
  }

  return url;
}

/**
 * Formats seconds into MM:SS
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
