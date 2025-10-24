import type {
  SpoonacularRecipeResult,
  SpoonacularRecipeInformation,
} from "@/types";

export async function searchRecipesViaIngredients(
  ingredients: string[],
): Promise<SpoonacularRecipeResult[] | null> {
  const spoonacularBaseUrl = process.env.SPOONACULAR_BASE_URL;
  const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;

  if (!spoonacularApiKey) {
    console.log("Spoonacular API key is not defined...");
    return [];
  }

  if (!spoonacularBaseUrl) {
    console.log("Spoonacular Base url is not there...");
    return [];
  }
  const ingredientsToString = ingredients.join(",");

  const fullUrl = `${spoonacularBaseUrl}/findByIngredients?ingredients=${ingredientsToString}&number=9&apiKey=${spoonacularApiKey}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(
        "Error in response for search spoonacular",
        errorData.message,
      );
      return null;
    }
    const data = (await response.json()) as SpoonacularRecipeResult[];
    return data;
  } catch (error) {
    console.log("Error in searchRecipesViaIngredients API call: ", error);
    return null;
  }
}

export async function getRecipeInformationViaId(
  recipeId: string,
): Promise<SpoonacularRecipeInformation | null> {
  const spoonacularBaseUrl = process.env.SPOONACULAR_BASE_URL;
  const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;

  if (!spoonacularApiKey) {
    console.log("Spoonacular API key is not defined...");
    return null;
  }

  if (!spoonacularBaseUrl) {
    console.log("Spoonacular Base url is not there...");
    return null;
  }
  const fullUrl = `${spoonacularBaseUrl}/${recipeId}/information?apiKey=${spoonacularApiKey}&includeNutrition=false`;
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      console.log("Error in response for search spoonacular");
      return null;
    }
    const data = (await response.json()) as SpoonacularRecipeInformation;
    return data;
  } catch (error) {
    console.log("Error in searchRecipesViaIngredients API call: ", error);
    return null;
  }
}
