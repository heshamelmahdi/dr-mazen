# Program Explanation Page

This document outlines the implementation details for the Program Explanation page of the nutrition website.

## Overview

The Program Explanation page displays a series of educational videos about nutrition concepts that should be watched in sequence. It tracks user progress through the videos and provides a clear, organized interface for navigating the educational content.

## File Location

```
src/app/program/page.tsx
```

## Page Structure

The Program Explanation page will be implemented as a server component that fetches video data and user progress, then passes this data to client components for rendering.

## Components

### ProgramPage (Server Component)

```typescript
// src/app/program/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProgramContent from "@/components/program/program-content";

export default async function ProgramPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if client's subscription is expired
  if (
    session.user.role === "CLIENT" && 
    session.user.subscriptionEndDate && 
    new Date(session.user.subscriptionEndDate) < new Date()
  ) {
    redirect("/subscription-expired");
  }
  
  // Fetch all active program videos in sequence order
  const videos = await prisma.programVideo.findMany({
    where: { isActive: true },
    orderBy: { sequenceNumber: 'asc' }
  });
  
  // Fetch user's progress for all videos
  const progress = await prisma.videoProgress.findMany({
    where: { userId: session.user.id },
  });
  
  // Map progress to videos
  const videosWithProgress = videos.map(video => {
    const videoProgress = progress.find(p => p.videoId === video.id);
    return {
      ...video,
      progress: videoProgress ? {
        watchedSeconds: videoProgress.watchedSeconds,
        isCompleted: videoProgress.isCompleted,
        lastWatchedAt: videoProgress.lastWatchedAt
      } : {
        watchedSeconds: 0,
        isCompleted: false,
        lastWatchedAt: null
      }
    };
  });
  
  return <ProgramContent videos={videosWithProgress} userId={session.user.id} />;
}
```

### ProgramContent (Client Component)

