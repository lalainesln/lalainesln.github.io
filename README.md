# Engr. Lalaine Aubrey T. Solano Portfolio

A Vite + React portfolio site for a structural-focused civil engineer. The design uses a black and warm gold visual system and is configured for GitHub Pages deployment.

## Local development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

The build produces `dist` for GitHub Actions deployment and also syncs the compiled `index.html` and `assets` folder to the repository root. That keeps the site working even if GitHub Pages is still configured as **Deploy from a branch > main / root**.

## Publish to GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push to the `main` branch.
2. In GitHub, open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**. If it is set to **Deploy from a branch**, GitHub Pages will serve the Vite source `index.html` and the browser will reject `/src/main.jsx`.
4. The workflow builds the Vite app and publishes `dist`.

For a custom LinkedIn button, set `linkedinUrl` in `src/App.jsx`.

## Drawings

Portfolio files live under `public/documents`, `public/drawings`, and `public/models`.

- PDFs open with PDF.js, one page at a time, scaled to fit the viewer. The CV has its own section.
- The AutoCAD DWG opens with `@mlightcad/cad-simple-viewer`. Parsing uses LibreDWG (GPL-3.0) in a separate worker copied to `public/cad` by `scripts/copy-cad-workers.mjs` before `dev` and `build`.
- The Revit 2023 `.rvt` file stays a download. Browsers cannot read that format, and converting it requires Autodesk Revit or a commercial BIM translator.
