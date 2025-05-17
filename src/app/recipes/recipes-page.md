# Recipes Page

This document outlines the implementation details for the Recipes page of the nutrition website.

## Overview

The Recipes page displays a collection of recipe videos, including both embedded YouTube videos and self-hosted videos. It allows users to browse, filter, and search for recipes based on various criteria such as meal type, calories, and tags.

## File Location

```
src/app/recipes/page.tsx
```

## Page Structure

The Recipes page will be implemented as a server component that fetches recipe data and passes it to client components for rendering, filtering, and searching.

## Components

### RecipesPage (Server Component)

```typescript
// src/app/recipes/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import RecipesContent from "@/components/recipes/recipes-content";

export default async function RecipesPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
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
  
  // Extract filter parameters
  const mealType = searchParams.mealType as string | undefined;
  const tags = searchParams.tags ? 
    Array.isArray(searchParams.tags) ? 
      searchParams.tags : [searchParams.tags] 
    : undefined;
  const minCalories = searchParams.minCalories ? 
    parseInt(searchParams.minCalories as string) : undefined;
  const maxCalories = searchParams.maxCalories ? 
    parseInt(searchParams.maxCalories as string) : undefined;
  
  // Build query filters
  const filters: any = { isActive: true };
  
  if (mealType) {
    filters.mealType = mealType;
  }
  
  if (tags && tags.length > 0) {
    filters.tags = { hasSome: tags };
  }
  
  if (minCalories !== undefined || maxCalories !== undefined) {
    filters.calories = {};
    if (minCalories !== undefined) {
      filters.calories.gte = minCalories;
    }
    if (maxCalories !== undefined) {
      filters.calories.lte = maxCalories;
    }
  }
  
  // Fetch recipes with filters
  const recipes = await prisma.recipe.findMany({
    where: filters,
    orderBy: { createdAt: 'desc' }
  });
  
  // Fetch all unique meal types for filter options
  const mealTypes = await prisma.recipe.findMany({
    where: { isActive: true, mealType: { not: null } },
    select: { mealType: true },
    distinct: ['mealType']
  });
  
  // Fetch all unique tags for filter options
  const allTags = await prisma.recipe.findMany({
    where: { isActive: true },
    select: { tags: true }
  });
  
  // Extract unique tags
  const uniqueTags = Array.from(
    new Set(allTags.flatMap(recipe => recipe.tags))
  );
  
  return (
    <RecipesContent 
      recipes={recipes} 
      mealTypes={mealTypes.map(m => m.mealType!).filter(Boolean)}
      tags={uniqueTags}
      activeFilters={{
        mealType,
        tags: tags || [],
        minCalories,
        maxCalories
      }}
    />
  );
}
```

### RecipesContent (Client Component)

