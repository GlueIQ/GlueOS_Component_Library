# Component Library Strategy & Best Practices

To resolve the need for referencing a "master" component library across multiple projects (`GlueOS`, `Project B`, `Project C`), the recommended industry standard is to treat your component library as a **versioned package**.

This guide outlines the architecture, workflow, and integration patterns.

## 1. Architecture Recommendation: The Package Approach

Instead of multiple apps pointing to a git URL or submodule, you should package your `components/`, `lib/`, and `hooks/` into an NPM package (e.g., `@glueos/ui`).

### Why?
- **Versioning**: Apps can lock to specific versions (v1.0.0) without breaking when the library updates to v2.0.0.
- **Semantic Versioning**: Standard practice (major.minor.patch) communicates impact of changes.
- **Tree Shaking**: Proper building allows apps to only bundle the code they use.

### Repository Structure
You have two main paths:

**Path A: Monorepo (Recommended for close-knit ecosystem)**
Your repo would look like this:
```
/apps
  /web (Next.js)
  /admin (Next.js)
/packages
  /ui (Your Component Library)
    /src
      /components
      /hooks
    package.json (exports @glueos/ui)
```
*Pros:* Easy to make cross-project changes. Single commit tracks everything.
*Cons:* Higher initial setup complexity (Turborepo/Nx).

**Path B: Polyrepo with Published Package (Recommended for independent teams)**
Keep the UI library in its own repo (or the current one, refactored). Publish the artifacts to a registry. Be careful mixing "App" and "Library" in one `package.json` unless you are careful with `exports`.

## 2. Packaging the Library

Currently, your components are source files. To share them, they need to be "transpiled" and bundled, or at least configured for export.

### Build Tooling
We recommend using **tsup** or **Vite (Library Mode)** to build your components into ESM (ECMAScript Modules) and CJS (CommonJS) formats along with Type Definitions (`.d.ts`).

**Example `package.json` setup for the library:**
```json
{
  "name": "@glueos/ui",
  "version": "0.0.1",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --css"
  }
}
```

## 3. Publishing to a Registry

Since this is likely private code, you need a private registry.
- **GitHub Packages**: Easiest integration with GitHub Actions. Free for public, paid/limited for private.
- **NPM Private**: Standard, requires paid org account.

**Workflow:**
1. PR merged to `main` in component library.
2. CI (GitHub Action) runs tests and build.
3. CI publishes `@glueos/ui@1.0.1` to GitHub Packages.

## 4. Consuming the Library

In your other projects (`Project B`, `Project C`):

1. **Install**:
   ```bash
   pnpm add @glueos/ui
   ```
2. **Import**:
   ```tsx
   import { Button } from '@glueos/ui';

   export default function Page() {
     return <Button>Click Me</Button>;
   }
   ```
3. **Styles**:
   You may need to import the library's CSS or configure Tailwind to scan the `node_modules/@glueos/ui` folder for class names if you share raw Tailwind classes.

## 5. Storybook Composition (The "Master" Reference)

This is the "Secret Sauce" for visibility. You don't just want code; you want developers to **see** the master library while working in their local apps.

**How it works:**
Since you publish your Storybook to Chromatic (e.g., `https://main--glueos-ui.chromatic.com`), you can reference it in your **Consumer Apps**.

In `Project B/.storybook/main.ts`:
```ts
export default {
  // ...
  refs: {
    'glueos-ui': {
      title: 'GlueOS UI',
      url: 'https://main--glueos-ui.chromatic.com',
    },
  },
};
```

**Result**: When developers run Storybook in Project B, they see "GlueOS UI" in the sidebar with all the live components from the master library, loaded alongside their local components.

## 6. Contribution Workflow

How do teams contribute back?

1. **Discover**: Dev realizes `Button` needs a new variant.
2. **Branch**: Checkout `glueos-ui` repo (or workspace).
3. **Develop**: Create the variant in isolation in Storybook.
4. **Docs**: Update the Story/Docs.
5. **PR**: Submit Pull Request. Chromatic automatically generates a UI Review link.
6. **Merge & Publish**: Once merged, a new version (e.g. `1.1.0`) is published.
7. **Update**: Projects updated `package.json` to `^1.1.0` to get the new variant.

## Next Steps

To move forward, we should:
1. **Isolate**: Ensure `src/components` (or `components/`) contains ONLY reusable code.
2. **Tools**: Install `tsup` and configure the build script.
3. **Entry**: Create a master `index.ts` exporting all components.
4. **Pipeline**: Set up the GitHub Action to publish to GitHub Packages.
