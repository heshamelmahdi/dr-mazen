"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadToS3, deleteFromS3 } from "@/lib/s3";

// Create a new QA Entry
export async function createQAEntry(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }
    
    const question = formData.get("question") as string;
    const answerType = formData.get("answerType") as string;
    const answerText = formData.get("answerText") as string;
    const audioFile = formData.get("audioFile") as File;
    const isPrivate = formData.get("isPrivate") === "true";
    
    // Validate inputs
    if (!question || !answerType) {
      return { success: false, error: "Question and answer type are required" };
    }
    
    if (answerType === "TEXT" && !answerText) {
      return { success: false, error: "Answer text is required for text answers" };
    }
    
    if (answerType === "AUDIO" && (!audioFile || audioFile.size === 0)) {
      return { success: false, error: "Audio file is required for audio answers" };
    }
    
    // Prepare Q&A data
    const qaData: any = {
      question,
      answerType: answerType as "TEXT" | "AUDIO",
      answerText: answerType === "TEXT" ? answerText : null,
      isPrivate,
      isActive: true
    };
    
    // Upload audio if provided
    if (answerType === "AUDIO" && audioFile && audioFile.size > 0) {
      qaData.answerAudioPath = await uploadToS3(audioFile, "qa-audio");
    }
    
    // Create Q&A entry
    await prisma.qAEntry.create({
      data: qaData
    });
    
    revalidatePath("/dashboard/qa");
    return { success: true };
  } catch (error) {
    console.error("Error creating Q&A entry:", error);
    return { success: false, error: "Failed to create Q&A entry" };
  }
}

// Update an existing QA Entry
export async function updateQAEntry(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }
    
    const question = formData.get("question") as string;
    const answerType = formData.get("answerType") as string;
    const answerText = formData.get("answerText") as string;
    const audioFile = formData.get("audioFile") as File;
    const isPrivate = formData.get("isPrivate") === "true";
    
    // Validate inputs
    if (!question || !answerType) {
      return { success: false, error: "Question and answer type are required" };
    }
    
    if (answerType === "TEXT" && !answerText) {
      return { success: false, error: "Answer text is required for text answers" };
    }
    
    // Get the existing entry to check for previous audio file
    const existingEntry = await prisma.qAEntry.findUnique({
      where: { id }
    });
    
    if (!existingEntry) {
      return { success: false, error: "Q&A entry not found" };
    }
    
    // Prepare update data
    const updateData: any = {
      question,
      answerType: answerType as "TEXT" | "AUDIO",
      answerText: answerType === "TEXT" ? answerText : null,
      isPrivate
    };
    
    // Handle audio file changes
    if (answerType === "AUDIO") {
      if (audioFile && audioFile.size > 0) {
        // Delete old audio file if exists
        if (existingEntry.answerAudioPath) {
          await deleteFromS3(existingEntry.answerAudioPath);
        }
        // Upload new audio file
        updateData.answerAudioPath = await uploadToS3(audioFile, "qa-audio");
      } else if (!existingEntry.answerAudioPath) {
        return { success: false, error: "Audio file is required for audio answers" };
      }
      // If no new file is uploaded but there's an existing audio file, keep using that
    } else {
      // If switching from audio to text, delete the audio file
      if (existingEntry.answerAudioPath) {
        await deleteFromS3(existingEntry.answerAudioPath);
        updateData.answerAudioPath = null;
      }
    }
    
    // Update Q&A entry
    await prisma.qAEntry.update({
      where: { id },
      data: updateData
    });
    
    revalidatePath("/dashboard/qa");
    return { success: true };
  } catch (error) {
    console.error("Error updating Q&A entry:", error);
    return { success: false, error: "Failed to update Q&A entry" };
  }
}

// Toggle the visibility (active status) of a QA Entry
export async function toggleQAVisibility(id: string, isActive: boolean) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }
    
    await prisma.qAEntry.update({
      where: { id },
      data: { isActive }
    });
    
    revalidatePath("/dashboard/qa");
    return { success: true };
  } catch (error) {
    console.error("Error toggling Q&A visibility:", error);
    return { success: false, error: "Failed to update Q&A entry" };
  }
}

// Delete a QA Entry
export async function deleteQAEntry(id: string) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }
    
    // Get the entry to check if it has an audio file
    const entry = await prisma.qAEntry.findUnique({
      where: { id }
    });
    
    if (!entry) {
      return { success: false, error: "Q&A entry not found" };
    }
    
    // Delete audio file if exists
    if (entry.answerAudioPath) {
      await deleteFromS3(entry.answerAudioPath);
    }
    
    // Delete entry
    await prisma.qAEntry.delete({
      where: { id }
    });
    
    revalidatePath("/dashboard/qa");
    return { success: true };
  } catch (error) {
    console.error("Error deleting Q&A entry:", error);
    return { success: false, error: "Failed to delete Q&A entry" };
  }
}

// Answer a user question
export async function answerUserQuestion(questionId: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }
    
    const answerType = formData.get("answerType") as string;
    const answerText = formData.get("answerText") as string;
    const audioFile = formData.get("audioFile") as File;
    const isPrivate = formData.get("isPrivate") === "true";
    
    // Validate inputs
    if (!answerType) {
      return { success: false, error: "Answer type is required" };
    }
    
    if (answerType === "TEXT" && !answerText) {
      return { success: false, error: "Answer text is required for text answers" };
    }
    
    if (answerType === "AUDIO" && (!audioFile || audioFile.size === 0)) {
      return { success: false, error: "Audio file is required for audio answers" };
    }
    
    // Get the user question
    const userQuestion = await prisma.userQuestion.findUnique({
      where: { id: questionId }
    });
    
    if (!userQuestion) {
      return { success: false, error: "Question not found" };
    }
    
    // Prepare Q&A data
    const qaData: any = {
      question: userQuestion.question,
      answerType: answerType as "TEXT" | "AUDIO",
      answerText: answerType === "TEXT" ? answerText : null,
      isPrivate,
      isActive: true
    };
    
    // Upload audio if provided
    if (answerType === "AUDIO" && audioFile && audioFile.size > 0) {
      qaData.answerAudioPath = await uploadToS3(audioFile, "qa-audio");
    }
    
    // Create Q&A entry
    await prisma.qAEntry.create({
      data: qaData
    });
    
    // Mark user question as answered
    await prisma.userQuestion.update({
      where: { id: questionId },
      data: { isAnswered: true }
    });
    
    revalidatePath("/dashboard/qa");
    return { success: true };
  } catch (error) {
    console.error("Error answering user question:", error);
    return { success: false, error: "Failed to answer question" };
  }
}

// Delete a user question
export async function deleteUserQuestion(id: string) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (session?.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }
    
    // Delete question
    await prisma.userQuestion.delete({
      where: { id }
    });
    
    revalidatePath("/dashboard/qa");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user question:", error);
    return { success: false, error: "Failed to delete question" };
  }
} 