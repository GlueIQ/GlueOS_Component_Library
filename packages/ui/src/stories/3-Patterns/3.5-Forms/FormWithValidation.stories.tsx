import type { Meta, StoryObj } from '@storybook/react'
import { FormWithValidation } from '../../../patterns/forms/form-with-validation'

const meta = {
  title: '3-Patterns/3.5-Forms/FormWithValidation',
  component: FormWithValidation,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form pattern demonstrating inline validation, error states, and field descriptions. Composed of Card, Field, Input, Button, and Alert components.',
      },
    },
  },
} satisfies Meta<typeof FormWithValidation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FormWithValidation />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FormWithValidation error="An account with this email already exists." />
    </div>
  ),
}
