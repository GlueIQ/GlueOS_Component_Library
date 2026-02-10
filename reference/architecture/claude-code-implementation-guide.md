# How to Build UI Kit Generator with Claude Code Agent Teams

This guide walks you through using Claude Code's agent teams to implement your Client Software Generator, starting with validation and proceeding through implementation.

---

## Overview

**What we're building:**
1. **Phase 1:** Review and validate current project structure
2. **Phase 2:** Build/refine Base UI Kit V1.0
3. **Phase 3:** Build Generator Application

**Key innovation in your approach:**
- Use Tailwind's expert-crafted default palettes (slate, gray, zinc, neutral, stone) as semantic foundation
- Generator lets users pick a default palette + add 3-4 brand colors
- This gives professional-looking defaults while maintaining brand identity

---

## Prerequisites

1. **Claude Code installed** with agent teams feature enabled
2. **Your current monorepo** accessible in your terminal
3. **This PRD** (`ui-kit-generator-prd.md`)
4. **Component library strategy doc** (`component-library-strategy.md`)

---

## Phase 1: Project Review & Validation

### Step 1: Initialize Agent Team for Review

**Create a team brief file** that Claude Code agents will reference:

```bash
# In your project root, create:
touch .claude/team-brief.md
```

**Paste this into `.claude/team-brief.md`:**

```markdown
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
```

**Save this file** - agents will reference it throughout the project.

---

### Step 2: Start Review Agent Team

**Open Claude Code** and run:

```bash
# Navigate to your project
cd /path/to/your/monorepo

# Start Claude Code agent team
claude-code team start
```

**Initial prompt to agents:**

```
I'm building a Client Software Generator for marketing software. 

CONTEXT:
- Read `ui-kit-generator-prd.md` for full product context
- Read `claude/team-brief.md` for current phase goals
- Read `component-library-strategy.md` for architecture decisions

MISSION: Phase 1 - Project Review & Validation

Your team should:

1. ARCHITECT AGENT: Review overall project structure
   - Analyze current monorepo setup
   - Validate against best practices in team brief
   - Identify structural issues
   - Propose fixes if needed

2. NEXT.JS SPECIALIST: Review Next.js implementation
   - Check all apps in `apps/` directory
   - Validate against Next.js 14+ best practices
   - Look for App Router patterns
   - Check server/client component usage
   - Review metadata and optimization

3. TAILWIND SPECIALIST: Review Tailwind setup and propose color system
   - Audit current Tailwind configuration
   - Implement semantic color system using default palettes
   - THIS IS CRITICAL: We want users to pick a default palette (slate/gray/zinc/neutral/stone)
     and add 3-4 brand colors. Design the config structure for this.
   - Validate utility-first approach throughout codebase
   - Check for anti-patterns (arbitrary values, !important, etc.)

4. COMPONENT SPECIALIST: Review Shadcn component implementation
   - Check components in `packages/ui` or wherever they live
   - Validate proper typing, variants, composition
   - Ensure accessibility standards
   - Identify missing core components for V1.0

DELIVERABLES:
1. Comprehensive review report with findings
2. Prioritized list of issues (Critical / Important / Nice-to-have)
3. Proposed fixes for critical issues
4. Updated Tailwind config with semantic color system ready for generator
5. Checklist of what's ready vs. what needs work before building generator

CONSTRAINTS:
- Don't make changes yet - just review and propose
- Focus on foundation that will support the generator
- The color system architecture is the most critical piece

Start with the Architect agent giving an overview, then specialists dive deep.
```

---

### Step 3: Review Agent Output

**The agents will produce:**

1. **Project structure report** (from Architect)
2. **Next.js compliance report** (from Next.js Specialist)
3. **Tailwind audit + proposed color system** (from Tailwind Specialist)
4. **Component inventory + gaps** (from Component Specialist)

**What you should see in the Tailwind audit:**

The Tailwind Specialist should propose something like:

