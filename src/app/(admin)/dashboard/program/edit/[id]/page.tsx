import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProgramVideoForm from "@/components/dashboard/program/program-video-form";

interface EditVideoPageProps {
  params: {
    id: string;
  };
}

export default async function EditProgramVideoPage({ params }: EditVideoPageProps) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch the video to edit
  const videoData = await prisma.programVideo.findUnique({
    where: { id }
  });
  
  // If video not found, return 404
  if (!videoData) {
    notFound();
  }
  
  // Format the video data to match the expected props
  const video = {
    id: videoData.id,
    title: videoData.title,
    description: videoData.description,
    sequenceNumber: videoData.sequenceNumber,
    videoPath: videoData.videoPath,
    thumbnailPath: videoData.thumbnailPath,
    videoType: videoData.videoType || undefined,
    youtubeId: videoData.youtubeId,
    durationSeconds: videoData.durationSeconds,
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Program Video
      </h1>
      
      <ProgramVideoForm 
        editMode={true}
        video={video}
      />
    </div>
  );
} 