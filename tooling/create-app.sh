#!/usr/bin/env bash
# =============================================================================
# GlueOS — Create App
# Usage: ./tooling/create-app.sh <app-slug> [description]
#
# Scaffolds a new GlueOS module app from templates/app/ into apps/<app-slug>/
# Replaces __APP_SLUG__, __APP_NAME__, __APP_DESCRIPTION__ throughout.
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
RESET='\033[0m'

info()    { echo -e "${BLUE}ℹ${RESET}  $*"; }
success() { echo -e "${GREEN}✓${RESET}  $*"; }
warn()    { echo -e "${YELLOW}⚠${RESET}  $*"; }
error()   { echo -e "${RED}✗${RESET}  $*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Validate arguments
# ---------------------------------------------------------------------------
if [[ $# -lt 1 ]]; then
  echo ""
  echo -e "${BOLD}Usage:${RESET} ./tooling/create-app.sh <app-slug> [description]"
  echo ""
  echo -e "  ${BOLD}app-slug${RESET}       Lowercase, hyphen-separated (e.g. 'forge', 'my-module')"
  echo -e "  ${BOLD}description${RESET}    Optional. Description for package.json and README."
  echo ""
  echo -e "Examples:"
  echo "  ./tooling/create-app.sh forge"
  echo "  ./tooling/create-app.sh intelligence 'Campaign analytics and channel performance.'"
  echo ""
  exit 1
fi

APP_SLUG="${1,,}"  # lowercase
APP_DESCRIPTION="${2:-A GlueOS module app.}"

# Validate slug format
if [[ ! "$APP_SLUG" =~ ^[a-z][a-z0-9-]*$ ]]; then
  error "App slug must be lowercase letters, numbers, and hyphens only. Got: '$APP_SLUG'"
fi

# Capitalize first letter of each word for APP_NAME
APP_NAME="$(echo "$APP_SLUG" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')"

# ---------------------------------------------------------------------------
# Resolve paths (script can run from any directory)
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATE_DIR="$REPO_ROOT/templates/app"
TARGET_DIR="$REPO_ROOT/apps/$APP_SLUG"

# ---------------------------------------------------------------------------
# Pre-flight checks
# ---------------------------------------------------------------------------
echo ""
echo -e "${BOLD}GlueOS — Scaffold New App${RESET}"
echo -e "─────────────────────────────────"
echo -e "  Slug:         ${GREEN}$APP_SLUG${RESET}"
echo -e "  Name:         ${GREEN}$APP_NAME${RESET}"
echo -e "  Description:  $APP_DESCRIPTION"
echo -e "  Target:       apps/$APP_SLUG/"
echo ""

if [[ ! -d "$TEMPLATE_DIR" ]]; then
  error "Template not found at: $TEMPLATE_DIR"
fi

if [[ -d "$TARGET_DIR" ]]; then
  error "Directory already exists: apps/$APP_SLUG/ — choose a different slug or delete it first."
fi

# ---------------------------------------------------------------------------
# Copy template
# ---------------------------------------------------------------------------
info "Copying template to apps/$APP_SLUG/ ..."
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

# ---------------------------------------------------------------------------
# Replace placeholder tokens
# ---------------------------------------------------------------------------
info "Replacing placeholder tokens ..."

# Detect sed -i syntax (BSD/macOS vs GNU)
if sed --version 2>&1 | grep -q GNU; then
  SED_I="sed -i"
else
  SED_I="sed -i ''"
fi

# Find all text files and replace tokens
find "$TARGET_DIR" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.css" \) | while read -r file; do
  $SED_I \
    -e "s/__APP_SLUG__/$APP_SLUG/g" \
    -e "s/__APP_NAME__/$APP_NAME/g" \
    -e "s|__APP_DESCRIPTION__|$APP_DESCRIPTION|g" \
    "$file"
done

success "Tokens replaced."

# ---------------------------------------------------------------------------
# Update package.json name
# ---------------------------------------------------------------------------
PACKAGE_JSON="$TARGET_DIR/package.json"
if [[ -f "$PACKAGE_JSON" ]]; then
  $SED_I "s|\"name\": \"@repo/__APP_SLUG__\"|\"name\": \"@repo/$APP_SLUG\"|g" "$PACKAGE_JSON" 2>/dev/null || true
fi

# ---------------------------------------------------------------------------
# Register the app's Clerk permission in permissions.json
# ---------------------------------------------------------------------------
PERMISSIONS_FILE="$REPO_ROOT/tooling/permissions.json"

if [[ ! -f "$PERMISSIONS_FILE" ]]; then
  echo '{"permissions": []}' > "$PERMISSIONS_FILE"
fi

PERMISSION_KEY="org:$APP_SLUG:access"

# Check if permission already exists (avoid duplicates)
if ! grep -q "\"$PERMISSION_KEY\"" "$PERMISSIONS_FILE" 2>/dev/null; then
  # Use Python for JSON manipulation (available everywhere)
  python3 - <<PYEOF
import json, sys
path = "$PERMISSIONS_FILE"
with open(path) as f:
    data = json.load(f)
if "$PERMISSION_KEY" not in data.get("permissions", []):
    data["permissions"].append("$PERMISSION_KEY")
with open(path, "w") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
PYEOF
  success "Registered permission '$PERMISSION_KEY' in tooling/permissions.json"
else
  info "Permission '$PERMISSION_KEY' already registered."
fi

# ---------------------------------------------------------------------------
# Install dependencies
# ---------------------------------------------------------------------------
info "Installing workspace dependencies ..."
cd "$REPO_ROOT"
pnpm install --silent
success "Dependencies installed."

# ---------------------------------------------------------------------------
# Done!
# ---------------------------------------------------------------------------
echo ""
echo -e "${GREEN}${BOLD}✓ App scaffolded successfully!${RESET}"
echo ""
echo -e "${BOLD}Next steps:${RESET}"
echo ""
echo -e "  1. ${BOLD}Start dev server${RESET}"
echo -e "     ${BLUE}pnpm dev --filter=@repo/$APP_SLUG${RESET}"
echo ""
echo -e "  2. ${BOLD}Add Clerk permission${RESET} (required for auth to work)"
echo -e "     In Clerk Dashboard → Configure → Roles & Permissions:"
echo -e "     ${YELLOW}Add permission: org:$APP_SLUG:access${RESET}"
echo -e "     ${YELLOW}Assign to roles: org:admin (and any others that need access)${RESET}"
echo ""
echo -e "  3. ${BOLD}Register the app${RESET} in the Shell's navigation"
echo -e "     Add a nav entry in apps/ui-sandbox/lib/module-nav.ts (or equivalent in your platform Shell)"
echo ""
echo -e "  4. ${BOLD}Replace placeholder data${RESET}"
echo -e "     Edit apps/$APP_SLUG/src/lib/data.ts with your real data layer"
echo ""
echo -e "See ${BLUE}apps/$APP_SLUG/README.md${RESET} for full development guide."
echo ""
