export type Ingredient = string;

export type RecipeFinderProps = {
  onClickSearchAction: () => void;
  heading: string;
  isLoading: boolean;
  error: string | null;
};

export type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string[];
  time: number;
  servings: number;
  cuisine?: string;
  dietaryRestrictions?: string[];
};

export interface SpoonacularRecipeResult {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    unitShort: string;
    name: string;
    originalName: string;
  }>;
  usedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    unitShort: string;
    name: string;
    originalName: string;
  }>;
  likes: number;
}
