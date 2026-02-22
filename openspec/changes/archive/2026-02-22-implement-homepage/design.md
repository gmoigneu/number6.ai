## Context

The number6.ai site is scaffolded with Astro 5, React, Tailwind v4, and shadcn (new-york style, neutral base). The homepage design is finalized in `design/number6.pen` — a 1440px-wide, 12-section vertical layout. The current site has only a placeholder `<h1>Astro</h1>`.

shadcn is configured with CSS variables in `src/styles/global.css`. The default theme uses generic neutral oklch colors that need to be replaced with the number6 brand palette.

## Goals / Non-Goals

**Goals:**
- Customize the Tailwind/shadcn CSS variable theme to match the number6 brand
- All brand colors defined as CSS custom properties (user requested: "use variables for colors")
- Load Space Grotesk and Inter fonts
- Create reusable Header and Footer as Astro components within a BaseLayout
- Implement the full homepage as static Astro components (no React hydration needed)
- Match the design pixel-closely at 1440px; be responsive down to mobile

**Non-Goals:**
- Other pages (services, about, blog, contact) — separate changes
- CMS integration or dynamic content
- Dark mode (design is light-only)
- Animations or scroll effects
- Mobile hamburger menu (can be added later)

## Decisions

### 1. Brand colors as CSS custom properties

Override the shadcn `:root` variables in `global.css` with number6 brand colors. Add custom properties for colors not covered by shadcn's default set.

**Brand palette → CSS variables mapping:**

| Design Token | Hex | CSS Variable |
|---|---|---|
| Page background (warm off-white) | `#F5F2ED` | `--background` |
| Dark surface | `#1A1A1A` | `--foreground` / `--primary` |
| Brand accent (terracotta) | `#C45A3B` | `--accent` (repurpose) |
| Warm beige sections | `#E8E4DD` | `--muted` |
| Body text gray | `#888888` | `--muted-foreground` |
| Light text on dark | `#999999` | `--secondary-foreground` (dark ctx) |
| Border/divider dark | `#333333` | `--border` (dark ctx) |
| CTA text on accent | `#F5F2ED` | `--accent-foreground` |

We'll remove the `.dark` theme block since we're light-only.

**Rationale:** Reusing shadcn's variable naming means shadcn components we add later automatically pick up brand colors. The user explicitly wants variables for all colors.

### 2. Font loading via Google Fonts `<link>`

Add `<link>` tags in BaseLayout's `<head>` for Space Grotesk (400, 600, 700) and Inter (400, 500). Set via Tailwind `@theme` inline block as `--font-heading` and `--font-body`.

**Rationale:** Simpler than self-hosting for a static marketing site. Preconnect ensures fast loading.

### 3. Pure Astro components (no React)

All homepage sections are static — no interactivity required. Build everything as `.astro` files. This means zero JavaScript shipped to the client.

**Rationale:** Astro's islands architecture means we only use React when we need client-side interactivity. The homepage is purely presentational.

### 4. Component structure

```
src/
  layouts/
    BaseLayout.astro          # <html>, <head>, fonts, global styles, Header + Footer
  components/
    Header.astro              # Sticky header with logo, nav, CTA
    Footer.astro              # Footer with logo, links, legal
    sections/
      Hero.astro
      TrustBar.astro
      TheProblem.astro
      WhatWeDo.astro
      HowWeWork.astro
      WhyNumber6.astro
      WhoItsFor.astro
      SocialProof.astro
      TheName.astro
      FinalCta.astro
  pages/
    index.astro               # Composes BaseLayout + all sections
```

**Rationale:** Each section is its own component for readability and maintainability. Section components are only used on the homepage, so no need for excessive abstraction.

### 5. Icons via lucide-react

Use `lucide-react` icons (already a shadcn dependency) rendered statically in `.astro` files. Import individual icons and render them in Astro's server-side context.

**Rationale:** The design uses Lucide icons (arrow-right, arrow-down, tag, shield-check, users, globe, graduation-cap, briefcase, palette, truck, rocket). lucide-react is already installed via shadcn.

### 6. Responsive approach

Design is 1440px. Use Tailwind's responsive breakpoints:
- `max-w-[1440px] mx-auto` wrapper or fluid `px-16` on desktop
- Stack horizontal layouts vertically on mobile (`flex-col` on `md:` breakpoint)
- Reduce heading font sizes on smaller screens

## Risks / Trade-offs

- **[Font flash]** → Google Fonts may cause FOIT/FOUT. Mitigate with `font-display: swap` (default with Google Fonts) and preconnect hints.
- **[No mobile nav]** → Header nav links will wrap or overflow on mobile. Accept for now; mobile hamburger is a follow-up task.
- **[Large page]** → 12 sections is a lot of content. Static HTML compresses well and Astro ships zero JS, so performance should be fine.
