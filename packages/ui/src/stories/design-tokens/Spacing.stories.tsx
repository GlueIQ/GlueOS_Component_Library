import type { StoryObj } from '@storybook/react'
import { spacing, shadows, borderRadius } from '../../lib/design-tokens'

export default {
  title: 'Design Tokens/Spacing & Layout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Spacing, shadow, and border radius scales used throughout the design system.',
      },
    },
  },
}

export const SpacingScale: StoryObj = {
  render: () => (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Spacing Scale</h2>
      
      <div className="space-y-4">
        {Object.entries(spacing).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-16 text-xs font-semibold text-gray-600">{name}</div>
            <div className="flex items-center gap-2">
              <div
                className="bg-blue-500"
                style={{ width: value, height: '2rem' }}
              />
              <span className="text-sm text-gray-600">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Shadows: StoryObj = {
  render: () => (
    <div className="space-y-8 p-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Shadows</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(shadows).map(([name, value]) => (
          <div key={name} className="space-y-2">
            <div
              className="h-32 rounded-lg bg-white"
              style={{ boxShadow: value }}
            />
            <p className="text-sm font-semibold text-gray-900">{name}</p>
            <code className="text-xs text-gray-600 break-all">{value}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const BorderRadius: StoryObj = {
  render: () => (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Border Radius</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(borderRadius).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 bg-blue-500"
              style={{ borderRadius: value }}
            />
            <p className="text-xs font-semibold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{value}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}
