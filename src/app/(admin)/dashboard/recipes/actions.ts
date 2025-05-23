"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";
import { getYouTubeVideoId, getBestYouTubeThumbnail } from "@/lib/youtube";
import crypto from "crypto";

// Helper function to get YouTube thumbnail
async function getYouTubeThumbnail(youtubeUrl: string) {
  try {
    console.log("Starting YouTube thumbnail fetch for URL:", youtubeUrl);
    
    // Extract the YouTube video ID from the URL
    const videoId = getYouTubeVideoId(youtubeUrl);
    
    if (!videoId) {
      console.error("Failed to extract YouTube video ID from URL:", youtubeUrl);
      return null;
    }
    
    console.log("Extracted YouTube video ID:", videoId);
    
    // Get the best thumbnail URL directly
    const thumbnailUrl = await getBestYouTubeThumbnail(videoId);
    console.log("Got YouTube thumbnail URL:", thumbnailUrl);
    
    // Download the thumbnail
    const response = await fetch(thumbnailUrl);
    
    if (!response.ok) {
      console.error(`Failed to download thumbnail: ${response.status} ${response.statusText}`);
      return null;
    }
    
    // Convert to blob and then to File
    const imageBlob = await response.blob();
    console.log("Downloaded thumbnail image:", { size: imageBlob.size, type: imageBlob.type });
    
    // Create a unique filename
    const filename = `youtube-${videoId}-${crypto.randomUUID()}.jpg`;
    const thumbnailFile = new File([imageBlob], filename, { type: 'image/jpeg' });
    
    // Upload to S3 directly
    console.log("Uploading thumbnail to S3");
    const thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
    console.log("Thumbnail uploaded successfully:", thumbnailPath);
    
    return thumbnailPath;
  } catch (error) {
    console.error("Error processing YouTube thumbnail:", error);
    return null;
  }
}

export async function createRecipe(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const recipeType = formData.get("recipeType") as "YOUTUBE" | "SELF_HOSTED";
  const youtubeUrl = formData.get("youtubeUrl") as string;
  const videoFile = formData.get("video") as File;
  const thumbnailFile = formData.get("thumbnail") as File;
  const calories = formData.get("calories") ? parseInt(formData.get("calories") as string) : null;
  const protein = formData.get("protein") ? parseFloat(formData.get("protein") as string) : null;
  const carbs = formData.get("carbs") ? parseFloat(formData.get("carbs") as string) : null;
  const fat = formData.get("fat") ? parseFloat(formData.get("fat") as string) : null;
  const mealType = formData.get("mealType") as string;
  const tagsString = formData.get("tags") as string;
  const isActive = formData.get("isActive") === "true";
  
  // Validate inputs
  if (!title || !recipeType) {
    return { success: false, error: "Title and recipe type are required" };
  }
  
  if (recipeType === "YOUTUBE" && !youtubeUrl) {
    return { success: false, error: "YouTube URL is required for YouTube recipes" };
  }
  
  if (recipeType === "SELF_HOSTED" && (!videoFile || videoFile.size === 0)) {
    return { success: false, error: "Video file is required for self-hosted recipes" };
  }
  
  try {
    // Process tags
    const tags = tagsString
      ? tagsString.split(",").map(tag => tag.trim()).filter(Boolean)
      : [];
    
    // Prepare recipe data
    const recipeData: any = {
      title,
      description: description || undefined,
      recipeType: recipeType,
      youtubeUrl: recipeType === "YOUTUBE" ? youtubeUrl : null,
      calories,
      protein,
      carbs,
      fat,
      mealType: mealType || undefined,
      tags,
      isActive
    };
    
    // Upload video if self-hosted
    if (recipeType === "SELF_HOSTED" && videoFile && videoFile.size > 0) {
      recipeData.videoPath = await uploadToS3(videoFile, "recipes");
    }
    
    // Upload thumbnail if provided
    if (thumbnailFile && thumbnailFile.size > 0) {
      recipeData.thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
    }
    // For YouTube videos without a custom thumbnail, try to get one from YouTube
    else if (recipeType === "YOUTUBE" && youtubeUrl && (!thumbnailFile || thumbnailFile.size === 0)) {
      const thumbnailPath = await getYouTubeThumbnail(youtubeUrl);
      if (thumbnailPath) {
        recipeData.thumbnailPath = thumbnailPath;
      }
    }
    
    // Create recipe
    await prisma.recipe.create({
      data: recipeData
    });
    
    revalidatePath("/dashboard/recipes");
    revalidatePath("/recipes");
    return { success: true };
  } catch (error) {
    console.error("Error creating recipe:", error);
    return { success: false, error: "Failed to create recipe" };
  }
}

