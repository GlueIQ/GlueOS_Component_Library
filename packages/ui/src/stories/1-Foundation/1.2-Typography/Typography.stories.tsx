import type { StoryObj } from '@storybook/react'

export default {
  title: '1-Foundation/1.2-Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Typography system using Geist (sans-serif) and Geist Mono from Google Fonts. Loaded via next/font/google in the app, and via Google Fonts CDN in Storybook.',
      },
    },
  },
}

export const FontFamilies: StoryObj = {
  render: () => (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold mb-8">Font Families</h2>

      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
            Sans — Geist
          </p>
          <p
            className="text-xl"
            style={{ fontFamily: "var(--font-geist-sans, 'Geist', sans-serif)" }}
          >
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
          <p className="text-sm mt-3" style={{ fontFamily: "var(--font-geist-sans, 'Geist', sans-serif)" }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
          </p>
          <code className="text-xs text-muted-foreground mt-2 block">
            font-family: &apos;Geist&apos;, ui-sans-serif, system-ui, sans-serif
          </code>
        </div>

        <div className="border-t pt-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
            Mono — Geist Mono
          </p>
          <p
            className="text-xl"
            style={{ fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)" }}
          >
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
          <p className="text-sm mt-3" style={{ fontFamily: "var(--font-geist-mono, 'Geist Mono', monospace)" }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
          </p>
          <code className="text-xs text-muted-foreground mt-2 block">
            font-family: &apos;Geist Mono&apos;, ui-monospace, SFMono-Regular, monospace
          </code>
        </div>
      </div>
    </div>
  ),
}

export const TypeScale: StoryObj = {
  render: () => {
    const sizes = [
      { cls: 'text-xs', spec: '0.75rem / 12px', lh: '1rem' },
      { cls: 'text-sm', spec: '0.875rem / 14px', lh: '1.25rem' },
      { cls: 'text-base', spec: '1rem / 16px', lh: '1.5rem' },
      { cls: 'text-lg', spec: '1.125rem / 18px', lh: '1.75rem' },
      { cls: 'text-xl', spec: '1.25rem / 20px', lh: '1.75rem' },
      { cls: 'text-2xl', spec: '1.5rem / 24px', lh: '2rem' },
      { cls: 'text-3xl', spec: '1.875rem / 30px', lh: '2.25rem' },
      { cls: 'text-4xl', spec: '2.25rem / 36px', lh: '2.5rem' },
    ]

    return (
      <div className="space-y-6 p-8">
        <h2 className="text-2xl font-bold mb-8">Type Scale</h2>
        <div className="space-y-5">
          {sizes.map((s) => (
            <div key={s.cls} className="flex items-baseline gap-4">
              <div className="w-20 text-xs font-semibold text-muted-foreground shrink-0 text-right">
                {s.cls}
              </div>
              <div className="min-w-0">
                <p className={s.cls}>The quick brown fox jumps over the lazy dog</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {s.spec} &middot; line-height: {s.lh}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const FontWeights: StoryObj = {
  render: () => {
    const weights = [
      { cls: 'font-thin', value: '100' },
      { cls: 'font-extralight', value: '200' },
      { cls: 'font-light', value: '300' },
      { cls: 'font-normal', value: '400' },
      { cls: 'font-medium', value: '500' },
      { cls: 'font-semibold', value: '600' },
      { cls: 'font-bold', value: '700' },
      { cls: 'font-extrabold', value: '800' },
      { cls: 'font-black', value: '900' },
    ]

    return (
      <div className="space-y-4 p-8">
        <h2 className="text-2xl font-bold mb-8">Font Weights</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Geist supports variable weights from 100 to 900.
        </p>
        <div className="space-y-3">
          {weights.map((w) => (
            <div key={w.cls} className="flex items-center gap-4">
              <div className="w-32 text-xs font-semibold text-muted-foreground shrink-0">
                {w.cls}
              </div>
              <p className={`text-lg ${w.cls}`}>
                The quick brown fox ({w.value})
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const LetterSpacing: StoryObj = {
  render: () => {
    const spacings = [
      { cls: 'tracking-tighter', value: '-0.05em' },
      { cls: 'tracking-tight', value: '-0.025em' },
      { cls: 'tracking-normal', value: '0em' },
      { cls: 'tracking-wide', value: '0.025em' },
      { cls: 'tracking-wider', value: '0.05em' },
      { cls: 'tracking-widest', value: '0.1em' },
    ]

    return (
      <div className="space-y-4 p-8">
        <h2 className="text-2xl font-bold mb-8">Letter Spacing</h2>
        <div className="space-y-4">
          {spacings.map((s) => (
            <div key={s.cls} className="flex items-center gap-4">
              <div className="w-36 text-xs font-semibold text-muted-foreground shrink-0">
                {s.cls}
              </div>
              <div className="min-w-0">
                <p className={`text-base ${s.cls}`}>
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-xs text-muted-foreground mt-1">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
