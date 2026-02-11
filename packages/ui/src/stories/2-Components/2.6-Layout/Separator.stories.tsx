import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '../../../components/ui/separator'

const meta = {
  title: '2-Components/2.6-Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A visual divider component built on Radix UI Separator primitive. Supports horizontal and vertical orientations to visually separate content sections. Decorative by default.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description:
        'Whether the separator is purely decorative. When true, it is hidden from screen readers.',
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Separator />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Home</div>
      <Separator orientation="vertical" />
      <div>About</div>
      <Separator orientation="vertical" />
      <div>Contact</div>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">GlueOS Design System</h4>
        <p className="text-sm text-muted-foreground">
          An open-source component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Components</h4>
        <p className="text-sm text-muted-foreground">
          Built with Radix UI and Tailwind CSS.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Theming</h4>
        <p className="text-sm text-muted-foreground">
          Fully customizable with CSS variables.
        </p>
      </div>
    </div>
  ),
}
