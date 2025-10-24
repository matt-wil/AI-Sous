"use client";

import { useIngredientsStore } from "@/store/ingredients-store";
import { useState } from "react";
import type { RecipeFinderProps } from "@/types";
import { X } from "lucide-react";

export default function RecipeFinder({
  onClickSearchAction,
  heading,
  isLoading,
  error,
  buttonLabel,
  buttonClickedLabel,
}: RecipeFinderProps) {
  const { ingredients, addIngredient, clearIngredients, removeIngredient } =
    useIngredientsStore();
  const [currentIngredient, setCurrentIngredient] = useState<string>("");

  const handleAddIngredient = (ingredient: string) => {
    const trimmedIngredient = ingredient.trim();
    if (trimmedIngredient !== "") {
      addIngredient(trimmedIngredient);
      setCurrentIngredient("");
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="font-bold text-5xl m-4 text-center max-w-1/2">
        {heading}
      </h2>

      <div>
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddIngredient(currentIngredient);
            }
          }}
          placeholder="e.g., rice"
          className="border border-gray-300 rounded-lg px-2 py-1 mr-2"
        />
        <button
          className="sous-button"
          onClick={() => handleAddIngredient(currentIngredient)}
        >
          Add
        </button>
      </div>

      <div>
        <ul>
          <strong>Your Ingredients List:</strong>
          {ingredients.map((ingredient: string, index: number) => (
            <li className="flex justify-between" key={index}>
              {ingredient}{" "}
              <button
                className=" bg-red-200 p-1 m-1 rounded-full cursor-pointer"
                onClick={() => removeIngredient(ingredient)}
              >
                <X size={10} />
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
        {isLoading ? `${buttonClickedLabel}` : `${buttonLabel}`}
      </button>
      <button onClick={clearIngredients} className="sous-button">
        Refresh Ingredients List
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
