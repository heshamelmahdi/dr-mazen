import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import QAContent from "@/components/qna/qna-content";

export default async function QAPage() {
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
  
  // Fetch all public Q&A entries
  const qaEntries = await prisma.qAEntry.findMany({
    where: { 
      isActive: true,
      isPrivate: false
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return <QAContent qaEntries={qaEntries} userId={session.user.id} />;
}
