"use server";

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

// Verify user is admin
async function verifyAdminSession() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  return session;
}

// Create a new program video
export async function createProgramVideo(formData: FormData) {
  // Check authentication
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  try {
    // Extract form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const sequenceNumber = parseInt(formData.get("sequenceNumber") as string);
    const videoType = formData.get("videoType") as string;
    const videoPath = formData.get("videoPath") as string | null;
    const thumbnailPath = formData.get("thumbnailPath") as string | null;
    const youtubeId = formData.get("youtubeId") as string | null;
    const durationSeconds = formData.get("durationSeconds") ? 
      parseInt(formData.get("durationSeconds") as string) : null;
    
    // Validate required fields
    if (!title || !sequenceNumber || !videoType) {
      return {
        success: false,
        error: "Missing required fields: title, sequenceNumber, videoType"
      };
    }
    
    // Validate video source
    if (videoType === "SELF_HOSTED" && !videoPath) {
      return {
        success: false,
        error: "Self-hosted videos require a video file path"
      };
    }
    
    if (videoType === "YOUTUBE" && !youtubeId) {
      return {
        success: false,
        error: "YouTube videos require a YouTube ID"
      };
    }
    
    // Create program video
    const programVideo = await prisma.programVideo.create({
      data: {
        title,
        description,
        sequenceNumber,
        videoType,
        videoPath: videoPath || (videoType === "YOUTUBE" ? `https://youtube.com/watch?v=${youtubeId}` : "placeholder"),
        thumbnailPath,
        youtubeId,
        durationSeconds
      }
    });
    
    revalidatePath("/dashboard/program");
    
    return {
      success: true,
      programVideo
    };
  } catch (error) {
    console.error("Error creating program video:", error);
    return {
      success: false,
      error: "Failed to create program video"
    };
  }
}

// Update an existing program video
export async function updateProgramVideo(id: string, formData: FormData) {
  // Check authentication
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  try {
    // Extract form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const sequenceNumber = parseInt(formData.get("sequenceNumber") as string);
    const videoType = formData.get("videoType") as string;
    const videoPath = formData.get("videoPath") as string | null;
    const thumbnailPath = formData.get("thumbnailPath") as string | null;
    const youtubeId = formData.get("youtubeId") as string | null;
    const durationSeconds = formData.get("durationSeconds") ? 
      parseInt(formData.get("durationSeconds") as string) : null;
    
    // Validate required fields
    if (!title || !sequenceNumber || !videoType) {
      return {
        success: false,
        error: "Missing required fields: title, sequenceNumber, videoType"
      };
    }
    
    // Get existing video
    const existingVideo = await prisma.programVideo.findUnique({
      where: { id }
    });
    
    if (!existingVideo) {
      return {
        success: false,
        error: "Program video not found"
      };
    }
    
    // Prepare update data
    const updateData: any = {
      title,
      description,
      sequenceNumber,
      videoType,
      youtubeId,
      durationSeconds
    };
    
    // Only update paths if new ones are provided
    if (videoPath) {
      updateData.videoPath = videoPath;
    }
    
    if (thumbnailPath) {
      updateData.thumbnailPath = thumbnailPath;
    }
    
    // Update program video
    const programVideo = await prisma.programVideo.update({
      where: { id },
      data: updateData
    });
    
    revalidatePath("/dashboard/program");
    
    return {
      success: true,
      programVideo
    };
  } catch (error) {
    console.error("Error updating program video:", error);
    return {
      success: false,
      error: "Failed to update program video"
    };
  }
}

// Delete a program video
export async function deleteProgramVideo(id: string) {
  await verifyAdminSession();
  
  try {
    await prisma.programVideo.delete({
      where: { id },
    });
    
    revalidatePath("/dashboard/program");
    revalidatePath("/program");
    return { success: true };
  } catch (error) {
    console.error("Error deleting program video:", error);
    return { success: false, error: "Failed to delete program video" };
  }
}

// Change video sequence number (reordering)
export async function updateVideoSequence(id: string, newSequence: number) {
  await verifyAdminSession();
  
  try {
    const video = await prisma.programVideo.findUnique({
      where: { id },
      select: { sequenceNumber: true },
    });
    
    if (!video) {
      return { success: false, error: "Video not found" };
    }
    
    const currentSequence = video.sequenceNumber;
    
    if (currentSequence === newSequence) {
      return { success: true }; // No change needed
    }
    
    // Update videos in between old and new position
    if (currentSequence < newSequence) {
      // Moving down - decrement sequence numbers for videos in between
      await prisma.programVideo.updateMany({
        where: {
          sequenceNumber: {
            gt: currentSequence,
            lte: newSequence,
          },
        },
        data: {
          sequenceNumber: {
            decrement: 1,
          },
        },
      });
    } else {
      // Moving up - increment sequence numbers for videos in between
      await prisma.programVideo.updateMany({
        where: {
          sequenceNumber: {
            gte: newSequence,
            lt: currentSequence,
          },
        },
        data: {
          sequenceNumber: {
            increment: 1,
          },
        },
      });
    }
    
    // Update the target video's sequence number
    await prisma.programVideo.update({
      where: { id },
      data: {
        sequenceNumber: newSequence,
      },
    });
    
    revalidatePath("/dashboard/program");
    revalidatePath("/program");
    return { success: true };
  } catch (error) {
    console.error("Error updating video sequence:", error);
    return { success: false, error: "Failed to update video sequence" };
  }
}

// Toggle video active status
export async function toggleVideoActive(id: string, isActive: boolean) {
  await verifyAdminSession();
  
  try {
    await prisma.programVideo.update({
      where: { id },
      data: { isActive },
    });
    
    revalidatePath("/dashboard/program");
    revalidatePath("/program");
    return { success: true };
  } catch (error) {
    console.error("Error toggling video active status:", error);
    return { success: false, error: "Failed to update video status" };
  }
} 