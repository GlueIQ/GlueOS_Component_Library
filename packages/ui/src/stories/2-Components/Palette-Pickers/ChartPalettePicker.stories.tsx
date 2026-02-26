import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChartPalettePicker } from '../../../components/ui/chart-palette-picker'
import { type ChromaticPaletteName } from '../../../lib/colors/chart-palettes'

const ChartPalettePickerDemo = () => {
  const [selected, setSelected] = useState<ChromaticPaletteName>('blue')

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Chart Palette Picker</h2>
        <p className="text-muted-foreground">
          Visual selector for choosing chart color palettes. Used in the Generator Configurator and available as a
          standalone component.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Currently selected: <strong className="font-semibold capitalize">{selected}</strong>
        </p>
      </div>

      <ChartPalettePicker value={selected} onChange={setSelected} />
    </div>
  )
}

const meta = {
  title: '2-Components/Palette Pickers/Chart Palette Picker',
  component: ChartPalettePickerDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A visual grid selector for chart color palettes. Shows all 17 chromatic palette options with color swatches, making it easy to preview and select the right palette for data visualizations.',
      },
    },
  },
} satisfies Meta<typeof ChartPalettePickerDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
