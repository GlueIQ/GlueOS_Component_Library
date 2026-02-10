import type { Meta, StoryObj } from '@storybook/react'
import {
  DataList,
  DataListItem,
  DataListTerm,
  DataListDetail,
} from '../../components/ui/data-list'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'

const meta = {
  title: 'UI/DataList',
  component: DataList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A semantic definition list component for displaying key-value pairs. Supports vertical and horizontal orientations with small, default, and large size variants.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction of the key-value pairs',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size of the data list',
    },
  },
} satisfies Meta<typeof DataList>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  render: () => (
    <DataList orientation="vertical" className="w-80">
      <DataListItem>
        <DataListTerm>Name</DataListTerm>
        <DataListDetail>Jane Cooper</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Email</DataListTerm>
        <DataListDetail>jane.cooper@example.com</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Role</DataListTerm>
        <DataListDetail>Product Designer</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Status</DataListTerm>
        <DataListDetail>Active</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Joined</DataListTerm>
        <DataListDetail>March 14, 2024</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <DataList orientation="horizontal" className="w-96">
      <DataListItem>
        <DataListTerm>Name</DataListTerm>
        <DataListDetail>Jane Cooper</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Email</DataListTerm>
        <DataListDetail>jane.cooper@example.com</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Role</DataListTerm>
        <DataListDetail>Product Designer</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Status</DataListTerm>
        <DataListDetail>Active</DataListDetail>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Joined</DataListTerm>
        <DataListDetail>March 14, 2024</DataListDetail>
      </DataListItem>
    </DataList>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground font-mono">size="sm"</span>
        <DataList orientation="horizontal" size="sm" className="w-80">
          <DataListItem>
            <DataListTerm>Name</DataListTerm>
            <DataListDetail>Jane Cooper</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Email</DataListTerm>
            <DataListDetail>jane.cooper@example.com</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Role</DataListTerm>
            <DataListDetail>Product Designer</DataListDetail>
          </DataListItem>
        </DataList>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground font-mono">size="default"</span>
        <DataList orientation="horizontal" size="default" className="w-96">
          <DataListItem>
            <DataListTerm>Name</DataListTerm>
            <DataListDetail>Jane Cooper</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Email</DataListTerm>
            <DataListDetail>jane.cooper@example.com</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Role</DataListTerm>
            <DataListDetail>Product Designer</DataListDetail>
          </DataListItem>
        </DataList>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground font-mono">size="lg"</span>
        <DataList orientation="horizontal" size="lg" className="w-[28rem]">
          <DataListItem>
            <DataListTerm>Name</DataListTerm>
            <DataListDetail>Jane Cooper</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Email</DataListTerm>
            <DataListDetail>jane.cooper@example.com</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Role</DataListTerm>
            <DataListDetail>Product Designer</DataListDetail>
          </DataListItem>
        </DataList>
      </div>
    </div>
  ),
}

export const RealWorld: Story = {
  render: () => (
    <Card className="w-[24rem]">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <DataList orientation="horizontal">
          <DataListItem>
            <DataListTerm>Name</DataListTerm>
            <DataListDetail>Jane Cooper</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Email</DataListTerm>
            <DataListDetail>jane.cooper@example.com</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Role</DataListTerm>
            <DataListDetail>Product Designer</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Status</DataListTerm>
            <DataListDetail>Active</DataListDetail>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Joined</DataListTerm>
            <DataListDetail>March 14, 2024</DataListDetail>
          </DataListItem>
        </DataList>
      </CardContent>
    </Card>
  ),
}
