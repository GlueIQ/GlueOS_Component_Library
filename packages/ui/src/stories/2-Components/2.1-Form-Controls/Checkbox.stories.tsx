import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../../../components/ui/checkbox'
import { Label } from '../../../components/ui/label'

const meta = {
  title: '2-Components/2.1-Form Controls/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An accessible checkbox input component for boolean selections.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'default',
  },
  render: (args) => <Checkbox {...args} />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="text-sm font-medium">
        Accept terms and conditions
      </Label>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked" defaultChecked />
        <Label htmlFor="checked">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="opacity-60">
          Disabled
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="opacity-60">
          Disabled Checked
        </Label>
      </div>
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <div className="space-y-3 rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold">Select Features</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="feature1" defaultChecked />
            <Label htmlFor="feature1" className="text-sm">
              Feature One
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="feature2" />
            <Label htmlFor="feature2" className="text-sm">
              Feature Two
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="feature3" defaultChecked />
            <Label htmlFor="feature3" className="text-sm">
              Feature Three
            </Label>
          </div>
        </div>
      </div>
    </div>
  ),
}
