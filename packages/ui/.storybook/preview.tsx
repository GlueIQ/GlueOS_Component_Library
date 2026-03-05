import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { useEffect } from 'react'
import '../src/globals.css'
import { neutralPalettes, type NeutralPaletteName } from '../src/lib/colors/palettes'
import { hexToOklch } from '../src/lib/colors/generate-theme'

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

    // Apply neutral palette (Layer 1)
    const palette = neutralPalettes[theme.neutralPalette as NeutralPaletteName]
    if (palette) {
      Object.entries(palette).forEach(([shade, value]) => {
        root.style.setProperty(`--color-neutral-${shade}`, value)
      })
    }

    root.style.setProperty('--color-brand-primary', hexToOklch(theme.brandPrimary))
    root.style.setProperty('--radius', `${theme.radius}rem`)
    root.style.fontFamily = theme.bodyFont

    return () => {
      if (palette) {
        Object.keys(palette).forEach((shade) => {
          root.style.removeProperty(`--color-neutral-${shade}`)
        })
      }
      root.style.removeProperty('--color-brand-primary')
      root.style.removeProperty('--radius')
      root.style.fontFamily = ''
    }
  }, [selectedTheme])

  return <Story />
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
