import type { Meta, StoryObj } from '@storybook/react'
import { ForgotPasswordForm } from '../../../patterns/authentication/forgot-password-form'

const meta = {
  title: '3-Patterns/3.1-Authentication/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A password reset request form. Composed of Card, Field, Input, and Button components.',
      },
    },
  },
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <ForgotPasswordForm />
    </div>
  ),
}
