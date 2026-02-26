import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { useEffect } from 'react'
import '../src/globals.css'

// Helper to get saved themes from localStorage
function getSavedThemes() {
  if (typeof window === 'undefined') return {}
  try {
    const saved = localStorage.getItem('glueiq-saved-themes')
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

// Decorator to apply saved theme
const withSavedTheme = (Story: any, context: any) => {
  const selectedTheme = context.globals.savedTheme

  useEffect(() => {
    if (!selectedTheme || selectedTheme === 'none') return

    const themes = getSavedThemes()
    const theme = themes[selectedTheme]
    if (!theme) return

    // Apply theme to root element
    const root = document.documentElement

    // Apply colors (convert hex to HSL)
    root.style.setProperty('--color-brand-primary', hexToHSL(theme.brandPrimary))
    root.style.setProperty('--radius', `${theme.radius}rem`)
    root.style.fontFamily = theme.bodyFont

    return () => {
      // Reset on unmount
      root.style.removeProperty('--color-brand-primary')
      root.style.removeProperty('--radius')
      root.style.fontFamily = ''
    }
  }, [selectedTheme])

  return <Story />
}

// Utility: Convert hex to HSL (same as in Configurator)
function hexToHSL(hex: string): string {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

const preview: Preview = {
  globalTypes: {
    savedTheme: {
      name: 'Saved Theme',
      description: 'Apply a saved theme from the Configurator',
      defaultValue: 'none',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: (() => {
          const themes = getSavedThemes()
          return [
            { value: 'none', title: 'GlueOS - Default' },
            ...Object.entries(themes).map(([key, theme]: [string, any]) => ({
              value: key,
              title: theme.name,
            })),
          ]
        })(),
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    options: {
      storySort: {
        order: [
          '0-Defaults',
          ['Instructions', 'Configurator', 'Brand Palette', 'Typography'],
          '1-Foundation',
          '2-Components',
          '3-Patterns',
          '4-Layouts',
        ],
      },
    },
  },

  decorators: [
    withSavedTheme,
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