```typescript
// packages/ui/tailwind.config.ts (PROPOSED)
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

// This structure allows generator to inject chosen palette + brand colors
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SEMANTIC SYSTEM - Maps to chosen Tailwind default palette
        // Generator replaces 'zinc' with user's choice (slate/gray/neutral/stone)
        surface: {
          DEFAULT: colors.zinc[50],
          1: colors.zinc[50],
          2: colors.zinc[100],
          3: colors.zinc[200],
        },
        text: {
          primary: colors.zinc[900],
          secondary: colors.zinc[600],
          tertiary: colors.zinc[500],
          inverse: colors.zinc[50],
        },
        border: {
          DEFAULT: colors.zinc[200],
          subtle: colors.zinc[100],
          strong: colors.zinc[300],
        },
        
        // BRAND COLORS - Generator injects these
        brand: {
          primary: '#PLACEHOLDER',    // CTA buttons, links
          secondary: '#PLACEHOLDER',  // Secondary actions
          accent: '#PLACEHOLDER',     // Highlights, badges
          highlight: '#PLACEHOLDER',  // Optional 4th color
        },
      },
    },
  },
  plugins: [],
}

export default config
```

**Components should use semantic names:**

```tsx
// Good - uses semantic colors
<div className="bg-surface-2 border border-border text-text-primary">
  <Button className="bg-brand-primary hover:bg-brand-primary/90">
    Click me
  </Button>
</div>

// Bad - uses hardcoded palette colors
<div className="bg-zinc-100 border border-zinc-200 text-zinc-900">
  <Button className="bg-blue-500 hover:bg-blue-600">
    Click me
  </Button>
</div>
```

---

### Step 4: Approve or Iterate on Findings

**Review the agent reports and:**

1. **Approve critical fixes** - Let agents implement structural issues, Next.js patterns, etc.
2. **Validate color system** - Make sure the semantic mapping makes sense for your use cases
3. **Confirm component gaps** - Agree on minimum viable set for V1.0

**Prompt for implementation:**

```
APPROVED. Implement the following fixes in priority order:

CRITICAL (Do first):
- [List critical items from reports]
- Implement the proposed semantic color system in Tailwind config
- Update existing components to use semantic color names

IMPORTANT (Do next):
- [List important items]

Create a PR or separate branch for these changes: `feature/project-validation-fixes`

After implementation, run full build and test to verify nothing broke.
```

---

## Phase 2: Build Base UI Kit V1.0

### Step 5: Define Component Scope

**Update team brief:**

```bash
# Add to .claude/team-brief.md
```

**Add this section:**

```markdown
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
```
```

---

### Step 6: Build Components with Agent Team

**Prompt:**

```
MISSION: Phase 2 - Build Base UI Kit V1.0

CONTEXT:
- Read updated `.claude/team-brief.md` Phase 2 section
- Component list defines our V1.0 scope
- All components must use semantic color system from Phase 1

TEAM STRUCTURE:

1. COMPONENT ARCHITECT
   - Define component API and prop structure
   - Ensure consistency across components
   - Review accessibility requirements

2. COMPONENT BUILDERS (multiple agents can work in parallel)
   - Each agent takes a category (Layout, Forms, Feedback, etc.)
   - Implement components following the template in team brief
   - Write TypeScript types
   - Implement variants using CVA
   - Add accessibility features

3. STORYBOOK SPECIALIST
   - Create stories for each component
   - Document variants and usage
   - Add interactive controls
   - Ensure visual consistency

4. QA AGENT
   - Test each component for accessibility
   - Verify semantic color usage
   - Check TypeScript types
   - Validate responsive behavior
   - Run build and catch any issues

WORKFLOW:
1. Architect defines APIs for each component category
2. Builders implement in parallel
3. Storybook specialist documents as components are built
4. QA agent validates completed components
5. Iterate on any issues

PRIORITY ORDER:
1. Forms & Inputs (most critical for real-world test)
2. Layout & Structure
3. Feedback
4. Typography
5. Navigation
6. Overlays
7. Data Display

Let's start with Forms & Inputs category. Architect, define the APIs, then Builders implement.
```

**Monitor progress:**

The agents will work in parallel. You'll see:
- Component files being created in `packages/ui/src/components/`
- Storybook stories in `apps/storybook/stories/`
- Type definitions
- Build/test results

**Checkpoint after each category:**

```
QA agent, run full build and report any issues:
- TypeScript errors
- Build failures
- Missing exports
- Accessibility warnings

If clean, move to next category.
```

---

### Step 7: Real-World Test #1 (Internal Dogfooding)

**After core components are built, validate with real usage:**

```
MISSION: Build Internal Tool to Test UI Kit

We're now dogfooding our own UI kit. Build a simple internal tool that exercises the components.

