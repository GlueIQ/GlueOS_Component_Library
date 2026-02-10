import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "xl",
  },
})

type ContainerProps = React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & {
    padding?: boolean
  }

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", padding = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="container"
        data-size={size}
        className={cn(
          containerVariants({ size }),
          padding && "px-4 md:px-6 lg:px-8",
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container, containerVariants, type ContainerProps }
