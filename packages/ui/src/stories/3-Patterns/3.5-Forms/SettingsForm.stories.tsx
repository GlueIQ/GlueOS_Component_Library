import type { Meta, StoryObj } from '@storybook/react'
import { SettingsForm } from '../../../patterns/forms/settings-form'

const meta = {
  title: '3-Patterns/3.5-Forms/SettingsForm',
  component: SettingsForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A sectioned settings form with profile and notification sections. Composed of Card, Field, Input, Button, Separator, and Switch components.',
      },
    },
  },
} satisfies Meta<typeof SettingsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <SettingsForm />
    </div>
  ),
}
