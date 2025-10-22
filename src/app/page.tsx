import ApiRecipeFinder from "./api-recipe-finder";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex justify-center items-center text-text-center m-2 p-2">
          <h1 className="font-bold text-9xl text-accent">Ai-Sous</h1>
        </div>
        <hr className="mx-4" />
        <div>
          <ApiRecipeFinder />
        </div>
      </main>
    </>
  );
}
