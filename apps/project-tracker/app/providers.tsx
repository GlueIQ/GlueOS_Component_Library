'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from '@repo/ui/components/ui/sonner'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
