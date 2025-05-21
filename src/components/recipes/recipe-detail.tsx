"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import YouTubeEmbed from "@/components/recipes/youtube-embed";
import VideoPlayer from "@/components/shared/video-player";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  recipeType: 'YOUTUBE' | 'SELF_HOSTED';
  youtubeUrl: string | null;
  videoPath: string | null;
  thumbnailPath: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  mealType: string | null;
  tags: string[];
  createdAt: Date;
}

interface RecipeDetailProps {
  recipe: Recipe;
  videoSource: string | null;
  videoExists: boolean;
}

export default function RecipeDetail({
  recipe,
  videoSource,
  videoExists
}: RecipeDetailProps) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push('/recipes')}
          className="flex items-center text-green-700 mb-6 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Recipes
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Recipe Header */}
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {recipe.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.mealType && (
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  {recipe.mealType}
                </span>
              )}
              
              {recipe.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            {recipe.description && (
              <p className="text-gray-600">{recipe.description}</p>
            )}
          </div>
          
          {/* Video Section */}
          <div className="border-b">
            {recipe.recipeType === 'YOUTUBE' && videoSource && videoExists ? (
              <div className="aspect-video">
                <YouTubeEmbed videoId={videoSource} />
              </div>
            ) : recipe.recipeType === 'SELF_HOSTED' && videoSource ? (
              <div className="aspect-video bg-black">
                <VideoPlayer src={videoSource} />
              </div>
            ) : (
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700">Video Unavailable</h3>
                  <p className="text-gray-500 mt-2">
                    {recipe.recipeType === 'YOUTUBE' 
                      ? "The YouTube video is no longer available or has been removed."
                      : "The video for this recipe is currently unavailable."}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Nutrition Information */}
          {(recipe.calories || recipe.protein || recipe.carbs || recipe.fat) && (
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Nutrition Information
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recipe.calories && (
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-700">{recipe.calories}</div>
                    <div className="text-sm text-orange-600">Calories</div>
                  </div>
                )}
                
                {recipe.protein && (
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-700">{recipe.protein}g</div>
                    <div className="text-sm text-blue-600">Protein</div>
                  </div>
                )}
                
                {recipe.carbs && (
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-700">{recipe.carbs}g</div>
                    <div className="text-sm text-yellow-600">Carbs</div>
                  </div>
                )}
                
                {recipe.fat && (
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-700">{recipe.fat}g</div>
                    <div className="text-sm text-purple-600">Fat</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 