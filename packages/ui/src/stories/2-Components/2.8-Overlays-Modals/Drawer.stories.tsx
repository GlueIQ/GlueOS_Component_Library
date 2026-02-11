import type { Meta, StoryObj } from '@storybook/react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '../../../components/ui/drawer'
import { Button } from '../../../components/ui/button'

const meta = {
  title: '2-Components/2.8-Overlays & Modals/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A touch-friendly drawer component built on Vaul. Drawers slide up from the bottom of the screen with a drag handle for gesture-based dismissal. They are especially suited for mobile interfaces and responsive layouts where touch interaction is preferred.',
      },
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>
            Set your daily activity goal. Drag the handle to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">350</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">
                Calories/day
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
