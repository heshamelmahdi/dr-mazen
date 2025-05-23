"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createRecipe, updateRecipe } from "@/app/(admin)/dashboard/recipes/actions";
import { toast } from "sonner";

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
  isActive: boolean;
}

interface RecipeFormProps {
  recipe?: Recipe;
}

const MEAL_TYPES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
  "Drink"
];

type FormValues = {
  title: string;
  description: string;
  recipeType: 'YOUTUBE' | 'SELF_HOSTED';
  youtubeUrl: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  mealType: string;
  tags: string;
  isActive: boolean;
};

export default function RecipeForm({ recipe }: RecipeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    recipe?.thumbnailPath || null
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      title: recipe?.title || "",
      description: recipe?.description || "",
      recipeType: recipe?.recipeType || "YOUTUBE",
      youtubeUrl: recipe?.youtubeUrl || "",
      calories: recipe?.calories?.toString() || "",
      protein: recipe?.protein?.toString() || "",
      carbs: recipe?.carbs?.toString() || "",
      fat: recipe?.fat?.toString() || "",
      mealType: recipe?.mealType || "",
      tags: recipe?.tags.join(", ") || "",
      isActive: recipe?.isActive ?? true,
    },
  });
  
  const recipeType = form.watch("recipeType");
  
  useEffect(() => {
    // Reset video file when changing recipe type
    if (recipeType === "YOUTUBE" && videoInputRef.current) {
      videoInputRef.current.value = "";
      setVideoFile(null);
    }
  }, [recipeType]);
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const objectUrl = URL.createObjectURL(file);
      setThumbnailPreview(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      console.log("Recipe form submission started with data:", {
        recipeType: data.recipeType,
        youtubeUrl: data.youtubeUrl,
        hasThumbnailFile: !!thumbnailFile
      });
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add form fields to FormData
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("recipeType", data.recipeType);
      
      if (data.recipeType === "YOUTUBE") {
        formData.append("youtubeUrl", data.youtubeUrl);
        console.log("Added YouTube URL to form data:", data.youtubeUrl);
      } else if (videoFile) {
        formData.append("video", videoFile);
      } else if (recipe && recipe.videoPath && data.recipeType === "SELF_HOSTED") {
        // Keep existing video
        formData.append("keepExistingVideo", "true");
      }
      
      // Handle thumbnail logic
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
        console.log("Added thumbnail file to form data");
      } else if (recipe && recipe.thumbnailPath) {
        // Only keep existing thumbnail if we're not changing the YouTube URL
        if (!(data.recipeType === "YOUTUBE" && recipe.youtubeUrl !== data.youtubeUrl)) {
          formData.append("keepExistingThumbnail", "true");
          console.log("Keeping existing thumbnail");
        } else {
          console.log("YouTube URL changed, not keeping existing thumbnail");
        }
        // If YouTube URL changed, let the server-side action fetch a new thumbnail
      } else if (data.recipeType === "YOUTUBE") {
        console.log("No thumbnail provided for YouTube video, server should fetch one");
      }
      
      // Parse numeric values
      if (data.calories) formData.append("calories", data.calories);
      if (data.protein) formData.append("protein", data.protein);
      if (data.carbs) formData.append("carbs", data.carbs);
      if (data.fat) formData.append("fat", data.fat);
      
      if (data.mealType) formData.append("mealType", data.mealType);
      
      // Process tags
      if (data.tags) {
        formData.append("tags", data.tags);
      }
      
      formData.append("isActive", data.isActive.toString());
      
      // Use appropriate action based on whether we're editing or creating
      const result = recipe 
        ? await updateRecipe(recipe.id, formData)
        : await createRecipe(formData);
      
      if (result.success) {
        toast.success(recipe ? "Recipe updated successfully" : "Recipe created successfully");
        router.push("/dashboard/recipes");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to save recipe");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Recipe title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the recipe..." 
                          className="resize-none min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Active</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Recipe Type and Media */}
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800">Media</h2>
                
                <FormField
                  control={form.control}
                  name="recipeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipe type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="YOUTUBE">YouTube Video</SelectItem>
                          <SelectItem value="SELF_HOSTED">Self-hosted Video</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {recipeType === "YOUTUBE" && (
                  <FormField
                    control={form.control}
                    name="youtubeUrl"
                    rules={{ 
                      required: recipeType === "YOUTUBE" ? "YouTube URL is required" : false,
                      pattern: {
                        value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
                        message: "Please enter a valid YouTube URL"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://www.youtube.com/watch?v=..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the full YouTube URL of the recipe video
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {recipeType === "SELF_HOSTED" && (
                  <div className="space-y-4">
                    <div>
                      <FormLabel htmlFor="video">Video File</FormLabel>
                      <input
                        type="file"
                        id="video"
                        accept="video/*"
                        ref={videoInputRef}
                        onChange={handleVideoChange}
                        className="w-full mt-1 text-sm file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {recipe?.videoPath && !videoFile && "Current video will be retained. Upload to replace."}
                        {videoFile && `Selected: ${videoFile.name}`}
                        {!recipe?.videoPath && !videoFile && recipeType === "SELF_HOSTED" && (
                          <span className="text-red-500">Video file is required</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <FormLabel htmlFor="thumbnail">Thumbnail Image</FormLabel>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailChange}
                    className="w-full mt-1 text-sm file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  
                  {thumbnailPreview && (
                    <div className="mt-2 relative h-40 w-full md:w-1/2">
                      <Image
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        fill={true}
                        className="object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnailPreview(null);
                          setThumbnailFile(null);
                          if (thumbnailInputRef.current) {
                            thumbnailInputRef.current.value = "";
                          }
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Nutrition Information */}
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800">Nutrition Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calories</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g. 350" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="protein"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protein (g)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1"
                            placeholder="e.g. 25.5" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="carbs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carbs (g)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1"
                            placeholder="e.g. 30" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fat (g)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1"
                            placeholder="e.g. 12.5" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Categorization */}
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800">Categorization</h2>
                
                <FormField
                  control={form.control}
                  name="mealType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meal type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NONE">None</SelectItem>
                          {MEAL_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="healthy, quick, vegetarian, etc." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter tags separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/recipes")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting
              ? recipe
                ? "Updating..."
                : "Creating..."
              : recipe
                ? "Update Recipe"
                : "Create Recipe"
            }
          </Button>
        </div>
      </form>
    </Form>
  );
} 