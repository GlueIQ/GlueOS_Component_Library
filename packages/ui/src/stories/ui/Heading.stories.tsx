import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '../../components/ui/heading'

const meta = {
  title: 'UI/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A semantic heading component supporting levels h1 through h6 with an optional `as` prop to decouple visual size from the rendered HTML element.',
      },
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'The visual heading level (h1-h6)',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Override the rendered HTML element',
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    level: 2,
    children: 'Default Heading',
  },
}

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">level=1 (h1)</span>
        <Heading level={1}>Heading Level 1</Heading>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">level=2 (h2)</span>
        <Heading level={2}>Heading Level 2</Heading>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">level=3 (h3)</span>
        <Heading level={3}>Heading Level 3</Heading>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">level=4 (h4)</span>
        <Heading level={4}>Heading Level 4</Heading>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">level=5 (h5)</span>
        <Heading level={5}>Heading Level 5</Heading>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">level=6 (h6)</span>
        <Heading level={6}>Heading Level 6</Heading>
      </div>
    </div>
  ),
}

export const WithCustomElement: Story = {
  render: () => (
    <Heading level={1} as="h3">
      Visually h1, semantically h3
    </Heading>
  ),
}
