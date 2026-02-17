# Port Assignment Update — GlueOS/GlueIQ Workspace

## Context

We've adopted a port range convention across GlueIQ projects to avoid conflicts when running multiple workspaces simultaneously:

| Project | Web Apps | Storybook | API/Services |
|---------|----------|-----------|--------------|
| **GlueOS/GlueIQ** | 3000–3099 | 6006 | 3100–3199 |
| **DIRECTV** | 4000–4099 | 6007 | 4100–4199 |

The DIRECTV workspace has already been updated to use the 4000 range.

## Task

Update the GlueOS/GlueIQ workspace so that all port assignments explicitly use the **3000 range** and **6006** for Storybook. This should already be the case for most services, but please verify and update if needed:

1. **`docker-compose.yml`** — Storybook should map to host port `6006`
2. **`docker-compose.dev.yml`** — Web app should map to host port `3000`, any additional apps to `3001`, `3002`, etc.
3. **`apps/*/package.json`** — Remove hardcoded `--port` flags from `dev` scripts (let Next.js auto-assign), OR explicitly set ports starting at `3000`
4. **Any future API services** should use ports in the `3100–3199` range

No other code changes needed — just port configuration files.
