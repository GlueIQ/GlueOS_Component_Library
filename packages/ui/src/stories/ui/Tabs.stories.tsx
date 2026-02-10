import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tabbed interface component for organizing content across multiple panels.',
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="pt-4">
          <p className="text-sm text-gray-600">Content for Tab 1</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="pt-4">
          <p className="text-sm text-gray-600">Content for Tab 2</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="pt-4">
          <p className="text-sm text-gray-600">Content for Tab 3</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="pt-4">
          <p className="text-sm font-medium mb-2">Account Settings</p>
          <p className="text-sm text-gray-600">Manage your account information here.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="pt-4">
          <p className="text-sm font-medium mb-2">Change Password</p>
          <p className="text-sm text-gray-600">Update your password to keep your account secure.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-2xl">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="pt-4">
          <p className="text-sm text-gray-600">Overview content</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="pt-4">
          <p className="text-sm text-gray-600">Analytics content</p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="pt-4">
          <p className="text-sm text-gray-600">Reports content</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="pt-4">
          <p className="text-sm text-gray-600">Settings content</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}