export async function updateRecipe(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const recipeType = formData.get("recipeType") as "YOUTUBE" | "SELF_HOSTED";
  const youtubeUrl = formData.get("youtubeUrl") as string;
  const videoFile = formData.get("video") as File;
  const thumbnailFile = formData.get("thumbnail") as File;
  const keepExistingVideo = formData.get("keepExistingVideo") === "true";
  const keepExistingThumbnail = formData.get("keepExistingThumbnail") === "true";
  const calories = formData.get("calories") ? parseInt(formData.get("calories") as string) : null;
  const protein = formData.get("protein") ? parseFloat(formData.get("protein") as string) : null;
  const carbs = formData.get("carbs") ? parseFloat(formData.get("carbs") as string) : null;
  const fat = formData.get("fat") ? parseFloat(formData.get("fat") as string) : null;
  const mealType = formData.get("mealType") as string;
  const tagsString = formData.get("tags") as string;
  const isActive = formData.get("isActive") === "true";
  
  // Validate inputs
  if (!title || !recipeType) {
    return { success: false, error: "Title and recipe type are required" };
  }
  
  if (recipeType === "YOUTUBE" && !youtubeUrl) {
    return { success: false, error: "YouTube URL is required for YouTube recipes" };
  }
  
  try {
    // Get existing recipe
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id }
    });
    
    if (!existingRecipe) {
      return { success: false, error: "Recipe not found" };
    }
    
    // Process tags
    const tags = tagsString
      ? tagsString.split(",").map(tag => tag.trim()).filter(Boolean)
      : [];
    
    // Prepare update data
    const updateData: any = {
      title,
      description: description || undefined,
      recipeType,
      youtubeUrl: recipeType === "YOUTUBE" ? youtubeUrl : null,
      calories,
      protein,
      carbs,
      fat,
      mealType: mealType || undefined,
      tags,
      isActive
    };
    
    // Handle video path
    if (recipeType === "SELF_HOSTED") {
      if (videoFile && videoFile.size > 0) {
        updateData.videoPath = await uploadToS3(videoFile, "recipes");
      } else if (!keepExistingVideo) {
        updateData.videoPath = null;
      }
    } else {
      updateData.videoPath = null;
    }
    
    // Handle thumbnail
    if (thumbnailFile && thumbnailFile.size > 0) {
      updateData.thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
    } else if (!keepExistingThumbnail) {
      // If recipe type changed to YouTube, try to get YouTube thumbnail
      if (recipeType === "YOUTUBE" && youtubeUrl && 
          (existingRecipe.recipeType !== "YOUTUBE" || existingRecipe.youtubeUrl !== youtubeUrl)) {
        const thumbnailPath = await getYouTubeThumbnail(youtubeUrl);
        if (thumbnailPath) {
          updateData.thumbnailPath = thumbnailPath;
        } else {
          updateData.thumbnailPath = null;
        }
      } else {
        updateData.thumbnailPath = null;
      }
    }
    
    // Update recipe
    await prisma.recipe.update({
      where: { id },
      data: updateData
    });
    
    revalidatePath("/dashboard/recipes");
    revalidatePath("/recipes");
    return { success: true };
  } catch (error) {
    console.error("Error updating recipe:", error);
    return { success: false, error: "Failed to update recipe" };
  }
}

export async function deleteRecipe(id: string) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  try {
    // Delete recipe
    await prisma.recipe.delete({
      where: { id }
    });
    
    revalidatePath("/dashboard/recipes");
    revalidatePath("/recipes");
    return { success: true };
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return { success: false, error: "Failed to delete recipe" };
  }
} 