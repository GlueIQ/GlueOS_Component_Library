# GlueOS UI Kit V1.0 Refinement Plan

## Executive Summary

**Goal:** Establish production-ready UI kit with clear hierarchy, organized documentation, and patterns for adding Blocks and Templates without system drift.

**Approach:** Define standard nomenclature → Organize existing work → Create implementation patterns → Build Blocks & Templates following those patterns.

---

## Part 1: Design System Hierarchy & Nomenclature

### Industry-Standard Hierarchy

```
Design Tokens (Foundation)
    ↓
Components (Building Blocks)
    ↓
Patterns/Blocks (Composed Solutions)
    ↓
Layouts (Full Page Structures)
```

### Definitions & Industry Context

#### Level 1: Design Tokens
**Definition:** The atomic values that define the visual language (colors, typography, spacing, shadows, etc.)

**Industry names:** Design Tokens (universal), Primitives (Material), Foundation (some systems)

**Our naming:** Design Tokens ✅

**Examples:**
- `colors.brand.primary`
- `spacing.4` (16px)
- `typography.heading.xl`
- `shadows.md`
- `borderRadius.lg`

**Why this level exists:** Single source of truth. Changing a token updates everything that uses it.

---

#### Level 2: Components
**Definition:** Self-contained, reusable UI elements with their own API

**Industry names:** Components (universal), Elements (rare), Atoms (Atomic Design - outdated)

**Our naming:** Components ✅

**Examples:**
- `<Button>`
- `<Input>`
- `<Card>`
- `<Badge>`

**Why this level exists:** Reusable building blocks that can be composed into larger experiences.

---

#### Level 3: Patterns/Blocks
**Definition:** Composed components that solve specific use cases but remain flexible

**Industry names:**
- **Patterns** (Material Design, IBM Carbon) ← Most academic/design system literature
- **Blocks** (Tailwind UI, Builder.io) ← Most practical/developer-focused
- **Recipes** (Chakra UI, Panda CSS) ← Emerging
- **Compositions** (Some systems)

**Our naming recommendation:** **Patterns** for documentation, **Blocks** in code/folders

**Why both?**
- "Patterns" is more recognizable to design system practitioners
- "Blocks" is more intuitive to developers
- Use "Patterns (Blocks)" in Storybook navigation

**Examples:**
- Authentication form (login inputs + button + link to signup)
- Stat card (label + value + trend indicator)
- Data table with controls (table + pagination + filters)
- Empty state (icon + heading + description + CTA)

**Why this level exists:** Accelerates development with opinionated compositions while remaining customizable.

---

#### Level 4: Layouts
**Definition:** Full page layouts that demonstrate how Patterns and Components work together

**Industry names:** Layouts (structure-focused), Templates (universal), Pages (some systems)

**Our naming:** Layouts ✅

**Examples:**
- App Shell layout (sidebar + header + content area)
- Dashboard layout
- Settings & Admin layout
- Data & Lists layout

**Why this level exists:** Provides structural starting points for common page types, demonstrates best practices.

---

### Our Hierarchy (Finalized)

```
Design Tokens
    ├── Color
    ├── Typography
    ├── Spacing & Layout
    ├── Shadows & Effects
    └── Motion (optional for V1.0)

Components
    ├── Form Controls
    ├── Buttons & Actions
    ├── Navigation
    ├── Feedback & Status
    ├── Data Display
    ├── Layout
    ├── Typography
    └── Overlays & Modals

Patterns (Blocks)
    ├── Authentication
    ├── User Management
    ├── Data Visualization
    ├── Content Management
    ├── Forms
    └── Empty & Error States

Layouts
    ├── App Shell ✅ (implemented)
    ├── Dashboard
    ├── Settings & Admin
    ├── Data & Lists
    └── Content Detail
```

---

## Part 2: Storybook Organization

### Folder Structure

```
storybook/
    stories/
        1-Foundation/
            1.1-Color/
                Color.stories.tsx
                Color.mdx
            1.2-Typography/
                Typography.stories.tsx
                Typography.mdx
            1.3-Spacing/
                Spacing.stories.tsx
                Spacing.mdx
            1.4-Shadows/
                Shadows.stories.tsx
                Shadows.mdx
        
        2-Components/
            2.1-Form-Controls/
                Button.stories.tsx
                Input.stories.tsx
                Select.stories.tsx
                Checkbox.stories.tsx
                Radio.stories.tsx
                Switch.stories.tsx
                Textarea.stories.tsx
            2.2-Buttons-Actions/
                Button.stories.tsx (variants)
                IconButton.stories.tsx
                ButtonGroup.stories.tsx
                DropdownMenu.stories.tsx
            2.3-Navigation/
                Header.stories.tsx
                Sidebar.stories.tsx
                Breadcrumb.stories.tsx
                Tabs.stories.tsx
                Pagination.stories.tsx
            2.4-Feedback-Status/
                Alert.stories.tsx
                Toast.stories.tsx
                Badge.stories.tsx
                Progress.stories.tsx
                Skeleton.stories.tsx
            2.5-Data-Display/
                Table.stories.tsx
                Card.stories.tsx
                Avatar.stories.tsx
                DataList.stories.tsx
                StatCard.stories.tsx
            2.6-Layout/
                Container.stories.tsx
                Grid.stories.tsx
                Stack.stories.tsx
                Divider.stories.tsx
            2.7-Typography/
                Heading.stories.tsx
                Text.stories.tsx
                Link.stories.tsx
                Code.stories.tsx
            2.8-Overlays-Modals/
                Modal.stories.tsx
                Popover.stories.tsx
                Tooltip.stories.tsx
                Sheet.stories.tsx
        
        3-Patterns (Blocks)/
            3.1-Authentication/
                LoginForm.stories.tsx
                SignupForm.stories.tsx
                ForgotPassword.stories.tsx
                AuthLayout.stories.tsx
            3.2-User-Management/
                ProfileCard.stories.tsx
                UserSettingsForm.stories.tsx
                UserTable.stories.tsx
                TeamMemberCard.stories.tsx
            3.3-Data-Visualization/
                StatsGrid.stories.tsx
                ChartCard.stories.tsx
                MetricCard.stories.tsx
                TrendIndicator.stories.tsx
            3.4-Content-Management/
                ContentList.stories.tsx
                ContentCard.stories.tsx
                ContentFilters.stories.tsx
                ContentSearch.stories.tsx
            3.5-Forms/
                MultiStepForm.stories.tsx
                FormWithValidation.stories.tsx
                SettingsForm.stories.tsx
                FilterForm.stories.tsx
            3.6-Empty-Error-States/
                EmptyState.stories.tsx
                ErrorState.stories.tsx
                LoadingState.stories.tsx
                NoResults.stories.tsx
            3.7-Navigation/
                AppHeader.stories.tsx
                AppSidebar.stories.tsx
                PageHeader.stories.tsx
                CommandBar.stories.tsx
            3.8-Data-Tables/
                DataTableWithControls.stories.tsx
                SortableTable.stories.tsx
                SelectableTable.stories.tsx
                ExpandableTable.stories.tsx
        
        4-Layouts/
            AppShell.stories.tsx           ✅ (implemented)
            4.2-Dashboard/
                DashboardLayout.stories.tsx
                AnalyticsDashboard.stories.tsx
                OverviewDashboard.stories.tsx
            4.3-Settings-Admin/
                SettingsPage.stories.tsx
                AccountSettings.stories.tsx
                TeamSettings.stories.tsx
                AdminPanel.stories.tsx
            4.4-Data-Lists/
                DataTablePage.stories.tsx
                ListPage.stories.tsx
                GridView.stories.tsx
            4.5-Content-Detail/
                DetailPage.stories.tsx
                ProfilePage.stories.tsx
                ProjectDetail.stories.tsx
```

