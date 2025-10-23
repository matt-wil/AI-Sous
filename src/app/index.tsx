import Link from "next/link";

export const Index = () => {
  return (
    <div>
      <Link className="landing-button" href="/ai-finder">
        AI Finder
      </Link>
      <Link className="landing-button" href="/api-finder">
        API Finder
      </Link>
    </div>
  );
};
