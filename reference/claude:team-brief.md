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

## Phase 2: Build Base UI Kit V1.0

### Component Inventory for V1.0

Based on internal + client test requirements, we need:

#### Layout & Structure
- [ ] Container (responsive, max-width variants)
- [ ] Grid (responsive columns)
- [ ] Stack (vertical/horizontal spacing)
- [ ] Divider

#### Typography
- [ ] Heading (h1-h6 with semantic sizing)
- [ ] Text (body, caption, small)
- [ ] Link (with variants)
- [ ] Code (inline and block)

#### Forms & Inputs
- [ ] Button (primary, secondary, outline, ghost, destructive)
- [ ] Input (text, email, password, number)
- [ ] Textarea
- [ ] Select / Dropdown
- [ ] Checkbox
- [ ] Radio
- [ ] Switch
- [ ] Label
- [ ] Form (with validation states)

#### Feedback
- [ ] Alert (info, success, warning, error)
- [ ] Toast (notification system)
- [ ] Badge (status indicators)
- [ ] Progress (bar and spinner)
- [ ] Skeleton (loading states)

#### Navigation
- [ ] Tabs
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Command (⌘K search)

#### Overlays
- [ ] Modal / Dialog
- [ ] Dropdown Menu
- [ ] Popover
- [ ] Tooltip
- [ ] Sheet (slide-out panel)

#### Data Display
- [ ] Table (sortable, with pagination)
- [ ] Card
- [ ] Avatar
- [ ] DataList (key-value pairs)

### Quality Standards

Every component must have:
1. **TypeScript types** - Full type safety
2. **Variants** - Using CVA (class-variance-authority)
3. **Accessibility** - ARIA labels, keyboard nav, focus management
4. **Documentation** - Storybook story with examples
5. **Semantic colors** - Uses surface/text/border/brand system
6. **Responsive** - Works mobile to desktop
7. **Dark mode ready** - Even if not implemented yet

### Component Template

All components should follow this structure:

```tsx
// packages/ui/src/components/button.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles - uses semantic colors
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-white hover:bg-brand-primary/90",
        secondary: "bg-brand-secondary text-white hover:bg-brand-secondary/90",
        outline: "border border-border bg-surface hover:bg-surface-2",
        ghost: "hover:bg-surface-2",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }

MISSION: Phase 3 - Build Generator Application

CONTEXT:
- Read `.claude/team-brief.md` Phase 3
- Generator turns brand inputs into ready-to-use monorepo
- Core innovation: Semantic color system that combines Tailwind defaults + brand colors

TEAM STRUCTURE:

1. GENERATOR ARCHITECT
   - Design the generation pipeline
   - Define configuration injection strategy
   - Plan error handling and validation

2. FRONTEND BUILDER
   - Build the web UI form
   - Color pickers, palette selector, font inputs
   - Form validation
   - Loading states, error display

3. BACKEND BUILDER
   - Build API endpoint for generation
   - Template cloning logic
   - Config injection (Tailwind, fonts, logo)
   - File system operations
   - .zip creation

4. TEMPLATE SPECIALIST
   - Create the base-monorepo template
   - Add placeholders in right places
   - Ensure template is cloneable and buildable
   - Test manual generation first

5. QA AGENT
   - Test full generation flow
   - Verify generated projects build successfully
   - Check that brand colors appear correctly
   - Validate logo replacement works
   - Test edge cases (invalid inputs, etc.)

WORKFLOW:
1. Template Specialist: Create base-monorepo template first
2. Architect: Design generation pipeline
3. Backend + Frontend build in parallel
4. QA validates as features complete
5. End-to-end test

Start with Template Specialist creating the template, then move to pipeline design.