### Storybook Configuration

```ts
// .storybook/main.ts
export default {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',        // Critical for accessibility testing
    '@storybook/addon-interactions', // For testing user flows
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
```

---

## Part 2.5: Core Dependencies

### Required Dependencies for V1.0

The UI kit requires two critical dependencies for modern software applications:

#### 1. next-themes (v0.3.0+)
**Purpose:** Proper dark mode implementation for Next.js

**Why we need it:**
- Industry standard for dark mode in Next.js
- Handles SSR correctly (no flash of wrong theme)
- Simple API with `useTheme()` hook
- Works seamlessly with Tailwind's dark mode
- Lightweight (< 2KB)

**Installation:**
```bash
pnpm add next-themes
```

**Integration with our semantic color system:**
```tsx
// Our semantic tokens work perfectly with dark mode
<div className="bg-surface text-text-primary border-border">
  {/* Automatically switches colors based on theme */}
</div>

// Tailwind config with dark mode variants
colors: {
  surface: {
    DEFAULT: colors.zinc[50],  // Light mode
    // dark: colors.zinc[900],  // Dark mode (via Tailwind's dark:)
  }
}
```

**Setup:**
```tsx
// app/providers.tsx
'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}

// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

**Usage in components:**
```tsx
'use client'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  )
}
```

---

#### 2. Framer Motion (v11.3+)
**Purpose:** Advanced animations and interactive patterns

**Why we need it:**
- Industry standard for React animations
- Declarative animation API
- Handles complex gestures and interactions
- Excellent performance
- TypeScript support

**Installation:**
```bash
pnpm add framer-motion
```

**Use cases in our Pattern library:**
```tsx
// Modal with smooth animations
import { motion, AnimatePresence } from 'framer-motion'

