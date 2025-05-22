import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/dashboard/admin-dashboard";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch counts for the dashboard cards
  const userCount = await prisma.user.count({
    where: { role: "CLIENT" }
  });
  
  const videoCount = await prisma.programVideo.count();
  
  const recipeCount = await prisma.recipe.count();
  
  const questionCount = await prisma.userQuestion.count({
    where: { isAnswered: false }
  });
  
  // Fetch recent activity (e.g., recent user sign-ups, video progress, questions)
  const recentActivity = await fetchRecentActivity();
  
  return (
    <AdminDashboard 
      stats={{ userCount, videoCount, recipeCount, questionCount }}
      recentActivity={recentActivity}
    />
  );
}

async function fetchRecentActivity() {
  // New users in the past 7 days
  const recentUsers = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      role: "CLIENT"
    },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });

  // Recent questions
  const recentQuestions = await prisma.userQuestion.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });

  // Recent video progress
  const recentProgress = await prisma.videoProgress.findMany({
    where: {
      isCompleted: true,
      lastWatchedAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    },
    orderBy: { lastWatchedAt: "desc" },
    take: 5,
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      },
      video: {
        select: {
          title: true
        }
      }
    }
  });

  // Combine and format activity items
  return [
    ...recentUsers.map(user => ({
      type: "NEW_USER",
      user: { name: user.name || user.email, email: user.email },
      createdAt: user.createdAt,
      message: "New user registered"
    })),
    ...recentQuestions.map(question => ({
      type: "QUESTION",
      user: { name: question.user.name || question.user.email, email: question.user.email },
      createdAt: question.createdAt,
      message: `New question: "${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}"`,
      questionId: question.id
    })),
    ...recentProgress.map(progress => ({
      type: "VIDEO_PROGRESS",
      user: { name: progress.user.name || progress.user.email, email: progress.user.email },
      createdAt: progress.lastWatchedAt,
      message: `Completed video: "${progress.video.title}"`,
      videoId: progress.videoId
    }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10);
}