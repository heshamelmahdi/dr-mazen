// Extract YouTube video ID from URL
export function getYouTubeVideoId(url: string): string | null {
  // Handle various YouTube URL formats including Shorts
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

// Check if a YouTube video exists and is available
export async function checkYouTubeVideoExists(videoId: string): Promise<boolean> {
  try {
    // Use YouTube oEmbed API to check if video exists
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    return response.status === 200;
  } catch (error) {
    console.error("Error checking YouTube video:", error);
    return false;
  }
}

// Get YouTube thumbnail URL from video ID
// YouTube provides several thumbnail options:
// - maxresdefault.jpg (highest quality, may not be available for all videos)
// - hqdefault.jpg (high quality)
// - mqdefault.jpg (medium quality)
// - sddefault.jpg (standard quality)
// - default.jpg (lowest quality)
export function getYouTubeThumbnailUrl(videoId: string, quality: 'max' | 'high' | 'medium' | 'standard' | 'default' = 'high'): string {
  const qualityMap = {
    max: 'maxresdefault.jpg',
    high: 'hqdefault.jpg',
    medium: 'mqdefault.jpg',
    standard: 'sddefault.jpg',
    default: 'default.jpg'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

// Get the highest quality YouTube thumbnail available
export async function getBestYouTubeThumbnail(videoId: string): Promise<string> {
  // Try to fetch the maxres thumbnail first
  const maxresUrl = getYouTubeThumbnailUrl(videoId, 'max');
  
  try {
    const response = await fetch(maxresUrl, { method: 'HEAD' });
    // If maxres is available and not too small, use it
    if (response.ok && parseInt(response.headers.get('content-length') || '0', 10) > 1000) {
      return maxresUrl;
    }
    
    // Fall back to high quality
    return getYouTubeThumbnailUrl(videoId, 'high');
  } catch (error) {
    // If there's any error, fall back to high quality
    return getYouTubeThumbnailUrl(videoId, 'high');
  }
} 