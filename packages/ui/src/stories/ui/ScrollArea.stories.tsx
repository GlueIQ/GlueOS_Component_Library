import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area'
import { Separator } from '../../components/ui/separator'

const tags = Array.from({ length: 50 }).map(
  (_, i) => `Item ${i + 1}`
)

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A scrollable area component built on Radix UI ScrollArea primitive. Provides custom-styled scrollbars that support both vertical and horizontal scrolling with touch-friendly interaction.',
      },
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Items</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

const artworks = [
  { title: 'Morning Haze', artist: 'Anna Chen' },
  { title: 'Coastal Drift', artist: 'Marcus Wei' },
  { title: 'Silent Valley', artist: 'Lena Okafor' },
  { title: 'Urban Pulse', artist: 'David Kim' },
  { title: 'Amber Horizon', artist: 'Sofia Torres' },
  { title: 'Frozen Light', artist: 'Erik Lindgren' },
  { title: 'Verdant Echo', artist: 'Priya Nair' },
]

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {artworks.map((artwork) => (
          <figure key={artwork.title} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <div className="h-[150px] w-[200px] bg-muted flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  {artwork.title}
                </span>
              </div>
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
