import type { StoryObj } from '@storybook/react'
import * as React from 'react'

export default {
  title: '1-Foundation/1.4-Shadows & Effects',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shadow elevation and border radius tokens. Shadows use the standard Tailwind scale. Border radius values derive from the --radius CSS variable.',
      },
    },
  },
}

export const Shadows: StoryObj = {
  render: () => {
    const shadows = [
      { name: 'shadow-xs', cls: 'shadow-xs' },
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
      <div className="space-y-6 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Shadows</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Standard Tailwind shadow elevation scale. Each card shows the shadow
            applied to a surface with a border.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {shadows.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-3">
              <div
                className={`w-full h-28 rounded-lg bg-card border border-border ${s.cls}`}
              />
              <div className="text-center">
                <p className="text-xs font-semibold">{s.name}</p>
              </div>
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
      { name: 'rounded-none', desc: '0px', cls: 'rounded-none' },
      { name: 'rounded-sm', desc: 'calc(var(--radius) - 4px)', cls: 'rounded-sm' },
      { name: 'rounded', desc: '0.25rem', cls: 'rounded' },
      { name: 'rounded-md', desc: 'calc(var(--radius) - 2px)', cls: 'rounded-md' },
      { name: 'rounded-lg', desc: 'var(--radius)', cls: 'rounded-lg' },
      { name: 'rounded-xl', desc: '0.75rem', cls: 'rounded-xl' },
      { name: 'rounded-2xl', desc: '1rem', cls: 'rounded-2xl' },
      { name: 'rounded-full', desc: '9999px', cls: 'rounded-full' },
    ]

    return (
      <div className="space-y-6 p-8" ref={ref}>
        <div>
          <h2 className="text-2xl font-bold mb-2">Border Radius</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Base radius is{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              --radius: {radiusValue || '0.625rem'}
            </code>
            . Tailwind&apos;s rounded-sm, rounded-md, and rounded-lg derive from
            this variable.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

export const Combined: StoryObj = {
  name: 'Shadows + Radius Combined',
  render: () => {
    const examples = [
      { shadow: 'shadow-sm', radius: 'rounded-md', label: 'Subtle card' },
      { shadow: 'shadow-md', radius: 'rounded-lg', label: 'Default card' },
      { shadow: 'shadow-lg', radius: 'rounded-xl', label: 'Elevated card' },
      { shadow: 'shadow-xl', radius: 'rounded-2xl', label: 'Modal / dialog' },
      { shadow: 'shadow-2xl', radius: 'rounded-2xl', label: 'Popover / dropdown' },
      { shadow: 'shadow-inner', radius: 'rounded-lg', label: 'Inset panel' },
    ]

    return (
      <div className="space-y-6 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Shadows + Radius Combined</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Common pairings of shadow elevation and border radius used across
            UI components.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {examples.map((e) => (
            <div key={e.label} className="flex flex-col gap-3">
              <div
                className={`h-28 bg-card border border-border ${e.shadow} ${e.radius}`}
              />
              <div>
                <p className="text-xs font-semibold">{e.label}</p>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {e.shadow} + {e.radius}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
