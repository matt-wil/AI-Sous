export type Ingredient = string;

export type RecipeFinderProps = {
  onClickSearchAction: () => void;
  heading: string;
  isLoading: boolean;
  error: string | null;
  buttonLabel: string;
  buttonClickedLabel: string;
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

export interface SpoonacularInstructionIngredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface SpoonacularInstructionEquipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface SpoonacularInstructionStep {
  number: number;
  step: string;
  ingredients: SpoonacularInstructionIngredient[];
  equipment: SpoonacularInstructionEquipment[];
  length?: {
    number: number;
    unit: string;
  };
}

export interface SpoonacularAnalyzedInstructionsResponse {
  name: string;
  steps: SpoonacularInstructionStep[];
}

export interface SpoonacularRecipeInformation {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  cookingMinutes?: number;
  preparationMinutes?: number;
  license?: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: SpoonacularAnalyzedInstructionsResponse[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: SpoonacularExtendedIngredient[];
  summary: string;
  winePairing?: {
    pairedWines?: string[];
    pairingText?: string;
    productMatches?: Array<{
      id: number;
      title: string;
      description: string;
      price: string;
      imageUrl: string;
      averageRating: number;
      ratingCount: number;
      score: number;
      link: string;
    }>;
  };
}

export interface SpoonacularExtendedIngredient {
  aisle: string | null;
  amount: number;
  consistency: string;
  id: number;
  image: string | null;
  measures: {
    metric: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
    us: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
  };
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

export interface SpoonacularInstructionIngredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface SpoonacularInstructionEquipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface SpoonacularInstructionStep {
  number: number;
  step: string;
  ingredients: SpoonacularInstructionIngredient[];
  equipment: SpoonacularInstructionEquipment[];
  length?: {
    number: number;
    unit: string;
  };
}

export interface SpoonacularAnalyzedInstructionsResponse {
  name: string;
  steps: SpoonacularInstructionStep[];
}

interface AiRecipeIngredient {
  name: string;
  quantity: string;
}

export interface AiRecipeResponse {
  title: string;
  description: string;
  ingredients_needed: AiRecipeIngredient[];
  instructions: string[];
}

export type AiRecipeApiResponse = AiRecipeResponse[];
