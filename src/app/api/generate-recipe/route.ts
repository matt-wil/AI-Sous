import { NextRequest } from "next/server";
import { fetchRecipes } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { ingredients } = await request.json();
    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return Response.json(
        { error: "Ingredients array is required." },
        { status: 400 },
      );
    }

    const ingredientsQuery = ingredients.join(",");
    const prompt = `Ingredients: ${ingredientsQuery}`;

    const recipes = await fetchRecipes(prompt);
    if (!recipes) {
      return Response.json(
        { error: "Failed to fetch recipes from AI." },
        { status: 500 },
      );
    }

    return Response.json(recipes);
  } catch (error) {
    console.error("Error in /api/generate-recipe: ", error);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
