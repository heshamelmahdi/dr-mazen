import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getS3PresignedUrl } from "@/lib/s3";
import { authOptions } from "@/lib/auth";
import VideoPlayer from "@/components/program/video-player";

type Params = Promise<{ id: string }>;

export default async function VideoPage({ params }: { params: Params }) {
  // Await params before using its properties
  const { id } = await params;
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
  
  // Handle different video types (YouTube or self-hosted)
  let videoUrl = '';
  
  if (video.videoType === "YOUTUBE") {
    // For YouTube videos, we don't need a presigned URL
    videoUrl = video.youtubeId || '';
  } else {
    // Generate presigned URL for self-hosted videos
    videoUrl = await getS3PresignedUrl(video.videoPath);
  }
  
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
      video={{
        id: video.id,
        title: video.title,
        description: video.description,
        sequenceNumber: video.sequenceNumber,
        durationSeconds: video.durationSeconds,
        videoType: video.videoType || undefined,
        youtubeId: video.youtubeId
      }}
      videoUrl={videoUrl}
      initialProgress={0}
      isCompleted={!!progress}
      userId={session.user.id}
      nextVideoId={nextVideo?.id || null}
    />
  );
} 