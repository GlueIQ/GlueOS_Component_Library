import type { Meta, StoryObj } from '@storybook/react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '../../components/ui/collapsible'
import { Button } from '../../components/ui/button'
import { ChevronsUpDown } from 'lucide-react'

const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An interactive component that expands and collapses a section of content. Built on Radix UI Collapsible, it provides a simple show/hide toggle for progressive disclosure of information.',
      },
    },
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80 space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Recent repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        glueos-design-system
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          glueos-dashboard
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          glueos-api-gateway
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          glueos-auth-service
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible open={true} className="w-80 space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Pinned items</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        Project roadmap
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          Design tokens spec
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          Component inventory
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          Accessibility audit
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
