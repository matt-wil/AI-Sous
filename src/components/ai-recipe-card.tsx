"use client";

import { useState } from "react";
import type { AiRecipeResponse } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AiRecipeCardProps {
  recipe: AiRecipeResponse;
}

export function AiRecipeCard({ recipe }: AiRecipeCardProps) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="w-full max-w-sm rounded overflow-hidden shadow-lg border bg-surface flex flex-col p-4">
      <h3 className="text-xl font-semibold mb-2 text-center">{recipe.title}</h3>

      <p className="text-sm text-gray-700 mb-4">{recipe.description}</p>

      <div className="mb-2 border-t pt-2">
        <button
          onClick={() => setShowIngredients(!showIngredients)}
          className="flex justify-between items-center w-full text-left font-medium text-gray-800 hover:text-accent focus:outline-none"
        >
          <span>Ingredients</span>
          {showIngredients ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {showIngredients && (
          <ul className="list-disc list-inside space-y-1 mt-2 pl-4 text-sm text-gray-600">
            {recipe.ingredients_needed?.map((ing, index) => (
              <li key={index}>
                {ing.quantity} {ing.name}
              </li>
            ))}
            {(!recipe.ingredients_needed ||
              recipe.ingredients_needed.length === 0) && (
              <li className="italic text-gray-400">
                No specific ingredients listed.
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="border-t pt-2">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex justify-between items-center w-full text-left font-medium text-gray-800 hover:text-accent focus:outline-none"
        >
          <span>Instructions</span>
          {showInstructions ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {showInstructions && (
          <ol className="list-decimal list-inside space-y-2 mt-2 pl-4 text-sm text-gray-600">
            {recipe.instructions?.map((step, index) => (
              <li key={index} className="marker:font-medium">
                {step}
              </li>
            ))}
            {(!recipe.instructions || recipe.instructions.length === 0) && (
              <li className="italic text-gray-400 list-none">
                No instructions provided.
              </li>
            )}
          </ol>
        )}
      </div>
    </div>
  );
}
