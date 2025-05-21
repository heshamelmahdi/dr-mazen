import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Recipe Not Found</h1>
        <p className="text-gray-600 mb-6">
          The recipe you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/recipes" 
          className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Return to Recipes
        </Link>
      </div>
    </div>
  );
} 