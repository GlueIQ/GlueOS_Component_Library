import type { Meta, StoryObj } from '@storybook/react'
import { Container, containerVariants } from '../../../components/ui/container'

const meta = {
  title: '2-Components/2.6-Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive container component that centers content and constrains its maximum width. Supports multiple size presets and optional horizontal padding.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'The maximum width of the container',
    },
    padding: {
      control: 'boolean',
      description: 'Whether to apply responsive horizontal padding',
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Container className="bg-muted/50 border border-dashed border-border">
      <h2 className="text-lg font-semibold">Container</h2>
      <p className="mt-2 text-muted-foreground">
        This is a default container with <code>xl</code> max-width and
        responsive horizontal padding. Resize the viewport to see how the
        container adapts.
      </p>
    </Container>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 py-8">
      {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((size) => (
        <Container
          key={size}
          size={size}
          className="bg-muted/50 border border-dashed border-border py-3"
        >
          <p className="text-sm font-medium">
            size=&quot;{size}&quot;
            <span className="ml-2 text-muted-foreground font-normal">
              {size === 'sm' && '(max-w-screen-sm / 640px)'}
              {size === 'md' && '(max-w-screen-md / 768px)'}
              {size === 'lg' && '(max-w-screen-lg / 1024px)'}
              {size === 'xl' && '(max-w-screen-xl / 1280px)'}
              {size === '2xl' && '(max-w-screen-2xl / 1536px)'}
              {size === 'full' && '(max-w-full)'}
            </span>
          </p>
        </Container>
      ))}
    </div>
  ),
}

export const WithoutPadding: Story = {
  render: () => (
    <div className="space-y-4 py-8">
      <Container className="bg-muted/50 border border-dashed border-border py-3">
        <p className="text-sm font-medium">
          With padding <span className="text-muted-foreground font-normal">(default)</span>
        </p>
      </Container>
      <Container
        padding={false}
        className="bg-muted/50 border border-dashed border-border py-3"
      >
        <p className="text-sm font-medium">
          Without padding{' '}
          <span className="text-muted-foreground font-normal">
            (padding=false)
          </span>
        </p>
      </Container>
    </div>
  ),
}
