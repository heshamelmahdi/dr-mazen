"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch presigned URL for the thumbnail
  useEffect(() => {
    const fetchThumbnailUrl = async () => {
      if (recipe.thumbnailPath) {
        try {
          const response = await fetch(`/api/thumbnails/presigned-url?key=${encodeURIComponent(recipe.thumbnailPath)}`);
          
          if (response.ok) {
            const data = await response.json();
            setThumbnailUrl(data.url);
          }
        } catch (error) {
          console.error("Failed to fetch thumbnail URL:", error);
        }
      }
      setIsLoading(false);
    };
    
    fetchThumbnailUrl();
  }, [recipe.thumbnailPath]);
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-48">
        {recipe.thumbnailPath ? (
          isLoading ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Loading...</span>
            </div>
          ) : thumbnailUrl ? (
            <Image 
              src={thumbnailUrl} 
              alt={recipe.title} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Error loading thumbnail</span>
            </div>
          )
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No thumbnail</span>
          </div>
        )}
        
        {recipe.recipeType === 'YOUTUBE' && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            YouTube
          </div>
        )}
        
        {recipe.mealType && (
          <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            {recipe.mealType}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{recipe.title}</h3>
        {recipe.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
        )}
      </div>
    </div>
  );
} 