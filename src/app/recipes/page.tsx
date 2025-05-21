import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RecipesContent from "@/components/recipes/recipes-content";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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