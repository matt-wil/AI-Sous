import { AiRecipeApiResponse } from "@/types";
import { GoogleGenAI } from "@google/genai";
import { GenerateContentResponse } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({});

const systemInstruction = `You are a master chef AI assistant. You will be given a comma-separated list of ingredients.
Your task is to generate exactly THREE distinct recipes that primarily use these ingredients.
ONE of these three recipes MUST only use the provided ingredients, and common pantry items (like salt, pepper, oil, etc.) while the other two recipes can include more ingredients.
Respond ONLY with a valid JSON array containing exactly three recipe objects. Do not include any introductory text, closing text, or markdown formatting like \`\`\`json.
Each object in the array must follow this exact format:
{
  "title": "Recipe Title",
  "description": "A brief description of the dish (1-2 sentences).",
  "ingredients_needed": [
    { "name": "Ingredient Name", "quantity": "Amount (e.g., 1 cup, 2 tbsp)" }
  ],
  "instructions": [
    "Step 1...",
    "Step 2...",
    "Step 3..."
  ]
}`;

export async function fetchRecipes(
  prompt: string,
): Promise<AiRecipeApiResponse | null> {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        responseMimeType: "application/json",
      },
    });

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error(
        "No text received from AI response:",
        JSON.stringify(result, null, 2),
      );
      return null;
    }

    console.log("Raw AI Response Text:\n---\n", rawText, "\n---");
    let cleanedText = rawText.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.substring(7);
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }
    cleanedText = cleanedText.trim();

    const recipes: AiRecipeApiResponse = JSON.parse(cleanedText);
    console.log("Parsed Recipes:", recipes);
    return recipes;
  } catch (e) {
    console.error("Error in fetchRecipes (parsing or API call):", e);
    return null;
  }
}
