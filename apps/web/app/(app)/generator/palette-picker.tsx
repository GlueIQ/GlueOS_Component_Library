"use client"

import {
  neutralPalettes,
  paletteDescriptions,
  type NeutralPaletteName,
} from "@repo/ui/lib/colors/palettes"
import { cn } from "@repo/ui/lib/utils"

interface PalettePickerProps {
  value: NeutralPaletteName
  onChange: (name: NeutralPaletteName) => void
}

const PALETTE_NAMES: NeutralPaletteName[] = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
]

const SWATCH_SHADES = ["100", "300", "500", "700", "900"] as const

export function PalettePicker({ value, onChange }: PalettePickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {PALETTE_NAMES.map((name) => {
        const palette = neutralPalettes[name]
        const description = paletteDescriptions[name]
        const isSelected = value === name

        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            className={cn(
              "flex flex-col gap-3 rounded-xl border p-4 text-left transition-all hover:shadow-sm",
              isSelected
                ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                : "border-border hover:border-primary/40"
            )}
          >
            <div>
              <p className="text-sm font-semibold capitalize">{name}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <div className="flex gap-1.5">
              {SWATCH_SHADES.map((shade) => (
                <div
                  key={shade}
                  className="h-6 w-6 rounded-full border border-border/50"
                  style={{ backgroundColor: palette[shade] }}
                  title={`${name}-${shade}`}
                />
              ))}
            </div>
          </button>
        )
      })}
    </div>
  )
}
