import type { StoryObj } from '@storybook/react'
import { colors } from '../../lib/design-tokens'

export default {
  title: 'Design Tokens/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The complete color palette for the GlueIQ design system. Colors are defined with light and dark mode variants.',
      },
    },
  },
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-20 h-20 rounded-lg border border-gray-300 shadow-md"
        style={{ backgroundColor: value }}
        title={value}
      />
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{value}</p>
      </div>
    </div>
  )
}

function ColorGrid({ colors: colorObj, title }: { colors: Record<string, string>; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(colorObj).map(([name, value]) => (
          <ColorSwatch key={name} name={name} value={value as string} />
        ))}
      </div>
    </div>
  )
}

export const LightModeColors: StoryObj = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dark, ...lightColors } = colors
    return (
      <div className="space-y-12 p-8 bg-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Light Mode Colors</h2>
          <ColorGrid colors={lightColors} title="Semantic Colors" />
        </div>
      </div>
    )
  },
}

export const DarkModeColors: StoryObj = {
  render: () => (
    <div className="dark">
      <div className="space-y-12 p-8 bg-slate-950">
        <div>
          <h2 className="text-2xl font-bold text-slate-50 mb-8">Dark Mode Colors</h2>
          <ColorGrid colors={colors.dark} title="Semantic Colors" />
        </div>
      </div>
    </div>
  ),
}

export const ColorPalette: StoryObj = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dark, ...lightColors } = colors
    return (
      <div className="space-y-12 p-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete Color Reference</h2>
          <div className="space-y-12">
            <ColorGrid colors={lightColors} title="Light Mode" />
            <div className="dark p-8 rounded-lg bg-slate-950">
              <ColorGrid colors={colors.dark} title="Dark Mode" />
            </div>
          </div>
        </div>
      </div>
    )
  },
}
