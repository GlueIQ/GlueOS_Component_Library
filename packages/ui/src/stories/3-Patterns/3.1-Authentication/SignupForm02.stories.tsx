import type { Meta, StoryObj } from '@storybook/react'
import { GalleryVerticalEnd } from 'lucide-react'
import { SignupForm02 } from '../../../patterns/authentication/signup-form-02'

const meta = {
  title: '3-Patterns/3.1-Authentication/SignupForm02',
  component: SignupForm02,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A two-column signup layout with cover image. The form component is designed to sit in a split-screen page layout. Source: shadcn/ui signup-02 (v4).',
      },
    },
  },
} satisfies Meta<typeof SignupForm02>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm02 />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Cover Image
        </div>
      </div>
    </div>
  ),
}

export const FormOnly: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="w-full max-w-xs">
      <SignupForm02 />
    </div>
  ),
}
