# Personal Portfolio Website

Interactive cloud-ops portfolio for **G R Lokesh** — Senior AWS DevOps & DevSecOps Engineer.

Built with **TanStack Start** (React 19), **Vite**, **Tailwind CSS v4**, and **Three.js / React Three Fiber**
for the interactive 3D experiences.

## Highlights

- Single-page portfolio with hero, about, skills, certifications, experience, projects, impact, CI/CD pipeline,
  interactive **3D platform view**, blog, and contact sections.
- Interactive 3D hero globe (DevOps tool orbit) and a clickable **3D platform control-plane** scene — lazy-loaded,
  performance-guarded, and with graceful static fallbacks.
- Command palette (`Ctrl/⌘ + K`), resume preview + download, AI assistant widget, smooth scrolling, custom cursor.
- Supabase-powered resume-download analytics (optional; app runs without keys in mock mode).

## Prerequisites

- **Node.js** 20.19+ (or 22+)
- **npm** 10+

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Configure environment — the app runs in mock/offline mode without keys
cp .env.example .env
#   then fill in your Supabase / API keys (see "Environment variables" below)

# 3. Start the dev server (http://localhost:3000)
npm run dev
```

Open http://localhost:3000.

## Build & preview (production)

```bash
npm run build      # production build
npm run preview    # preview the production build locally
```

A helper `build:dev` script also builds in development mode.

## Lint & format

```bash
npm run lint    # ESLint
npm run format  # Prettier (write)
```

## Available scripts

| Script              | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Vite dev server on port 3000              |
| `npm run build`     | Production build                          |
| `npm run build:dev` | Build in development mode                 |
| `npm run preview`   | Preview the production build locally      |
| `npm run lint`      | ESLint over `.ts`/`.tsx`                  |
| `npm run format`    | Prettier write-format all supported files |

## Environment variables

See `.env.example` for the full list. The key ones:

| Variable                        | Required | Purpose                                 |
| ------------------------------- | -------- | --------------------------------------- |
| `VITE_SUPABASE_URL`             | optional | Supabase project URL (resume analytics) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | optional | Supabase publishable key                |
| `GEMINI_API_KEY`                | optional | Backend AI assistant provider key       |
| `LOVABLE_API_KEY`               | optional | Lovable platform key                    |

If the Supabase vars are missing the app warns and falls back to mock/offline mode.

## The 3D experiences

- **Hero globe** — a `@react-three/fiber` globe with orbiting DevOps tool badges. Lazy-loaded with a CSS orbit
  fallback while it hydrates, for reduced-motion users, and during SSR.
- **Interactive 3D platform view** (`#platform` section) — a layered, floating glass-dashboard "control plane"
  representing the EKS/GitOps/DevSecOps platform. Drag for parallax, click the labeled service nodes to inspect them.

Both scenes:

- load only when scrolled near them (lazy import + `IntersectionObserver`);
- cap device-pixel-ratio for smoother frames;
- respect `prefers-reduced-motion` (static illustration shown instead);
- fall back to a static illustration if WebGL is unavailable or initialization fails;
- show a simplified/static visual on mobile to keep the page fast.

## Project structure

```
src/
  routes/index.tsx                 # Main portfolio page (all sections)
  routes/__root.tsx                # Root layout, fonts, metadata
  components/HeroGlobe3D.tsx       # Hero 3D globe
  components/PlatformScene3D.tsx   # Interactive 3D platform scene
  components/platform-data.ts      # Platform service nodes data
  components/portfolio-extras.tsx  # Blog, AI assistant, cursor, smooth scroll
  components/ui/*                  # shadcn-style UI primitives
  integrations/supabase/*          # Supabase client / auth / middleware
```

## Notes

- This repository is connected to [Lovable](https://lovable.dev). Do not rewrite published git history
  (no force-pushing, rebasing, amending, or squashing already-pushed commits).
- Keep home and feature branches in a working state — commits pushed here sync back to Lovable.
