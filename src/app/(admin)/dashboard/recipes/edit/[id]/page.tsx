import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import RecipeForm from "@/components/dashboard/recipes/recipe-form";

type Params = Promise<{ id: string }>;

export default async function EditRecipePage({ params }: { params: Params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch the recipe
  const recipe = await prisma.recipe.findUnique({
    where: { id }
  });
  
  // If recipe doesn't exist, redirect to 404
  if (!recipe) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Recipe: {recipe.title}
      </h1>
      
      <RecipeForm recipe={recipe} />
    </div>
  );
} 