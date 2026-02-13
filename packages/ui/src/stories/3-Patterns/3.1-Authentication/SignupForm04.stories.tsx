import type { Meta, StoryObj } from '@storybook/react'
import { SignupForm04 } from '../../../patterns/authentication/signup-form-04'

const meta = {
  title: '3-Patterns/3.1-Authentication/SignupForm04',
  component: SignupForm04,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A split card signup form with an image panel. The form and image sit side-by-side inside a Card component on a muted background. Source: shadcn/ui signup-04 (v4).',
      },
    },
  },
} satisfies Meta<typeof SignupForm04>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm04 />
      </div>
    </div>
  ),
}

export const FormOnly: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="w-full max-w-sm md:max-w-4xl">
      <SignupForm04 />
    </div>
  ),
}
