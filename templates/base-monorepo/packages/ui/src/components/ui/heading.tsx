import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const headingVariants = cva("scroll-m-20 text-foreground", {
  variants: {
    level: {
      1: "text-4xl font-bold tracking-tight lg:text-5xl",
      2: "text-3xl font-semibold tracking-tight",
      3: "text-2xl font-semibold tracking-tight",
      4: "text-xl font-semibold tracking-tight",
      5: "text-lg font-medium",
      6: "text-base font-medium",
    },
  },
  defaultVariants: {
    level: 2,
  },
})

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

const levelToElement: Record<number, HeadingElement> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
}

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingElement
    asChild?: boolean
  }

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, as, asChild = false, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? levelToElement[level ?? 2] ?? "h2"

    return (
      <Comp
        ref={ref}
        data-slot="heading"
        className={cn(headingVariants({ level, className }))}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants, type HeadingProps }
