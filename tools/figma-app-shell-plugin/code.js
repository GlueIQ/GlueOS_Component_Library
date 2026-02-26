// =============================================================================
// GlueOS App Shell — Figma Plugin Script
// Generates the web app shell layout as editable Figma frames with autolayout.
// Mirrors the component tree in apps/web with proper layer naming for
// Code Connect mapping.
//
// Usage:
//   1. In Figma: Plugins > Development > Import plugin from manifest...
//   2. Select this folder's manifest.json
//   3. Open your target Figma file
//   4. Run the plugin: Plugins > Development > GlueOS App Shell Generator
// =============================================================================

;(async () => {
  // ==========================================================================
  // COLORS — Light mode, derived from packages/ui/src/globals.css (oklch → sRGB)
  // ==========================================================================
  const C = {
    white:       { r: 1,     g: 1,     b: 1 },
    background:  { r: 1,     g: 1,     b: 1 },     // oklch(1 0 0)
    foreground:  { r: 0.039, g: 0.039, b: 0.039 }, // neutral-950
    sidebar:     { r: 0.98,  g: 0.98,  b: 0.98 },  // neutral-50
    neutral100:  { r: 0.961, g: 0.961, b: 0.961 }, // neutral-100
    neutral200:  { r: 0.898, g: 0.898, b: 0.898 }, // neutral-200 (border)
    neutral400:  { r: 0.639, g: 0.639, b: 0.639 }, // neutral-400
    neutral500:  { r: 0.451, g: 0.451, b: 0.451 }, // neutral-500 (muted-fg)
    neutral700:  { r: 0.251, g: 0.251, b: 0.251 }, // neutral-700
    neutral900:  { r: 0.090, g: 0.090, b: 0.090 }, // neutral-900
    primary:     { r: 0.776, g: 0.157, b: 0.157 }, // brand-primary (oklch 0.512 0.206 3.964)
    primaryFg:   { r: 1,     g: 1,     b: 1 },     // brand-primary-foreground
    transparent: { r: 0, g: 0, b: 0 },
  }

  const RADIUS = 10 // --radius: 0.625rem = 10px

  // ==========================================================================
  // FONT LOADING
  // ==========================================================================
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' })

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  /** Create an autolayout frame */
  function fr(name, dir, opts = {}) {
    const f = figma.createFrame()
    f.name = name
    f.layoutMode = dir // "HORIZONTAL" | "VERTICAL"
    f.primaryAxisSizingMode = opts.mainSize || 'AUTO'   // FIXED | AUTO
    f.counterAxisSizingMode = opts.crossSize || 'AUTO'  // FIXED | AUTO
    if (opts.mainAlign)  f.primaryAxisAlignItems  = opts.mainAlign
    if (opts.crossAlign) f.counterAxisAlignItems  = opts.crossAlign
    f.itemSpacing   = opts.gap   ?? 0
    f.paddingTop    = opts.pt    ?? opts.py ?? opts.p ?? 0
    f.paddingBottom = opts.pb    ?? opts.py ?? opts.p ?? 0
    f.paddingLeft   = opts.pl    ?? opts.px ?? opts.p ?? 0
    f.paddingRight  = opts.pr    ?? opts.px ?? opts.p ?? 0
    f.fills         = opts.fill  ? [{ type: 'SOLID', color: opts.fill }] : []
    if (opts.stroke) {
      f.strokes     = [{ type: 'SOLID', color: opts.stroke }]
      f.strokeWeight = opts.strokeWeight ?? 1
      f.strokeAlign  = 'INSIDE'
    }
    if (opts.radius) f.cornerRadius = opts.radius
    if (opts.clip)   f.clipsContent = true
    if (opts.w && opts.h) f.resize(opts.w, opts.h)
    else if (opts.w) f.resize(opts.w, 100)
    else if (opts.h) f.resize(100, opts.h)
    return f
  }

  /** Create a text node */
  function tx(str, opts = {}) {
    const t = figma.createText()
    t.fontName   = { family: 'Inter', style: opts.style || 'Regular' }
    t.characters = str
    t.fontSize   = opts.size || 14
    if (opts.color) t.fills = [{ type: 'SOLID', color: opts.color }]
    if (opts.lineHeight) t.lineHeight = { value: opts.lineHeight, unit: 'PIXELS' }
    if (opts.letterSpacing) t.letterSpacing = { value: opts.letterSpacing, unit: 'PIXELS' }
    if (opts.case === 'upper') t.textCase = 'UPPER'
    t.textAutoResize = opts.autoResize || 'WIDTH_AND_HEIGHT'
    return t
  }

  /** Icon placeholder — small rounded square */
  function icon(size, color) {
    const r = figma.createRectangle()
    r.name = 'icon'
    r.resize(size, size)
    r.cornerRadius = size <= 16 ? 3 : 4
    r.fills = [{ type: 'SOLID', color: color || C.neutral400 }]
    return r
  }

  /** Circle placeholder (for avatar) */
  function circle(size, color, label) {
    const f = fr(label || 'avatar', 'HORIZONTAL', {
      w: size, h: size, fill: color || C.neutral200,
      crossAlign: 'CENTER', mainAlign: 'CENTER',
    })
    f.cornerRadius = size / 2
    return f
  }

  /** Horizontal or vertical separator line */
  function sep(dir, length, color) {
    const s = figma.createFrame()
    s.name = 'separator'
    s.fills = [{ type: 'SOLID', color: color || C.neutral200 }]
    if (dir === 'h') s.resize(length || 100, 1)
    else             s.resize(1, length || 100)
    return s
  }

  /** Spacer frame (fills remaining space in autolayout) */
  function spacer(name) {
    const s = figma.createFrame()
    s.name = name || 'spacer'
    s.fills = []
    s.resize(1, 1)
    return s
  }

  /** Append child to parent, then configure sizing */
  function add(parent, child, hSizing, vSizing) {
    parent.appendChild(child)
    if (hSizing) child.layoutSizingHorizontal = hSizing // "FIXED" | "FILL" | "HUG"
    if (vSizing) child.layoutSizingVertical   = vSizing
    return child
  }

  // ==========================================================================
  // SIDEBAR MENU ITEM — reusable row: [icon] [label]
  // ==========================================================================
  function menuItem(label, iconColor) {
    const row = fr('SidebarMenuButton', 'HORIZONTAL', {
      gap: 8, px: 8, py: 6, crossAlign: 'CENTER', radius: 6,
    })
    row.appendChild(icon(16, iconColor || C.neutral500))
    row.appendChild(tx(label, { size: 13, color: C.neutral700 }))
    return row
  }

  /** Collapsible menu item (with chevron, shown collapsed) */
  function collapsibleItem(label, iconColor) {
    const row = fr('SidebarMenuButton', 'HORIZONTAL', {
      gap: 8, px: 8, py: 6, crossAlign: 'CENTER', radius: 6,
    })
    row.appendChild(icon(16, iconColor || C.neutral500))
    const lbl = tx(label, { size: 13, color: C.neutral700 })
    row.appendChild(lbl)
    add(row, lbl, 'FILL')
    // chevron
    row.appendChild(icon(12, C.neutral400))
    return row
  }

  /** Section group label */
  function groupLabel(label) {
    return tx(label, {
      size: 11, style: 'Medium', color: C.neutral500,
      case: 'upper', letterSpacing: 0.5,
    })
  }

  // ==========================================================================
  // BUILD: SIDEBAR
  // ==========================================================================
  function buildSidebar() {
    const sidebar = fr('app-sidebar', 'HORIZONTAL', { fill: C.sidebar })

    // -- Sidebar inner content --
    const inner = fr('Sidebar', 'VERTICAL', { w: 280, fill: C.sidebar })

    // HEADER
    const header = fr('SidebarHeader', 'VERTICAL', { px: 12, py: 8 })
    const logoRow = fr('Logo', 'HORIZONTAL', { gap: 8, crossAlign: 'CENTER', py: 4 })
    logoRow.appendChild(icon(24, C.primary))
    logoRow.appendChild(tx('GlueIQ', { size: 16, style: 'Semi Bold', color: C.foreground }))
    add(header, logoRow, 'FILL')
    add(inner, header, 'FILL')

    // CONTENT
    const content = fr('SidebarContent', 'VERTICAL', { gap: 4, py: 4 })

    // -- Getting Started --
    const gs = fr('nav-documents: Getting Started', 'VERTICAL', { px: 8, py: 4, gap: 2 })
    add(gs, groupLabel('Getting Started'), 'FILL')
    const gsMenu = fr('SidebarMenu', 'VERTICAL', { gap: 1 })
    ;['Overview', 'Instructions', 'Configuration'].forEach(name => {
      add(gsMenu, menuItem(name), 'FILL')
    })
    add(gs, gsMenu, 'FILL')
    add(content, gs, 'FILL')

    // -- Tools --
    const tools = fr('nav-documents: Tools', 'VERTICAL', { px: 8, py: 4, gap: 2 })
    add(tools, groupLabel('Tools'), 'FILL')
    const toolsMenu = fr('SidebarMenu', 'VERTICAL', { gap: 1 })
    ;['Generator', 'Storybook', 'Component States', 'Migration Audit', 'Example Site'].forEach(name => {
      add(toolsMenu, menuItem(name), 'FILL')
    })
    add(tools, toolsMenu, 'FILL')
    add(content, tools, 'FILL')

    // -- UI Kit (collapsible) --
    const uiKit = fr('nav-main: UI Kit', 'VERTICAL', { px: 8, py: 4, gap: 2 })
    add(uiKit, groupLabel('UI Kit'), 'FILL')
    const uiMenu = fr('SidebarMenu', 'VERTICAL', { gap: 1 })
    ;['Design Tokens', 'Components', 'Patterns (Blocks)', 'Templates'].forEach(name => {
      add(uiMenu, collapsibleItem(name), 'FILL')
    })
    add(uiKit, uiMenu, 'FILL')
    add(content, uiKit, 'FILL')

    // -- Spacer (pushes secondary nav to bottom, mirrors mt-auto) --
    const sp = spacer('spacer')
    add(content, sp, 'FILL', 'FILL')

    // -- Secondary Nav --
    const secNav = fr('nav-secondary', 'VERTICAL', { px: 8, py: 4, gap: 1 })
    ;['Settings', 'Get Help', 'Search'].forEach(name => {
      add(secNav, menuItem(name, C.neutral400), 'FILL')
    })
    add(content, secNav, 'FILL')

    add(inner, content, 'FILL', 'FILL')

    // FOOTER
    const footer = fr('SidebarFooter', 'VERTICAL', { px: 8, py: 8 })
    const userRow = fr('nav-user', 'HORIZONTAL', {
      gap: 8, px: 8, py: 6, crossAlign: 'CENTER', radius: 6,
    })
    // Avatar
    const avatar = circle(32, C.neutral200, 'Avatar')
    const initials = tx('MK', { size: 12, style: 'Medium', color: C.neutral700 })
    avatar.appendChild(initials)
    userRow.appendChild(avatar)
    // Name / email column
    const nameCol = fr('UserInfo', 'VERTICAL', { gap: 0 })
    nameCol.appendChild(tx('mkujawa', { size: 13, style: 'Medium', color: C.foreground }))
    nameCol.appendChild(tx('matt@glueiq.com', { size: 11, color: C.neutral500 }))
    add(userRow, nameCol, 'FILL')
    // Chevron
    userRow.appendChild(icon(12, C.neutral400))
    add(footer, userRow, 'FILL')
    add(inner, footer, 'FILL')

    // Add inner + right border separator
    add(sidebar, inner, null, 'FILL')
    inner.layoutSizingHorizontal = 'FIXED'
    inner.resize(280, inner.height)

    const borderLine = sep('v', 100, C.neutral200)
    add(sidebar, borderLine, null, 'FILL')

    return sidebar
  }

  // ==========================================================================
  // BUILD: BUTTON
  // ==========================================================================
  function button(label, variant) {
    const isPrimary = variant === 'primary'
    const isDisabled = variant === 'disabled'
    const btn = fr('Button', 'HORIZONTAL', {
      py: 8, px: 16, gap: 8,
      crossAlign: 'CENTER', mainAlign: 'CENTER',
      radius: RADIUS,
      fill: isPrimary ? C.primary : C.white,
      stroke: isPrimary ? null : C.neutral200,
    })
    if (isPrimary) {
      btn.strokes = []
    }
    const color = isPrimary ? C.primaryFg : isDisabled ? C.neutral400 : C.foreground
    btn.appendChild(tx(label, { size: 13, style: 'Medium', color }))
    if (isDisabled) {
      btn.opacity = 0.6
    }
    return btn
  }

  // ==========================================================================
  // BUILD: CARD
  // ==========================================================================
  function card(title, description, buttonLabel, buttonVariant) {
    const c = fr('Card', 'VERTICAL', {
      stroke: C.neutral200, radius: RADIUS, fill: C.white, clip: true,
    })

    // CardHeader
    const header = fr('CardHeader', 'VERTICAL', { p: 24, gap: 8, pb: 0 })
    header.appendChild(icon(32, C.primary))
    header.appendChild(tx(title, { size: 16, style: 'Semi Bold', color: C.foreground }))
    add(c, header, 'FILL')

    // CardContent
    const content = fr('CardContent', 'VERTICAL', { px: 24, py: 12 })
    const desc = tx(description, {
      size: 13, color: C.neutral500, autoResize: 'HEIGHT', lineHeight: 20,
    })
    add(content, desc, 'FILL')
    add(c, content, 'FILL')

    // CardFooter
    const footer = fr('CardFooter', 'VERTICAL', { px: 24, pt: 0, pb: 24 })
    const btn = button(buttonLabel, buttonVariant)
    add(footer, btn, 'FILL')
    add(c, footer, 'FILL')

    return c
  }

  // ==========================================================================
  // BUILD: MAIN AREA (SidebarInset)
  // ==========================================================================
  function buildMainArea() {
    const main = fr('SidebarInset', 'VERTICAL', { fill: C.background })

    // -- HEADER BAR --
    const headerWrap = fr('HeaderWrapper', 'VERTICAL')
    headerWrap.fills = []

    const header = fr('Header', 'HORIZONTAL', {
      h: 64, px: 16, gap: 8, crossAlign: 'CENTER',
    })
    header.fills = []

    // Sidebar trigger
    const trigger = fr('SidebarTrigger', 'HORIZONTAL', {
      w: 32, h: 32, crossAlign: 'CENTER', mainAlign: 'CENTER', radius: 6,
    })
    trigger.fills = []
    trigger.appendChild(icon(16, C.neutral700))
    header.appendChild(trigger)

    // Vertical separator
    header.appendChild(sep('v', 16, C.neutral200))

    // Breadcrumb
    const breadcrumb = fr('page-breadcrumb', 'HORIZONTAL', { gap: 4, crossAlign: 'CENTER' })
    breadcrumb.fills = []
    breadcrumb.appendChild(tx('Overview', { size: 14, color: C.foreground }))
    header.appendChild(breadcrumb)

    // Spacer
    const hSpacer = spacer('spacer')
    add(header, hSpacer, 'FILL')

    // Theme toggle
    const toggle = fr('theme-toggle', 'HORIZONTAL', {
      w: 32, h: 32, crossAlign: 'CENTER', mainAlign: 'CENTER', radius: 6,
    })
    toggle.fills = []
    toggle.appendChild(icon(16, C.neutral700))
    header.appendChild(toggle)

    add(headerWrap, header, 'FILL')
    // Header bottom border
    const hBorder = sep('h', 100, C.neutral200)
    add(headerWrap, hBorder, 'FILL')
    add(main, headerWrap, 'FILL')

    // -- CONTENT AREA --
    const content = fr('Content', 'VERTICAL', { p: 16, pt: 16, gap: 32 })
    content.fills = []

    // Heading section
    const heading = fr('HeadingSection', 'VERTICAL', { gap: 4, pb: 8 })
    heading.fills = []
    heading.appendChild(tx('GlueOS Design System', {
      size: 24, style: 'Semi Bold', color: C.foreground, lineHeight: 32,
    }))
    heading.appendChild(tx('Build branded client projects in minutes', {
      size: 14, color: C.neutral500, lineHeight: 20,
    }))
    add(content, heading, 'FILL')

    // Card grid
    const grid = fr('CardGrid', 'HORIZONTAL', { gap: 24 })
    grid.fills = []

    const c1 = card(
      'Generator',
      'Configure brand colors, palette, and fonts to generate a ready-to-use client monorepo.',
      'Open Generator',
      'primary'
    )
    const c2 = card(
      'Storybook',
      'Browse all UI components with interactive examples and documentation.',
      'View Components',
      'outline'
    )
    const c3 = card(
      'Component Stats',
      '55+ components ready for production use across all client projects.',
      'Coming Soon',
      'disabled'
    )
    add(grid, c1, 'FILL')
    add(grid, c2, 'FILL')
    add(grid, c3, 'FILL')
    add(content, grid, 'FILL')

    // Description section
    const desc = fr('Description', 'VERTICAL', { gap: 16, pt: 8 })
    desc.fills = []

    const p1 = tx(
      'The GlueOS Design System is a comprehensive UI toolkit built for creating consistent, branded client workspaces. It provides a complete set of design tokens, components, patterns, and templates that can be customized per client through the Generator tool. Every project starts from the same foundation, ensuring visual consistency and rapid delivery across all client engagements.',
      { size: 14, color: C.foreground, autoResize: 'HEIGHT', lineHeight: 22 }
    )
    add(desc, p1, 'FILL')

    const p2 = tx(
      'Components are built on top of Radix UI primitives and styled with Tailwind CSS, following an OKLCh-based color system that produces perceptually uniform palettes. The theming layer supports neutral palette selection, brand color injection, and configurable border radius \u2014 all managed through CSS custom properties so themes can be swapped without rebuilding.',
      { size: 14, color: C.foreground, autoResize: 'HEIGHT', lineHeight: 22 }
    )
    add(desc, p2, 'FILL')

    const p3 = tx(
      'Each generated workspace is a Turborepo monorepo with shared UI packages, pre-configured tooling, and a Next.js application shell ready for client-specific development. Browse the sidebar to explore design tokens, individual components, reusable patterns, and full-page templates.',
      { size: 14, color: C.foreground, autoResize: 'HEIGHT', lineHeight: 22 }
    )
    add(desc, p3, 'FILL')

    add(content, desc, 'FILL')
    add(main, content, 'FILL', 'FILL')

    return main
  }

  // ==========================================================================
  // ASSEMBLE ROOT
  // ==========================================================================
  const root = fr('App Shell', 'HORIZONTAL', {
    w: 1440, h: 900, fill: C.background, clip: true,
  })
  root.primaryAxisSizingMode = 'FIXED'
  root.counterAxisSizingMode = 'FIXED'

  const sidebar = buildSidebar()
  add(root, sidebar, null, 'FILL')
  sidebar.layoutSizingHorizontal = 'HUG'

  const mainArea = buildMainArea()
  add(root, mainArea, 'FILL', 'FILL')

  // Place on canvas
  figma.currentPage.appendChild(root)
  figma.viewport.scrollAndZoomIntoView([root])

  figma.closePlugin('GlueOS App Shell created successfully!')
})()