```typescript
// src/components/recipes/recipes-content.tsx
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import RecipeCard from "@/components/recipes/recipe-card";
import RecipeFilters from "@/components/recipes/recipe-filters";

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
  minCalories?: number;
  maxCalories?: number;
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
    const params = new URLSearchParams();
    
    if (newFilters.mealType) {
      params.set('mealType', newFilters.mealType);
    }
    
    if (newFilters.tags && newFilters.tags.length > 0) {
      newFilters.tags.forEach(tag => {
        params.append('tags', tag);
      });
    }
    
    if (newFilters.minCalories !== undefined) {
      params.set('minCalories', newFilters.minCalories.toString());
    }
    
    if (newFilters.maxCalories !== undefined) {
      params.set('maxCalories', newFilters.maxCalories.toString());
    }
    
    router.push(`${pathname}?${params.toString()}`);
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
              
              <RecipeFilters 
                mealTypes={mealTypes}
                tags={tags}
                activeFilters={activeFilters}
                onApplyFilters={applyFilters}
              />
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
                  <RecipeCard 
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => router.push(`/recipes/${recipe.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### RecipeFilters Component

```typescript
// src/components/recipes/recipe-filters.tsx
"use client";

import { useState } from "react";

interface ActiveFilters {
  mealType?: string;
  tags: string[];
  minCalories?: number;
  maxCalories?: number;
}

interface RecipeFiltersProps {
  mealTypes: string[];
  tags: string[];
  activeFilters: ActiveFilters;
  onApplyFilters: (filters: ActiveFilters) => void;
}

export default function RecipeFilters({
  mealTypes,
  tags,
  activeFilters,
  onApplyFilters
}: RecipeFiltersProps) {
  const [selectedMealType, setSelectedMealType] = useState<string | undefined>(
    activeFilters.mealType
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    activeFilters.tags || []
  );
  const [minCalories, setMinCalories] = useState<number | undefined>(
    activeFilters.minCalories
  );
  const [maxCalories, setMaxCalories] = useState<number | undefined>(
    activeFilters.maxCalories
  );
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleApplyFilters = () => {
    onApplyFilters({
      mealType: selectedMealType,
      tags: selectedTags,
      minCalories,
      maxCalories
    });
  };
  
  const handleResetFilters = () => {
    setSelectedMealType(undefined);
    setSelectedTags([]);
    setMinCalories(undefined);
    setMaxCalories(undefined);
    
    onApplyFilters({
      tags: []
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Meal Type Filter */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-2">Meal Type</h3>
        <select
          value={selectedMealType || ""}
          onChange={(e) => setSelectedMealType(e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Meal Types</option>
          {mealTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      {/* Calories Filter */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-2">Calories</h3>
        <div className="flex space-x-2">
          <div>
            <label htmlFor="minCalories" className="block text-xs text-gray-500">
              Min
            </label>
            <input
              type="number"
              id="minCalories"
              value={minCalories || ""}
              onChange={(e) => setMinCalories(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="maxCalories" className="block text-xs text-gray-500">
              Max
            </label>
            <input
              type="number"
              id="maxCalories"
              value={maxCalories || ""}
              onChange={(e) => setMaxCalories(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      
      {/* Tags Filter */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedTags.includes(tag)
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-2 pt-4">
        <button
          onClick={handleApplyFilters}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
```

### RecipeCard Component

```typescript
// src/components/recipes/recipe-card.tsx
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
```

## Individual Recipe Page

### RecipePage (Server Component)

```typescript
// src/app/recipes/[id]/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getS3PresignedUrl } from "@/lib/s3";
import { getYouTubeVideoId, checkYouTubeVideoExists } from "@/lib/youtube";
import RecipeDetail from "@/components/recipes/recipe-detail";

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = params;
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
```

### RecipeDetail Component

```typescript
// src/components/recipes/recipe-detail.tsx
"use client";

import { useState } from "react";
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
```

### YouTubeEmbed Component

```typescript
// src/components/recipes/youtube-embed.tsx
"use client";

interface YouTubeEmbedProps {
  videoId: string;
}

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
```

### VideoPlayer Component

```typescript
// src/components/shared/video-player.tsx
"use client";

import { useState, useRef } from "react";

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        playsInline
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Custom Play Button */}
      {!isPlaying && (
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 text-white"
          onClick={togglePlay}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
    </div>
  );
}
```

## YouTube Utility

```typescript
// src/lib/youtube.ts

// Extract YouTube video ID from URL
export function getYouTubeVideoId(url: string): string | null {
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

// Check if a YouTube video exists and is available
export async function checkYouTubeVideoExists(videoId: string): Promise<boolean> {
  try {
    // Use YouTube oEmbed API to check if video exists
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    return response.status === 200;
  } catch (error) {
    console.error("Error checking YouTube video:", error);
    return false;
  }
}
```

## Data Operations

### Recipes List Page

1. Fetch recipes with filters:
```typescript
const recipes = await prisma.recipe.findMany({
  where: filters,
  orderBy: { createdAt: 'desc' }
});
```

2. Fetch all unique meal types for filter options:
```typescript
const mealTypes = await prisma.recipe.findMany({
  where: { isActive: true, mealType: { not: null } },
  select: { mealType: true },
  distinct: ['mealType']
});
```

3. Fetch all unique tags for filter options:
```typescript
const allTags = await prisma.recipe.findMany({
  where: { isActive: true },
  select: { tags: true }
});

// Extract unique tags
const uniqueTags = Array.from(
  new Set(allTags.flatMap(recipe => recipe.tags))
);
```

### Individual Recipe Page

1. Fetch a specific recipe:
```typescript
const recipe = await prisma.recipe.findUnique({
  where: { id, isActive: true }
});
```

2. Generate presigned URL for self-hosted video:
```typescript
const videoSource = await getS3PresignedUrl(recipe.videoPath);
```

3. Check if YouTube video exists:
```typescript
const videoExists = await checkYouTubeVideoExists(videoId);
```

## Authentication and Access

- **Role**: Accessible to both admin and client users
- **Authentication**: Required
- **Subscription Check**: For client users, checks if subscription is active

## UI/UX Considerations

1. **Recipes List Page**:
   - Grid layout for recipe cards
   - Sidebar with filters for meal type, calories, and tags
   - Search functionality for finding specific recipes
   - Visual indicators for recipe type (YouTube vs. self-hosted)
   - Nutrition information displayed on cards
   - Responsive design for all screen sizes

2. **Individual Recipe Page**:
   - Prominent video player (YouTube embed or self-hosted)
   - Error handling for unavailable YouTube videos
   - Detailed nutrition information
   - Tags and meal type indicators
   - Back button for returning to recipes list

3. **Filtering and Search**:
   - Multiple filter options (meal type, calories, tags)
   - Client-side search for immediate results
   - Server-side filtering for accurate results
   - URL parameters for shareable filtered views

4. **Responsive Design**:
   - Grid adjusts columns based on screen size
   - Sidebar becomes top filters on mobile
   - Video player adapts to screen dimensions

## Assets Required

1. **Recipe Thumbnails**:
   - Stored in S3 bucket
   - Used in recipe cards for preview

2. **Video Files**:
   - YouTube videos (embedded)
   - Self-hosted videos in S3 bucket (accessed via presigned URLs)

## Implementation Notes

1. The recipes page uses a combination of server and client components:
   - Server components for data fetching and authentication
   - Client components for interactive filtering and search

2. Recipe videos are handled in two ways:
   - YouTube videos are embedded using iframes
   - Self-hosted videos are played using a custom video player with presigned URLs

3. Error handling is implemented for YouTube videos:
   - Checks if video exists before attempting to embed
   - Displays a friendly error message if video is unavailable

4. Filtering is implemented with both server and client approaches:
   - Server-side filtering for meal type, calories, and tags (via URL parameters)
   - Client-side filtering for search term (for immediate results)

5. The design follows the brand identity established in the provided inspiration images:
   - Clean, minimalist aesthetic
   - Earthy color palette
   - Soft, rounded shapes

## Dependencies

- Next.js App Router
- NextAuth.js for authentication
- Prisma for database access
- AWS SDK for S3 presigned URLs
- Tailwind CSS for styling
