import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
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
  
  // Map progress to videos (now just tracking if video was watched)
  const videosWithProgress = videos.map((video: any) => {
    const videoProgress = progress.find((p: any) => p.videoId === video.id);
    return {
      ...video,
      progress: videoProgress ? {
        watchedSeconds: 0,
        isCompleted: true,
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