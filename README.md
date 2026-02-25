# number6.ai

Marketing website for Number 6, an AI agency. Built with Astro 5 and React, deployed as a static site.

## Setup

```sh
cd website
pnpm install
```

## Development

With portless (preferred):

```sh
cd website
portless number6 pnpm dev
```

This makes the site available at `http://number6.localhost:1355`.

Without portless:

```sh
cd website
pnpm dev
```

Available at `http://localhost:4321`.

## Commands

All commands run from the `website/` directory:

| Command        | Action                                    |
| :------------- | :---------------------------------------- |
| `pnpm dev`     | Start dev server                          |
| `pnpm build`   | Build production site to `./dist/`        |
| `pnpm preview` | Preview production build locally          |
| `pnpm astro …` | Run CLI commands like `astro add`, `check` |
