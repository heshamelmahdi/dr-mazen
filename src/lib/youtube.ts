// Extract YouTube video ID from URL
export function getYouTubeVideoId(url: string): string | null {
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
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