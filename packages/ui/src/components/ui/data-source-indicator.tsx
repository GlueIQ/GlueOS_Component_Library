import * as React from "react"
import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { cn } from "../../lib/utils"

export interface DataSourceField {
  label: string
  value: string | React.ReactNode
}

export interface DataSourceIndicatorProps {
  source: string
  fields?: DataSourceField[]
  status?: {
    label: string
    variant?: "success" | "warning" | "error" | "default"
  }
  icon?: React.ReactNode
  align?: "start" | "center" | "end"
  className?: string
}

const statusVariants = {
  success: "text-status-success",
  warning: "text-status-warning",
  error: "text-status-error",
  default: "text-muted-foreground",
}

const DataSourceIndicator = React.forwardRef<HTMLDivElement, DataSourceIndicatorProps>(
  (
    {
      source,
      fields = [],
      status = { label: "Live Connection", variant: "success" },
      icon,
      align = "end",
      className,
    },
    ref
  ) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            className={cn(
              "cursor-pointer inline-flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground transition-colors",
              className
            )}
          >
            {icon ?? <Info className="h-4 w-4" />}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 text-xs" align={align}>
          <div className="space-y-1">
            <h4 className="font-medium text-foreground">Data Source</h4>
            <div className="flex flex-col gap-1 text-muted-foreground">
              <div className="flex justify-between">
                <span>Source:</span>
                <span className="font-medium text-foreground">{source}</span>
              </div>
              {fields.map((field, index) => (
                <div key={index} className="flex justify-between">
                  <span>{field.label}:</span>
                  <span className="font-medium text-foreground">{field.value}</span>
                </div>
              ))}
              {status && (
                <div className="flex justify-between border-t pt-1 mt-1">
                  <span>Status:</span>
                  <span
                    className={cn(
                      "font-medium",
                      statusVariants[status.variant ?? "success"]
                    )}
                  >
                    {status.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)

DataSourceIndicator.displayName = "DataSourceIndicator"

export { DataSourceIndicator }
