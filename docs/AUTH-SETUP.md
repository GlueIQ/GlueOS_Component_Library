# GlueOS — Clerk Auth Setup Guide

> This guide covers Clerk Dashboard configuration for a GlueOS deployment.
> The `packages/auth/` code ships as-is — no code changes are required per deployment.
> All deployment-specific config lives here (environment variables + Clerk Dashboard).

---

## Step 1: Create the Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → **Create Application**
2. Name it `GlueOS` (or the client name for client-specific repos)
3. Select authentication methods: **Email** (primary), optionally **Google OAuth** for internal users
4. This creates your **Publishable Key** and **Secret Key** — add them to `.env.local`

---

## Step 2: Enable Restricted Sign-Up

This prevents self-registration. All users must be invited by an admin.

1. Go to **User & Authentication → Restrictions**
2. Enable **"Restricted"** sign-up mode

This means:
- No public sign-up page
- Users must be invited via email, added manually, or join via verified domain
- The sign-up URL shows an error if navigated to directly

---

## Step 3: Enable Organizations

Organizations = clients in GlueOS. Each organization is a separate tenant.

1. Go to **User & Authentication → Organizations**
2. Enable Organizations
3. Configure:
   - **Allow users to create organizations:** OFF (only admins create orgs)
   - **Allow users to delete organizations:** OFF

---

## Step 4: Define Roles and Permissions

### Create Roles

| Role | System Key | Description |
|------|-----------|-------------|
| Admin | `org:admin` | Full access to all modules, manages users |
| Member | `org:member` | Default role — access controlled by per-module permissions |
| Viewer | Custom | Read-only access to assigned modules (optional) |

### Create Permissions

One permission per module, using the format `org:{module-slug}:access`:

| Permission Key | Module |
|----------------|--------|
| `org:forge:access` | Forge |
| `org:intelligence:access` | Intelligence |
| `org:immersion:access` | Immersion |
| `org:lumen:access` | Lumen |
| `org:horizon:access` | Horizon |
| `org:zoltar:access` | Zoltar |
| `org:studio:access` | Studio |
| `org:vault:access` | Vault |
| `org:orchestrate:access` | Orchestrate |
| `org:optimize:access` | Optimize |
| `org:connect:access` | Connect |
| `org:shield:access` | Shield |
| `org:admin_panel:access` | Admin panel |

**Assign permissions to roles:**
- `org:admin` → all permissions
- `org:member` → only per-user assigned permissions
- When you scaffold a new app, add `org:{app-slug}:access` here

---

## Step 5: Create the First Organization

1. Go to **Organizations → Create Organization**
2. For internal GlueIQ use: `GlueIQ Internal`
3. For a client deployment: use the client name (e.g. `DIRECTV`)

---

## Step 6: Invite Initial Users

1. In the organization: **Members → Invite**
2. Send email invitations to initial users
3. Assign roles on invite

Users receive an email, click the link, and set up their account via the Clerk-hosted flow.

---

## Step 7: Configure Session Token Claims (Recommended)

Add org metadata to the JWT so middleware and client hooks can read permissions without extra API calls.

1. Go to **Sessions → Customize session token**
2. Add these claims:

```json
{
  "org_id": "{{org.id}}",
  "org_slug": "{{org.slug}}",
  "org_role": "{{org.role}}",
  "org_permissions": "{{org.permissions}}"
}
```

---

## Environment Variables

Add to `.env.local` (see `.env.example` in the repo root for the full template):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_DEPLOYMENT_MODE=internal
```

---

## Internal vs. Client Deployment

| Concern | Internal | Client |
|---------|----------|--------|
| **OrgSwitcher** | Visible — switch between client orgs | Hidden — single org |
| **Org creation** | Admins create orgs for each client | One org at deployment |
| **User invitations** | GlueIQ admins invite operators | Client admins invite team |
| **Module visibility** | All licensed modules | Only licensed modules |
| **Sign-in branding** | GlueOS / GlueIQ | Client branding (Clerk appearance) |

Controlled by `NEXT_PUBLIC_DEPLOYMENT_MODE` — not code branching.

---

## Adding a New Module's Permission

When you scaffold a new app with `./tooling/create-app.sh`, it prints a reminder. The steps are:

1. `./tooling/create-app.sh my-module` — scaffolds the app and registers the permission in `tooling/permissions.json`
2. In Clerk Dashboard → Configure → Roles & Permissions:
   - Add permission: `org:my-module:access`
   - Assign to `org:admin` (always) and any other roles

---

## Troubleshooting

**"You need to be invited to sign up"** — expected in restricted mode; the user needs an invitation email.

**"You don't have access to this module"** — the user is signed in but lacks the `org:{module}:access` permission. Assign it in Clerk Dashboard → Organizations → select org → Members → edit user's permissions.

**Middleware redirect loop** — check that `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set correctly in `.env.local`.

**OrgSwitcher not showing** — verify `NEXT_PUBLIC_DEPLOYMENT_MODE=internal` and that Organizations are enabled in Clerk Dashboard.

---

*GlueOS Auth Setup Guide — March 2026*
