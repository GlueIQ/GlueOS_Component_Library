# GlueOS Component Library

A comprehensive design system and component library built with React, Next.js, and Tailwind CSS.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: Main Next.js application and generator
- `example-project`: Example Next.js app demonstrating the component library
- `project-tracker`: Project tracking Next.js application
- `@repo/ui`: React component library with Storybook documentation
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Tech Stack

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [React](https://react.dev/) for UI components
- [Next.js](https://nextjs.org/) for applications
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Storybook](https://storybook.js.org/) for component documentation
- [Turborepo](https://turbo.build/) for monorepo management
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Development Setup

### Option 1: Docker (Recommended)

**Prerequisites:**
- Docker Desktop

**Quick Start:**
```bash
git clone [repo]
cd glueos-component-library
docker compose up
```

**Services:**
- Web App: http://localhost:3000
- Example Project: http://localhost:3001
- Project Tracker: http://localhost:3002
- Storybook: http://localhost:6006

See [DOCKER.md](./DOCKER.md) for detailed Docker documentation.

### Option 2: Local Development

**Prerequisites:**
- Node.js 20+
- pnpm 9+

**Setup:**
```bash
pnpm install
pnpm run build --filter=@repo/ui
pnpm run dev
```

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
