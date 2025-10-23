"use client";

import { useIngredientsStore } from "@/store/ingredients-store";
import { useState } from "react";
import type { RecipeFinderProps } from "@/types";

export default function RecipeFinder({
  onClickSearchAction,
  heading,
  isLoading,
  error,
}: RecipeFinderProps) {
  const { ingredients, addIngredient, clearIngredients, removeIngredient } =
    useIngredientsStore();
  const [currentIngredient, setCurrentIngredient] = useState<string>("");

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="font-bold text-2xl m-4">{heading}</h2>

      <div>
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          placeholder="e.g., chicken"
          className="border border-gray-300 rounded-lg px-2 py-1 mr-2"
        />
        <button
          className="sous-button"
          onClick={() => addIngredient(currentIngredient)}
        >
          Add
        </button>
      </div>

      <div>
        <ul>
          <strong>Your Ingredients List:</strong>
          {ingredients.map((ingredient: string, index: number) => (
            <li key={index}>
              {ingredient}{" "}
              <button
                className="rounded-full bg-accent p-1"
                onClick={() => removeIngredient(ingredient)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClickSearchAction}
        disabled={isLoading || ingredients.length < 3}
        className="sous-button"
      >
        {isLoading ? "Searching..." : "Search Recipes"}
      </button>
      <button onClick={() => clearIngredients} className="sous-button">
        Refresh List
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
