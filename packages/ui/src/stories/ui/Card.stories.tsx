import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A container component for grouping related content. Includes subcomponents for header, title, description, and content.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Features</CardTitle>
        <CardDescription>Explore our latest features</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with footer action</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Card 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">First card content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Card 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Second card content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Card 3</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Third card content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Card 4</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Fourth card content</p>
        </CardContent>
      </Card>
    </div>
  ),
}
