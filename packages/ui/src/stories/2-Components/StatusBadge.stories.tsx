import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge, type StatusVariant } from '../../components/ui/status-badge'

const meta = {
  title: '2-Components/Status Badge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A workflow status indicator badge with pre-configured color schemes for common states (draft, pending, in progress, approved, complete, error, etc.). Supports custom status configurations and optional animated states.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: [
        'draft',
        'pending',
        'in_progress',
        'in_review',
        'approved',
        'active',
        'complete',
        'error',
        'warning',
        'archived',
      ] as StatusVariant[],
      description: 'The workflow status to display',
    },
    showDot: {
      control: 'boolean',
      description: 'Show a status indicator dot before the label',
    },
  },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: 'in_progress',
  },
}

export const AllStatuses: Story = {
  args: { status: 'in_progress' },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="draft" />
      <StatusBadge status="pending" />
      <StatusBadge status="in_progress" />
      <StatusBadge status="in_review" />
      <StatusBadge status="approved" />
      <StatusBadge status="active" />
      <StatusBadge status="complete" />
      <StatusBadge status="error" />
      <StatusBadge status="warning" />
      <StatusBadge status="archived" />
    </div>
  ),
}

export const WithDots: Story = {
  args: { status: 'draft' },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="draft" showDot />
      <StatusBadge status="in_progress" showDot />
      <StatusBadge status="in_review" showDot />
      <StatusBadge status="approved" showDot />
      <StatusBadge status="complete" showDot />
      <StatusBadge status="error" showDot />
    </div>
  ),
}

export const CustomConfiguration: Story = {
  args: { status: 'collecting' },
  render: () => {
    const customConfig = {
      collecting: {
        label: 'Collecting',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 border-0',
        animate: true,
      },
      analyzing: {
        label: 'Analyzing',
        className: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 border-0',
        animate: true,
      },
      analyzed: {
        label: 'Analyzed',
        className: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300 border-0',
      },
    }

    return (
      <div className="flex flex-wrap gap-3">
        <StatusBadge status="collecting" customConfig={customConfig} />
        <StatusBadge status="analyzing" customConfig={customConfig} />
        <StatusBadge status="analyzed" customConfig={customConfig} />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom status configurations allow you to define your own workflow states with custom labels, colors, and animations.',
      },
    },
  },
}

export const CustomLabels: Story = {
  args: { status: 'draft' },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="draft">📝 Draft</StatusBadge>
      <StatusBadge status="in_review">👀 Under Review</StatusBadge>
      <StatusBadge status="approved">✓ Approved</StatusBadge>
      <StatusBadge status="complete">🎉 Done</StatusBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Override the default label by passing children to the component.',
      },
    },
  },
}

export const BriefWorkflow: Story = {
  args: { status: 'draft' },
  render: () => {
    const briefConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-0' },
      in_review: { label: 'In Review', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-0' },
      revision_requested: { label: 'Revision Requested', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-0' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0' },
      active: { label: 'Active', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0' },
      completed: { label: 'Completed', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-0' },
      archived: { label: 'Archived', className: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border-0' },
    }

    return (
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Brief Workflow States</p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="draft" customConfig={briefConfig} />
            <StatusBadge status="in_review" customConfig={briefConfig} />
            <StatusBadge status="revision_requested" customConfig={briefConfig} />
            <StatusBadge status="approved" customConfig={briefConfig} />
            <StatusBadge status="active" customConfig={briefConfig} />
            <StatusBadge status="completed" customConfig={briefConfig} />
            <StatusBadge status="archived" customConfig={briefConfig} />
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a brief/project workflow with custom states.',
      },
    },
  },
}
