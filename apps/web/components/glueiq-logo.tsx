'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function GlueIQLogo() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === 'system' ? systemTheme : theme
  const logoSrc = currentTheme === 'dark' ? '/glueiq-dark.svg' : '/glueiq-light.svg'

  return (
    <Image
      src={logoSrc}
      alt="GlueIQ"
      width={150}
      height={40}
      className="h-10 w-auto"
    />
  )
}
