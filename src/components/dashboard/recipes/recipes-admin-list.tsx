"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { deleteRecipe } from "@/app/(admin)/dashboard/recipes/actions";
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

interface RecipesAdminListProps {
  recipes: Recipe[];
}

export default function RecipesAdminList({ recipes }: RecipesAdminListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter recipes by search term
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No recipes found. Try adjusting your search or add a new recipe.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const handleDeleteRecipe = async () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      try {
        setIsDeleting(true);
        const result = await deleteRecipe(recipe.id);
        
        if (result.success) {
          toast.success("Recipe deleted successfully");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to delete recipe");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48">
        {recipe.thumbnailPath ? (
          <Image 
            src={recipe.thumbnailPath} 
            alt={recipe.title} 
            fill={true}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No thumbnail</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <Badge variant={recipe.isActive ? "default" : "destructive"} className={recipe.isActive ? "bg-green-500" : ""}>
            {recipe.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        
        <div className="absolute top-2 left-2">
          <Badge variant={recipe.recipeType === "YOUTUBE" ? "secondary" : "default"}>
            {recipe.recipeType === "YOUTUBE" ? "YouTube" : "Self-hosted"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-grow p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
        
        {recipe.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        )}
        
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.mealType && (
            <Badge variant="outline">{recipe.mealType}</Badge>
          )}
          
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          
          {recipe.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{recipe.tags.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          Added: {formatDate(recipe.createdAt)}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-3 flex justify-between">
        <Link href={`/recipes/${recipe.id}`} passHref>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Eye className="h-4 w-4" /> View
          </Button>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/recipes/edit/${recipe.id}`}>
                <Pencil className="h-4 w-4 mr-2" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600" 
              onClick={handleDeleteRecipe}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-2" /> {isDeleting ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
} 