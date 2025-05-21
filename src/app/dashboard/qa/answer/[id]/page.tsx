import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import QAAnswerForm from "@/components/dashboard/qa/qa-answer-form";

interface AnswerUserQuestionPageProps {
  params: {
    id: string;
  };
}

export default async function AnswerUserQuestionPage({ params }: AnswerUserQuestionPageProps) {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch the question
  const question = await prisma.userQuestion.findUnique({
    where: { id: params.id },
    include: { user: true }
  });
  
  // If question is not found or already answered, return 404
  if (!question || question.isAnswered) {
    notFound();
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Answer User Question
      </h1>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-500 mb-1">
          From: {question.user.name || question.user.email}
        </div>
        <p className="text-lg font-medium">{question.question}</p>
      </div>
      
      <QAAnswerForm questionId={params.id} userQuestion={question.question} />
    </div>
  );
} 