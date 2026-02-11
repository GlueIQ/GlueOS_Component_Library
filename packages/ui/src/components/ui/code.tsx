import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const codeVariants = cva("text-foreground", {
  variants: {
    variant: {
      inline:
        "relative rounded bg-muted px-1 py-0.5 font-mono text-sm font-semibold",
      block:
        "relative rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto",
    },
  },
  defaultVariants: {
    variant: "inline",
  },
})

type CodeProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof codeVariants>

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant = "inline", children, ...props }, ref) => {
    if (variant === "block") {
      return (
        <pre
          ref={ref as React.Ref<HTMLPreElement>}
          data-slot="code"
          className={cn(codeVariants({ variant, className }))}
          {...props}
        >
          <code>{children}</code>
        </pre>
      )
    }

    return (
      <code
        ref={ref as React.Ref<HTMLElement>}
        data-slot="code"
        className={cn(codeVariants({ variant, className }))}
        {...props}
      >
        {children}
      </code>
    )
  }
)
Code.displayName = "Code"

export { Code, codeVariants, type CodeProps }
