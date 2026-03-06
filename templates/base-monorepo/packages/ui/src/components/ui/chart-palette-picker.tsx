'use client'

import {
  chromaticPalettes,
  CHART_PALETTE_NAMES,
  type ChromaticPaletteName,
} from '../../lib/colors/chart-palettes'
import { cn } from '../../lib/utils'

interface ChartPalettePickerProps {
  value: ChromaticPaletteName
  onChange: (name: ChromaticPaletteName) => void
  className?: string
}

const SWATCH_SHADES = ['300', '400', '500', '600', '700'] as const

export function ChartPalettePicker({ value, onChange, className }: ChartPalettePickerProps) {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-3 lg:grid-cols-4', className)}>
      {CHART_PALETTE_NAMES.map((name) => {
        const palette = chromaticPalettes[name]
        const isSelected = value === name

        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            className={cn(
              'flex flex-col gap-2 rounded-xl border p-3 text-left transition-all hover:shadow-sm',
              isSelected
                ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                : 'border-border hover:border-primary/40'
            )}
          >
            <p className="text-xs font-semibold capitalize">{name}</p>
            <div className="flex gap-1">
              {SWATCH_SHADES.map((shade) => (
                <div
                  key={shade}
                  className="h-5 w-5 rounded-full border border-border/50"
                  style={{ backgroundColor: palette[shade] }}
                />
              ))}
            </div>
          </button>
        )
      })}
    </div>
  )
}
