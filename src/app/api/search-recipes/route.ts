import { NextRequest } from "next/server";
import { searchRecipesViaIngredients } from "@/lib/spoonacular";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const ingredientsQuery = searchParams.get("ingredients") || "";

  if (!ingredientsQuery) {
    return Response.json({ error: "Ingredients required" }, { status: 400 });
  }

  const ingredientsArray = ingredientsQuery.split(",");

  try {
    const recipies = await searchRecipesViaIngredients(ingredientsArray);
    return Response.json(recipies);
  } catch (error) {
    return Response.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
