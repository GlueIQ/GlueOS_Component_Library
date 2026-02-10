"use client"

import { useCallback } from "react"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"

interface ColorInputProps {
  label: string
  value: string
  onChange: (hex: string) => void
  id: string
}

const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/

export function ColorInput({ label, value, onChange, id }: ColorInputProps) {
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      // Allow typing — only propagate valid hex
      if (HEX_REGEX.test(raw)) {
        onChange(raw)
      } else if (raw === "" || raw === "#") {
        onChange("")
      }
    },
    [onChange]
  )

  const handlePickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value.toUpperCase())
    },
    [onChange]
  )

  const displayValue = value || ""

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          id={`${id}-picker`}
          value={value || "#000000"}
          onChange={handlePickerChange}
          className="h-9 w-9 shrink-0 cursor-pointer rounded-md border border-input p-0.5"
          aria-label={`${label} color picker`}
        />
        <Input
          id={id}
          value={displayValue}
          onChange={handleTextChange}
          placeholder="#000000"
          className="font-mono uppercase"
          maxLength={7}
        />
      </div>
    </div>
  )
}
