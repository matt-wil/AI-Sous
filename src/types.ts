export type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string[];
  time: number; // in minutes
  servings: number;
  cuisine?: string;
  dietaryRestrictions?: string[];
};
