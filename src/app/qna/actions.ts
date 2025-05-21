"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getS3PresignedUrl } from "@/lib/s3";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface SubmitQuestionResult {
  success: boolean;
  error?: string;
}

interface GetS3AudioUrlResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function submitQuestion(
  userId: string, 
  question: string
): Promise<SubmitQuestionResult> {
  try {
    if (!question.trim()) {
      return { success: false, error: "Question cannot be empty" };
    }
    
    await prisma.userQuestion.create({
      data: {
        userId,
        question: question.trim(),
      }
    });
    
    revalidatePath('/qna');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to submit question:", error);
    return { success: false, error: "Failed to submit question" };
  }
}

export async function getS3AudioUrl(audioPath: string): Promise<GetS3AudioUrlResult> {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }
    
    // Generate a presigned URL for the S3 audio file
    const url = await getS3PresignedUrl(audioPath);
    
    return { success: true, url };
  } catch (error) {
    console.error("Failed to get audio URL:", error);
    return { success: false, error: "Failed to load audio" };
  }
} 