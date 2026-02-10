import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
  },
  defaultVariants: {
    direction: "column",
    gap: "md",
    align: "stretch",
  },
})

type StackProps = React.ComponentProps<"div"> &
  VariantProps<typeof stackVariants>

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "column",
      gap = "md",
      align = "stretch",
      justify,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="stack"
        data-direction={direction}
        data-gap={gap}
        className={cn(
          stackVariants({ direction, gap, align, justify, className })
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

export { Stack, stackVariants, type StackProps }
