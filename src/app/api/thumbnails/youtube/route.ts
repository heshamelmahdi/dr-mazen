import { NextRequest, NextResponse } from "next/server";
import { getBestYouTubeThumbnail } from "@/lib/youtube";
import { uploadToS3 } from "@/lib/s3";
import { logger } from "@/lib/logger";
import crypto from "crypto";

/**
 * API endpoint to download a YouTube thumbnail and store it in S3
 * POST /api/thumbnails/youtube
 * Body: { youtubeId: string }
 * Returns: { success: boolean, thumbnailPath: string }
 */
export async function POST(request: NextRequest) {
  try {
    console.log("YouTube thumbnail API: Processing request");
    
    // Parse request body
    const body = await request.json();
    const { youtubeId } = body;
    
    console.log("YouTube thumbnail API: Request body:", body);
    
    if (!youtubeId) {
      console.error("YouTube thumbnail API: Missing youtubeId");
      return NextResponse.json(
        { error: "Missing required field: youtubeId" },
        { status: 400 }
      );
    }
    
    // Get the best thumbnail URL for the YouTube video
    console.log("YouTube thumbnail API: Getting best thumbnail for ID:", youtubeId);
    const thumbnailUrl = await getBestYouTubeThumbnail(youtubeId);
    console.log("YouTube thumbnail API: Got thumbnail URL:", thumbnailUrl);
    
    // Download the thumbnail
    console.log("YouTube thumbnail API: Downloading thumbnail from URL");
    const response = await fetch(thumbnailUrl);
    
    if (!response.ok) {
      const errorText = `Failed to download YouTube thumbnail: ${response.status} ${response.statusText}`;
      console.error(errorText);
      throw new Error(errorText);
    }
    
    // Get the image data as blob
    const imageBlob = await response.blob();
    console.log("YouTube thumbnail API: Downloaded thumbnail blob:", {
      size: imageBlob.size,
      type: imageBlob.type
    });
    
    // Create a File object from the blob
    const filename = `youtube-${youtubeId}-${crypto.randomUUID()}.jpg`;
    const thumbnailFile = new File([imageBlob], filename, { type: 'image/jpeg' });
    
    // Upload to S3
    console.log("YouTube thumbnail API: Uploading to S3");
    const thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
    
    console.log(`YouTube thumbnail API: Upload successful, path: ${thumbnailPath}`);
    logger.info(`YouTube thumbnail downloaded and uploaded to S3: ${thumbnailPath}`, { youtubeId });
    
    return NextResponse.json({ 
      success: true, 
      thumbnailPath 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("YouTube thumbnail API: Error:", errorMessage);
    logger.error('Failed to process YouTube thumbnail', { error: errorMessage }, error as Error);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 