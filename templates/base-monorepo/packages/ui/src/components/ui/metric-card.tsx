import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./card"
import { cn } from "../../lib/utils"

export interface MetricCardProps extends React.ComponentProps<typeof Card> {
  title: string
  description?: string
  variant?: "default" | "primary" | "secondary" | "accent"
  children?: React.ReactNode
}

const variantClasses = {
  default: "",
  primary: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
  secondary: "bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20",
  accent: "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20",
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ title, description, variant = "default", className, children, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn(variantClasses[variant], className)} {...props}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    )
  }
)

MetricCard.displayName = "MetricCard"

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  value: string | number
  label: string
  variant?: "primary" | "muted"
}

const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({ icon, value, label, variant = "primary", className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
        {icon && (
          <div
            className={cn(
              "p-2 rounded-lg shrink-0",
              variant === "primary"
                ? "bg-background/50 text-primary"
                : "bg-muted/50 text-muted-foreground"
            )}
          >
            {icon}
          </div>
        )}
        <div>
          <div
            className={cn(
              "font-bold",
              variant === "primary" ? "text-3xl" : "text-xl"
            )}
          >
            {value}
          </div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    )
  }
)

Metric.displayName = "Metric"

export interface MetricGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  columns?: 2 | 3 | 4
}

const MetricGrid = React.forwardRef<HTMLDivElement, MetricGridProps>(
  ({ children, columns = 2, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-4 pt-2 border-t border-border/50",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

MetricGrid.displayName = "MetricGrid"

export interface MetricItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  value: string | number
  label: string
}

const MetricItem = React.forwardRef<HTMLDivElement, MetricItemProps>(
  ({ icon, value, label, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        {icon && <div className="text-muted-foreground shrink-0">{icon}</div>}
        <div>
          <div className="font-semibold">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    )
  }
)

MetricItem.displayName = "MetricItem"

export interface MetricFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  children: React.ReactNode
}

const MetricFooter = React.forwardRef<HTMLDivElement, MetricFooterProps>(
  ({ icon, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 pt-2 border-t border-border/50", className)}
        {...props}
      >
        {icon && <div className="text-muted-foreground shrink-0">{icon}</div>}
        <span className="text-sm text-muted-foreground">{children}</span>
      </div>
    )
  }
)

MetricFooter.displayName = "MetricFooter"

export { MetricCard, Metric, MetricGrid, MetricItem, MetricFooter }