SUGGESTION: Build a "Client Project Tracker"
- Dashboard showing active client projects
- Form to add new client project
- Table listing all projects with status
- Cards showing project stats
- Filters and search

This will stress-test:
- Form components (input, select, button)
- Data display (table, card)
- Layout (grid, container)
- Feedback (alerts, toasts)
- Navigation (tabs for different views)

Use `apps/internal-tools` or create new app in monorepo.

CRITICAL: Use ONLY components from packages/ui. If you need something that doesn't exist, ADD IT TO THE UI PACKAGE first, then use it.

Report gaps as you find them.
```

---

## Phase 3: Build Generator Application

### Step 8: Update Team Brief for Generator

```markdown
## Phase 3: Build Generator Application

### Generator Requirements

**User Flow:**
1. User opens web UI (Next.js app)
2. Fills out form:
   - Client name
   - Project slug
   - Choose default palette (zinc, slate, gray, neutral, stone)
   - Define 3-4 brand colors (color pickers)
   - Choose fonts (heading + body)
   - Upload logo
3. Clicks "Generate Project"
4. System:
   - Clones template monorepo
   - Injects brand config into Tailwind
   - Replaces logo
   - Updates package names
   - Creates .zip or pushes to GitHub
5. User downloads or clones generated project

### Technical Architecture

**Generator App Structure:**
```
apps/generator/
  app/
    page.tsx              # Main form UI
    api/
      generate/
        route.ts          # POST endpoint that handles generation
  lib/
    generator.ts          # Core generation logic
    template-manager.ts   # Clones and modifies template
    config-injector.ts    # Updates Tailwind config
  components/
    generator-form.tsx    # The main form
    color-picker.tsx      # Brand color inputs
    palette-selector.tsx  # Choose default palette
    font-selector.tsx     # Font choices
```

**Generation Process:**
1. Validate inputs
2. Create temp directory
3. Clone template monorepo from `templates/base-monorepo/`
4. Inject configuration:
   - Update `packages/ui/tailwind.config.ts` with palette + brand colors
   - Update fonts in global CSS
   - Replace logo files
   - Update all package.json names
5. Run `pnpm install` and test build
6. Package as .zip or push to GitHub
7. Return download link or repo URL

### Template Structure

Create a clean template that can be cloned:

```
templates/
  base-monorepo/
    apps/
      example/          # Minimal example app
      docs/            # Documentation site
      storybook/       # Component showcase
    packages/
      ui/              # The UI kit with PLACEHOLDER config
    package.json       # Workspace config
    turbo.json         # If using Turborepo
```

The template has placeholders:
- `PALETTE_NAME` → replaced with zinc/slate/etc
- `BRAND_PRIMARY` → replaced with user's color
- `BRAND_SECONDARY` → replaced with user's color
- `CLIENT_NAME` → replaced with client name
- Logo files → replaced with uploaded logo

### Form Validation

Must validate:
- Client name (alphanumeric + spaces)
- Project slug (lowercase, hyphens only)
- At least primary brand color provided
- Colors are valid hex codes
- Logo is valid image file (< 2MB)
- Font names are valid Google Fonts or system fonts
```

---

### Step 9: Build Generator with Agent Team

**Prompt:**

```
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
```

---

### Step 10: End-to-End Testing

**After generator is built:**

```
MISSION: Real-World Test #2 - Generate Client Project

Let's test with a real scenario:

CLIENT: "Acme Corp"
PALETTE: zinc (they like the cool, professional tone)
BRAND COLORS:
- Primary: #FF6B35 (Acme Orange - for CTAs)
- Secondary: #004E89 (Acme Navy - for headers)
- Accent: #F7F7F9 (Light Gray - for subtle highlights)
FONTS:
- Heading: "Montserrat"
- Body: "Open Sans"
LOGO: [Upload acme-logo.svg]

Generate the project and:
1. Verify it builds without errors
2. Open Storybook - components should show Acme branding
3. Open example app - should feel like "Acme software"
4. Check Tailwind config - should see zinc palette + Acme colors
5. Build a simple dashboard to stress-test

Report any issues or missing features.
```

---

## Phase 4: Iteration & Refinement

### Step 11: Capture Learnings

**After both real-world tests, gather feedback:**

```
MISSION: Retrospective & Refinement

