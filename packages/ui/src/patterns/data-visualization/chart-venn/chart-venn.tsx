"use client"

/**
 * ChartVenn Pattern
 *
 * A visual Venn diagram showing overlap between 2 or 3 sets.
 * Useful for showing keyword overlap, audience overlap, feature comparisons, etc.
 *
 * Composed of: Card from our component library + custom SVG circles
 * Normalized: 2026-02 — relative imports, semantic tokens
 */

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { cn } from "../../../lib/utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VennSet {
  /** Set identifier (A, B, C) */
  id: string
  /** Display label for the set */
  label: string
  /** Count of items unique to this set */
  uniqueCount: number
  /** Color for this set */
  color?: string
  /** Highlight this set (bold text, emphasized color) */
  highlight?: boolean
}

export interface VennOverlap {
  /** Set IDs that overlap (e.g., ["A", "B"] or ["A", "B", "C"]) */
  sets: string[]
  /** Count of overlapping items */
  count: number
}

export interface ChartVennProps {
  /** Set data (2 or 3 sets supported) */
  sets: VennSet[]
  /** Overlap data */
  overlaps: VennOverlap[]
  /** Card title */
  title?: string
  /** Card description */
  description?: string
  /** Show insight banner */
  showInsight?: boolean
  /** Custom insight message */
  insightMessage?: string
  /** Container className */
  className?: string
}

// ---------------------------------------------------------------------------
// Default Colors
// ---------------------------------------------------------------------------

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartVenn({
  sets,
  overlaps,
  title,
  description,
  showInsight = false,
  insightMessage,
  className,
}: ChartVennProps) {
  // Assign colors if not provided
  const setsWithColors = sets.map((set, idx) => ({
    ...set,
    color: set.color || defaultColors[idx] || defaultColors[0],
  }))

  // Calculate total for sizing
  const total = sets.reduce((sum, set) => sum + set.uniqueCount, 0) +
    overlaps.reduce((sum, overlap) => sum + overlap.count, 0)

  // Get overlap count for specific set combination
  const getOverlapCount = (setIds: string[]) => {
    const overlap = overlaps.find(
      (o) =>
        o.sets.length === setIds.length &&
        setIds.every((id) => o.sets.includes(id))
    )
    return overlap?.count || 0
  }

  // Two-set Venn diagram
  if (sets.length === 2) {
    const [setA, setB] = setsWithColors
    const shared = getOverlapCount([setA.id, setB.id])

    const sizeA = total > 0 ? (setA.uniqueCount / total) * 100 : 50
    const sizeB = total > 0 ? (setB.uniqueCount / total) * 100 : 50
    const sizeShared = total > 0 ? (shared / total) * 100 : 0

    return (
      <Card className={className}>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-6">
            {/* Visual Venn */}
            <div className="flex items-center justify-center gap-0">
              {/* Set A Circle */}
              <div
                className={cn(
                  "relative flex items-center justify-center rounded-full border-4",
                  setA.highlight && "ring-2 ring-offset-2"
                )}
                style={{
                  width: Math.max(100, sizeA * 2),
                  height: Math.max(100, sizeA * 2),
                  marginRight: -40,
                  borderColor: setA.color,
                  backgroundColor: `${setA.color}15`,
                  ringColor: setA.highlight ? setA.color : undefined,
                }}
              >
                <div className="text-center z-10">
                  <p
                    className={cn("text-2xl font-bold", setA.highlight && "text-primary")}
                    style={{ color: setA.highlight ? setA.color : undefined }}
                  >
                    {setA.uniqueCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Unique</p>
                </div>
              </div>

              {/* Shared (Center) */}
              {shared > 0 && (
                <div
                  className="relative flex items-center justify-center rounded-full bg-gradient-to-r border-2 border-dashed border-muted-foreground/30 z-20"
                  style={{
                    width: Math.max(80, sizeShared * 1.5),
                    height: Math.max(80, sizeShared * 1.5),
                    background: `linear-gradient(to right, ${setA.color}20, ${setB.color}20)`,
                  }}
                >
                  <div className="text-center">
                    <p className="text-xl font-bold">{shared.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Shared</p>
                  </div>
                </div>
              )}

              {/* Set B Circle */}
              <div
                className="relative flex items-center justify-center rounded-full border-4"
                style={{
                  width: Math.max(100, sizeB * 2),
                  height: Math.max(100, sizeB * 2),
                  marginLeft: shared > 0 ? -40 : 0,
                  borderColor: setB.color,
                  backgroundColor: `${setB.color}15`,
                }}
              >
                <div className="text-center z-10">
                  <p className="text-2xl font-bold" style={{ color: setB.color }}>
                    {setB.uniqueCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Unique</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 text-sm flex-wrap">
              {setsWithColors.map((set) => (
                <div key={set.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: set.color }}
                  />
                  <span className={cn(set.highlight && "font-medium")}>
                    {set.label}
                    {set.highlight && " ★"}
                  </span>
                </div>
              ))}
            </div>

            {/* Insight */}
            {showInsight && insightMessage && (
              <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-center">
                <p className="text-sm">{insightMessage}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Three-set Venn diagram (simplified triangular layout)
  if (sets.length === 3) {
    const [setA, setB, setC] = setsWithColors
    const sharedAB = getOverlapCount([setA.id, setB.id])
    const sharedBC = getOverlapCount([setB.id, setC.id])
    const sharedAC = getOverlapCount([setA.id, setC.id])
    const sharedABC = getOverlapCount([setA.id, setB.id, setC.id])

    return (
      <Card className={className}>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-6">
            {/* Simplified 3-set representation */}
            <div className="grid grid-cols-3 gap-4">
              {setsWithColors.map((set) => (
                <div
                  key={set.id}
                  className="flex flex-col items-center p-4 rounded-lg border-2"
                  style={{
                    borderColor: set.color,
                    backgroundColor: `${set.color}10`,
                  }}
                >
                  <p
                    className="text-3xl font-bold"
                    style={{ color: set.color }}
                  >
                    {set.uniqueCount.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium mt-1">{set.label}</p>
                  <p className="text-xs text-muted-foreground">Unique</p>
                </div>
              ))}
            </div>

            {/* Overlaps */}
            <div className="grid grid-cols-2 gap-3">
              {sharedAB > 0 && (
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="text-lg font-bold">{sharedAB.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {setA.label} ∩ {setB.label}
                  </p>
                </div>
              )}
              {sharedBC > 0 && (
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="text-lg font-bold">{sharedBC.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {setB.label} ∩ {setC.label}
                  </p>
                </div>
              )}
              {sharedAC > 0 && (
                <div className="p-3 rounded-lg border bg-muted/30 text-center">
                  <p className="text-lg font-bold">{sharedAC.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {setA.label} ∩ {setC.label}
                  </p>
                </div>
              )}
              {sharedABC > 0 && (
                <div className="p-3 rounded-lg border bg-primary/10 border-primary/30 text-center">
                  <p className="text-lg font-bold">{sharedABC.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">All 3 Sets</p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              {setsWithColors.map((set) => (
                <div key={set.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: set.color }}
                  />
                  <span>{set.label}</span>
                </div>
              ))}
            </div>

            {/* Insight */}
            {showInsight && insightMessage && (
              <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-center">
                <p className="text-sm">{insightMessage}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground text-center">
          Venn diagrams support 2 or 3 sets. You provided {sets.length}.
        </p>
      </CardContent>
    </Card>
  )
}
