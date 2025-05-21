import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProgramVideoForm from "@/components/dashboard/program/program-video-form";

export default async function NewProgramVideoPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Get the highest sequence number to suggest the next one
  const highestSequence = await prisma.programVideo.findFirst({
    orderBy: { sequenceNumber: 'desc' },
    select: { sequenceNumber: true }
  });
  
  const nextSequenceNumber = highestSequence ? highestSequence.sequenceNumber + 1 : 1;
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Upload New Program Video
      </h1>
      
      <ProgramVideoForm nextSequenceNumber={nextSequenceNumber} />
    </div>
  );
} 