# Current Session Context
**Last Updated:** March 5, 2026
**Session Status:** Deployment pipeline complete

---

## What Just Happened (March 5, 2026)

### Deployment Pipeline — Fully Operational
All three deployment targets are now configured and working:

| Target | Platform | Status | Auto-deploy |
|--------|----------|--------|-------------|
| `instance-generator` | Vercel | READY (production) | Push to `main` |
| `ui-sandbox` | Vercel | READY (production) | Push to `main` |
| Storybook | Chromatic | Configured (PR #19) | Push/PR to `main` touching `packages/ui/**` |

### Build Fixes Resolved
- **TS2322 errors**: `NavMain` label prop changed from required to optional; conditional spread replaced with direct prop passing
- **ERR_PNPM_OUTDATED_LOCKFILE**: Regenerated `pnpm-lock.yaml` to include `packages/auth` workspace
- **Vercel production**: `glue-os-component-library-web` now deploying successfully

### New Infrastructure
- **@repo/auth package** (`packages/auth/`): Clerk-based auth with middleware, guards, hooks, provider, and org switcher
- **App module template** (`templates/app/`): Full Next.js scaffold with routes, sign-in, and `tooling/create-app.sh` generator
- **Chromatic CI** (`.github/workflows/chromatic.yml`): GitHub Action publishes Storybook on changes to `packages/ui/**`
- **ui-sandbox Vercel project**: Deployed at `ui-sandbox-glue-iq.vercel.app`

### Component Upgrades
- Button, input, separator, sheet, sidebar, skeleton, status-badge refreshed with data-slot attributes
- Sidebar refactored to latest shadcn/ui patterns with mobile support (`use-mobile` hook)
- New status utility module and foundation stories (1.6-Status)
- SVG logo/icon assets refreshed

---

## Deployment Configuration

### Vercel Projects (GlueIQ team)

**instance-generator** (existing)
- Project: `glue-os-component-library-web` (`prj_lr9TrUvZielxSdx8imiF3VY5OXiz`)
- Root: `apps/instance-generator`
- URL: `glue-os-component-library-web.vercel.app`

**ui-sandbox** (new)
- Project: `ui-sandbox` (`prj_4j3I8gh6H07liPRKAWfYgxhZkosP`)
- Root: `apps/ui-sandbox`
- Build: `cd ../.. && pnpm run build --filter=ui-sandbox`
- URL: `ui-sandbox-glue-iq.vercel.app`

### Chromatic
- Project token stored as `CHROMATIC_PROJECT_TOKEN` GitHub secret
- Workflow: `.github/workflows/chromatic.yml`
- Triggers on push/PR to `main` when `packages/ui/**` changes

---

## Architecture

### Monorepo Structure
```
apps/
  instance-generator/   → Vercel (production)
  ui-sandbox/           → Vercel (production)
packages/
  ui/                   → Component library + Storybook → Chromatic
  auth/                 → Clerk auth package (new)
  eslint-config/
  typescript-config/
templates/
  app/                  → Module scaffold template (new)
  docker/
tooling/
  create-app.sh         → App generator script (new)
```

### Apps in Monorepo
| App | Port (dev) | Purpose |
|-----|-----------|---------|
| `instance-generator` | 3000 | Production generator app |
| `ui-sandbox` | 3001 | GlueOS module demo/sandbox |
| Storybook | 6006 | Component library docs |

---

## Open PRs
- **PR #19**: Chromatic workflow, component upgrades, and build fixes (`feature/patterns-layouts-buildout` → `main`)

---

## Blocking Issues: None

All deployment targets operational. PR #19 pending merge to activate Chromatic.
