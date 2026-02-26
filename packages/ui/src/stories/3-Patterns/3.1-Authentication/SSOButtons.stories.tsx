import type { Meta, StoryObj } from '@storybook/react'
import { SSOButtons } from '../../../patterns/authentication/sso-buttons'

const meta = {
  title: '3-Patterns/3.1-Authentication/SSOButtons',
  component: SSOButtons,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Social/SSO login buttons for Google, Microsoft, and GitHub. Composed of Button components with provider icons.',
      },
    },
  },
} satisfies Meta<typeof SSOButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <SSOButtons />
    </div>
  ),
}
