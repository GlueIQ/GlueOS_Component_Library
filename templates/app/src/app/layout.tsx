import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GlueAuthProvider } from '@repo/auth'
import { Providers } from './providers'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '__APP_NAME__',
  description: '__APP_DESCRIPTION__',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlueAuthProvider>
          <Providers>{children}</Providers>
        </GlueAuthProvider>
      </body>
    </html>
  )
}
