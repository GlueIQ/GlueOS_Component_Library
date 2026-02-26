import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'

const meta = {
  title: '2-Components/2.1-Form Controls/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A text input component for form entries with support for various states and types.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="user@example.com" />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input type="text" placeholder="Text input..." />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="Email input..." />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" placeholder="Password input..." />
      </div>
      <div className="space-y-2">
        <Label>Number</Label>
        <Input type="number" placeholder="Number input..." />
      </div>
      <div className="space-y-2">
        <Label>Telephone</Label>
        <Input type="tel" placeholder="Tel input..." />
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label>Default</Label>
        <Input placeholder="Normal state" />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Input placeholder="Disabled state" disabled />
      </div>
      <div className="space-y-2">
        <Label>With Value</Label>
        <Input value="Input with value" readOnly />
      </div>
      <div className="space-y-2">
        <Label>Error State</Label>
        <Input placeholder="Error state" aria-invalid="true" />
      </div>
    </div>
  ),
}
