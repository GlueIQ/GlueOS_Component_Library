'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

// @repo/auth: GlueAuthProvider is in the root layout (server component compatible)
// Additional client providers go here.

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
