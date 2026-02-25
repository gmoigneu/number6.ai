# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

number6.ai is a marketing website for an AI agency. Built with Astro 5 and React, deployed as a static site.

## Repository Structure

The repo is organized as a monorepo with the Astro website code in `website/`:

```
number6.ai/
├── website/          # Astro site (source, config, build output)
├── design/           # Design files (.pen)
├── docs/             # Documentation
├── openspec/         # OpenSpec artifacts
├── assessment/       # AI readiness assessment
└── CLAUDE.md
```

## Commands

All commands should be run from the `website/` directory:

- `pnpm dev` — Start dev server at localhost:4321
- `pnpm build` — Build production site to `./website/dist/`
- `pnpm preview` — Preview production build locally
- `pnpm astro add <integration>` — Add Astro integrations (e.g., react, tailwind, mdx)
- `pnpm biome check --write` — Lint and format (auto-fix)
- `npx -y react-doctor@latest . --verbose` — Check React components for issues

## Architecture

- **Framework**: Astro 5 with React integration (`@astrojs/react`)
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

- **Routing**: File-based. Files in `website/src/pages/` become routes automatically (`.astro`, `.md`, `.mdx`)
- **Components**: Astro components (`.astro`) for static content, React components (`.tsx`) for interactive islands
- **Layouts**: Shared page shells go in `website/src/layouts/`
- **Static assets**: Place in `website/public/` (served at root path)
- **Processed assets**: Import images/assets from `website/src/` for Astro's image optimization pipeline

### Astro + React (Islands Architecture)

Astro ships zero JS by default. React components only hydrate when given a `client:*` directive:
- `client:load` — Hydrate on page load
- `client:visible` — Hydrate when component enters viewport
- `client:idle` — Hydrate when browser is idle

Use `.astro` components for everything static. Only use React (`.tsx`) when the component needs client-side interactivity.

## Pre-commit

A pre-commit hook runs **react-doctor** and **Biome** before every commit. Both must pass for commits to succeed. Do not skip hooks with `--no-verify`.

## Implemented Pages

### Homepage (`/`)
Fully implemented with 12 sections matching the design in `design/number6.pen`:
- **Layout**: `website/src/layouts/BaseLayout.astro` (shared Header + Footer + HTML shell + Google Fonts)
- **Header**: `website/src/components/Header.astro` — dark bg, logo, nav, CTA
- **Footer**: `website/src/components/Footer.astro` — dark bg, link columns, copyright
- **Sections** (in `website/src/components/sections/`): Hero, TrustBar, TheProblem, WhatWeDo, HowWeWork, WhyNumber6, WhoItsFor, SocialProof, TheName, FinalCta

### Theme
Brand colors are defined as CSS custom properties in `website/src/styles/global.css`:
- Background: `#F5F2ED` (warm off-white)
- Foreground/Primary: `#1A1A1A` (dark)
- Accent: `#C45A3B` (terracotta)
- Muted: `#E8E4DD` (warm beige)
- Fonts: Space Grotesk (`font-heading`) and Inter (`font-body`) via `@theme` block

All components use Tailwind CSS variable classes (e.g., `bg-accent`, `text-foreground`) — no hardcoded hex values.
