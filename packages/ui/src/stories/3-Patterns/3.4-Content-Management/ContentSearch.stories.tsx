import type { Meta, StoryObj } from '@storybook/react'
import { ContentSearch } from '../../../patterns/content-management/content-search'

const meta = {
  title: '3-Patterns/3.4-Content-Management/ContentSearch',
  component: ContentSearch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A search input with suggestion dropdown for content discovery.',
      },
    },
  },
} satisfies Meta<typeof ContentSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[320px]">
      <ContentSearch
        suggestions={[
          { id: '1', label: 'Dashboard', description: 'Main application dashboard' },
          { id: '2', label: 'Settings', description: 'Account and app settings' },
          { id: '3', label: 'Analytics', description: 'Usage analytics and reports' },
          { id: '4', label: 'Team Members', description: 'Manage team members' },
        ]}
      />
    </div>
  ),
}
