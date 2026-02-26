import type { Meta, StoryObj } from '@storybook/react'
import { AuthLayout } from '../../../patterns/authentication/auth-layout'
import { LoginForm } from '../../../patterns/authentication/login-form'
import { SSOButtons } from '../../../patterns/authentication/sso-buttons'
import { Separator } from '../../../components/ui/separator'

const meta = {
  title: '3-Patterns/3.1-Authentication/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A container layout for authentication pages with centered content, logo area, and footer links.',
      },
    },
  },
} satisfies Meta<typeof AuthLayout>

export default meta
type Story = StoryObj<typeof meta>

export const WithLoginForm: Story = {
  render: () => (
    <AuthLayout
      logo={<span className="text-xl font-bold">GlueOS</span>}
      footer={
        <>
          By continuing, you agree to our{' '}
          <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
        </>
      }
    >
      <LoginForm />
      <div className="my-4 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground uppercase">Or</span>
        <Separator className="flex-1" />
      </div>
      <SSOButtons />
    </AuthLayout>
  ),
}
