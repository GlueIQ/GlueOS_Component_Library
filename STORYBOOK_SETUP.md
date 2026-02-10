# Storybook Setup Guide

This document outlines the Storybook setup for the GlueIQ Design System.

## What Was Done

✅ **Storybook Installation**
- Installed Storybook 10.1.11 for Next.js with Vite
- Configured for Tailwind CSS and dark mode support
- Set up with all necessary addons (Docs, A11y, Vitest)

✅ **Design Tokens**
- Created `lib/design-tokens.ts` with complete token library
- Colors (light and dark mode variants)
- Typography (families, sizes, weights, letter spacing)
- Spacing scale
- Shadows
- Border radius
- Z-index
- Breakpoints
- Transitions

✅ **Design Token Stories**
- `stories/design-tokens/Colors.stories.tsx` - Color palette showcase
- `stories/design-tokens/Typography.stories.tsx` - Font families, sizes, weights, and spacing
- `stories/design-tokens/Spacing.stories.tsx` - Spacing scale, shadows, and border radius

✅ **UI Component Stories**
- `stories/ui/Button.stories.tsx` - All button variants and sizes
- `stories/ui/Badge.stories.tsx` - Badge component variations
- `stories/ui/Card.stories.tsx` - Card layout patterns
- `stories/ui/Input.stories.tsx` - Input types and states
- `stories/ui/Checkbox.stories.tsx` - Checkbox states
- `stories/ui/Tabs.stories.tsx` - Tabbed interface patterns
- `stories/ui/Select.stories.tsx` - Dropdown select patterns
- `stories/ui/Navigation.stories.tsx` - Breadcrumb, avatar components
- `stories/ui/Utilities.stories.tsx` - Separator, skeleton, tooltip components

✅ **Composition Component Stories**
- `stories/composition/Page-Header.stories.tsx` - Page header, breadcrumb, theme toggle
- Ready for sidebar, data table, and other complex components

✅ **Documentation**
- `stories/Introduction.mdx` - Welcome and getting started guide
- `stories/Components-Overview.mdx` - Component reference table
- `stories/Guidelines.mdx` - Design patterns and best practices
- `stories/Contributing.mdx` - How to contribute new components

✅ **Storybook Configuration**
- `.storybook/main.ts` - Main configuration
- `.storybook/preview.ts` - Preview with theme support and dark mode toggle

## Running Storybook

### Start Development Server

```bash
npm run storybook
# or
pnpm storybook
```

This will open Storybook at `http://localhost:6006`

### Build Static Storybook

```bash
npm run build-storybook
# or
pnpm build-storybook
```

This creates a static build in `storybook-static/` for deployment.

## Storybook Features

### 🎨 Design Tokens
- Visual reference for all colors, typography, and spacing
- Light and dark mode documentation
- Token values and CSS variable names

### 📖 Component Library
- Interactive component playground
- All variants and states documented
- Responsive design testing
- Dark mode support

### ♿ Accessibility
- Accessibility addon for WCAG compliance checking
- Keyboard navigation testing
- Focus state visualization

### 📝 Documentation
- MDX pages for guides and patterns
- Component APIs with prop documentation
- Code examples and use cases

### 🧪 Testing
- Vitest integration for component testing
- Play functions for interaction testing
- Visual regression testing support

## Project Structure

```
.storybook/
├── main.ts              # Main Storybook config
└── preview.ts           # Global settings and theme

stories/
├── Introduction.mdx     # Getting started guide
├── Components-Overview.mdx  # Component reference
├── Guidelines.mdx       # Design patterns
├── Contributing.mdx     # Contribution guide
├── design-tokens/       # Token documentation stories
│   ├── Colors.stories.tsx
│   ├── Typography.stories.tsx
│   └── Spacing.stories.tsx
├── ui/                  # UI component stories
│   ├── Button.stories.tsx
│   ├── Badge.stories.tsx
│   ├── Card.stories.tsx
│   ├── Input.stories.tsx
│   ├── Checkbox.stories.tsx
│   ├── Tabs.stories.tsx
│   ├── Select.stories.tsx
│   ├── Navigation.stories.tsx
│   └── Utilities.stories.tsx
└── composition/         # Composition component stories
    └── Page-Header.stories.tsx

components/
├── ui/                  # UI primitives
│   ├── button.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ... (all other UI components)
└── ... (app-specific components)

lib/
├── design-tokens.ts     # Centralized design tokens
└── utils.ts
```

## Adding New Stories

### For UI Components

1. Create story file in `stories/ui/ComponentName.stories.tsx`
2. Import the component from `@/components/ui/component-name`
3. Document all variants and states
4. Add to component library

Example:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Component } from '@/components/ui/component'

const meta = {
  title: 'UI/Component',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Component description',
      },
    },
  },
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { /* default props */ },
}
```

### For Design Tokens

1. Update `lib/design-tokens.ts`
2. Create story in `stories/design-tokens/TokenName.stories.tsx`
3. Document all token values
4. Include usage examples

### For Composition Components

1. Create story in `stories/composition/ComponentName.stories.tsx`
2. Show how component composes multiple UI primitives
3. Document layout patterns and best practices

## Deployment Options

### Deploy to Chromatic

```bash
npx chromatic --project-token=<your-token>
```

### Deploy to Netlify

```bash
# Build static site
npm run build-storybook

# Deploy storybook-static/ folder
```

### Deploy to Vercel

```bash
# Configure vercel.json for Storybook
# Deploy as static site
```

## Customization

### Change Port

Edit `.storybook/main.ts`:

```ts
export default {
  // ... other config
  port: 8080, // Change port here
}
```

### Change Theme Colors

Update `app/globals.css` CSS variables:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    /* ... update other colors */
  }
}
```

### Add Custom Fonts

Update `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=CustomFont:wght@400;600&display=swap');

@layer base {
  body {
    @apply font-['CustomFont'];
  }
}
```

## Next Steps

1. **View Components**: Run `npm run storybook` and browse components
2. **Add More Stories**: Create stories for remaining components
3. **Deploy**: Set up CI/CD to automatically deploy Storybook
4. **Share**: Share Storybook URL with design and development teams
5. **Maintain**: Keep Storybook updated as components evolve
6. **Document**: Add more design patterns and guidelines

## Resources

- [Storybook Official Docs](https://storybook.js.org/docs)
- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://radix-ui.com/)

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 6006
npx fkill-cli 6006

# Or use different port
npm run storybook -- --port 6007
```

### Module Not Found Errors

```bash
# Reinstall dependencies
pnpm install

# Clear Storybook cache
rm -rf node_modules/.cache/storybook-*
```

### Dark Mode Not Working

Ensure `app/globals.css` is imported in `.storybook/preview.ts` and verify Tailwind dark mode is configured.

## Support

For issues or questions:
- Check component story examples
- Review design pattern guidelines
- Refer to Storybook official documentation
- Ask the design system team

---

**Storybook is now ready to use!** 🎉

Start with: `npm run storybook`
