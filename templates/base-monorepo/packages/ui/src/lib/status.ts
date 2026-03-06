/**
 * Semantic status color tokens for GlueOS.
 *
 * A universal, non-configurable palette applied consistently across all apps,
 * modules, and client deployments. No theming, no overrides — these are fixed.
 *
 * Usage:
 *   Badge:          <Badge variant="outline" className={statusStyles.success}>On Track</Badge>
 *   Dot indicator:  <span className={`size-2 rounded-full ${statusDotStyles.caution}`} />
 *   Icon:           <CheckCircle2 className={statusIconStyles.success} />
 */

/** Badge className values — always pair with <Badge variant="outline"> */
export const statusStyles = {
  /** Not started, inactive, inconclusive, queued, low priority */
  neutral:  "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
  /** In progress, running, active, launched, in design */
  active:   "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  /** Complete, approved, healthy, on track, resolved, significant */
  success:  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  /** Pending review, at risk, expiring, needs attention, flagged, medium priority */
  caution:  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  /** Blocked, failed, rejected, error, expired, high priority */
  critical: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
} as const

/** Dot indicator className values — use on a `size-2 rounded-full` span */
export const statusDotStyles = {
  neutral:  "bg-zinc-400",
  active:   "bg-blue-500",
  success:  "bg-emerald-500",
  caution:  "bg-amber-500",
  critical: "bg-red-500",
} as const

/** Icon className values — use on Lucide or similar SVG icon components */
export const statusIconStyles = {
  neutral:  "text-zinc-400",
  active:   "text-blue-500",
  success:  "text-emerald-500",
  caution:  "text-amber-500",
  critical: "text-red-500",
} as const

export type StatusKey = keyof typeof statusStyles
