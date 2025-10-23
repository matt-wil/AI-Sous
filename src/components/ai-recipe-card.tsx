import { type Recipe } from "@/types";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="">
      <h1>{recipe.name}</h1>
      <h2>Ingredients:</h2>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
      <h2>Instructions:</h2>
      {recipe.instructions.map((instruction, index) => (
        <li key={index}>{instruction}</li>
      ))}
      <p>Time: {recipe.time} minutes</p>
      <p>Servings: {recipe.servings}</p>
      {recipe.cuisine && <p>Cuisine: {recipe.cuisine}</p>}
      {recipe.dietaryRestrictions && (
        <p>Dietary Restrictions: {recipe.dietaryRestrictions.join(", ")}</p>
      )}
    </div>
  );
};

export default RecipeCard;
