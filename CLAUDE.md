# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

number6.ai is a marketing website for an AI agency. Built with Astro 5 and React, deployed as a static site.

## Commands

- `pnpm dev` — Start dev server at localhost:4321
- `pnpm build` — Build production site to `./dist/`
- `pnpm preview` — Preview production build locally
- `pnpm astro add <integration>` — Add Astro integrations (e.g., react, tailwind, mdx)
- `pnpm biome check --write` — Lint and format (auto-fix)
- `pnpm react-doctor` — Check React components for issues

## Architecture

- **Framework**: Astro 5 with React integration (to be added via `pnpm astro add react`)
- **Output**: Static site generation (`output: "static"`)
- **TypeScript**: Strict mode, extends `astro/tsconfigs/strict`
- **Package manager**: pnpm
- **Linting/Formatting**: Biome
- **React checks**: react-doctor

### Site Structure

- `/` — Homepage
- `/services/companies` — Services for companies
- `/services/individuals` — Services for individuals
- `/about` — About page
- `/contact` — Get in touch
- `/blog` — Blog (listing + individual posts)

### Design Workflow

Design assets and rules are sourced from `.pen` files via the Pencil MCP. Use the Pencil MCP tools (`batch_get`, `get_guidelines`, `get_screenshot`, etc.) to read design specs — never read `.pen` files directly with `Read` or `Grep`.

Use Context7 MCP for up-to-date Astro documentation.

### Astro Conventions

- **Routing**: File-based. Files in `src/pages/` become routes automatically (`.astro`, `.md`, `.mdx`)
- **Components**: Astro components (`.astro`) for static content, React components (`.tsx`) for interactive islands
- **Layouts**: Shared page shells go in `src/layouts/`
- **Static assets**: Place in `public/` (served at root path)
- **Processed assets**: Import images/assets from `src/` for Astro's image optimization pipeline

### Astro + React (Islands Architecture)

Astro ships zero JS by default. React components only hydrate when given a `client:*` directive:
- `client:load` — Hydrate on page load
- `client:visible` — Hydrate when component enters viewport
- `client:idle` — Hydrate when browser is idle

Use `.astro` components for everything static. Only use React (`.tsx`) when the component needs client-side interactivity.

## Pre-commit

A pre-commit hook runs **react-doctor** and **Biome** before every commit. Both must pass for commits to succeed. Do not skip hooks with `--no-verify`.
