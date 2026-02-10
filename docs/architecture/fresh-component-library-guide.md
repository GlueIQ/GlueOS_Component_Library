# Fresh Start: Dedicated Component Library Guide

If you want to start fresh to build a robust, scalable component library using **Next.js**, **Tailwind**, and **Shadcn UI**, the standard industry approach is a **Monorepo**.

This ensures your "UI Library" is distinct from your "Documentation/Playground" app, while keeping them in the same codebase for easy development.

## 1. Recommended Stack & Dev Environment

| Component | Recommendation | Why? |
| :--- | :--- | :--- |
| **Monorepo Manager** | **Turborepo** | Native support for Next.js, fast builds, handled by Vercel. |
| **Package Manager** | **pnpm** | Fast, disk-efficient, excellent monorepo support (`workspaces`). |
| **Framework** | **Next.js 14+** | For your documentation/playground site. |
| **Bundler (Lib)** | **tsup** | Simplest "zero-config" bundler to package your UI library for consumption. |
| **Components** | **Shadcn UI** | Your base atoms/components. |
| **Visual Testing** | **Storybook** | Visual documentation and Chromatic integration. |

---

## 2. The "Golden Standard" Setup (Step-by-Step)

You don't need a complex community template. Shadcn CLI now supports monorepos natively, or you can use the Turbo generator.

### Option A: The "Official" Path (Shadcn CLI)
The newest version of the CLI can scaffold this for you.

```bash
# Initialize a new project and select "Monorepo" if prompted
npx shadcn@latest init
```

### Option B: The Manual "Best Practice" Path (Recommended)
This gives you the most control and maps to the structure dependent teams expect.

**1. Scaffold TurboRepo:**
```bash
# This creates a robust starter
npx create-turbo@latest glueos-design-system
cd glueos-design-system
# Choose "pnpm" as package manager
```

**2. Structure your folders:**
```
/apps
  /web           <-- Next.js app (Documentation site + Storybook host)
/packages
  /ui            <-- YOUR PACKAGE (The "Master" Component Library)
    /src
      /components
        /ui      <-- Shadcn components go here
    package.json <-- name: "@glueos/ui"
  /eslint-config
  /typescript-config
```

**3. Initialize Shadcn in `packages/ui`:**
You want Shadcn to install components *into your library package*, not your app.
```bash
cd packages/ui
npx shadcn@latest init
# Configure it to place components in ./src/components/ui
```

**4. Add Storybook:**
You have two choices:
*   **Integrated:** Run Storybook inside `apps/web`. It imports components from `@glueos/ui`.
*   **Isolated (Better for Chromatic):** Run Storybook inside `packages/ui` or a dedicated `apps/storybook`.
    *   *Recommendation:* Run it in `packages/ui` so the library is self-documenting.

```bash
cd packages/ui
npx storybook@latest init
```

---

## 3. Key Dependencies

In your `packages/ui/package.json`, you will need:

**DevDependencies (for building):**
*   `tsup`: To build your typescript files into `.mjs` / `.js` for other apps to use.
*   `tailwindcss`: To compile styles.
*   `postcss`: For tailwind processing.

**PeerDependencies (for consumers):**
*   `react`: ^18 or ^19
*   `react-dom`: ^18 or ^19
*   `tailwindcss`: ^3 or ^4 (Ensure version match)
*   `lucide-react`: If using icons.

---

## 4. The Development Loop

1.  **Run Dev:** `pnpm dev` (Starts Storybook + Doc Site)
2.  **Add Component:**
    ```bash
    # From root, add button to UI package
    cd packages/ui && npx shadcn@latest add button
    ```
3.  **View it:** Open Storybook (localhost:6006) to see the new button.
4.  **Publish:**
    *   Push to Main -> GitHub Action -> Chromatic Deployment.
    *   Push to Main -> GitHub Action -> Release `@glueos/ui` to NPM/GitHub Packages.

## 5. Summary Recommendation

**Spin up:**
*   **Template:** `create-turbo` (clean slate) OR `npx shadcn@latest init` (monorepo mode).
*   **Tools:** `pnpm`, `Turborepo`, `tsup` (for bundling).
*   **Hosting:**
    *   Library Artifacts: NPM / GitHub Packages.
    *   Visual Docs: Chromatic (Storybook).
    *   Documentation Site: Vercel (Next.js).

This gives you a professional-grade "Design System" repository that is ready for scale.
