"use client"

import { ThemeProvider } from "next-themes"
import { ActiveModuleProvider } from "@__SCOPE__/ui/layouts/app-shell"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ActiveModuleProvider>{children}</ActiveModuleProvider>
    </ThemeProvider>
  )
}
