# AI Recipe App

AI Recipe App is a small, focused web application built with Next.js that helps you generate cooking recipes using AI. Enter ingredients, dietary preferences, or a short prompt and let the app generate a complete recipe with steps, estimated times, and suggested substitutions. It's designed as a developer-friendly starter for building AI-driven food & recipe experiences.

I wrote this README to help you get the project running locally, understand the architecture, and customize the AI integration to match your preferred provider.

---

## Table of contents

- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Environment variables](#environment-variables)
  - [Run locally](#run-locally)
- [How to use the app](#how-to-use-the-app)
- [Project structure](#project-structure)
- [AI integration notes](#ai-integration-notes)
- [Scripts](#scripts)
- [Development tips & troubleshooting](#development-tips--troubleshooting)
- [Contributing](#contributing)
- [License & credits](#license--credits)
- [Contact](#contact)

---

## Key features

- Generate recipes from ingredient lists or natural-language prompts.
- Filter or request recipes for diet preferences (e.g., vegan, gluten-free).
- Adjustable servings and basic scaling suggestions.
- Save favorites locally (or plug in a backend to persist).
- Extensible AI integration layer so you can swap providers or models.

Note: Exact UI features depend on the implementation in your codebase; this README focuses on setup, extension points, and how to configure the AI provider.

---

## Tech stack

- Next.js (App Router)
- React
- TypeScript - project includes `page.tsx` files
- Server-side API routes (Next.js `app` or `pages` API) to call your AI provider securely
- Optional: any CSS framework you prefer (Tailwind, CSS Modules, etc.)

---

## Getting started

### Prerequisites

Make sure you have the following installed:

- Node.js (16+ recommended)
- npm, yarn, or pnpm
- An API key for your AI provider (for example, OpenAI or another LLM provider) mine uses GeminiAPI therefore you would have to adjust code accordingly for any other provider.

### Install

1. Clone the repository (or open the project directory):

   - If you haven't already, navigate to your project root:
     - `cd /ai-recipe-app`

2. Install dependencies with your package manager of choice:

    - Using npm:
        npm install

    - Using yarn:
        yarn

    - Using pnpm:
        pnpm install

(Replace above commands with the ones you prefer in your environment.)

### Environment variables

The app uses server-side calls to your AI provider. Create an `.env.local` file in the project root and add the required keys. A minimal example:

    # .env.local (example)
    # Your AI provider secret (the app should only use this server-side)
    GEMINI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Important:
- Never commit `.env.local` or your secret keys to version control.
- Use `NEXT_PUBLIC_` prefix only for variables that need to be exposed to the browser. Never expose secret keys.

### Run locally

Start the development server:

    npm run dev
    # or
    yarn dev
    # or
    pnpm dev

Open http://localhost:3000 in your browser. The app's main page is located at `app/page.tsx` and will hot-reload on changes.

---

## How to use the app

The UI is intentionally simple:

1. Enter ingredients or a short prompt describing what you want (e.g., "chicken, tomatoes, garlic" or "vegan dinner with chickpeas").
2. Optionally set dietary filters (vegan, vegetarian, gluten-free), desired servings, or cooking time limits.
3. Click the "Generate" button to request a recipe from the AI.
4. The app will display:
   - A recipe title
   - Ingredient list (scaled to the selected serving size)
   - Step-by-step instructions
   - Estimated prep/cook time and tips/substitutions
5. Save favorites locally or export recipes if the UI supports it.

If you want to customize the behavior (prompt engineering, temperature, model), edit the server-side logic that transforms user input into AI prompts. See [AI integration notes](#ai-integration-notes).

---

## Project structure (high level)

Here are the main folders and files to look for:

- `app/` - Next.js App Router pages and layout (entrypoint `app/page.tsx`)
- `app/api/` - Server-side API routes that call the AI provider (secure place for secrets)
- `components/` - Reusable UI components (forms, recipe card, list)
- `lib/` - Shared utilities (API wrappers, prompt builders)
- `public/` - Static assets (images, icons)
- `styles/` - Global styles or CSS framework config
- `package.json` - Scripts and dependencies

Open these files to locate the AI call and see how prompts are constructed. I usually add a small wrapper in `lib/ai.ts` (or similar) that isolates provider specifics.

---

## AI integration notes

The app should keep your API key on the server only. Typical pattern:

- UI -> server API route -> provider SDK/API -> server processes response -> UI

Server-side (Next.js) API example design:
- Endpoint: `POST /api/generate-recipe`
- Input: ingredients, preferences, servings, any extra prompt text
- Server builds a structured prompt and calls the provider (OpenAI, Anthropic, etc.)
- Server processes the provider response into JSON and returns it to the client

When customizing:
- Centralize provider logic in one module (e.g., `lib/ai.ts`) so swapping providers is straightforward.
- Implement basic retries and error handling for provider requests.
- Add rate-limiting and input validation if you plan to expose the app publicly.

Prompt engineering suggestions:
- Provide clear structure and examples in the prompt (title, ingredients, steps).
- Ask for JSON output when you want to parse fields reliably (e.g., request a JSON object with `title`, `ingredients`, `steps`, `time`).
- Include constraints (max ingredients, vegan flag, max steps).

---

## Scripts

Common scripts (typical for create-next-app projects):

- `dev` — run development server
- `build` — build for production
- `start` — run production server after build
- `lint` — run linter (if configured)
- `test` — run tests (if configured)

Run them with:

    npm run dev
    npm run build
    npm run start
    npm run lint
    npm test

Check `package.json` to confirm the exact scripts available.

---

## Development tips & troubleshooting

- If the app fails to call the AI provider:
  - Verify your `GEMINI_API_KEY` (or equivalent) is set in `.env.local` and the server has access.
  - Check server logs in the terminal running `npm run dev` for error messages.
  - Confirm the API route path and request payload match the server handler.
- If CORS or browser exposure of keys occurs:
  - Move provider calls to server-side API routes; never call provider services directly from the client with a secret key.
- If you see unexpected AI outputs:
  - Improve the prompt with clearer examples and stricter output format requirements (ask for JSON).
  - Adjust `temperature` / `top_p` parameters on your model calls to reduce randomness.

---

## Extending the app

Ideas for features you may want to add:

- User accounts and recipe persistence (use a database + auth)
- Shopping list generation and export (CSV or integration with services)
- Nutrition estimates (integrate a nutrition API)
- Multi-language support
- Save recipe history and versioning for prompt experiments
- Rate limiting and billing metrics if you deploy publicly

---

## Contributing

If you plan to contribute:

1. Create a fork and a feature branch.
2. Keep changes focused and document new env variables or architecture changes.
3. Open a pull request with a clear description of the change and rationale.
4. Add or update tests for new behaviors where applicable.

---

## License & credits

- This repository follows the license specified in the `LICENSE` file (if present). Add or update the license to match how you want to share the project.
- Built with Next.js — see https://nextjs.org
- You are responsible for managing and securing any AI API keys and usage billing.

---

## Contact

If you want help customizing the app or integrating a specific AI provider, let me know what provider and which parts you want to change (prompt format, output structure, or UI behavior) and I can suggest concrete code edits.

Enjoy building your AI-powered recipe experience!
