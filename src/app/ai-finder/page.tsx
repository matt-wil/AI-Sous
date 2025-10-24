"use client";

import RecipeFinder from "@/components/recipe-finder";
import { useIngredientsStore } from "@/store/ingredients-store";
import { AiRecipeApiResponse } from "@/types";
import { useState } from "react";
import { AiRecipeCard } from "@/components/ai-recipe-card";
import Link from "next/link";

export default function Page() {
  const { ingredients } = useIngredientsStore();
  const [recipes, setRecipes] = useState<AiRecipeApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (ingredients.length < 3) {
      setError("Please add at least 3 ingredients.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes(null);

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });
      if (!response.ok) {
        const err = await response
          .json()
          .catch(() => ({ error: `HTTP Error: ${response.status}` }));
        throw new Error(err.error || "Failed to fetch recipes");
      }
      const data: AiRecipeApiResponse = await response.json();
      setRecipes(data);
      setIsLoading(false);
    } catch (error) {
      console.error("AI fetching Error: ", error);
      setError("Failed to fetch recipes. Please try again.");
      setRecipes(null);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("Recipes: ", recipes);

  return (
    <main>
      <Link href="/" className="m-4 sous-button">
        Home
      </Link>
      {!recipes && (
        <RecipeFinder
          onClickSearchAction={handleSearch}
          heading="Let's see what are sous chef can whip up for us with the ingredients we have!"
          isLoading={isLoading}
          error={error}
        />
      )}
      {recipes && (
        <div className="w-full flex flex-col items-center">
          <button onClick={() => setRecipes(null)} className="sous-button mb-6">
            ← Search Again
          </button>

          <div className="flex justify-center flex-wrap gap-4 px-4 w-full">
            {Array.isArray(recipes) &&
              recipes.map((recipe, index) => {
                if (!recipe) return null;
                return (
                  <AiRecipeCard
                    key={`${recipe.title}-${index}`}
                    recipe={recipe}
                  />
                );
              })}
          </div>
        </div>
      )}
    </main>
  );
}
