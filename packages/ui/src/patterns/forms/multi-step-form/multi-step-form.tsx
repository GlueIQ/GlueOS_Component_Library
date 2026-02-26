/**
 * MultiStepForm Pattern
 *
 * A wizard-style form with step indicator and navigation.
 * Composed of: Card, Button, Field, Input, Progress from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

interface Step {
  title: string
  description?: string
  content: React.ReactNode
}

interface MultiStepFormProps extends React.ComponentProps<"div"> {
  steps: Step[]
  onComplete?: () => void
  submitLabel?: string
}

export function MultiStepForm({
  steps,
  onComplete,
  submitLabel = "Submit",
  className,
  ...props
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Step indicator */}
      <nav aria-label="Progress">
        <ol className="flex items-center gap-2">
          {steps.map((step, index) => (
            <li key={step.title} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                  index < currentStep &&
                    "border-primary bg-primary text-primary-foreground",
                  index === currentStep &&
                    "border-primary text-primary",
                  index > currentStep &&
                    "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px w-8 sm:w-12",
                    index < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep]!.title}</CardTitle>
          {steps[currentStep]!.description && (
            <CardDescription>{steps[currentStep]!.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>{steps[currentStep]!.content}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={isFirst}
          >
            Previous
          </Button>
          {isLast ? (
            <Button onClick={onComplete}>{submitLabel}</Button>
          ) : (
            <Button onClick={() => setCurrentStep((s) => s + 1)}>
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
