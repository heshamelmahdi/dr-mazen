import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import QAAdminTabs from "@/components/dashboard/qa/qa-admin-tabs";

export default async function QAAdminPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch all Q&A entries
  const qaEntries = await prisma.qAEntry.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  // Fetch all user questions
  const userQuestions = await prisma.userQuestion.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Q&A Management
        </h1>
        <a 
          href="/dashboard/qna/new" 
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Create New Q&A
        </a>
      </div>
      
      <QAAdminTabs qaEntries={qaEntries} userQuestions={userQuestions} />
    </div>
  );
}
