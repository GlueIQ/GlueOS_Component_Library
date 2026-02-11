import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../../../components/ui/text'

const meta = {
  title: '2-Components/2.7-Typography/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A polymorphic text component with built-in support for semantic variants (body, lead, large, small, muted, caption) and font weight overrides.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'lead', 'large', 'small', 'muted', 'caption'],
      description: 'The text style variant',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'The font weight',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div'],
      description: 'The rendered HTML element',
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'body',
    children:
      'The quick brown fox jumps over the lazy dog. This is a body paragraph demonstrating the default text variant used throughout the GlueOS design system.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-lg">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">variant="body"</span>
        <Text variant="body">
          Body text is the default variant used for general paragraph content across the application.
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">variant="lead"</span>
        <Text variant="lead">
          Lead text is larger and lighter, ideal for introductory paragraphs.
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">variant="large"</span>
        <Text variant="large">
          Large text is semibold and slightly bigger than body text.
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">variant="small"</span>
        <Text variant="small">
          Small text is used for secondary information and supporting details.
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">variant="muted"</span>
        <Text variant="muted">
          Muted text is used for subtle, less-important information.
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">variant="caption"</span>
        <Text variant="caption">
          Caption text is the smallest variant, used for labels and annotations.
        </Text>
      </div>
    </div>
  ),
}

export const WithWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">weight="normal"</span>
        <Text weight="normal">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">weight="medium"</span>
        <Text weight="medium">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">weight="semibold"</span>
        <Text weight="semibold">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-mono">weight="bold"</span>
        <Text weight="bold">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    </div>
  ),
}
