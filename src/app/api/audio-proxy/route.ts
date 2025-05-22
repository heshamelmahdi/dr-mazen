import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getS3PresignedUrl } from '@/lib/s3';

/**
 * Audio proxy endpoint for secure access to audio files
 * This endpoint verifies authentication and generates presigned URLs for accessing S3 audio files
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');
  
  if (!path) {
    return NextResponse.json(
      { error: 'Missing path parameter' },
      { status: 400 }
    );
  }

  // Authenticate the user
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Validate the path to prevent abuse (e.g., accessing non-audio files)
    if (!path.startsWith('qa-audio/') && !path.startsWith('uploads/audio/')) {
      return NextResponse.json(
        { error: 'Invalid audio path' },
        { status: 403 }
      );
    }
    
    // Generate a presigned URL for the S3 audio file
    // Short expiration time for security
    const presignedUrl = await getS3PresignedUrl(path, 3600); // 1 hour expiration
    
    // Return the URL to the client
    return NextResponse.json({ url: presignedUrl });
  } catch (error) {
    console.error('Error generating audio URL:', error);
    return NextResponse.json(
      { error: 'Failed to access audio file' },
      { status: 500 }
    );
  }
} 