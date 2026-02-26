import type { Meta, StoryObj } from '@storybook/react'
import { SettingsPage } from '../../layouts/settings-admin'
import { SettingsForm } from '../../patterns/forms/settings-form'

const meta = {
  title: '4-Layouts/4.3-Settings-Admin/SettingsPage',
  component: SettingsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A settings page with vertical tab navigation and form sections.',
      },
    },
  },
} satisfies Meta<typeof SettingsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sections: [
      { id: 'general', label: 'General', content: <SettingsForm /> },
      { id: 'security', label: 'Security', content: <div className="p-4 text-muted-foreground">Security settings here</div> },
      { id: 'billing', label: 'Billing', content: <div className="p-4 text-muted-foreground">Billing settings here</div> },
      { id: 'notifications', label: 'Notifications', content: <div className="p-4 text-muted-foreground">Notification preferences here</div> },
    ],
  },
}
