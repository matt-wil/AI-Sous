import { NextRequest } from "next/server";
import { getRecipeInformationViaId } from "@/lib/spoonacular";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const recipeIdQuery = searchParams.get("id") || "";

  if (!recipeIdQuery) {
    return Response.json({ error: "Recipe id required" }, { status: 400 });
  }

  try {
    const recipeInfo = await getRecipeInformationViaId(recipeIdQuery);
    if (!recipeInfo) {
      return Response.json(
        { error: "Recipe information not found or failed to fetch" },
        { status: 404 },
      );
    }
    return Response.json(recipeInfo);
  } catch (error) {
    return Response.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
