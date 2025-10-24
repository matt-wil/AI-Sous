"use client";

import { useState } from "react";
import { SpoonacularRecipeResult } from "@/types";
import RecipeFinder from "@/components/recipe-finder";
import { useIngredientsStore } from "@/store/ingredients-store";
import { ApiRecipeCard } from "@/components/api-recipe-card";
import Link from "next/link";

export default function Page() {
  const { ingredients } = useIngredientsStore();
  const [recipes, setRecipes] = useState<SpoonacularRecipeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (ingredients.length < 3) {
      setError("Please add at least 3 ingredients.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);

    const ingredientQuery = ingredients.join(",");

    try {
          const response = await fetch(
            `/api/search-recipes?ingredients=${encodeURIComponent(ingredientQuery)}`,
          );

          if (!response.ok) {
            const err = await response.json().catch(() => ({ error: `HTTP Error: ${response.status} ${response.statusText}` }));
            throw new Error(err.error || "Failed to fetch recipes");
          }

          const data: SpoonacularRecipeResult[] = await response.json();
          setRecipes(data);

        } catch (err: unknown) {
          console.error("Error fetching API recipes:", err);
          let errorMessage = "An unexpected error occurred while fetching recipes.";
          if (err instanceof Error) {
            errorMessage = err.message;
          } else if (typeof err === 'string') {
            errorMessage = err;
          }
          setError(errorMessage);
          setRecipes([]);

        } finally {
          setIsLoading(false);
        }

  return (
    <main className="flex justify-center items-center flex-col">
      <Link href="/" className="m-4 sous-button">
        Back to the Start
      </Link>
      <RecipeFinder
        onClickSearchAction={handleSearch}
        heading="Lets see what recipes the people of the world have in store for us!"
        isLoading={isLoading}
        error={error}
        buttonLabel="Search Recipes"
        buttonClickedLabel="Searching..."
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 place-items-center"
        style={{ marginTop: "20px" }}
      >
        {recipes.map((recipe, index) => (
          <ApiRecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
