import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { NeutralPalettePicker } from '../../../components/ui/neutral-palette-picker'
import { type NeutralPaletteName } from '../../../lib/colors/palettes'

const NeutralPalettePickerDemo = () => {
  const [selected, setSelected] = useState<NeutralPaletteName>('zinc')

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Neutral Palette Picker</h2>
        <p className="text-muted-foreground">
          Visual selector for choosing the base neutral (gray scale) palette. Used in the Generator Configurator to set
          the foundation for backgrounds, borders, and muted text colors.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Currently selected: <strong className="font-semibold capitalize">{selected}</strong>
        </p>
      </div>

      <NeutralPalettePicker value={selected} onChange={setSelected} />
    </div>
  )
}

const meta = {
  title: '2-Components/Palette Pickers/Neutral Palette Picker',
  component: NeutralPalettePickerDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A visual grid selector for neutral (gray scale) palettes. Shows all 5 neutral palette options (slate, gray, zinc, neutral, stone) with color swatches and descriptions, making it easy to choose the right foundation for your app theme.',
      },
    },
  },
} satisfies Meta<typeof NeutralPalettePickerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
