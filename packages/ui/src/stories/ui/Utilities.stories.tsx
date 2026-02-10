import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '../../components/ui/separator'
import { Skeleton } from '../../components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { Button } from '../../components/ui/button'
import { HelpCircle } from 'lucide-react'

const separatorMeta = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A divider line component for separating content areas.',
      },
    },
  },
} satisfies Meta<typeof Separator>

export default separatorMeta

export const Horizontal: StoryObj<typeof separatorMeta> = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <p className="text-sm font-medium">Section 1</p>
      </div>
      <Separator />
      <div>
        <p className="text-sm font-medium">Section 2</p>
      </div>
    </div>
  ),
}

export const Vertical: StoryObj<typeof separatorMeta> = {
  render: () => (
    <div className="flex items-center gap-4 h-20">
      <div>
        <p className="text-sm font-medium">Left</p>
      </div>
      <Separator orientation="vertical" />
      <div>
        <p className="text-sm font-medium">Right</p>
      </div>
    </div>
  ),
}

export const WithText: StoryObj<typeof separatorMeta> = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>Content above</div>
      <Separator />
      <div>Content below</div>
    </div>
  ),
}

const skeletonMeta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A skeleton loader component for showing loading placeholders.',
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export const SkeletonDefault: StoryObj<typeof skeletonMeta> = {
  render: () => <Skeleton className="w-80 h-12 rounded-md" />,
}

export const SkeletonCard: StoryObj<typeof skeletonMeta> = {
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border border-gray-200 p-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-4">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  ),
}

const tooltipMeta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component that displays additional information on hover.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>

export const TooltipDefault: StoryObj<typeof tooltipMeta> = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a helpful tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const TooltipPositions: StoryObj<typeof tooltipMeta> = {
  render: () => (
    <TooltipProvider>
      <div className="flex items-center justify-center gap-8 h-64">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip above</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip to the right</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip below</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">Tooltip to the left</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}
