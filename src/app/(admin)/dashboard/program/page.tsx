import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProgramVideosList from "@/components/dashboard/program/program-videos-list";

export default async function ProgramManagementPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch all program videos
  const videos = await prisma.programVideo.findMany({
    orderBy: { sequenceNumber: 'asc' }
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Program Videos
        </h1>
        <a 
          href="/dashboard/program/new" 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Upload New Video
        </a>
      </div>
      
      <ProgramVideosList videos={videos} />
    </div>
  );
}