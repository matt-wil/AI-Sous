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
        const err = await response.json();
        throw new Error(err.error || "Failed to fetch recipes");
      }

      const data: SpoonacularRecipeResult[] = await response.json();
      setRecipes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href="/" className="m-4 sous-button">
        Home
      </Link>
      <RecipeFinder
        onClickSearchAction={handleSearch}
        heading={"API Based Recipe Finder"}
        isLoading={isLoading}
        error={error}
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 place-items-center"
        style={{ marginTop: "20px" }}
      >
        {recipes.map((recipe, index) => (
          <ApiRecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