Review both real-world tests:

TEST 1 (Internal Tools):
- What components were missing?
- What was awkward to build?
- What styling issues came up?

TEST 2 (Acme Corp):
- Did the branding feel right?
- Were the 3 brand colors enough?
- Did the default palette provide good coverage?
- What took longer than expected?

Based on learnings:
1. Update component library (add missing components)
2. Refine generator (improve UX, add missing features)
3. Update documentation
4. Create runbook for team

Produce:
- List of V1.1 priorities
- Updated team brief with lessons learned
- Migration guide if we changed anything
```

---

## Tips for Working with Agent Teams

### Best Practices

1. **Clear role assignments** - Each agent has specific expertise
2. **Sequential for dependencies** - Architect first, then builders
3. **Parallel for independence** - Multiple component builders at once
4. **Regular checkpoints** - QA validation after each major piece
5. **Detailed context** - Keep team brief updated as you learn

### Common Pitfalls

❌ **Don't:** Give one massive prompt and walk away
✅ **Do:** Break into phases, checkpoint, iterate

❌ **Don't:** Let agents make decisions without your input
✅ **Do:** Review proposals before implementation

❌ **Don't:** Skip the real-world tests
✅ **Do:** Build actual projects to validate assumptions

### Monitoring Progress

**You should see:**
- Agents discussing in chat (like a real team)
- Files being created/modified in real-time
- QA agent catching issues before you do
- Storybook being updated as components are built

**Red flags:**
- Agents making breaking changes without discussion
- Build errors piling up
- Diverging from the semantic color system
- Adding complexity not in the brief

---

## Appendix: Semantic Color System Reference

### Why This Approach Works

**Traditional approach:**
```js
// Client 1 config (inconsistent naming)
colors: {
  'primary': '#FF6B35',
  'secondary': '#004E89',
  'bg': '#F7F7F9',
  'dark': '#1A1A1A',
  // ... 20 more custom colors
}
```

**Our approach:**
```js
// Clean separation of concerns
colors: {
  // 90% of UI - Professional default palette
  surface: colors.zinc,    // backgrounds
  text: colors.zinc,       // typography
  border: colors.zinc,     // dividers
  
  // 10% of UI - Brand identity
  brand: {
    primary: '#FF6B35',    // CTAs, links
    secondary: '#004E89',  // Secondary actions
    accent: '#F7F7F9',     // Highlights
  }
}
```

### Palette Characteristics

**zinc** (cool, professional)
- Use for: SaaS, finance, professional services
- Feel: Modern, neutral, tech-forward

**slate** (cool, refined)
- Use for: Design tools, creative agencies
- Feel: Sophisticated, artistic

**gray** (pure neutral)
- Use for: When brand colors are warm, need balance
- Feel: Classic, timeless

**neutral** (warm gray)
- Use for: Healthcare, education, hospitality
- Feel: Approachable, human

**stone** (earthy, warm)
- Use for: Environmental, outdoor, organic brands
- Feel: Natural, grounded

### Component Usage Patterns

```tsx
// Layout - uses surface colors
<div className="bg-surface p-4 border border-border">

// Typography - uses text colors
<h1 className="text-text-primary font-bold">
<p className="text-text-secondary">

// Branded elements - uses brand colors
<Button className="bg-brand-primary hover:bg-brand-primary/90">
<Badge className="bg-brand-accent text-brand-primary">

// Status indicators - can use Tailwind semantic colors
<Alert className="bg-green-50 border-green-200">
<div className="text-red-600"> {/* error state */}
```

---

## Quick Start Summary

1. **Add team brief** → `.claude/team-brief.md`
2. **Start Phase 1** → Review current project
3. **Implement fixes** → Structural issues + color system
4. **Start Phase 2** → Build components
5. **Test internally** → Dogfood with real tool
6. **Start Phase 3** → Build generator
7. **Test with client** → Generate real project
8. **Iterate** → Fix gaps, refine, document

**Time estimate:**
- Phase 1: 1-2 days
- Phase 2: 1-2 weeks (depending on component count)
- Phase 3: 1 week
- Phase 4: 2-3 days

**You should have:**
- Production-ready UI kit
- Working generator
- 2 real projects (internal + client)
- Clear roadmap for V1.1

Good luck! The semantic color system is the key innovation - make sure agents understand and implement it correctly. 🎨
