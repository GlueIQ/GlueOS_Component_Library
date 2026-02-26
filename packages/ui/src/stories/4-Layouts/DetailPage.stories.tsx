import type { Meta, StoryObj } from '@storybook/react'
import { DetailPage } from '../../layouts/content-detail'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

const meta = {
  title: '4-Layouts/4.5-Content-Detail/DetailPage',
  component: DetailPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A single item detail page with header, tabs, actions, and content sections.',
      },
    },
  },
} satisfies Meta<typeof DetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DetailPage
      header={
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Project Alpha</h1>
            <Badge>Active</Badge>
          </div>
          <p className="text-muted-foreground">Created Jan 15, 2024</p>
        </div>
      }
      actions={
        <>
          <Button variant="outline">Edit</Button>
          <Button>Share</Button>
        </>
      }
      tabs={
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <div className="rounded-lg border p-4 text-muted-foreground">
              Project overview content goes here.
            </div>
          </TabsContent>
        </Tabs>
      }
    />
  ),
}
