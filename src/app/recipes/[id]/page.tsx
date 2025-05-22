import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getS3PresignedUrl } from "@/lib/s3";
import { getYouTubeVideoId, checkYouTubeVideoExists } from "@/lib/youtube";
import RecipeDetail from "@/components/recipes/recipe-detail";

type Params = Promise<{ id: string }>;

export default async function RecipePage({ params }: { params: Params }) {
  const { id } = await params;
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
  
  // Fetch the recipe
  const recipe = await prisma.recipe.findUnique({
    where: { id, isActive: true }
  });
  
  if (!recipe) {
    notFound();
  }
  
  // Handle video source
  let videoSource = null;
  let videoExists = true;
  
  if (recipe.recipeType === 'YOUTUBE' && recipe.youtubeUrl) {
    // Extract YouTube video ID
    const videoId = getYouTubeVideoId(recipe.youtubeUrl);
    
    if (videoId) {
      // Check if YouTube video exists
      videoExists = await checkYouTubeVideoExists(videoId);
      videoSource = videoId;
    }
  } else if (recipe.recipeType === 'SELF_HOSTED' && recipe.videoPath) {
    // Generate presigned URL for self-hosted video
    videoSource = await getS3PresignedUrl(recipe.videoPath);
  }
  
  return (
    <RecipeDetail 
      recipe={recipe}
      videoSource={videoSource}
      videoExists={videoExists}
    />
  );
} 