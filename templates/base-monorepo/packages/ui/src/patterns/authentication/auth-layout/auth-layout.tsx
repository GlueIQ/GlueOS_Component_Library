/**
 * AuthLayout Pattern
 *
 * Container for authentication pages with centered card, logo area, and footer.
 * Composed of: Card from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"

interface AuthLayoutProps extends React.ComponentProps<"div"> {
  logo?: React.ReactNode
  footer?: React.ReactNode
}

export function AuthLayout({
  className,
  logo,
  footer,
  children,
  ...props
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10",
        className
      )}
      {...props}
    >
      {logo && (
        <div className="flex w-full max-w-sm items-center justify-center">
          {logo}
        </div>
      )}
      <div className="w-full max-w-sm">{children}</div>
      {footer && (
        <div className="text-balance text-center text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  )
}
