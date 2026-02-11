import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '../../../components/ui/progress'

const meta = {
  title: '2-Components/2.4-Feedback & Status/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A progress bar component built on Radix UI Progress primitive. Displays a visual indicator of completion with smooth transitions. Accepts a value from 0 to 100.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The current progress value (0-100)',
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Progress value={50} className="w-[300px]" />,
}

export const Empty: Story = {
  render: () => <Progress value={0} className="w-[300px]" />,
}

export const Full: Story = {
  render: () => <Progress value={100} className="w-[300px]" />,
}

export const Various: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">25%</span>
        <Progress value={25} />
      </div>
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">50%</span>
        <Progress value={50} />
      </div>
      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">75%</span>
        <Progress value={75} />
      </div>
    </div>
  ),
}
