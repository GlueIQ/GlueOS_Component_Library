import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from '../../../patterns/authentication/login-form'

const meta = {
  title: '3-Patterns/3.1-Authentication/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A login form pattern composed of Card, Field, Input, and Button components. Source: shadcn/ui login-01 (v4).',
      },
    },
  },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  ),
}
