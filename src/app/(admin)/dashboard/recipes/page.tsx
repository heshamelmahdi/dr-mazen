import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import RecipesAdminList from "@/components/dashboard/recipes/recipes-admin-list";

export default async function RecipesAdminPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch all recipes
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Recipe Management
        </h1>
        <a 
          href="/dashboard/recipes/new" 
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Add New Recipe
        </a>
      </div>
      
      <RecipesAdminList recipes={recipes} />
    </div>
  );
}
