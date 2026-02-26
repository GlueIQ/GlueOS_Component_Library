import type { Meta, StoryObj } from '@storybook/react'
import { ContentList } from '../../../patterns/content-management/content-list'

const meta = {
  title: '3-Patterns/3.4-Content-Management/ContentList',
  component: ContentList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A stack of content items with title, description, status badge, meta info, and view action.',
      },
    },
  },
} satisfies Meta<typeof ContentList>

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { id: '1', title: 'Project Alpha', description: 'Main product dashboard redesign', status: 'Active', meta: 'Updated 2h ago' },
  { id: '2', title: 'Design System v2', description: 'Component library upgrade to v2', status: 'In Progress', statusVariant: 'default' as const, meta: 'Updated 1d ago' },
  { id: '3', title: 'API Documentation', description: 'REST API reference and guides', status: 'Draft', statusVariant: 'outline' as const, meta: 'Updated 3d ago' },
  { id: '4', title: 'Mobile App', description: 'iOS and Android companion app', status: 'Planned', statusVariant: 'secondary' as const, meta: 'Created 1w ago' },
]

export const Default: Story = {
  args: {
    items: sampleItems,
    onItemClick: () => {},
  },
}
