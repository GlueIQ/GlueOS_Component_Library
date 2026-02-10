import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: "md",
  },
})

type GridProps = React.ComponentProps<"div"> &
  VariantProps<typeof gridVariants>

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="grid"
        data-cols={cols}
        data-gap={gap}
        className={cn(gridVariants({ cols, gap, className }))}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid, gridVariants, type GridProps }
