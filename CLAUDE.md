# CLAUDE.md

Personal portfolio of Mohammad Imran Hossain. React 18 + Vite + react-router 7, plain CSS, deployed to Netlify.

## Commands
- `npm run dev` — dev server on port 3000
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint on `src/`, zero warnings allowed
- `npm run test:resume` — node tests for the résumé and the project data (this also rebuilds the PDFs)
- `npm run resume` — rebuild the résumé PDFs from `resume/content.mjs`

## Where things live
- `resume/content.mjs` — single source for the résumé PDFs and the site (headline, summary, experience, skills, products, and the site-only `site` block). Don't copy its text into components.
- `src/data/projects.mjs` — text for every project page. No image imports, so node can test it. Project IDs are public URLs: never renumber. `/project/5` is retired and redirects to `/projects`.
- `src/data/projectImages.js` — screenshots per project id. Public pages only. No screenshots of Uno or Signalist.
- `src/data/blog.js` — blog posts, rendered with react-markdown.
- `src/index.css` — the whole design. Colours are CSS variables on `:root` and `:root[data-theme='dark']`.
- `src/components/ui.jsx` — `Row` (rail + content), `ProjectIndex`, `Shot`, `useTitle`.
- `src/pages/` — Home, Projects, ProjectDetail, Blog, BlogPost, Resume.

## Design
One idea: a ledger. A narrow mono rail on the left, one hairline down the page, content on the right. Under 760px the rail stacks above the content. No UI library, no animation library. Keep it that way.

The theme is set before paint by the inline script in `index.html` (saved choice, else the system setting). `?theme=dark` or `?theme=light` forces one without saving it.

## Copy rules
Plain short sentences, first person. Few numbers. `FORBIDDEN` in `resume/render.mjs` lists claims and filler words that tests reject in both the résumé and the project data. Facts come from `../work-inventory-2026-11.md`, including its "Do NOT claim" list.
