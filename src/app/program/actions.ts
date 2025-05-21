"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateVideoProgress(
  userId: string,
  videoId: string,
  watchedSeconds: number,
  isCompleted: boolean
) {
  try {
    await prisma.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId
        }
      },
      update: {
        watchedSeconds,
        isCompleted,
        lastWatchedAt: new Date()
      },
      create: {
        userId,
        videoId,
        watchedSeconds,
        isCompleted,
        lastWatchedAt: new Date()
      }
    });
    
    revalidatePath(`/program/${videoId}`);
    revalidatePath('/program');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update video progress:", error);
    return { success: false, error: "Failed to update progress" };
  }
} 