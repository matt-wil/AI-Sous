import { Index } from ".";
import Image from "next/image";

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
        <div className="flex justify-center items-center text-text-center mt-10 p-2">
          <Index />
        </div>
      </main>
    </>
  );
}
