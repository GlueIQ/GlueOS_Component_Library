import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const textVariants = cva("leading-7", {
  variants: {
    variant: {
      body: "text-base text-foreground",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold text-foreground",
      small: "text-sm text-foreground",
      muted: "text-sm text-muted-foreground",
      caption: "text-xs text-muted-foreground",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "body",
    weight: "normal",
  },
})

type TextElement = "p" | "span" | "div"

type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: TextElement
  }

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant = "body", weight = "normal", as: Comp = "p", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        data-slot="text"
        className={cn(textVariants({ variant, weight, className }))}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants, type TextProps }
