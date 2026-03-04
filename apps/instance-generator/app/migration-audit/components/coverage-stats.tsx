"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"

interface TierCounts {
  T1: number
  T2: number
  T3: number
  total: number
}

export function CoverageStats({ counts }: { counts: TierCounts }) {
  const stats = [
    {
      label: "Total Components",
      value: counts.total,
      description: "Across all categories",
      color: "text-foreground",
    },
    {
      label: "T1 — Direct Match",
      value: counts.T1,
      description: "Already in @repo/ui",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "T2 — UI Kit Gap",
      value: counts.T2,
      description: "Need to build in UI Kit",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "T3 — App-Specific",
      value: counts.T3,
      description: "Stays in app code",
      color: "text-zinc-500 dark:text-zinc-400",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
