import type { StoryObj } from '@storybook/react'
import { typography } from '../../lib/design-tokens'

export default {
  title: 'Design Tokens/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Typography system including font families, sizes, weights, and letter spacing used in GlueIQ.',
      },
    },
  },
}

export const FontFamilies: StoryObj = {
  render: () => (
    <div className="space-y-6 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Font Families</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 font-semibold mb-2">SANS (Default)</p>
          <p
            className="text-lg"
            style={{ fontFamily: typography.fontFamily.sans }}
          >
            The quick brown fox jumps over the lazy dog. 1234567890
          </p>
          <code className="text-xs text-gray-600 block mt-2">
            {typography.fontFamily.sans}
          </code>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-xs text-gray-500 font-semibold mb-2">MONOSPACE</p>
          <p
            className="text-lg"
            style={{ fontFamily: typography.fontFamily.mono }}
          >
            The quick brown fox jumps over the lazy dog. 1234567890
          </p>
          <code className="text-xs text-gray-600 block mt-2">
            {typography.fontFamily.mono}
          </code>
        </div>
      </div>
    </div>
  ),
}

export const FontSizes: StoryObj = {
  render: () => (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Font Sizes</h2>
      
      <div className="space-y-4">
        {Object.entries(typography.fontSize).map(([name, value]) => (
          <div key={name} className="flex items-baseline gap-4">
            <div className="w-24 text-xs font-semibold text-gray-600">{name}</div>
            <div>
              <p
                style={{
                  fontSize: value.size,
                  lineHeight: value.lineHeight,
                }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {value.size} / {value.lineHeight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const FontWeights: StoryObj = {
  render: () => (
    <div className="space-y-6 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Font Weights</h2>
      
      <div className="space-y-3">
        {Object.entries(typography.fontWeight).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-24 text-xs font-semibold text-gray-600">{name}</div>
            <p
              className="text-base"
              style={{ fontWeight: value }}
            >
              The quick brown fox jumps over the lazy dog (Weight: {value})
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const LetterSpacing: StoryObj = {
  render: () => (
    <div className="space-y-6 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Letter Spacing</h2>
      
      <div className="space-y-4">
        {Object.entries(typography.letterSpacing).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-32 text-xs font-semibold text-gray-600">{name}</div>
            <div className="flex-1">
              <p
                className="text-base"
                style={{ letterSpacing: value }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-xs text-gray-500 mt-1">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}
