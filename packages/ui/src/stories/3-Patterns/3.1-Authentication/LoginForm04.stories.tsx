import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm04 } from '../../../patterns/authentication/login-form-04'

const meta = {
  title: '3-Patterns/3.1-Authentication/LoginForm04',
  component: LoginForm04,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A split card login form with an image panel. The form and image sit side-by-side inside a Card component on a muted background. Source: shadcn/ui login-04 (v4).',
      },
    },
  },
} satisfies Meta<typeof LoginForm04>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm04 />
      </div>
    </div>
  ),
}

export const FormOnly: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="w-full max-w-sm md:max-w-4xl">
      <LoginForm04 />
    </div>
  ),
}
