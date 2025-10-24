import Image from "next/image";

import {
  SpoonacularRecipeInformation,
  SpoonacularExtendedIngredient,
  SpoonacularInstructionStep,
} from "@/types";
import Link from "next/link";

interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

async function getRecipeInfoForPage(
  id: string,
): Promise<SpoonacularRecipeInformation | null> {
  try {
    const absoluteUrl = new URL(
      `/api/recipe-instructions?id=${id}`,
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    ).toString();

    console.log(`[Page: ${id}] Fetching internal API: ${absoluteUrl}`);

    const res = await fetch(absoluteUrl, {
      cache: "no-store",
    });

    console.log(`[Page: ${id}] Internal API status: ${res.status}`);

    if (!res.ok) {
      let errorBody = `Status: ${res.status}, StatusText: ${res.statusText}`;
      try {
        const errJson = await res.json();
        errorBody = errJson.error || JSON.stringify(errJson);
      } catch (e) {}
      console.error("Failed to fetch from internal API:", errorBody);
      return null;
    }

    const recipeInfo: SpoonacularRecipeInformation = await res.json();
    return recipeInfo;
  } catch (error) {
    console.error(`[Page: ${id}] Error fetching recipe info on page:`, error);
    return null;
  }
}

export default async function RecipeDetailPage({
  params,
}: RecipeDetailPageProps) {
  const recipeId = params.id;

  const recipe = await getRecipeInfoForPage(recipeId);
  const steps = recipe?.analyzedInstructions?.[0]?.steps || [];
  const plainInstructions = recipe?.instructions || "";

  if (!recipe) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Recipe Not Found (or Fetch Failed)
        </h1>
        <p>Could not retrieve details for recipe ID: {recipeId}.</p>
        <p>Check the server console logs for fetch errors.</p>
      </div>
    );
  }

  return (
    <>
      <Link href="/" className="m-4 sous-button">
        Home
      </Link>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">{recipe.title}</h1>
        <div className="mb-6 relative aspect-video shadow-md rounded-lg overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mb-6 text-base text-gray-700 flex justify-center gap-x-6 border-y py-3 bg-gray-50 rounded">
          <span>🍽️ Servings: {recipe.servings}</span>
          <span>⏱️ Ready in: {recipe.readyInMinutes} mins</span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1 bg-gray-50 p-4 rounded shadow-sm">
            {Array.isArray(recipe.extendedIngredients) &&
            recipe.extendedIngredients.length > 0 ? (
              recipe.extendedIngredients.map(
                (ing: SpoonacularExtendedIngredient, index: number) => (
                  <li
                    key={`${ing.id ?? ing.originalName}-${index}`}
                    className="text-gray-800"
                  >
                    {ing.original}
                  </li>
                ),
              )
            ) : (
              <li className="text-gray-500 italic">No ingredients listed.</li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
          {steps && steps.length > 0 ? (
            <ol className="list-decimal list-inside space-y-4 bg-gray-50 p-4 rounded shadow-sm">
              {steps.map((step: SpoonacularInstructionStep) => (
                <li
                  key={step.number}
                  className="mb-2 text-gray-800 marker:font-semibold"
                >
                  {step.step}
                </li>
              ))}
            </ol>
          ) : plainInstructions ? (
            <div
              className="prose prose-sm max-w-none bg-gray-50 p-4 rounded shadow-sm"
              dangerouslySetInnerHTML={{ __html: plainInstructions }}
            />
          ) : (
            <p className="text-gray-500 italic bg-gray-50 p-4 rounded shadow-sm">
              No detailed instructions provided.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
