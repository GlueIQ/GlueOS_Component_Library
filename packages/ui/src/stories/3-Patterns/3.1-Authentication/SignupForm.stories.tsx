import type { Meta, StoryObj } from '@storybook/react'
import { SignupForm } from '../../../patterns/authentication/signup-form'

const meta = {
  title: '3-Patterns/3.1-Authentication/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A signup form pattern composed of Card, Field, Input, and Button components. Source: shadcn/ui signup-01 (v4).',
      },
    },
  },
} satisfies Meta<typeof SignupForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <SignupForm />
    </div>
  ),
}