export function Modal({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Command bar with smooth list animations
export function CommandBar() {
  return (
    <motion.div layout>
      {results.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {item.label}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

**Patterns that will use Framer Motion:**
- **Command Bar** (⌘K) - Smooth open/close, list animations
- **Modal/Dialog** - Fade in overlay, scale content
- **Drawer/Sheet** - Slide in from edge with spring animation
- **Dropdown Menu** - Smooth height animation when opening
- **Toast Notifications** - Slide in from corner, stack management
- **Tabs** - Animated underline indicator
- **Accordion** - Smooth expand/collapse
- **Page Transitions** - Fade between views (optional)
- **Multi-Step Forms** - Slide between steps
- **Data Visualizations** - Animated chart entries

---

### Dependency Integration Strategy

**Phase 2 (Normalization) includes:**
1. Install next-themes and set up providers
2. Add dark mode variants to all components
3. Test theme switching across all components
4. Update Storybook to show light/dark variants

**Phase 3 (Build Patterns) includes:**
1. Install Framer Motion
2. Build advanced interactive patterns using motion
3. Document animation behavior in Storybook
4. Ensure animations respect `prefers-reduced-motion`

---

### Tailwind Dark Mode Configuration

Update `tailwind.config.ts` to support dark mode:

```typescript
// packages/ui/tailwind.config.ts
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  darkMode: 'class', // Controlled by next-themes
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode defaults, dark mode handled by dark: variants
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
        
        // Brand colors work in both modes
        brand: {
          primary: '#FF6B35',
          secondary: '#004E89',
          accent: '#F7F7F9',
          highlight: '#FFC93C',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

**Using dark mode in components:**

```tsx
// Component automatically adapts to theme
<div className="bg-surface dark:bg-zinc-900 text-text-primary dark:text-zinc-50">
  <Card className="border-border dark:border-zinc-800">
    <Button className="bg-brand-primary"> {/* Brand colors stay same */}
      Click me
    </Button>
  </Card>
</div>
```

---

## Part 2.6: Patterns with Advanced Animations

The following Patterns will leverage Framer Motion for enhanced interactivity and polish. These are marked with ⚡ in the Pattern lists.

### Animation Guidelines

**When to use Framer Motion:**
- Modal/Dialog entry/exit
- Drawer/Sheet slide in/out
- Command bar (⌘K) open/close with results animation
- Dropdown menu smooth height changes
- Toast notification stacking and removal
- Tab indicator sliding between tabs
- Accordion expand/collapse
- Multi-step form transitions
- List item stagger animations

**When NOT to use Framer Motion:**
- Simple hover states (use CSS)
- Button press feedback (use CSS)
- Loading spinners (use CSS)
- Basic transitions (use Tailwind transition utilities)

**Accessibility requirement:**
All animations MUST respect `prefers-reduced-motion`:

```tsx
import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedPattern() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  )
}
```

### Patterns Using Framer Motion ⚡

**High Priority (Phase 3, Week 1):**
- **CommandBar** - Modal open/close, list item animations
- **Modal/Dialog** - Overlay fade, content scale
- **Sheet/Drawer** - Slide from edge with spring

**Medium Priority (Phase 3, Week 2):**
- **Dropdown Menu** - Smooth height animation
- **Toast** - Slide in, auto-dismiss, stacking
- **Tabs** - Animated underline indicator
- **Accordion** - Expand/collapse content

**Optional (Phase 3+):**
- **Multi-Step Form** - Slide between steps
- **Page Transitions** - Fade between views
- **Data Visualization** - Stagger chart element entry
- **Onboarding** - Step progression animations

---

## Part 3: Recommended Blocks (Patterns)

### Software-Focused Block Library

#### 3.1 Authentication Patterns

| Block | Purpose | Composed Of |
|-------|---------|-------------|
| **LoginForm** | Standard email/password login | Input (email), Input (password), Button (submit), Link (forgot password), Checkbox (remember me) |
| **SignupForm** | New account creation | Input (name, email, password), Button (submit), Link (terms), Checkbox (agree to terms) |
| **ForgotPasswordForm** | Password reset request | Input (email), Button (submit), Link (back to login) |
| **SSOButtons** | Social/SSO login options | Button variants with icons (Google, Microsoft, GitHub) |
| **AuthLayout** | Container for auth pages | Card, Stack, Logo area, Footer with links |

#### 3.2 User Management Patterns

| Block | Purpose | Composed Of |
|-------|---------|-------------|
| **ProfileCard** | Display user info | Avatar, Heading, Text, Badge (role), Button (edit) |
| **UserSettingsForm** | Edit profile information | Input fields, Avatar upload, Select (timezone), Button group |
| **UserTable** | List users with actions | Table, Avatar, Badge, DropdownMenu (actions) |
| **TeamMemberCard** | Team member info | Avatar, Text, Badge (role), Button (remove/edit) |
| **InviteUserForm** | Invite new team member | Input (email), Select (role), Button (send invite) |

#### 3.3 Data Visualization Patterns

| Block | Purpose | Composed Of |
|-------|---------|-------------|
| **StatsGrid** | Key metrics display | Grid of StatCards with responsive layout |
| **StatCard** | Single metric display | Card, Heading (value), Text (label), Badge (trend), Icon |
| **ChartCard** | Chart with context | Card, Heading, Chart area, Select (time range) |
| **MetricCard** | Metric with comparison | Card, large Text (value), Text (vs previous), Progress bar |
| **TrendIndicator** | Show increase/decrease | Icon (arrow up/down), Text (percentage), Color coded |

#### 3.4 Content Management Patterns

| Block | Purpose | Composed Of |
|-------|---------|-------------|
| **ContentList** | List of content items | Stack of Cards, each with title, meta, actions |
| **ContentCard** | Single content preview | Card, Heading, Text (excerpt), Badge (status), Dropdown (actions) |
| **ContentFilters** | Filter content list | Select (multiple), Input (search), Button (clear filters) |
| **ContentSearch** | Search with suggestions | Input with icon, Popover (suggestions), Keyboard navigation |
| **BulkActions** | Multi-select actions | Checkbox (select all), Badge (count), Button group (actions) |

#### 3.5 Form Patterns

| Block | Purpose | Composed Of |
|-------|---------|-------------|
| **MultiStepForm** | Wizard-style form | Tabs/Steps indicator, Form sections, Button navigation |
| **FormWithValidation** | Form with inline errors | Input fields with error states, Alert (form-level error), Button |
| **SettingsForm** | Settings sections | Stack of form sections, Dividers, Save/Cancel buttons |
| **FilterForm** | Advanced filtering | Multiple Selects, Input ranges, Date pickers, Apply button |
| **SearchForm** | Search with filters | Input (search), Popover (advanced filters), Button |

#### 3.6 Empty & Error State Patterns

| Block | Purpose | Composed Of |
|-------|---------|-------------|
| **EmptyState** | No data placeholder | Icon (large), Heading, Text (description), Button (CTA) |
| **ErrorState** | Error display | Icon (alert), Heading, Text (error message), Button (retry/home) |
| **LoadingState** | Loading placeholder | Skeleton components, or Spinner with Text |
| **NoResults** | Empty search results | Icon, Heading, Text (suggestions), Button (clear search) |
| **Onboarding** | First-time experience | Icon, Heading, Text (steps), Button (get started) |

#### 3.7 Navigation Patterns

| Block | Purpose | Composed Of |
|-------|---------|-------------|
| **AppHeader** | Main navigation header | Logo, Navigation links, Search, Avatar dropdown |
| **AppSidebar** | Vertical navigation | Logo, Nav items with icons, Collapse button, User menu |
| **PageHeader** | Page title with actions | Breadcrumb, Heading, Text (description), Button group |
| **CommandBar** ⚡ | Quick actions (⌘K) | Modal with Input (search), List (results), Keyboard nav + **Framer Motion** |

⚡ = Uses Framer Motion for animations

#### 3.8 Data Table Patterns

| Block | Purpose | Composed Of |
|-------|---------|-------------|
| **DataTableWithControls** | Full-featured table | Table, Pagination, Select (page size), Input (search), Filters |
| **SortableTable** | Table with sorting | Table with clickable headers, sort indicators |
| **SelectableTable** | Table with row selection | Checkbox column, Bulk actions bar, Select all |
| **ExpandableTable** | Table with detail rows | Table with expand icon, nested content area |

---

## Part 4: Recommended Layouts

### Software Application Layouts

#### 4.0 App Shell Layout ✅ IMPLEMENTED

| Layout | Purpose | Sections |
|--------|---------|----------|
| **AppShell** | Base app layout with sidebar | Collapsible sidebar (logo, doc nav, main nav, secondary nav, user profile) + Header bar (sidebar trigger, breadcrumbs, theme toggle, module switcher) + Content area |

**Location:** `packages/ui/src/layouts/app-shell/`

**Components:**
- `AppShell` — Main orchestrating layout (props-based API)
- `GlueIQLogo` / `GlueIQIcon` — Theme-aware inline SVG brand logos
- `AppSwitcher` — GlueOS module switcher (11 modules)
- `NavMain` — Collapsible sidebar nav with sub-items
- `NavDocuments` — Flat sidebar nav list
- `NavSecondary` — Bottom-pinned secondary nav
- `NavUser` — User profile dropdown
- `PageBreadcrumb` — Breadcrumb with active module
- `ThemeToggle` — Light/dark theme toggle
- `ActiveModuleProvider` — Shared module state context

**Storybook:** `4-Layouts/App Shell` (3 stories: Default, WithBreadcrumbs, MinimalNav)

#### 4.1 Authentication Layouts

| Layout | Purpose | Sections |
|--------|---------|----------|
| **LoginPage** | User login | AuthLayout + LoginForm + SSOButtons + Footer |
| **SignupPage** | New account | AuthLayout + SignupForm + SSOButtons + Terms |
| **ForgotPasswordPage** | Password reset | AuthLayout + ForgotPasswordForm |
| **LandingPage** | Pre-login page | Header + Hero + Features + CTA + Footer |

#### 4.2 Dashboard Layouts

| Layout | Purpose | Sections |
|--------|---------|----------|
| **DashboardLayout** | Dashboard base | AppShell + StatsGrid + ChartCards + Data tables |
| **AnalyticsDashboard** | Metrics overview | PageHeader + StatsGrid + ChartCards + Data tables |
| **OverviewDashboard** | Mixed content | PageHeader + Stats row + Recent activity + Quick actions |

#### 4.3 Settings & Admin Layouts

| Layout | Purpose | Sections |
|--------|---------|----------|
| **SettingsPage** | User settings | Vertical tabs navigation + Form sections |
| **AccountSettings** | Account management | Profile section + Password section + Preferences |
| **TeamSettings** | Team management | Team members table + Invite form + Role management |
| **AdminPanel** | Admin dashboard | Stats + User management + System settings |

#### 4.4 Data & Lists Layouts

| Layout | Purpose | Sections |
|--------|---------|----------|
| **DataTablePage** | Filterable data list | PageHeader + Filters + DataTableWithControls |
| **ListPage** | Card-based list | PageHeader + Search/Filters + ContentList |
| **GridView** | Grid of items | PageHeader + View toggle + Responsive grid + Pagination |

#### 4.5 Content Detail Layouts

| Layout | Purpose | Sections |
|--------|---------|----------|
| **DetailPage** | Single item detail | Breadcrumb + Header + Tabs + Content sections + Actions |
| **ProfilePage** | User/entity profile | Cover + ProfileCard + Tabs + Activity/Info sections |
| **ProjectDetail** | Project view | Header + Stats + Tasks table + Team members + Comments |

---

## Part 5: Implementation Patterns (Critical!)

### The System Drift Problem

**System drift occurs when:**
1. Components pasted from multiple sources (Tailwind UI, shadcn, Magic UI)
2. Different spacing systems (some use px, some use rem, some use Tailwind scale)
3. Inconsistent variant naming (one uses "primary/secondary", another uses "solid/outline")
4. Mixed accessibility patterns
5. Different prop APIs for similar components
6. Undocumented component behavior

**Result:** Inconsistent UX, maintenance nightmare, accessibility gaps.

---

### Our Approach: Extraction & Normalization Process

#### Step 1: Source Identification & Evaluation

**Before adding any Block or Template, complete this checklist:**

```markdown
## Source Evaluation

- [ ] **Source identified:** [Tailwind UI / Magic UI / Custom / Figma / etc.]
- [ ] **License verified:** Can we use/modify this code?
- [ ] **Complexity assessment:** Simple (<50 lines) / Medium (50-200) / Complex (200+)
- [ ] **Dependencies check:** What external libraries does it need?
- [ ] **Accessibility review:** Does it have proper ARIA, keyboard nav, focus management?
- [ ] **Responsive behavior:** Does it work mobile to desktop?
- [ ] **Fits our use case:** Why do we need this specific Block/Layout?
```

**Decision tree:**
- ✅ If source uses Tailwind + React + good accessibility → Extract and normalize
- ⚠️ If source has dependencies we don't use → Evaluate if worth adding
- ❌ If source has poor accessibility → Don't use, build from scratch

---

#### Step 2: Extraction Process

**Create a new file in the appropriate location:**

```bash
# For Patterns/Blocks
packages/ui/src/patterns/[category]/[block-name]/[BlockName].tsx
packages/ui/src/patterns/[category]/[block-name]/index.ts

# Example
packages/ui/src/patterns/authentication/login-form/LoginForm.tsx
packages/ui/src/patterns/authentication/login-form/index.ts
```

**Initial file structure:**

```tsx
// packages/ui/src/patterns/authentication/login-form/LoginForm.tsx

/**
 * LoginForm Pattern
 * 
 * Composed of: Input, Button, Link, Checkbox from our component library
 * Source: [Original source if applicable]
 * Normalized: [Date] by [Developer]
 */

import * as React from "react"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Checkbox } from "@/components/checkbox"
import { Link } from "@/components/link"
import { cn } from "@/lib/utils"

interface LoginFormProps {
  // Define clean API here
}

export function LoginForm({ ...props }: LoginFormProps) {
  // Implementation
}
```

---

#### Step 3: Normalization Checklist

**Every Block/Layout must pass this normalization:**

##### 3.1 Token Normalization

```tsx
// ❌ BEFORE (system drift)
<div className="px-6 py-4 bg-gray-100 rounded-lg shadow-md">

// ✅ AFTER (normalized to our tokens)
<div className="p-4 bg-surface-2 rounded-lg shadow-md">
```

**Rules:**
- Use semantic color names (`surface-*`, `text-*`, `border-*`, `brand-*`) not palette names
- Use Tailwind spacing scale (`p-4`, `mt-6`) not arbitrary values (`p-[24px]`)
- Use our shadow scale (`shadow-sm`, `shadow-md`) consistently
- Use our border radius tokens (`rounded-lg` consistently applied)

##### 3.2 Component Usage

```tsx
// ❌ BEFORE (external component)
import { Button } from '@external/ui'

// ✅ AFTER (our components)
import { Button } from '@/components/button'
```

**Rules:**
- Replace ALL external components with our components
- If we don't have a component, build it first, then use it
- No inline custom components (move them to component library if reusable)

##### 3.3 Variant Consistency

**Our system uses these variant names:**

```tsx
// Button variants (standardized)
variant: "primary" | "secondary" | "outline" | "ghost" | "destructive"
size: "sm" | "md" | "lg"

// Input variants
variant: "default" | "error" | "success"
size: "sm" | "md" | "lg"
```

**Rules:**
- If source uses different names (e.g., "solid" instead of "primary"), normalize to our names
- Document any deviations with clear reasoning
- Update component library if new variant is needed across system

##### 3.4 Accessibility Normalization

**Every Block/Layout must have:**

```tsx
// Form fields
<Label htmlFor="email">Email</Label>
<Input 
  id="email"
  type="email"
  aria-describedby={error ? "email-error" : undefined}
  aria-invalid={error ? "true" : "false"}
/>
{error && <span id="email-error" className="text-sm text-red-600">{error}</span>}

// Interactive elements
<Button
  aria-label="Submit login form"
  aria-busy={isLoading}
  disabled={isLoading}
>
  {isLoading ? "Logging in..." : "Log in"}
</Button>

// Keyboard navigation
<div
  role="menu"
  onKeyDown={handleKeyDown} // Arrow keys, Enter, Escape
>
```

**Accessibility checklist:**
- [ ] All form inputs have associated labels
- [ ] Error messages are linked via `aria-describedby`
- [ ] Invalid states use `aria-invalid`
- [ ] Loading states use `aria-busy`
- [ ] Custom interactions have keyboard equivalents
- [ ] Focus management is logical
- [ ] Color contrast meets WCAG AA (use browser tools)

##### 3.5 Responsive Normalization

**Use our breakpoint system:**

```tsx
// ❌ BEFORE (inconsistent breakpoints)
<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">

// ✅ AFTER (semantic responsive patterns)
<div className="w-full md:w-1/2 lg:w-1/3">
```

**Mobile-first approach:**
- Base styles are mobile
- Use `sm:`, `md:`, `lg:`, `xl:`, `2xl:` for larger screens
- Common patterns:
  - Stack on mobile, grid on desktop: `flex flex-col md:grid md:grid-cols-2`
  - Full width mobile, constrained desktop: `w-full md:max-w-md lg:max-w-lg`

##### 3.6 TypeScript & API Normalization

**Consistent prop patterns:**

```tsx
// Standard props every Pattern should consider
interface PatternProps {
  className?: string           // Allow style overrides
  children?: React.ReactNode   // If it's a container
  onSubmit?: (data: T) => void // For forms
  isLoading?: boolean          // For async actions
  error?: string | null        // For error states
  // ... specific props
}

// Use proper types, not 'any'
// Export types for consumers
export type { PatternProps }
```

---

#### Step 4: Documentation Requirements

**Every Block/Layout needs a corresponding Storybook story:**

```tsx
// patterns/authentication/login-form/LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from './LoginForm'

const meta: Meta<typeof LoginForm> = {
  title: '3-Patterns/3.1-Authentication/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## LoginForm Pattern

A complete login form with email/password inputs, remember me checkbox, and forgot password link.

**Composed of:** Input, Button, Link, Checkbox

**Use cases:**
- Standard email/password authentication
- Apps that need login functionality
- Authentication pages

**Accessibility:**
- All inputs have proper labels
- Error states are announced to screen readers
- Keyboard navigation supported
- Focus management on form submission
        `
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {
    // Default props
  }
}

export const WithError: Story = {
  args: {
    error: "Invalid email or password"
  }
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}

// Show all variants and states
```

**Documentation must include:**
1. What components it's composed of
2. Use cases
3. Accessibility features
4. All variants/states demonstrated
5. Code examples

---

#### Step 5: Testing & Review

**Before merging any Block/Layout:**

```markdown
## Pre-merge Checklist

### Code Quality
- [ ] Passes TypeScript compilation (no `any` types)
- [ ] Follows our file structure conventions
- [ ] Uses semantic color tokens (no palette colors directly)
- [ ] Uses Tailwind spacing scale (no arbitrary values)
- [ ] Uses our components (no external dependencies)
- [ ] Proper variant naming matches our system

### Accessibility
- [ ] Tested with keyboard only (Tab, Enter, Escape, Arrows)
- [ ] Tested with screen reader (VoiceOver / NVDA)
- [ ] Color contrast verified (4.5:1 minimum for text)
- [ ] Focus indicators visible
- [ ] Form validation announces to screen reader
- [ ] All interactive elements have proper ARIA

### Responsive
- [ ] Tested on mobile (375px)
- [ ] Tested on tablet (768px)
- [ ] Tested on desktop (1440px)
- [ ] Touch targets are 44×44px minimum
- [ ] Text is readable at all sizes

### Dark Mode
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] All colors remain readable in both modes
- [ ] Brand colors work in both modes
- [ ] No hardcoded light-only colors

### Animations (if using Framer Motion)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Performance is smooth (60fps)
- [ ] No layout shift during animations
- [ ] Exit animations work properly
- [ ] Animations enhance UX (not just decoration)

### Documentation
- [ ] Storybook story created with all variants
- [ ] Documentation includes composition details
- [ ] Code examples provided
- [ ] Accessibility notes included

### Integration
- [ ] Builds successfully
- [ ] No console errors/warnings
- [ ] Works with dark mode (if implemented)
- [ ] Exported from appropriate index.ts
```

---

### Pattern Template (Starter File)

**Use this as starting point for every new Pattern:**

```tsx
/**
 * [PatternName] Pattern
 * 
 * [Brief description of what this pattern does]
 * 
 * Composed of: [Component 1], [Component 2], [Component 3]
 * Source: [Original source or "Custom"]
 * Normalized: [Date] by [Developer]
 * 
 * @example
 * ```tsx
 * <PatternName
 *   prop1="value"
 *   prop2={true}
 * />
 * ```
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Import only OUR components
import { ComponentA } from "@/components/component-a"
import { ComponentB } from "@/components/component-b"

// Define clean, typed API
export interface PatternNameProps {
  /**
   * Description of prop
   * @default defaultValue
   */
  prop1?: string
  
  /**
   * Description of prop
   */
  prop2?: boolean
  
  /**
   * Optional className for custom styling
   */
  className?: string
  
  /**
   * Children if this is a container
   */
  children?: React.ReactNode
}

/**
 * Main Pattern component with full documentation
 */
export function PatternName({
  prop1 = "default",
  prop2 = false,
  className,
  children,
  ...props
}: PatternNameProps) {
  return (
    <div 
      className={cn(
        // Base styles using semantic tokens with dark mode variants
        "p-4 bg-surface dark:bg-zinc-900",
        "text-text-primary dark:text-zinc-50",
        "rounded-lg border border-border dark:border-zinc-800",
        className
      )}
      {...props}
    >
      <ComponentA prop={prop1} />
      <ComponentB prop={prop2} />
      {children}
    </div>
  )
}

// Export types for consumers
export type { PatternNameProps }
```

---

## Part 6: Implementation Workflow

### Phase 1: Organize Existing Work (1-2 days)

**Agent team tasks:**
1. **Architect Agent:** Audit current component structure, propose reorganization into categories
2. **Documentation Agent:** Create Storybook structure following Part 2 organization
3. **Component Agent:** Move existing components into proper categories
4. **QA Agent:** Verify all imports still work, nothing broke

**Deliverables:**
- Reorganized component library
- Storybook with proper navigation structure
- Updated exports in index files
- Migration guide if any breaking changes

---

### Phase 2: Token & Component Audit (2-3 days)

**Agent team tasks:**
1. **Dependency Setup Agent:** 
   - Install next-themes (v0.3.0+) and Framer Motion (v11.3+)
   - Configure next-themes providers in app
   - Set up Tailwind dark mode (class strategy)
   - Create ThemeToggle component
2. **Token Agent:** 
   - Verify all components use semantic tokens (surface/text/border/brand)
   - Add dark mode variants to all components
   - Test theme switching
3. **Normalization Agent:** Find and fix any system drift (arbitrary values, inconsistent variants)
4. **Accessibility Agent:** Audit all components for accessibility gaps
5. **Documentation Agent:** 
   - Ensure every component has proper Storybook story
   - Add dark mode controls to Storybook stories

**Deliverables:**
- next-themes and Framer Motion installed and configured
- All components support dark mode
- ThemeToggle component created
- Token compliance report
- List of normalized components
- Accessibility audit report
- Complete Storybook documentation with dark mode variants

---

### Phase 3: Build Patterns (Blocks) - 1-2 weeks

**Workflow for each Pattern:**

1. **Selection:** Choose Pattern from Part 3 list
2. **Source identification:** Find reference (Tailwind UI, Magic UI, Figma, custom)
3. **Extraction:** Create new file following structure in Part 5
4. **Normalization:** Apply all rules from Part 5, Step 3
5. **Documentation:** Create Storybook story
6. **Review:** Pass pre-merge checklist from Part 5, Step 5
7. **Integration:** Export and test in real context

**Agent assignments:**
- **Pattern Architect:** Reviews design, plans composition
- **Pattern Builder:** Implements the code
- **Accessibility Specialist:** Reviews and fixes accessibility
- **Documentation Agent:** Creates Storybook story
- **QA Agent:** Validates against checklist

**Priority order:** (following Part 3)
1. Authentication patterns (most critical)
2. Data visualization patterns
3. Form patterns
4. Empty/error states
5. User management patterns
6. Content management patterns
7. Navigation patterns
8. Data table patterns

---

### Phase 4: Build Layouts - 1 week

**Workflow for each Layout:**

1. **Design phase:** Sketch layout using existing Patterns + Components
2. **Build:** Compose Layout
3. **Responsive test:** Verify mobile → desktop
4. **Documentation:** Full-page Storybook story
5. **Review:** Pass checklist
6. **Real usage:** Use in example app to validate

**Agent assignments:**
- **Layout Architect:** Plans layout and composition
- **Layout Builder:** Assembles Patterns and Components
- **Responsive Specialist:** Ensures proper responsive behavior
- **Documentation Agent:** Creates layout story + usage guide
- **QA Agent:** Validates in real application context

**Priority order:** (following Part 4)
1. App Shell layout ✅ (done)
2. Dashboard layouts (for dogfooding)
3. Data & lists layouts
4. Settings layouts
5. Detail layouts

---

## Part 7: Quality Gates

### Gate 1: Token Compliance
**No Pattern/Layout merges without:**
- 100% use of semantic color tokens
- Tailwind spacing scale (no arbitrary values)
- Consistent shadow/radius usage
- Dark mode variants for all colors

### Gate 2: Accessibility
**No Pattern/Layout merges without:**
- Keyboard navigation working
- Screen reader testing passed
- WCAG AA contrast ratios (light AND dark mode)
- Proper ARIA attributes
- Animations respect prefers-reduced-motion

### Gate 3: Documentation
**No Pattern/Layout merges without:**
- Storybook story showing all variants
- Dark mode demonstrated in Storybook
- Composition details documented
- Code examples provided
- Accessibility notes included
- Animation behavior documented (if applicable)

### Gate 4: Integration
**No Pattern/Layout merges without:**
- Clean TypeScript build
- No console errors
- Responsive behavior verified
- Dark mode tested
- Tested in real application context

---

## Part 8: Reference Examples

### Good Pattern Example: LoginForm

**Source:** Inspired by Tailwind UI, normalized to GlueOS tokens

**File:** `packages/ui/src/patterns/authentication/login-form/LoginForm.tsx`

```tsx
/**
 * LoginForm Pattern
 * 
 * Complete login form with email/password inputs and remember me option
 * 
 * Composed of: Input, Button, Link, Checkbox, Label
 * Source: Tailwind UI (normalized)
 * Normalized: Feb 2026
 */

import * as React from "react"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Checkbox } from "@/components/checkbox"
import { Link } from "@/components/link"
import { Alert } from "@/components/alert"
import { cn } from "@/lib/utils"

export interface LoginFormProps {
  /**
   * Callback when form is submitted with valid data
   */
  onSubmit?: (data: LoginFormData) => void | Promise<void>
  
  /**
   * Show loading state during submission
   */
  isLoading?: boolean
  
  /**
   * Error message to display
   */
  error?: string | null
  
  /**
   * Show "remember me" checkbox
   * @default true
   */
  showRememberMe?: boolean
  
  /**
   * Show "forgot password" link
   * @default true
   */
  showForgotPassword?: boolean
  
  /**
   * Custom className
   */
  className?: string
}

export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  showRememberMe = true,
  showForgotPassword = true,
  className,
}: LoginFormProps) {
  const [formData, setFormData] = React.useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [fieldErrors, setFieldErrors] = React.useState<{
    email?: string
    password?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const errors: typeof fieldErrors = {}
    if (!formData.email) errors.email = "Email is required"
    if (!formData.password) errors.password = "Password is required"
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    
    setFieldErrors({})
    await onSubmit?.(formData)
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      noValidate
    >
      {/* Form-level error */}
      {error && (
        <Alert variant="error" role="alert">
          {error}
        </Alert>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          aria-invalid={fieldErrors.email ? "true" : "false"}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          disabled={isLoading}
        />
        {fieldErrors.email && (
          <p id="email-error" className="text-sm text-red-600 dark:text-red-400">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          aria-invalid={fieldErrors.password ? "true" : "false"}
          aria-describedby={fieldErrors.password ? "password-error" : undefined}
          disabled={isLoading}
        />
        {fieldErrors.password && (
          <p id="password-error" className="text-sm text-red-600 dark:text-red-400">
            {fieldErrors.password}
          </p>
        )}
      </div>

      {/* Remember me & Forgot password row */}
      {(showRememberMe || showForgotPassword) && (
        <div className="flex items-center justify-between">
          {showRememberMe && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember-me"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, rememberMe: checked === true }))
                }
                disabled={isLoading}
              />
              <Label
                htmlFor="remember-me"
                className="text-sm font-normal cursor-pointer"
              >
                Remember me
              </Label>
            </div>
          )}
          
          {showForgotPassword && (
            <Link href="/forgot-password" className="text-sm">
              Forgot password?
            </Link>
          )}
        </div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}
```

**Storybook Story:**

```tsx
// LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from './LoginForm'

const meta: Meta<typeof LoginForm> = {
  title: '3-Patterns (Blocks)/3.1-Authentication/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## LoginForm Pattern

Complete login form with email/password authentication.

**Composed of:** Input, Button, Link, Checkbox, Label, Alert

**Features:**
- Email and password validation
- Remember me option
- Forgot password link
- Loading states
- Error handling (field-level and form-level)
- Dark mode support

**Accessibility:**
- All inputs properly labeled
- Error messages linked with aria-describedby
- Invalid states announced with aria-invalid
- Loading state communicated with aria-busy
- Keyboard navigation supported
        `
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {
    onSubmit: async (data) => {
      console.log('Login submitted:', data)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

export const WithError: Story = {
  args: {
    error: "Invalid email or password. Please try again.",
    onSubmit: async (data) => console.log(data)
  }
}

export const Loading: Story = {
  args: {
    isLoading: true,
    onSubmit: async (data) => console.log(data)
  }
}

export const Minimal: Story = {
  args: {
    showRememberMe: false,
    showForgotPassword: false,
    onSubmit: async (data) => console.log(data)
  }
}
```

---

### Advanced Pattern Example: CommandBar with Framer Motion

**Source:** Custom implementation with Framer Motion

**File:** `packages/ui/src/patterns/navigation/command-bar/CommandBar.tsx`

```tsx
/**
 * CommandBar Pattern (⌘K)
 * 
 * Quick action search with keyboard shortcuts and smooth animations
 * 
 * Composed of: Modal, Input, Command (cmdk), + Framer Motion
 * Uses: Framer Motion for animations
 * Normalized: Feb 2026
 */

'use client'

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Command } from "cmdk"
import { Modal } from "@/components/modal"
import { Input } from "@/components/input"
import { cn } from "@/lib/utils"

export interface CommandBarProps {
  /**
   * Whether the command bar is open
   */
  isOpen: boolean
  
  /**
   * Callback when command bar should close
   */
  onClose: () => void
  
  /**
   * Available commands/actions
   */
  commands: CommandItem[]
  
  /**
   * Callback when a command is selected
   */
  onSelect: (command: CommandItem) => void
  
  /**
   * Placeholder text for search
   * @default "Type a command or search..."
   */
  placeholder?: string
}

export interface CommandItem {
  id: string
  label: string
  icon?: React.ReactNode
  keywords?: string[]
  category?: string
}

export function CommandBar({
  isOpen,
  onClose,
  commands,
  onSelect,
  placeholder = "Type a command or search...",
}: CommandBarProps) {
  const [search, setSearch] = React.useState("")
  const shouldReduceMotion = useReducedMotion()
  
  // Filter commands based on search
  const filteredCommands = React.useMemo(() => {
    if (!search) return commands
    
    const lowerSearch = search.toLowerCase()
    return commands.filter(cmd => 
      cmd.label.toLowerCase().includes(lowerSearch) ||
      cmd.keywords?.some(kw => kw.toLowerCase().includes(lowerSearch))
    )
  }, [search, commands])
  
  // Group by category
  const groupedCommands = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    
    filteredCommands.forEach(cmd => {
      const category = cmd.category || 'Commands'
      if (!groups[category]) groups[category] = []
      groups[category].push(cmd)
    })
    
    return groups
  }, [filteredCommands])
  
  // Reset search when closed
  React.useEffect(() => {
    if (!isOpen) setSearch("")
  }, [isOpen])
  
  // Animation variants (respect reduced motion)
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : -20,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
    },
  }
  
  const listItemVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -10,
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.03,
      }
    }),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Command Bar */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ 
                duration: shouldReduceMotion ? 0 : 0.2,
                type: shouldReduceMotion ? "tween" : "spring",
                damping: 20,
                stiffness: 300,
              }}
              className={cn(
                "w-full max-w-2xl mx-4",
                "bg-surface dark:bg-zinc-900",
                "border border-border dark:border-zinc-800",
                "rounded-lg shadow-2xl",
                "overflow-hidden"
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <Command>
                {/* Search input */}
                <div className="flex items-center border-b border-border dark:border-zinc-800 px-4">
                  <svg
                    className="w-5 h-5 text-text-tertiary dark:text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <Command.Input
                    value={search}
                    onValueChange={setSearch}
                    placeholder={placeholder}
                    className={cn(
                      "flex-1 px-4 py-4",
                      "bg-transparent border-0 outline-none",
                      "text-text-primary dark:text-zinc-50",
                      "placeholder:text-text-tertiary dark:placeholder:text-zinc-500"
                    )}
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-text-tertiary dark:text-zinc-500 bg-surface-2 dark:bg-zinc-800 rounded">
                    ESC
                  </kbd>
                </div>
                
                {/* Results */}
                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                  <AnimatePresence mode="wait">
                    {Object.keys(groupedCommands).length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 text-center text-text-secondary dark:text-zinc-400"
                      >
                        No results found
                      </motion.div>
                    ) : (
                      Object.entries(groupedCommands).map(([category, items]) => (
                        <Command.Group
                          key={category}
                          heading={category}
                          className="mb-2"
                        >
                          <div className="px-2 py-1 text-xs font-semibold text-text-tertiary dark:text-zinc-500">
                            {category}
                          </div>
                          {items.map((item, index) => (
                            <motion.div
                              key={item.id}
                              custom={index}
                              variants={listItemVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              <Command.Item
                                value={item.label}
                                onSelect={() => {
                                  onSelect(item)
                                  onClose()
                                }}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
                                  "text-text-primary dark:text-zinc-200",
                                  "hover:bg-surface-2 dark:hover:bg-zinc-800",
                                  "data-[selected=true]:bg-surface-3 dark:data-[selected=true]:bg-zinc-800"
                                )}
                              >
                                {item.icon && (
                                  <span className="text-text-tertiary dark:text-zinc-500">
                                    {item.icon}
                                  </span>
                                )}
                                <span>{item.label}</span>
                              </Command.Item>
                            </motion.div>
                          ))}
                        </Command.Group>
                      ))
                    )}
                  </AnimatePresence>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Export types
