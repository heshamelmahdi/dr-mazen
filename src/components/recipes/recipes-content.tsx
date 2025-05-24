"use client";

import { useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createDynamicComponent } from "@/lib/dynamic-imports";
import LoadingCard from "@/components/ui/loading-card";

const DynamicRecipeCard = createDynamicComponent(() => import("./recipe-card"));
const DynamicRecipeFilters = createDynamicComponent(() => import("./recipe-filters"));

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

interface ActiveFilters {
  mealType?: string;
  tags: string[];
}

interface RecipesContentProps {
  recipes: Recipe[];
  mealTypes: string[];
  tags: string[];
  activeFilters: ActiveFilters;
}

export default function RecipesContent({ 
  recipes, 
  mealTypes, 
  tags,
  activeFilters
}: RecipesContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltersLoading, setIsFiltersLoading] = useState(false);
  
  // Filter recipes by search term
  const filteredRecipes = searchTerm 
    ? recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : recipes;
  
  // Apply filters and update URL
  const applyFilters = (newFilters: ActiveFilters) => {
    setIsFiltersLoading(true);
    const params = new URLSearchParams();
    
    if (newFilters.mealType) {
      params.set('mealType', newFilters.mealType);
    }
    
    if (newFilters.tags && newFilters.tags.length > 0) {
      newFilters.tags.forEach(tag => {
        params.append('tags', tag);
      });
    }
    
    // Use setTimeout to give a UX indication of the change
    setTimeout(() => {
      router.push(`${pathname}?${params.toString()}`);
      setIsFiltersLoading(false);
    }, 300);
  };
  
  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Healthy Recipes
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Filters</h2>
              
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Recipes
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, description, or tags"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <Suspense fallback={<div className="animate-pulse h-64 bg-gray-100 rounded-md"></div>}>
                <DynamicRecipeFilters 
                  mealTypes={mealTypes}
                  tags={tags}
                  activeFilters={activeFilters}
                  onApplyFilters={applyFilters}
                  isLoading={isFiltersLoading}
                />
              </Suspense>
            </div>
          </div>
          
          {/* Recipe Grid */}
          <div className="lg:w-3/4">
            {filteredRecipes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search term to find recipes.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <Suspense key={recipe.id} fallback={<LoadingCard />}>
                    <DynamicRecipeCard 
                      recipe={recipe}
                      onClick={() => router.push(`/recipes/${recipe.id}`)}
                    />
                  </Suspense>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 