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
  await verifyAdminSession();
  
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const sequenceNumber = parseInt(formData.get("sequenceNumber") as string);
    const videoFile = formData.get("videoFile") as File;
    const thumbnailFile = formData.get("thumbnailFile") as File | null;
    const videoType = formData.get("videoType") as string || "SELF_HOSTED";
    const youtubeId = formData.get("youtubeId") as string | null;
    
    // Basic validation
    if (!title || isNaN(sequenceNumber)) {
      return { success: false, error: "Title and sequence number are required" };
    }
    
    if (videoType === "SELF_HOSTED" && (!videoFile || videoFile.size === 0)) {
      return { success: false, error: "Video file is required for self-hosted videos" };
    }
    
    if (videoType === "YOUTUBE" && !youtubeId) {
      return { success: false, error: "YouTube ID is required for YouTube videos" };
    }

    let videoPath = "";
    // Upload video if self-hosted
    if (videoType === "SELF_HOSTED" && videoFile && videoFile.size > 0) {
      videoPath = await uploadToS3(videoFile, "program-videos");
    } else if (videoType === "SELF_HOSTED") {
      return { success: false, error: "Video file is required for self-hosted videos" };
    }
    
    // Upload thumbnail if provided
    let thumbnailPath = undefined;
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
    }
    
    // Create program video
    await prisma.programVideo.create({
      data: {
        title,
        description,
        sequenceNumber,
        videoPath,
        thumbnailPath,
        videoType,
        youtubeId: videoType === "YOUTUBE" ? youtubeId : null,
        isActive: true,
      },
    });
    
    revalidatePath("/dashboard/program");
    revalidatePath("/program");
    return { success: true };
  } catch (error) {
    console.error("Error creating program video:", error);
    return { success: false, error: "Failed to create program video" };
  }
}

// Update an existing program video
export async function updateProgramVideo(id: string, formData: FormData) {
  await verifyAdminSession();
  
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const sequenceNumber = parseInt(formData.get("sequenceNumber") as string);
    const videoFile = formData.get("videoFile") as File | null;
    const thumbnailFile = formData.get("thumbnailFile") as File | null;
    const videoType = formData.get("videoType") as string;
    const youtubeId = formData.get("youtubeId") as string | null;
    const durationSeconds = formData.get("durationSeconds") ? 
      parseInt(formData.get("durationSeconds") as string) : undefined;
    
    // Basic validation
    if (!title || isNaN(sequenceNumber)) {
      return { success: false, error: "Title and sequence number are required" };
    }
    
    if (videoType === "YOUTUBE" && !youtubeId) {
      return { success: false, error: "YouTube ID is required for YouTube videos" };
    }
    
    // Prepare update data
    const updateData: any = {
      title,
      description,
      sequenceNumber,
      videoType,
      youtubeId: videoType === "YOUTUBE" ? youtubeId : null,
    };
    
    if (durationSeconds !== undefined) {
      updateData.durationSeconds = durationSeconds;
    }
    
    // Upload new video if provided
    if (videoType === "SELF_HOSTED" && videoFile && videoFile.size > 0) {
      const videoPath = await uploadToS3(videoFile, "program-videos");
      updateData.videoPath = videoPath;
    }
    
    // Upload new thumbnail if provided
    if (thumbnailFile && thumbnailFile.size > 0) {
      const thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
      updateData.thumbnailPath = thumbnailPath;
    }
    
    // Update program video
    await prisma.programVideo.update({
      where: { id },
      data: updateData,
    });
    
    revalidatePath("/dashboard/program");
    revalidatePath("/program");
    revalidatePath(`/program/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating program video:", error);
    return { success: false, error: "Failed to update program video" };
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