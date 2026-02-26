import type { Meta, StoryObj } from '@storybook/react'
import { UserSettingsForm } from '../../../patterns/user-management/user-settings-form'

const meta = {
  title: '3-Patterns/3.3-User-Management/UserSettingsForm',
  component: UserSettingsForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A profile settings form with avatar upload, personal info, and timezone selector.',
      },
    },
  },
} satisfies Meta<typeof UserSettingsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <UserSettingsForm />
    </div>
  ),
}
