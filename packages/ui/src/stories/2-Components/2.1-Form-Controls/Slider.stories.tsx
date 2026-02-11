import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '../../../components/ui/slider'

const meta = {
  title: '2-Components/2.1-Form Controls/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A slider input component for selecting a value or range from a continuous or stepped set of values, built on Radix UI Slider primitive.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: 'object',
      description: 'The default value(s) of the slider when uncontrolled',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the slider',
    },
    min: {
      control: 'number',
      description: 'The minimum value of the slider',
    },
    step: {
      control: 'number',
      description: 'The step increment between values',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
}

export const WithSteps: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 10,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
}
