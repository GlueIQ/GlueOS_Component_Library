"use client"

import { useRef, useCallback } from "react"
import { Upload, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@repo/ui/components/ui/button"
import { Label } from "@repo/ui/components/ui/label"

interface LogoUploadProps {
  label: string
  description: string
  value: string | null
  onChange: (svg: string | null) => void
  id: string
}

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
}

export function LogoUpload({
  label,
  description,
  value,
  onChange,
  id,
}: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      if (file.type !== "image/svg+xml" && !file.name.endsWith(".svg")) {
        toast.error("Invalid file type", {
          description: "Only SVG files are accepted.",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const text = reader.result as string
        const trimmed = text.trim()
        if (!trimmed.startsWith("<svg") && !trimmed.startsWith("<?xml")) {
          toast.error("Invalid SVG", {
            description: "The file does not appear to be a valid SVG.",
          })
          return
        }
        onChange(trimmed)
      }
      reader.readAsText(file)

      // Reset input so the same file can be re-selected
      e.target.value = ""
    },
    [onChange],
  )

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <p className="text-xs text-muted-foreground">{description}</p>

      <input
        ref={inputRef}
        type="file"
        id={id}
        accept=".svg,image/svg+xml"
        onChange={handleFileChange}
        className="sr-only"
      />

      {value ? (
        <div className="relative flex items-center justify-center rounded-lg border border-border bg-muted/30 p-4">
          <img
            src={svgToDataUri(value)}
            alt={label}
            className="max-h-16 max-w-full object-contain"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 size-6"
            onClick={() => onChange(null)}
          >
            <X className="size-3" />
            <span className="sr-only">Remove {label}</span>
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Upload className="size-4" />
          Upload SVG
        </button>
      )}
    </div>
  )
}
