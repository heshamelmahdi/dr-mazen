"use client";

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
  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-48">
        {recipe.thumbnailPath ? (
          <Image 
            src={recipe.thumbnailPath} 
            alt={recipe.title} 
            fill 
            className="object-cover"
          />
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
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{recipe.title}</h3>
        
        {recipe.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        )}
        
        {/* Nutrition Info */}
        {(recipe.calories || recipe.protein || recipe.carbs || recipe.fat) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.calories && (
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                {recipe.calories} cal
              </span>
            )}
            {recipe.protein && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {recipe.protein}g protein
              </span>
            )}
            {recipe.carbs && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                {recipe.carbs}g carbs
              </span>
            )}
            {recipe.fat && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                {recipe.fat}g fat
              </span>
            )}
          </div>
        )}
        
        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-gray-500">
                #{tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{recipe.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 