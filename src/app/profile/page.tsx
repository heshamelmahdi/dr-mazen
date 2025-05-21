import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProfileContent from "@/components/profile/profile-content";

export default async function ProfilePage() {
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
  
  // Fetch user details
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });
  
  if (!user) {
    redirect("/login");
  }
  
  // Fetch user's video progress
  const videoProgress = await prisma.videoProgress.findMany({
    where: { userId: user.id },
    include: { video: true }
  });
  
  // Fetch total number of videos for progress calculation
  const totalVideos = await prisma.programVideo.count({
    where: { isActive: true }
  });
  
  // Calculate overall progress
  const completedVideos = videoProgress.filter(progress => progress.isCompleted).length;
  const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
  
  return (
    <ProfileContent 
      user={user}
      videoProgress={videoProgress}
      totalVideos={totalVideos}
      completedVideos={completedVideos}
      progressPercentage={progressPercentage}
    />
  );
}