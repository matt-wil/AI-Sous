import { SpoonacularRecipeResult } from "@/types";
import Image from "next/image";

export const ApiRecipeCard = ({
  recipe,
}: {
  recipe: SpoonacularRecipeResult;
}) => {
  return (
    <div
      className="bg-accent flex flex-col text-text text-center justify-center items-center m-2 p-4 rounded-lg"
      key={recipe.id}
      style={{ marginBottom: "15px" }}
    >
      <h3 className="font-bold mb-2">{recipe.title}</h3>
      <div
        style={{
          position: "relative",
          width: "200px",
          aspectRatio: "312/231",
        }}
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg border-1 border-border"
        />
      </div>
      <p>Likes: {recipe.likes}</p>
      <p>Missing {recipe.missedIngredientCount} ingredients.</p>
    </div>
  );
};
