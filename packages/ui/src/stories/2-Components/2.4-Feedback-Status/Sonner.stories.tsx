import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from '../../../components/ui/sonner'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { ThemeProvider } from 'next-themes'

const meta = {
  title: '2-Components/2.4-Feedback & Status/Sonner',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toast notification component powered by Sonner. Supports success, error, warning, and info variants with optional actions and descriptions.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Story />
        <Toaster />
      </ThemeProvider>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast('Event has been created')}
    >
      Show Toast
    </Button>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast.success('Event has been created successfully')}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error('Something went wrong')}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning('Please review your input')}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info('New update available')}
      >
        Info
      </Button>
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo clicked'),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          description: 'Monday, January 3rd at 6:00 PM',
        })
      }
    >
      Show Toast with Description
    </Button>
  ),
}
