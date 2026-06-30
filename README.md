# rogedev-portfolio

Personal portfolio of **Rogelio Rivas** — Backend Engineer. Built with [Gatsby](https://www.gatsbyjs.com/) 5, styled-components, and MDX content.

## Features

- Minimal, monospace design (Roboto Mono / Rubik) — light & dark mode toggle (persisted to `localStorage`).
- Animated three.js "RainbowKnot" on the homepage.
- MDX-driven `projects`, `experience`, and `blog` sections.

## Develop

```bash
npm install
npm run develop   # http://localhost:8000
```

## Build & serve

```bash
npm run build
npm run serve
```

## Content

| Section      | Location                                |
| ------------ | --------------------------------------- |
| Projects     | `src/content/projects/<slug>/index.mdx` |
| Books        | `src/content/books/<slug>/index.mdx`    |
| Blog posts   | `src/content/posts/<slug>/index.mdx`    |
| Homepage bio | `src/pages/index.js`                    |

## Deploy (GitHub Pages)

```bash
npm run deploy   # builds and pushes public/ to the master branch via gh-pages
```

For a project repo (`<user>.github.io/<repo>`), uncomment and set `pathPrefix` in `gatsby-config.js` and the deploy build will need `--prefix-paths`. For a root user site (`rogedev.github.io`), leave `pathPrefix` unset.
