import { type SpoonacularRecipeResult } from "@/types";

export async function searchRecipesViaIngredients(
  ingredients: string[],
): Promise<SpoonacularRecipeResult[]> {
  const spoonacularBaseUrl = process.env.SPOONACULAR_GET_BY_INGREDIENTS_URL;
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

  const fullUrl = `${spoonacularBaseUrl}?ingredients=${ingredientsToString}&apiKey=${spoonacularApiKey}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(
        "Error in response for search spoonacular",
        errorData.message,
      );
      return [];
    }
    const data = (await response.json()) as SpoonacularRecipeResult[];
    return data;
  } catch (error) {
    console.log("Error in searchRecipesViaIngredients API call: ", error);
    return [];
  }
}
