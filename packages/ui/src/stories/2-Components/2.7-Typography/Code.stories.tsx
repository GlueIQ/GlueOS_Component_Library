import type { Meta, StoryObj } from '@storybook/react'
import { Code } from '../../../components/ui/code'
import { Text } from '../../../components/ui/text'

const meta = {
  title: '2-Components/2.7-Typography/Code',
  component: Code,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A code display component with inline and block variants. Inline code renders a styled `<code>` element; block code wraps content in a `<pre>` for multi-line snippets.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'block'],
      description: 'Whether the code is displayed inline or as a block',
    },
  },
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {
  render: () => (
    <Text>
      Run <Code>npm install @glueos/ui</Code> to add the design system to your project,
      then import components with <Code>import {'{ Button }'} from &apos;@glueos/ui&apos;</Code>.
    </Text>
  ),
}

export const Block: Story = {
  render: () => (
    <div className="max-w-lg">
      <Code variant="block">
{`import { useState } from 'react'
import { Button } from '@glueos/ui'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setCount(c => c - 1)}>-</Button>
      <span>{count}</span>
      <Button onClick={() => setCount(c => c + 1)}>+</Button>
    </div>
  )
}`}
      </Code>
    </div>
  ),
}
