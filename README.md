# HUA website baseline

A local, responsive, multi-page baseline inspired by the public information architecture at [thehua.org](https://www.thehua.org/). The homepage and 19 original subpages use plain HTML, CSS, and JavaScript so the visual system can be changed quickly during the Figma design phase.

## Run locally

```bash
npm run dev
```

Then open <http://localhost:4173>.

The original homepage imagery is stored locally in `assets`; no Squarespace runtime is required.

Subpages are served as local routes, including `/executiveofficers/`, `/harvard-guides/`, `/finances/`, and the nested `/club-funding/*` pages. Shared page content and components live in `pages.js`, `page.js`, and `subpage.css`.
