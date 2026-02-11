import type { StoryObj } from '@storybook/react'
import * as React from 'react'

export default {
  title: '1-Foundation/1.3-Spacing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Spacing scale, elevation (shadows), and border radius tokens. Spacing and shadows use Tailwind defaults. Border radius uses a CSS variable (--radius) with derived sm/md/lg values.',
      },
    },
  },
}

export const SpacingScale: StoryObj = {
  render: () => {
    const spaces = [
      { name: '0.5', rem: '0.125rem', px: '2px' },
      { name: '1', rem: '0.25rem', px: '4px' },
      { name: '1.5', rem: '0.375rem', px: '6px' },
      { name: '2', rem: '0.5rem', px: '8px' },
      { name: '3', rem: '0.75rem', px: '12px' },
      { name: '4', rem: '1rem', px: '16px' },
      { name: '5', rem: '1.25rem', px: '20px' },
      { name: '6', rem: '1.5rem', px: '24px' },
      { name: '8', rem: '2rem', px: '32px' },
      { name: '10', rem: '2.5rem', px: '40px' },
      { name: '12', rem: '3rem', px: '48px' },
      { name: '16', rem: '4rem', px: '64px' },
      { name: '20', rem: '5rem', px: '80px' },
      { name: '24', rem: '6rem', px: '96px' },
    ]

    return (
      <div className="space-y-6 p-8">
        <h2 className="text-2xl font-bold mb-2">Spacing Scale</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Standard Tailwind spacing scale (4px base unit).
        </p>
        <div className="space-y-3">
          {spaces.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <div className="w-10 text-xs font-semibold text-muted-foreground text-right shrink-0">
                {s.name}
              </div>
              <div
                className="h-6 rounded-sm bg-primary"
                style={{ width: s.rem }}
              />
              <span className="text-xs text-muted-foreground">
                {s.rem} ({s.px})
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const Shadows: StoryObj = {
  render: () => {
    const shadows = [
      { name: 'shadow-sm', cls: 'shadow-sm' },
      { name: 'shadow', cls: 'shadow' },
      { name: 'shadow-md', cls: 'shadow-md' },
      { name: 'shadow-lg', cls: 'shadow-lg' },
      { name: 'shadow-xl', cls: 'shadow-xl' },
      { name: 'shadow-2xl', cls: 'shadow-2xl' },
      { name: 'shadow-inner', cls: 'shadow-inner' },
      { name: 'shadow-none', cls: 'shadow-none' },
    ]

    return (
      <div className="space-y-6 p-8 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Shadows</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Standard Tailwind elevation scale.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {shadows.map((s) => (
            <div key={s.name} className="space-y-2">
              <div
                className={`h-24 rounded-lg bg-card border border-border ${s.cls}`}
              />
              <p className="text-xs font-semibold">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const BorderRadius: StoryObj = {
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null)
    const [radiusValue, setRadiusValue] = React.useState('')

    React.useEffect(() => {
      if (ref.current) {
        setRadiusValue(
          getComputedStyle(ref.current).getPropertyValue('--radius').trim()
        )
      }
    }, [])

    const radii = [
      {
        name: 'rounded-sm',
        desc: 'calc(var(--radius) - 4px)',
        cls: 'rounded-sm',
      },
      {
        name: 'rounded-md',
        desc: 'calc(var(--radius) - 2px)',
        cls: 'rounded-md',
      },
      { name: 'rounded-lg', desc: 'var(--radius)', cls: 'rounded-lg' },
      { name: 'rounded-xl', desc: '0.75rem', cls: 'rounded-xl' },
      { name: 'rounded-2xl', desc: '1rem', cls: 'rounded-2xl' },
      { name: 'rounded-full', desc: '9999px', cls: 'rounded-full' },
    ]

    return (
      <div className="space-y-6 p-8" ref={ref}>
        <h2 className="text-2xl font-bold mb-2">Border Radius</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The base radius is set via <code className="text-xs bg-muted px-1 py-0.5 rounded">--radius: {radiusValue || '0.625rem'}</code>.
          Tailwind&apos;s rounded-sm, rounded-md, and rounded-lg are derived from this variable.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 bg-primary ${r.cls}`} />
              <p className="text-xs font-semibold">{r.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
