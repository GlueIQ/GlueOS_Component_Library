// ---------------------------------------------------------------------------
// __APP_NAME__ — Utilities
// ---------------------------------------------------------------------------
// App-specific utilities. For shared utilities (cn, formatDate, etc.),
// use @repo/ui/lib/utils.

/**
 * Format a date string for display.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Truncate a string to a given length with ellipsis.
 */
export function truncate(str: string, length = 60): string {
  return str.length <= length ? str : `${str.slice(0, length)}…`
}
