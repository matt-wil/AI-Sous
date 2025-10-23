import Image from "next/image";
import Link from "next/link";
import { SpoonacularRecipeResult } from "@/types";
import { ExternalLink } from "lucide-react";

interface ApiRecipeCardProps {
  recipe: SpoonacularRecipeResult;
}

export function ApiRecipeCard({ recipe }: ApiRecipeCardProps) {
  const internalRecipeUrl = `/api-finder/${recipe.id}`;

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(recipe.title + " recipe")}`;

  return (
    <div className="w-full max-w-sm rounded overflow-hidden shadow-lg border bg-surface flex flex-col h-full p-2">
      <Link href={internalRecipeUrl} className="group block">
        <div className="relative w-full aspect-[312/231] group-hover:opacity-80 transition-opacity">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="px-4 pt-3">
          <h3 className="font-semibold text-md mb-1 truncate group-hover:underline">
            {recipe.title}
          </h3>
        </div>
      </Link>

      {/* Details section */}
      <div className="px-4 pb-3 mt-auto flex justify-between items-center text-xs text-gray-600">
        <div>
          {recipe.likes !== undefined && <span>Likes: {recipe.likes}</span>}
          {recipe.missedIngredientCount !== undefined && (
            <span className="ml-2">
              Missing: {recipe.missedIngredientCount}
            </span>
          )}
        </div>

        {/* Link to Google Search */}
        <a
          href={googleSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:underline"
          title={`Search Google for "${recipe.title}"`}
        >
          Google
          <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
    </div>
  );
}
