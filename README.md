# Hosakota Venkata Naga Tharun · Portfolio

Single-page portfolio for an AI Engineer (Generative AI, agents, RAG). Built with Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui conventions, semantic-ui-react (per-component CSS only), and framer-motion for the hero graph.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build into dist/
npm run preview   # serve the production build
```

## Editing content

All copy comes from `src/content/portfolio.ts`. Update facts there; components read from it directly. Do not add claims that are not in the resume.

To publish a GitHub link, set `person.links.github`.

## Structure

```
public/                    resume PDF, optimized portrait, favicon, OG image
src/content/portfolio.ts   single source of truth for content
src/components/
  TopBar.tsx               navigation, theme toggle, resume, Ctrl/Cmd+K
  CommandPalette.tsx       cmdk palette
  Hero.tsx                 photo, name, headline, three actions
  Work.tsx                 project cards: summary + owned bullets left, live flow right
  FinancialFlow.tsx        live pipeline: images → base64 → Azure Function → agents → 3 phases → summary
  RoutingGraph.tsx         live routing graph cycling sample queries (query → router → agent)
  WorkatoFlow.tsx          live contact → agent (advises) → recipe (acts), plus delete approval
  Sections.tsx             skills, experience, education, contact, footer
  shared.tsx               layout helpers and the demo disclaimer
src/theme.tsx              light/dark theme with manual toggle
src/index.css              design tokens and Semantic UI overrides
```

## Notes

- Every demo is offline and hard-coded, and shows: “Illustrative simulation of the idea. Not the production system and no client data.”
- Only `semantic-ui-css/components/label.min.css` is imported. Never import `semantic.min.css`.
- Live flows loop while they are on screen. With reduced motion they still step through, without the moving parts.
- Before deploying, replace the relative `og:image` URL in `index.html` with an absolute URL on your domain so link previews work.
