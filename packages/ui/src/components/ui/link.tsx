import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const linkVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "text-primary underline-offset-4 hover:underline",
        muted:
          "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
        destructive:
          "text-destructive underline-offset-4 hover:underline",
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants> & {
    asChild?: boolean
  }

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        data-slot="link"
        className={cn(linkVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Link.displayName = "Link"

export { Link, linkVariants, type LinkProps }
