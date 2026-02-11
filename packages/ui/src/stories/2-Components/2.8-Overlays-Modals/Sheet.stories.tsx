import type { Meta, StoryObj } from '@storybook/react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '../../../components/ui/sheet'
import { Button } from '../../../components/ui/button'

const meta = {
  title: '2-Components/2.8-Overlays & Modals/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A panel that slides in from the edge of the screen, built on Radix UI Dialog. Sheets can appear from any side (top, right, bottom, left) and are useful for navigation menus, settings panels, detail views, and supplementary content.',
      },
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Right Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the right side. It is the default
            direction and is commonly used for detail panels and settings.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <p className="text-sm text-muted-foreground">
            Place your content here. The sheet will overlay the main content
            and can be closed by clicking the X button, pressing Escape, or
            clicking outside.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            A left-side sheet is ideal for navigation menus and sidebars.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4">
          <Button variant="ghost" className="justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            Settings
          </Button>
          <Button variant="ghost" className="justify-start">
            Profile
          </Button>
          <Button variant="ghost" className="justify-start">
            Help
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            A top sheet can be used for notifications, alerts, or search bars
            that drop down from the top of the screen.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground">
            You have 3 unread notifications.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Actions</SheetTitle>
          <SheetDescription>
            A bottom sheet is commonly used for action menus on mobile devices,
            providing quick access to contextual actions.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4 pb-4">
          <Button variant="outline" className="w-full">
            Share
          </Button>
          <Button variant="outline" className="w-full">
            Download
          </Button>
          <Button variant="outline" className="w-full">
            Duplicate
          </Button>
          <Button variant="destructive" className="w-full">
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
}
