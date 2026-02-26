# Figma MCP Server Setup

**Status:** Server verified running, awaiting session restart
**Date:** February 21, 2026

---

## Connection Details

**Figma MCP Server URL:** `http://127.0.0.1:3845/mcp`
**Figma Design File:** [GlueOS UI Kit](https://www.figma.com/design/0jF7UB2TQ25iAgF0xmmpJs/GlueOS-UI-Kit?node-id=0-1&m=dev)

**Server Status:** ✅ Verified responding with curl

```bash
curl http://127.0.0.1:3845/mcp
# Response: {"jsonrpc":"2.0","error":{"code":-32001,"message":"Invalid sessionId"},"id":null}
```

The "Invalid sessionId" error confirms server is running (error is expected without MCP protocol headers).

---

## Configuration

**Added via CLI:**
```bash
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

**Verification:**
```bash
claude mcp list
```

---

## Next Steps After Session Restart

### 1. Verify Figma Tools Available
Once session restarts, check if Figma MCP tools are loaded:
- `figma_get_file` - Fetch file structure
- `figma_get_styles` - Extract color/text styles
- `figma_get_components` - Get component definitions
- `figma_get_variables` - Extract design tokens/variables

### 2. Extract Design Tokens
**Target areas to extract:**
- Color palette (primary, secondary, accent, neutrals)
- Status colors (info, success, warning, error)
- Typography scales (font families, sizes, weights, line heights)
- Spacing scale (0-96 scale)
- Border radius values
- Shadow definitions

### 3. Validate Against Current Implementation
**Compare extracted tokens with:**
- [packages/ui/src/globals.css](../packages/ui/src/globals.css)
  - Current color system (oklch values)
  - Status color tokens (recently added)
  - Chart colors
  - Sidebar colors

### 4. Document Discrepancies
Create a comparison report showing:
- Tokens that match design
- Tokens that differ from design
- Missing tokens not yet implemented
- Recommended updates

---

## Design System Current State

### Colors (in globals.css)

**Brand Colors (oklch):**
- Primary: `oklch(0.512 0.206 3.964)` light / `oklch(0.762 0.206 3.964)` dark
- Secondary: `var(--color-neutral-100)` light / `var(--color-neutral-800)` dark
- Accent: `var(--color-neutral-100)` light / `var(--color-neutral-800)` dark
- Destructive: `oklch(0.577 0.245 27.325)` light / `oklch(0.704 0.191 22.216)` dark

**Status Colors (recently added):**
- Info: `oklch(0.656 0.150 251.364)` light / `oklch(0.728 0.120 251.364)` dark
- Success: `oklch(0.626 0.175 150.571)` light / `oklch(0.698 0.145 150.571)` dark
- Warning: `oklch(0.725 0.163 82.827)` light / `oklch(0.797 0.133 82.827)` dark
- Error: Uses destructive colors

**Chart Colors (5 colors, rotate):**
- chart-1 through chart-5
- Different values for light/dark modes

**Neutral Palette:**
- 50-950 scale in oklch format
- Currently using neutral (no tint)

### Questions to Answer from Figma

1. **Are brand colors correct?**
   - What are the exact primary/secondary/accent colors in Figma?
   - Do they match our current oklch values?

2. **Are status colors correct?**
   - Does Figma define info/success/warning/error colors?
   - Do they match our recently added status tokens?

3. **What neutral palette should we use?**
   - Is it slate, gray, zinc, neutral, or stone?
   - What tint does the design call for?

4. **Typography scale?**
   - Font families (GlueOS uses what fonts?)
   - Size scale
   - Weight scale
   - Line height scale

5. **Spacing scale?**
   - Does design use Tailwind default (4px base)?
   - Any custom spacing values?

6. **Border radius?**
   - Current: `--radius: 0.625rem` (10px)
   - Does design specify different values?

---

## Expected Figma File Structure

**Based on URL node-id:**
- Root node: 0-1
- Likely contains:
  - Design tokens/styles page
  - Component library pages
  - Color palette definitions
  - Typography system
  - Spacing/layout definitions

---

## Workflow After Token Extraction

1. **Extract tokens from Figma** using MCP tools
2. **Create comparison report** showing current vs Figma values
3. **Review discrepancies** with design team/stakeholder
4. **Update globals.css** with corrected values (if needed)
5. **Regenerate components** in Storybook to verify changes
6. **Update documentation** with official design tokens

---

## Success Criteria

- ✅ All color tokens match Figma design source
- ✅ Typography scales aligned with design
- ✅ Spacing system validated
- ✅ Border radius and other CSS variables verified
- ✅ Documentation updated with official token values
- ✅ Design system is single source of truth

---

**Notes:**
- Figma Desktop must remain running for MCP server to work
- Server runs on port 3845 locally
- No authentication needed for local Figma Desktop connection
- After session restart, tools should be immediately available