```typescript
// src/components/program/program-content.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "@/components/program/video-card";
import ProgressBar from "@/components/program/progress-bar";

interface VideoWithProgress {
  id: string;
  title: string;
  description: string | null;
  videoPath: string;
  thumbnailPath: string | null;
  sequenceNumber: number;
  durationSeconds: number | null;
  progress: {
    watchedSeconds: number;
    isCompleted: boolean;
    lastWatchedAt: Date | null;
  };
}

interface ProgramContentProps {
  videos: VideoWithProgress[];
  userId: string;
}

export default function ProgramContent({ videos, userId }: ProgramContentProps) {
  const router = useRouter();
  
  // Calculate overall progress
  const completedVideos = videos.filter(video => video.progress.isCompleted).length;
  const totalVideos = videos.length;
  const progressPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
  
  // Find the next unwatched video
  const nextUnwatchedVideo = videos.find(video => !video.progress.isCompleted);
  
  const handleContinue = () => {
    if (nextUnwatchedVideo) {
      router.push(`/program/${nextUnwatchedVideo.id}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Program Explanation
        </h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Your Progress</h2>
          <ProgressBar percentage={progressPercentage} />
          <p className="mt-2 text-gray-600">
            {completedVideos} of {totalVideos} videos completed
          </p>
          
          {nextUnwatchedVideo && (
            <button
              onClick={handleContinue}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Continue Learning
            </button>
          )}
          
          {!nextUnwatchedVideo && totalVideos > 0 && (
            <div className="mt-4 px-6 py-3 bg-green-100 text-green-800 rounded-lg">
              Congratulations! You've completed all the program videos.
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Program Videos
        </h2>
        
        <div className="space-y-6">
          {videos.map((video) => (
            <VideoCard 
              key={video.id}
              video={video}
              onClick={() => router.push(`/program/${video.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### VideoCard Component

```typescript
// src/components/program/video-card.tsx
"use client";

import Image from "next/image";
import { formatDuration } from "@/lib/utils/date-utils";

interface VideoWithProgress {
  id: string;
  title: string;
  description: string | null;
  videoPath: string;
  thumbnailPath: string | null;
  sequenceNumber: number;
  durationSeconds: number | null;
  progress: {
    watchedSeconds: number;
    isCompleted: boolean;
    lastWatchedAt: Date | null;
  };
}

interface VideoCardProps {
  video: VideoWithProgress;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  // Calculate progress percentage
  const progressPercentage = video.durationSeconds 
    ? Math.min(100, Math.round((video.progress.watchedSeconds / video.durationSeconds) * 100))
    : video.progress.isCompleted ? 100 : 0;
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] ${
        video.progress.isCompleted ? 'border-l-4 border-green-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative h-48 md:h-auto">
          {video.thumbnailPath ? (
            <Image 
              src={video.thumbnailPath} 
              alt={video.title} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No thumbnail</span>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.durationSeconds ? formatDuration(video.durationSeconds) : 'N/A'}
          </div>
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="flex items-center mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
              Video {video.sequenceNumber}
            </span>
            {video.progress.isCompleted && (
              <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Completed
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h3>
          
          {video.description && (
            <p className="text-gray-600 mb-4 line-clamp-2">{video.description}</p>
          )}
          
          <div className="mt-auto">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">{progressPercentage}% complete</span>
              {video.progress.lastWatchedAt && (
                <span className="text-xs text-gray-400">
                  Last watched: {new Date(video.progress.lastWatchedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### ProgressBar Component

```typescript
// src/components/program/progress-bar.tsx
"use client";

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div 
        className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
```

## Individual Video Page

### VideoPage (Server Component)

```typescript
// src/app/program/[id]/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getS3PresignedUrl } from "@/lib/s3";
import VideoPlayer from "@/components/program/video-player";

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if client's subscription is expired
  if (
    session.user.role === "CLIENT" && 
    session.user.subscriptionEndDate && 
    new Date(session.user.subscriptionEndDate) < new Date()
  ) {
    redirect("/subscription-expired");
  }
  
  // Fetch the video
  const video = await prisma.programVideo.findUnique({
    where: { id, isActive: true }
  });
  
  if (!video) {
    notFound();
  }
  
  // Fetch user's progress for this video
  const progress = await prisma.videoProgress.findUnique({
    where: { 
      userId_videoId: {
        userId: session.user.id,
        videoId: id
      }
    }
  });
  
  // Generate presigned URL for the video
  const videoUrl = await getS3PresignedUrl(video.videoPath);
  
  // Fetch next video in sequence for navigation
  const nextVideo = await prisma.programVideo.findFirst({
    where: { 
      sequenceNumber: { gt: video.sequenceNumber },
      isActive: true
    },
    orderBy: { sequenceNumber: 'asc' }
  });
  
  return (
    <VideoPlayer 
      video={video}
      videoUrl={videoUrl}
      initialProgress={progress?.watchedSeconds || 0}
      isCompleted={progress?.isCompleted || false}
      userId={session.user.id}
      nextVideoId={nextVideo?.id}
    />
  );
}
```

### VideoPlayer Component

```typescript
// src/components/program/video-player.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateVideoProgress } from "@/app/program/actions";

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    description: string | null;
    sequenceNumber: number;
    durationSeconds: number | null;
  };
  videoUrl: string;
  initialProgress: number;
  isCompleted: boolean;
  userId: string;
  nextVideoId: string | null;
}

export default function VideoPlayer({
  video,
  videoUrl,
  initialProgress,
  isCompleted: initialIsCompleted,
  userId,
  nextVideoId
}: VideoPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialProgress);
  const [duration, setDuration] = useState(video.durationSeconds || 0);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [showControls, setShowControls] = useState(true);
  
  // Set initial progress when video loads
  useEffect(() => {
    if (videoRef.current && initialProgress > 0) {
      videoRef.current.currentTime = initialProgress;
    }
  }, [initialProgress]);
  
  // Update progress periodically
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const currentTime = Math.floor(videoRef.current.currentTime);
        setCurrentTime(currentTime);
        
        // Update progress in database every 5 seconds
        if (currentTime % 5 === 0) {
          await updateVideoProgress(userId, video.id, currentTime, isCompleted);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, userId, video.id, isCompleted]);
  
  // Handle video completion
  const handleEnded = async () => {
    setIsPlaying(false);
    setIsCompleted(true);
    await updateVideoProgress(userId, video.id, duration, true);
  };
  
  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(Math.floor(videoRef.current.duration));
    }
  };
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle next video navigation
  const handleNextVideo = () => {
    if (nextVideoId) {
      router.push(`/program/${nextVideoId}`);
    } else {
      router.push('/program');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Video Player */}
        <div className="md:w-3/4 relative bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoUrl}
            className="max-h-screen w-full md:h-auto"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleEnded}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={() => videoRef.current && setCurrentTime(Math.floor(videoRef.current.currentTime))}
            onClick={togglePlay}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          />
          
          {/* Custom Video Controls */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full bg-gray-600 rounded-full h-1.5 mb-2">
              <div 
                className="bg-green-500 h-1.5 rounded-full" 
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                onClick={togglePlay}
                className="text-white focus:outline-none"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Video Info Sidebar */}
        <div className="md:w-1/4 bg-white p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {video.title}
          </h1>
          
          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
              Video {video.sequenceNumber}
            </span>
            {isCompleted && (
              <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Completed
              </span>
            )}
          </div>
          
          {video.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
              <p className="text-gray-600">{video.description}</p>
            </div>
          )}
          
          <div className="mt-auto">
            <button
              onClick={() => router.push('/program')}
              className="w-full mb-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Program
            </button>
            
            {nextVideoId && (
              <button
                onClick={handleNextVideo}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Next Video
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to format time
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
```

## Server Actions

```typescript
// src/app/program/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateVideoProgress(
  userId: string,
  videoId: string,
  watchedSeconds: number,
  isCompleted: boolean
) {
  try {
    await prisma.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId
        }
      },
      update: {
        watchedSeconds,
        isCompleted,
        lastWatchedAt: new Date()
      },
      create: {
        userId,
        videoId,
        watchedSeconds,
        isCompleted,
        lastWatchedAt: new Date()
      }
    });
    
    revalidatePath(`/program/${videoId}`);
    revalidatePath('/program');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update video progress:", error);
    return { success: false, error: "Failed to update progress" };
  }
}
```

## S3 Utility

```typescript
// src/lib/s3.ts

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getS3PresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
  });
  
  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Failed to generate video URL");
  }
}
```

## Data Operations

### Main Program Page

1. Fetch all active program videos in sequence order:
```typescript
const videos = await prisma.programVideo.findMany({
  where: { isActive: true },
  orderBy: { sequenceNumber: 'asc' }
});
```

2. Fetch user's progress for all videos:
```typescript
const progress = await prisma.videoProgress.findMany({
  where: { userId: session.user.id },
});
```

### Individual Video Page

1. Fetch a specific video:
```typescript
const video = await prisma.programVideo.findUnique({
  where: { id, isActive: true }
});
```

2. Fetch user's progress for this video:
```typescript
const progress = await prisma.videoProgress.findUnique({
  where: { 
    userId_videoId: {
      userId: session.user.id,
      videoId: id
    }
  }
});
```

3. Fetch next video in sequence for navigation:
```typescript
const nextVideo = await prisma.programVideo.findFirst({
  where: { 
    sequenceNumber: { gt: video.sequenceNumber },
    isActive: true
  },
  orderBy: { sequenceNumber: 'asc' }
});
```

4. Update video progress:
```typescript
await prisma.videoProgress.upsert({
  where: {
    userId_videoId: {
      userId,
      videoId
    }
  },
  update: {
    watchedSeconds,
    isCompleted,
    lastWatchedAt: new Date()
  },
  create: {
    userId,
    videoId,
    watchedSeconds,
    isCompleted,
    lastWatchedAt: new Date()
  }
});
```

## Authentication and Access

- **Role**: Accessible to both admin and client users
- **Authentication**: Required
- **Subscription Check**: For client users, checks if subscription is active

## UI/UX Considerations

1. **Video List Page**:
   - Clear indication of video sequence
   - Progress tracking for each video
   - Overall progress indicator
   - "Continue Learning" button for quick access to next unwatched video
   - Visual distinction for completed videos

2. **Video Player Page**:
   - Full-screen video player optimized for vertical videos
   - Custom video controls
   - Progress tracking during playback
   - Information sidebar with video details
   - Navigation buttons for returning to program list or proceeding to next video

3. **Responsive Design**:
   - Adapts to different screen sizes
   - On mobile, stacks video and info vertically
   - On desktop, displays video and info side by side

4. **Progress Tracking**:
   - Visual progress bars for individual videos
   - Overall program completion percentage
   - Automatic progress saving during playback
   - Completion status clearly indicated

## Assets Required

1. **Video Files**:
   - Stored in S3 bucket
   - Accessed via presigned URLs

2. **Thumbnail Images**:
   - Stored in S3 bucket
   - Used in video list for preview

## Implementation Notes

1. The program page uses a combination of server and client components:
   - Server components for data fetching and authentication
   - Client components for interactive UI elements and video playback

2. Video progress is tracked and updated in real-time:
   - Updates sent to the server every 5 seconds during playback
   - Completion status updated when video ends

3. The video player includes custom controls:
   - Play/pause button
   - Progress bar
   - Time display
   - Controls fade out when not in use

4. Navigation between videos is streamlined:
   - "Next Video" button appears when a next video is available
   - "Back to Program" button returns to the video list

5. The design follows the brand identity established in the provided inspiration images:
   - Clean, minimalist aesthetic
   - Earthy color palette
   - Soft, rounded shapes

## Dependencies

- Next.js App Router
- NextAuth.js for authentication
- Prisma for database access
- AWS SDK for S3 presigned URLs
- Tailwind CSS for styling
