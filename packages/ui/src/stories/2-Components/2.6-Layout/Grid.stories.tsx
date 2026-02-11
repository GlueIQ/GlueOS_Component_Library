import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../../../components/ui/grid'

const meta = {
  title: '2-Components/2.6-Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A CSS grid layout component with configurable columns and gap sizes. Useful for building card grids, dashboards, and other multi-column layouts.',
      },
    },
  },
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
      description: 'The number of grid columns',
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'The gap between grid items',
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const GridCell = ({ children }: { children: React.ReactNode }) => (
  <div className="h-24 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-medium">
    {children}
  </div>
)

export const Default: Story = {
  render: () => (
    <Grid cols={3} gap="md">
      {Array.from({ length: 6 }, (_, i) => (
        <GridCell key={i}>{i + 1}</GridCell>
      ))}
    </Grid>
  ),
}

export const Columns: Story = {
  render: () => (
    <div className="space-y-8">
      {([1, 2, 3, 4] as const).map((cols) => (
        <div key={cols} className="space-y-2">
          <p className="text-sm font-medium">cols={cols}</p>
          <Grid cols={cols} gap="md">
            {Array.from({ length: cols * 2 }, (_, i) => (
              <GridCell key={i}>{i + 1}</GridCell>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
}

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap} className="space-y-2">
          <p className="text-sm font-medium">
            gap=&quot;{gap}&quot;
          </p>
          <Grid cols={4} gap={gap}>
            {Array.from({ length: 8 }, (_, i) => (
              <GridCell key={i}>{i + 1}</GridCell>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
}

export const Responsive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The Grid component uses fixed column counts. For responsive behavior, combine it with Tailwind breakpoint utilities via the className prop. For example, use `className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"` to override the default cols and create a mobile-first responsive grid.',
      },
    },
  },
  render: () => (
    <Grid
      cols={1}
      gap="md"
      className="sm:grid-cols-2 lg:grid-cols-4"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <GridCell key={i}>{i + 1}</GridCell>
      ))}
    </Grid>
  ),
}
