# App-Specific Components

Place components that are specific to this app here.

## Guidelines

- **Use `@repo/ui` first.** Before building a new component, check if `@repo/ui` already provides what you need.
- **Keep components small.** Each component should do one thing well.
- **Prefer server components.** Only add `'use client'` when the component needs browser APIs, event handlers, or React hooks.

## Import pattern

```tsx
// Shared components (prefer these)
import { Button } from '@repo/ui/components/ui/button'
import { StatsGrid } from '@repo/ui/patterns/data-visualization/stats-grid'

// App-specific components (this directory)
import { MyWidget } from '../components/my-widget'
```
