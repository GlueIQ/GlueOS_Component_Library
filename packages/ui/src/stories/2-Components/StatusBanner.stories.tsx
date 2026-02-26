import type { Meta, StoryObj } from '@storybook/react'
import { StatusBanner } from '../../components/ui/status-banner'
import { Button } from '../../components/ui/button'
import { CheckCircle, AlertCircle, AlertTriangle, Info, Sparkles, Clock, XCircle } from 'lucide-react'

const meta = {
  title: '2-Components/Status Banner',
  component: StatusBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A prominent banner component for displaying status messages, alerts, and progress updates. Supports different variants (info, success, warning, error), optional icons, progress bars, and action buttons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual variant of the banner',
    },
    title: {
      control: 'text',
      description: 'Banner title',
    },
    message: {
      control: 'text',
      description: 'Optional banner message',
    },
    showProgress: {
      control: 'boolean',
      description: 'Show progress bar',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0-100)',
    },
    animate: {
      control: 'boolean',
      description: 'Animate the icon',
    },
  },
} satisfies Meta<typeof StatusBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'info',
    icon: <Info className="h-6 w-6" />,
    title: 'Information',
    message: 'This is an informational message for the user.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Success!',
    message: 'Your action was completed successfully.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Warning',
    message: 'Please review this before continuing.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    icon: <XCircle className="h-6 w-6" />,
    title: 'Error',
    message: 'Something went wrong. Please try again.',
  },
}

export const WithAction: Story = {
  args: {
    variant: 'warning',
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Action Required',
    message: 'Please complete this action to continue.',
    action: <Button>Take Action</Button>,
  },
}

export const WithProgress: Story = {
  args: {
    variant: 'info',
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Processing',
    message: 'Your request is being processed...',
    showProgress: true,
    progress: 65,
    animate: true,
  },
}

export const AnalysisInProgress: Story = {
  render: () => (
    <StatusBanner
      variant="info"
      icon={<Sparkles className="h-6 w-6" />}
      title="AI Analysis in Progress"
      message="Generating insights from collected data... This may take a while."
      showProgress
      progress={42}
      animate
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of an analysis status banner with progress indicator.',
      },
    },
  },
}

export const AnalysisComplete: Story = {
  render: () => (
    <StatusBanner
      variant="success"
      icon={<CheckCircle className="h-6 w-6" />}
      title="Analysis Complete"
      message="AI analysis has been completed. View insights below or export your report."
    />
  ),
}

export const ReadyForAnalysis: Story = {
  render: () => (
    <StatusBanner
      variant="warning"
      icon={<AlertCircle className="h-6 w-6" />}
      title="Ready for AI Analysis"
      message="Data collection is complete. Run AI analysis to generate insights, opportunities, and threats."
      action={
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
          <Sparkles className="h-4 w-4 mr-2" />
          Analyze with AI
        </Button>
      }
    />
  ),
}

export const PendingReview: Story = {
  render: () => (
    <StatusBanner
      variant="warning"
      icon={<Clock className="h-6 w-6" />}
      title="Pending Review"
      message="This item is awaiting approval from your team."
      action={<Button variant="outline">View Details</Button>}
    />
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBanner
        variant="info"
        icon={<Info className="h-6 w-6" />}
        title="System Update Available"
        message="A new version is ready to install."
        action={<Button size="sm">Update Now</Button>}
      />

      <StatusBanner
        variant="success"
        icon={<CheckCircle className="h-6 w-6" />}
        title="Payment Successful"
        message="Your payment has been processed successfully."
      />

      <StatusBanner
        variant="warning"
        icon={<AlertTriangle className="h-6 w-6" />}
        title="Limited Availability"
        message="Only 3 seats remaining at this price."
        action={<Button size="sm">Book Now</Button>}
      />

      <StatusBanner
        variant="error"
        icon={<XCircle className="h-6 w-6" />}
        title="Connection Failed"
        message="Unable to connect to the server. Please check your connection."
        action={<Button size="sm" variant="outline">Retry</Button>}
      />
    </div>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <StatusBanner
      variant="info"
      icon={<Sparkles className="h-6 w-6" />}
      title="Import in Progress"
      animate
    >
      <div className="space-y-2 mt-2">
        <p className="text-sm text-muted-foreground">Importing data from external source...</p>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span>• 1,234 records processed</span>
          <span>• 45 duplicates skipped</span>
          <span>• 2 errors found</span>
        </div>
      </div>
    </StatusBanner>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use children prop for custom content layouts.',
      },
    },
  },
}

export const MinimalInfo: Story = {
  render: () => (
    <StatusBanner
      variant="info"
      icon={<Info className="h-6 w-6" />}
      title="Quick tip: Use Cmd+K to open the command palette"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal banner with just a title and icon.',
      },
    },
  },
}
