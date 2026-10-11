# G R Lokesh — DevOps & DevSecOps Engineer Portfolio

A premium, interactive portfolio for a DevOps & DevSecOps Engineer: **AWS & Azure · Kubernetes · Terraform · GitOps · Cloud Security**.

GitHub: [@grlokesh96](https://github.com/grlokesh96) · LinkedIn: [in/grlokesh96](https://www.linkedin.com/in/grlokesh96)

## Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR via Nitro)
- **Build tool:** Vite 8 · **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (custom design tokens in `src/styles.css`)
- **Animation:** framer-motion · **Smooth scroll:** Lenis
- **3D:** three + @react-three/fiber + @react-three/drei — hero globe and interactive platform scene (lazy-loaded, WebGL-guarded, with static fallbacks)
- **Backend:** Supabase (resume-download analytics), AI assistant via Lovable AI gateway or Google Gemini

## Sections

Hero (3D globe) — About & stats — Skills (grouped by discipline) — Certifications — Experience — **Interactive 3D platform view** — Selected projects — Impact metrics — DevSecOps pipeline — Blog — Contact — footer. Includes a `Ctrl/⌘+K` command palette, an interactive resume preview modal (web + PDF), a built-in AI assistant, smooth scrolling, and a custom cursor.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start dev server (port `3000`)           |
| `npm run build`      | Production build (SSR output in `.output`) |
| `npm run preview`    | Preview the production build             |
| `npm run lint`       | ESLint over the repo                     |
| `npm run format`     | Prettier write                           |

## Environment variables

Copy `.env.example` to `.env` when you want backend features enabled. Everything else falls back to safe placeholders so the app still renders.

| Variable                        | Required | Purpose                                        |
| ------------------------------- | -------- | ---------------------------------------------- |
| `VITE_SUPABASE_URL`             | no*      | Supabase project URL (resume-download counter) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | no*      | Supabase anon/publishable key                  |
| `SUPABASE_URL`                  | no*      | Server-side Supabase URL                       |
| `SUPABASE_SERVICE_ROLE_KEY`     | no       | Server-side Supabase admin key                 |
| `GEMINI_API_KEY`                | no       | AI assistant provider (OpenAI-compatible)      |
| `LOVABLE_API_KEY`               | no       | AI assistant via Lovable AI gateway (preferred)|

\* Without these, resume-download analytics and related live counters are disabled but the site renders normally.

## Notes

- The 3D hero globe and platform scene are dynamically imported and shipped as separate chunks; they never block first paint (SSR renders the non-canvas fallback).
- Respects `prefers-reduced-motion` (custom cursor, particles, and large animations are disabled or simplified).
- No `package-lock.json` is committed to the repository.
- Projects are connected to [Lovable](https://lovable.dev) — avoid rewriting published git history (no force-push / rebase / amend on shared branches).