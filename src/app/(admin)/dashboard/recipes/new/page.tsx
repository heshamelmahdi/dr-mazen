import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import RecipeForm from "@/components/dashboard/recipes/recipe-form";

export default async function NewRecipePage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add New Recipe
      </h1>
      
      <RecipeForm />
    </div>
  );
} 