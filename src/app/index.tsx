import Link from "next/link";

export const Index = () => {
  return (
    <div className="flex flex-row gap-6">
      <Link className="landing-button" href="/ai-finder">
        AI Generator
      </Link>
      <Link className="landing-button" href="/api-finder">
        API Finder
      </Link>
    </div>
  );
};
