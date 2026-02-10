# UI Kit Generator - Team Brief

## Project Context
We're building a Client Software Generator that creates branded Next.js monorepos 
for marketing software. Read the full PRD in `ui-kit-generator-prd.md`.

## Current Phase: Review & Validation

### Goals
1. Validate current project structure follows Next.js + monorepo best practices
2. Validate Tailwind setup for utility-first approach
3. Implement semantic color system using Tailwind default palettes
4. Prepare foundation for generator UI

### Key Technical Decision: Color System Architecture

**Current problem:** Most theming systems require defining every color, creating inconsistent results.

**Our approach:**
- Use Tailwind's expert-crafted default palettes (slate, gray, zinc, neutral, stone) as semantic base
- These handle 90% of UI (backgrounds, borders, text, shadows)
- Generator adds 3-4 brand colors for accents, CTAs, highlights
- Result: Professional UI that feels on-brand without reinventing the wheel

**Implementation pattern:**
```js
// packages/ui/tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic names map to chosen default palette
        'surface': colors.zinc, // or slate, gray, neutral, stone
        'text': colors.zinc,
        'border': colors.zinc,
        
        // Brand colors added by generator
        'brand-primary': '#FF6B35',
        'brand-secondary': '#004E89',
        'brand-accent': '#F7F7F9',
        'brand-highlight': '#FFC93C',
      }
    }
  }
}
```

### Review Checklist

#### Project Structure
- [ ] Monorepo uses proper workspace configuration (pnpm/npm/yarn)
- [ ] Clear separation: `apps/` and `packages/` directories
- [ ] `packages/ui` contains only reusable components
- [ ] Each app has proper `package.json` with UI package as dependency
- [ ] Shared Tailwind config in `packages/ui` or root
- [ ] TypeScript configured properly across workspace

#### Next.js Best Practices
- [ ] Using App Router (not Pages Router) for new apps
- [ ] Server components by default, Client components marked with 'use client'
- [ ] Proper use of layouts and loading states
- [ ] Metadata API for SEO
- [ ] Image optimization with next/image
- [ ] Font optimization with next/font

#### Tailwind Best Practices
- [ ] Utility-first approach (minimal custom CSS)
- [ ] Using Tailwind's spacing scale (not arbitrary values unless necessary)
- [ ] Responsive design with mobile-first breakpoints
- [ ] Using Tailwind's color palette (not custom hex everywhere)
- [ ] Proper use of variants (hover:, focus:, dark:, etc.)
- [ ] No !important usage (proper specificity management)
- [ ] Content purge configured for production builds

#### Shadcn Integration
- [ ] Components use shadcn structure
- [ ] Components properly typed with TypeScript
- [ ] Variant system using class-variance-authority (CVA)
- [ ] Proper composition with Radix UI primitives
- [ ] Accessible by default (ARIA attributes, keyboard nav)

#### Color System (Critical!)
- [ ] Current color definitions reviewed
- [ ] Plan for semantic color mapping
- [ ] Brand color injection points identified
- [ ] Dark mode strategy defined
- [ ] Color contrast ratios meet WCAG AA standards