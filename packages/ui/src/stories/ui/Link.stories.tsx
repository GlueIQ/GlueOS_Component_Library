import type { Meta, StoryObj } from '@storybook/react'
import { Link } from '../../components/ui/link'
import { ExternalLink } from 'lucide-react'

const meta = {
  title: 'UI/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible link component with variant and size options. Supports default, muted, and destructive styles with small, default, and large sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'destructive'],
      description: 'The visual style of the link',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size of the link',
    },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Click here to learn more',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Link href="#" variant="default">
        Default
      </Link>
      <Link href="#" variant="muted">
        Muted
      </Link>
      <Link href="#" variant="destructive">
        Destructive
      </Link>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Link href="#" size="sm">
        Small
      </Link>
      <Link href="#" size="default">
        Default
      </Link>
      <Link href="#" size="lg">
        Large
      </Link>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Link href="#" target="_blank" rel="noopener noreferrer">
      Visit documentation
      <ExternalLink className="w-4 h-4" />
    </Link>
  ),
}
