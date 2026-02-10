import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '../../components/ui/stack'

const meta = {
  title: 'UI/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexbox layout component for stacking elements vertically or horizontally with consistent spacing. Supports configurable direction, gap, alignment, and justification.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['column', 'row'],
      description: 'The flex direction of the stack',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The gap between stack items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'The cross-axis alignment of items',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'The main-axis justification of items',
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const StackItem = ({ children }: { children: React.ReactNode }) => (
  <div className="h-12 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
    {children}
  </div>
)

export const Default: Story = {
  render: () => (
    <Stack>
      <StackItem>1</StackItem>
      <StackItem>2</StackItem>
      <StackItem>3</StackItem>
      <StackItem>4</StackItem>
    </Stack>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row">
      <StackItem>1</StackItem>
      <StackItem>2</StackItem>
      <StackItem>3</StackItem>
      <StackItem>4</StackItem>
    </Stack>
  ),
}

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap} className="space-y-2">
          <p className="text-sm font-medium">
            gap=&quot;{gap}&quot;
          </p>
          <Stack direction="row" gap={gap}>
            <StackItem>1</StackItem>
            <StackItem>2</StackItem>
            <StackItem>3</StackItem>
            <StackItem>4</StackItem>
          </Stack>
        </div>
      ))}
    </div>
  ),
}

export const AlignAndJustify: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium">
          direction=&quot;row&quot; align=&quot;start&quot;
        </p>
        <Stack
          direction="row"
          align="start"
          className="h-32 border border-dashed border-border rounded-lg p-4"
        >
          <div className="h-8 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            1
          </div>
          <div className="h-16 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            2
          </div>
          <div className="h-12 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            3
          </div>
        </Stack>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">
          direction=&quot;row&quot; align=&quot;center&quot;
        </p>
        <Stack
          direction="row"
          align="center"
          className="h-32 border border-dashed border-border rounded-lg p-4"
        >
          <div className="h-8 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            1
          </div>
          <div className="h-16 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            2
          </div>
          <div className="h-12 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            3
          </div>
        </Stack>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">
          direction=&quot;row&quot; align=&quot;end&quot;
        </p>
        <Stack
          direction="row"
          align="end"
          className="h-32 border border-dashed border-border rounded-lg p-4"
        >
          <div className="h-8 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            1
          </div>
          <div className="h-16 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            2
          </div>
          <div className="h-12 w-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
            3
          </div>
        </Stack>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">
          direction=&quot;row&quot; justify=&quot;between&quot;
        </p>
        <Stack
          direction="row"
          justify="between"
          className="border border-dashed border-border rounded-lg p-4"
        >
          <StackItem>1</StackItem>
          <StackItem>2</StackItem>
          <StackItem>3</StackItem>
        </Stack>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">
          direction=&quot;row&quot; justify=&quot;evenly&quot;
        </p>
        <Stack
          direction="row"
          justify="evenly"
          className="border border-dashed border-border rounded-lg p-4"
        >
          <StackItem>1</StackItem>
          <StackItem>2</StackItem>
          <StackItem>3</StackItem>
        </Stack>
      </div>
    </div>
  ),
}
