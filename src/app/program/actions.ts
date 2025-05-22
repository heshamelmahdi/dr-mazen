"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateVideoProgress(
  userId: string,
  videoId: string,
  skipRevalidation: boolean = false
) {
  try {
    // Check if we already have a record
    const existingProgress = await prisma.videoProgress.findUnique({
      where: {
        userId_videoId: {
          userId,
          videoId
        }
      },
    });
    
    // Only create a record if one doesn't exist
    if (!existingProgress) {
      await prisma.videoProgress.create({
        data: {
          userId,
          videoId,
          watchedSeconds: 0,      // We keep this field but don't use it
          isCompleted: true,      // Mark as completed immediately
          lastWatchedAt: new Date()
        }
      });
      
      // Revalidate the program list page to update UI, but only if not skipped
      if (!skipRevalidation) {
        revalidatePath('/program');
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update video progress:", error);
    return { success: false, error: "Failed to update progress" };
  }
} 