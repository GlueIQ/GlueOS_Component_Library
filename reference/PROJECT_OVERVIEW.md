
# GlueOS Design System - Project Overview

## 🚀 Project Summary

This project is a modern, high-performance monorepo implementing the **GlueOS Design System**. It utilizes **Turborepo** for build orchestration, **Next.js** for applications, and a shared **UI package** for a unified design language across all platforms.

It combines the scalability of a monorepo with the flexibility of a "copy-paste" aesthetic component library (based on shadcn/ui), adapted for a shared library architecture.

---

## 🏗️ Monorepo Architecture

The project follows a standard Turborepo structure:

```
.
├── apps/
│   ├── web/               # Main Next.js Web Application
│   └── docs/              # Documentation Site (Next.js)
└── packages/
    ├── ui/                # Shared Component Library & Storybook
    ├── eslint-config/     # Shared ESLint configurations
    └── typescript-config/ # Shared TSConfig bases
```

### 1. Web App (`apps/web`)
- **Framework**: Next.js 16 (App Router)
- **Purpose**: The core user-facing application for GlueOS.
- **Key Features**:
  - Consumes UI components from `@repo/ui`.
  - Implements complex layouts (Dashboard with Sidebar).
  - configured with `transpilePackages` to support the shared UI library.

### 2. Documentation (`apps/docs`)
- **Framework**: Next.js 16
- **Purpose**: Dedicated site for documentation and guides.
- **Key Features**:
  - Consumes the same `@repo/ui` for consistent branding.

### 3. UI Library (`packages/ui`)
- **Purpose**: The "source of truth" for visually consistent components.
- **Key Features**:
  - **Storybook 10**: Integrated directly into the package for isolated component development (`pnpm storybook`).
  - **Shared Components**: Exports atomic UI components (Button, Input, Sidebar, etc.) to all apps.
  - **Design Tokens**: Centralized definition of colors, typography, and spacing.

---

## 🛠️ Technology Stack & Dependencies

This project leverages a cutting-edge stack focused on developer experience and performance:

### Core Frameworks
- **Turbo**: High-performance build system for monorepos.
- **Next.js 16.1.5**: React framework for production (App Router, Server Components).
- **React 19**: The latest React library version.
- **TypeScript 5.9**: Static type checking.

### Styling & Design
- **Tailwind CSS 3.4**: Utility-first CSS framework.
- **Tailwind Animate**: Animation utilities (`tailwindcss-animate`).
- **Class Variance Authority (CVA)**: For managing component variants (size, intent, shape).
- **CLSX & Tailwind Merge**: For conditional and conflict-free class merging.
- **Lucide React & Tabler Icons**: Comprehensive icon libraries.

### UI Primitives (Headless)
We use **Radix UI** primitives for accessible, unstyled components:
- Dialog, Dropdown Menu, Popover, Tooltip
- Separator, Slot, Toggle, Avatar
- Collapsible, Label, Select, Tabs

### Utilities & Libraries
- **Zod**: Schema validation.
- **React Hook Form**: Form state management (integrated).
- **Sonner**: Toast notifications.
- **Vaul**: Drawer component.
- **Recharts**: Charting library for the analytics dashboard.
- **Dnd-kit**: Drag-and-drop primitives.
- **Next Themes**: Dark mode support.

---

## 🧩 Customization & Strategy

### 1. Shared Component Strategy (The "Hybrid" Approach)
Unlike a traditional npm library where components are pre-bundled, we use a hybrid approach inspired by **shadcn/ui**:
- Components call **Radix UI** primitives directly.
- Source code lives in `packages/ui` but is consumed as if it were local code (via `transpilePackages`).
- This allows full ownership of the code while maintaining a single source of truth.

### 2. Unified Design Tokens
Design tokens (Colors, Radius, Spacing) are defined centrally in CSS variables (`globals.css` pattern) and mapped via Tailwind configuration. This ensures that `apps/web` and `apps/docs` share the precise same visual identity.

### 3. Dashboard Architecture
The `apps/web` application features a robust Dashboard layout using the `Sidebar` primitive:
- **Responsive**: Mobile-friendly slide-out menus.
- **Collapsible**: Desktop sidebar with icon-only mode.
- **Composition**: Built using a composition pattern (`Sidebar`, `SidebarBody`, `SidebarLink`) for flexibility.

### 4. Custom Fixes & Optimizations
- **Next.js Transpilation**: Explicitly configured `transpilePackages: ["@repo/ui"]` in `next.config.js` to handle the specific needs of importing raw UI components across workspace boundaries.
- **Tailwind Compatibility**: Custom adjustments to ensure Tailwind V4 syntax compatibility within our V3 environment.
