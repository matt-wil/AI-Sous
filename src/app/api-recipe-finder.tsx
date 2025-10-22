"use client";

import { useState } from "react";
import { SpoonacularRecipeResult } from "@/types";
import Image from "next/image";

export default function ApiRecipeFinder() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");

  const [recipes, setRecipes] = useState<SpoonacularRecipeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

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
    <div>
      <h1>AI-Sous Recipe Finder</h1>

      <div>
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          placeholder="e.g., chicken"
        />
        <button onClick={handleAddIngredient}>Add</button>
      </div>

      <div>
        <strong>Ingredients:</strong> {ingredients.join(", ")}
      </div>

      <button
        onClick={handleSearch}
        disabled={isLoading || ingredients.length < 3}
      >
        {isLoading ? "Searching..." : "Find Recipes with these Ingredients"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "15px" }}>
            <h3>{recipe.title}</h3>
            <div
              style={{
                position: "relative",
                width: "200px",
                aspectRatio: "312/231",
              }}
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p>Likes: {recipe.likes}</p>
            <p>Missing {recipe.missedIngredientCount} ingredients.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
