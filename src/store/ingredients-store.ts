import { create } from "zustand";
import { type Ingredient } from "@/types";

interface IngredientsState {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredientName: string) => void;
  clearIngredients: () => void;
}

export const useIngredientsStore = create<IngredientsState>((set) => ({
  ingredients: [],
  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
    })),
  removeIngredient: (ingredientName) =>
    set((state) => ({
      ingredients: state.ingredients.filter((ing) => ing !== ingredientName),
    })),
  clearIngredients: () => set({ ingredients: [] }),
}));