export type { CommandBarProps, CommandItem }
```

**Key Framer Motion patterns demonstrated:**
1. **AnimatePresence** - Handles enter/exit animations
2. **useReducedMotion** - Respects user preference for reduced motion
3. **Variants** - Reusable animation configs
4. **Stagger animations** - List items animate in sequence
5. **Spring physics** - Natural feeling modal entry (when motion enabled)
6. **Zero duration fallback** - Instant for reduced motion users

**Storybook story showing animations:**

```tsx
// CommandBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CommandBar } from './CommandBar'
import { useState } from 'react'

const meta: Meta<typeof CommandBar> = {
  title: '3-Patterns (Blocks)/3.7-Navigation/CommandBar',
  component: CommandBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## CommandBar Pattern ⚡

Quick action search with keyboard shortcuts (⌘K) and smooth animations.

**Composed of:** Modal, Input, Command (cmdk) + **Framer Motion**

**Features:**
- Keyboard shortcut (⌘K or Ctrl+K)
- Fuzzy search
- Grouped results
- Smooth animations (respects prefers-reduced-motion)
- Keyboard navigation
- Dark mode support

**Accessibility:**
- Proper dialog role and aria-modal
- Keyboard navigation with arrow keys
- ESC to close
- Animations respect prefers-reduced-motion
- Screen reader announcements

**Animations:**
- Overlay fade in/out
- Content scale and slide entry
- List items stagger animation
- All animations disabled for reduced motion users
        `
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CommandBar>

// Wrapper to handle state
function CommandBarWrapper(args: any) {
  const [isOpen, setIsOpen] = useState(true)
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Command Bar (⌘K)
      </button>
      <CommandBar
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export const Default: Story = {
  render: (args) => <CommandBarWrapper {...args} />,
  args: {
    commands: [
      { id: '1', label: 'Create new project', category: 'Actions' },
      { id: '2', label: 'Search files', category: 'Actions' },
      { id: '3', label: 'Open settings', category: 'Navigation' },
      { id: '4', label: 'View profile', category: 'Navigation' },
      { id: '5', label: 'Sign out', category: 'Account' },
    ],
    onSelect: (item) => console.log('Selected:', item),
  }
}
```

---

## Part 9: Agent Team Instructions

**When ready to execute, provide this to Claude Code agent team:**

```
MISSION: GlueOS UI Kit V1.0 Refinement

CONTEXT:
- Read the full plan document
- Current project has components but needs organization + Patterns + Templates
- Critical: Must prevent system drift through normalization

PHASES:

PHASE 1: Reorganize (2 days)
- Architect: Audit and propose reorganization
- Move components into categories from Part 2
- Update Storybook structure
- Fix all imports
- Deliverable: Clean, organized component library

PHASE 2: Normalize (3 days)
- Dependency Setup: Install next-themes 0.3.0+ and Framer Motion 11.3+
- Configure next-themes providers and ThemeToggle component
- Set up Tailwind dark mode configuration
- Token Agent: Verify semantic token usage throughout
- Add dark mode variants to all components
- Normalization Agent: Fix any system drift
- Accessibility Agent: Complete accessibility audit (including dark mode contrast)
- Documentation Agent: Ensure all components documented with dark mode variants
- Deliverable: Normalized, accessible, dark-mode-ready, documented components

PHASE 3: Build Patterns (2 weeks)
- Follow Part 3 list of recommended Patterns
- Use workflow from Part 6, Phase 3
- Apply normalization rules from Part 5
- Pass all quality gates from Part 7
- Priority: Authentication → Data Viz → Forms → Error States → User Mgmt → Content → Navigation → Tables
- Deliverable: Complete Pattern library

PHASE 4: Build Layouts (1 week)
- Follow Part 4 list of recommended Layouts
- App Shell layout is already complete (4.0)
- Use workflow from Part 6, Phase 4
- Compose using existing Patterns + Components
- Test in real application context
- Priority: Dashboard → Data → Settings → Detail
- Deliverable: Complete Layout library

CRITICAL RULES:
1. Every Pattern/Layout must pass normalization checklist (Part 5, Step 3)
2. Every Pattern/Layout must pass pre-merge checklist (Part 5, Step 5)
3. No external components - build from our library or add to library first
4. All documentation must be complete before merge
5. System drift gets rejected - maintain consistency

QUALITY GATES:
All four gates from Part 7 must pass before any Pattern/Layout merges.

Begin with Phase 1. Report progress at end of each phase.
```

---

## Summary

**What we've defined:**
1. ✅ Industry-standard hierarchy: Tokens → Components → Patterns (Blocks) → Layouts
2. ✅ Complete Storybook organization structure with "Patterns (Blocks)" and "Layouts" naming
3. ✅ Core dependencies: next-themes (dark mode) + Framer Motion (animations)
4. ✅ Comprehensive lists of recommended Patterns and Templates (software-focused)
5. ✅ Detailed normalization process to prevent system drift
6. ✅ Dark mode implementation strategy
7. ✅ Animation guidelines with accessibility focus
8. ✅ Quality gates and review checklists
9. ✅ Working example (LoginForm) showing the approach
10. ✅ Clear agent team instructions

**What prevents system drift:**
- Token compliance (semantic colors, Tailwind scale)
- Component consistency (only our components)
- Variant normalization (standardized naming)
- Dark mode requirements (all components tested in both modes)
- Accessibility requirements (mandatory checklist + reduced motion)
- Animation standards (Framer Motion patterns with accessibility)
- Documentation standards (Storybook stories required)
- Quality gates (can't merge without passing)

**Time estimate:**
- Phase 1 (Reorganize): 2 days
- Phase 2 (Normalize + Dependencies): 3 days
- Phase 3 (Patterns): 2 weeks
- Phase 4 (Layouts): 1 week
- **Total: ~3-4 weeks for complete V1.0**

**Key dependencies:**
- next-themes 0.3.0+ (dark mode)
- Framer Motion 11.3+ (advanced animations)

This approach ensures GlueOS UI Kit remains consistent, accessible, animated, and maintainable as it scales.

---

## Quick Reference: What's New in This Version

### ✅ Updated from Original Plan

1. **Storybook Navigation** → Changed to "Patterns (Blocks)" throughout
2. **Dark Mode** → Added next-themes 0.3.0+ with full implementation guide
3. **Animations** → Added Framer Motion 11.3+ with accessibility focus
4. **Dependencies Section** → New Part 2.5 covering both libraries
5. **Animation Guidelines** → New Part 2.6 with reduced motion requirements
6. **Quality Gates** → Updated to include dark mode and animation testing
7. **Examples** → LoginForm updated with dark mode, CommandBar added showing Framer Motion
8. **Normalization** → Expanded checklist to include dark mode variants

### 📦 Dependencies to Install

```bash
pnpm add next-themes@latest  # v0.3.0+
pnpm add framer-motion@latest # v11.3+
```

### 🎨 Dark Mode Setup Checklist

- [ ] Install next-themes
- [ ] Add ThemeProvider to app layout
- [ ] Set Tailwind dark mode to 'class'
- [ ] Create ThemeToggle component
- [ ] Add `dark:` variants to all components
- [ ] Test contrast ratios in both modes
- [ ] Add dark mode controls to Storybook

### ⚡ Framer Motion Patterns

**High Priority:**
- CommandBar (⌘K)
- Modal/Dialog
- Sheet/Drawer

**Medium Priority:**
- Dropdown Menu
- Toast
- Tabs
- Accordion

**Remember:** All animations must respect `prefers-reduced-motion`

### 🔍 Where to Find Key Info

- **Part 2.5:** Dependency installation and setup
- **Part 2.6:** Which patterns use Framer Motion
- **Part 5, Step 3:** Normalization rules (includes dark mode)
- **Part 7:** Quality gates (includes dark mode + animation testing)
- **Part 8:** LoginForm example (dark mode) + CommandBar example (Framer Motion)

### 🚀 Ready to Execute

The agent team instructions in Part 9 are updated and ready to use. Just copy/paste into Claude Code when you're ready to begin implementation.
