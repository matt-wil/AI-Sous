import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex items-baseline max-md:flex-col justify-center">
          <h1 className="font-bold text-9xl text-accent pb-5 m-8">Ai-Sous</h1>
          <Image
            src="/ai-sous.svg"
            alt="Image of Ai-Sous logo"
            width={300}
            height={300}
          />
        </div>
        <hr className="mx-4" />
        <div className="flex flex-col items-center text-center mt-10 p-2 gap-4">
          <div className="flex justify-center items-center gap-4">
            <Link className="landing-button" href="/ai-finder">
              Generate Recipes
            </Link>
            <Link className="landing-button" href="/api-finder">
              Search Recipes
            </Link>
          </div>

          <p className="text-sm text-accent max-w-md px-2 mt-3">
            Choose **Generate Recipes** for unique recipes dreamed up by our
            chef, or **Search Recipes** to explore tested recipes from the web.
          </p>
        </div>
      </main>
    </>
  );
}
