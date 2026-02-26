import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TagInput } from '../../components/ui/tag-input'

const meta = {
  title: '2-Components/Tag Input',
  component: TagInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A multi-value input component that allows users to add, remove, and manage tags. Supports suggestions, validation, max tags limit, and custom delimiters. Perfect for keywords, categories, and multi-select inputs.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    maxTags: {
      control: 'number',
      description: 'Maximum number of tags allowed',
    },
    allowDuplicates: {
      control: 'boolean',
      description: 'Allow duplicate tags',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
  },
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    return (
      <div className="w-[500px]">
        <TagInput value={tags} onChange={setTags} />
      </div>
    )
  },
}

export const WithInitialTags: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Tailwind'])
    return (
      <div className="w-[500px]">
        <TagInput value={tags} onChange={setTags} />
      </div>
    )
  },
}

export const WithMaxTags: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['AI', 'Marketing'])
    return (
      <div className="w-[500px]">
        <TagInput value={tags} onChange={setTags} maxTags={5} />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Limits the number of tags that can be added and shows a counter.',
      },
    },
  },
}

export const WithSuggestions: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    const suggestions = [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Next.js',
      'Node.js',
      'GraphQL',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'Kubernetes',
    ]

    return (
      <div className="w-[500px]">
        <TagInput value={tags} onChange={setTags} suggestions={suggestions} />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows suggestions as you type. Click to add or type and press Enter.',
      },
    },
  },
}

export const WithValidation: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    const validate = (tag: string) => {
      // Only allow alphanumeric tags with no spaces
      return /^[a-zA-Z0-9]+$/.test(tag)
    }

    return (
      <div className="w-[500px] space-y-2">
        <TagInput value={tags} onChange={setTags} validate={validate} />
        <p className="text-xs text-muted-foreground">
          Only alphanumeric characters (no spaces) allowed
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom validation function prevents invalid tags from being added.',
      },
    },
  },
}

export const CommaSeparated: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    return (
      <div className="w-[500px] space-y-2">
        <TagInput value={tags} onChange={setTags} delimiter="," />
        <p className="text-xs text-muted-foreground">
          Type multiple tags separated by commas: tag1, tag2, tag3
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Automatically splits input on comma to create multiple tags at once.',
      },
    },
  },
}

export const Disabled: Story = {
  render: () => {
    const [tags] = useState<string[]>(['React', 'TypeScript', 'Disabled'])
    return (
      <div className="w-[500px]">
        <TagInput value={tags} disabled />
      </div>
    )
  },
}

export const CustomPlaceholder: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    return (
      <div className="w-[500px]">
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder="Add keywords (e.g., AI marketing, SaaS, B2B)..."
        />
      </div>
    )
  },
}

export const KeywordAnalyzer: Story = {
  render: () => {
    const [keywords, setKeywords] = useState<string[]>(['AI', 'Marketing'])
    const suggestions = [
      'Artificial Intelligence',
      'Machine Learning',
      'Digital Marketing',
      'Content Strategy',
      'SEO',
      'Social Media',
      'Brand Strategy',
      'Customer Experience',
    ]

    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Keywords to Analyze</label>
          <TagInput
            value={keywords}
            onChange={setKeywords}
            suggestions={suggestions}
            maxTags={5}
            placeholder="Add keywords to analyze..."
          />
          <p className="text-xs text-muted-foreground">
            Add up to 5 keywords. Start typing to see suggestions or enter custom keywords.
          </p>
        </div>

        {keywords.length > 0 && (
          <div className="p-4 border rounded-md bg-muted/50">
            <p className="text-sm font-medium mb-2">Selected Keywords:</p>
            <p className="text-sm">{keywords.join(', ')}</p>
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of using TagInput for a keyword analyzer tool.',
      },
    },
  },
}

export const EmailRecipients: Story = {
  render: () => {
    const [recipients, setRecipients] = useState<string[]>([])
    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    return (
      <div className="w-[600px] space-y-2">
        <label className="text-sm font-medium">Email Recipients</label>
        <TagInput
          value={recipients}
          onChange={setRecipients}
          validate={validateEmail}
          placeholder="Enter email addresses..."
          delimiter=","
        />
        <p className="text-xs text-muted-foreground">
          Add email addresses. Separate multiple emails with commas.
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input with validation to ensure valid email addresses.',
      },
    },
  },
}

export const CategoryTags: Story = {
  render: () => {
    const [categories, setCategories] = useState<string[]>(['Technology', 'SaaS'])
    const suggestions = [
      'Technology',
      'SaaS',
      'E-commerce',
      'Healthcare',
      'Finance',
      'Education',
      'Entertainment',
      'Real Estate',
      'Manufacturing',
      'Retail',
    ]

    return (
      <div className="w-[600px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Categories</label>
          <TagInput
            value={categories}
            onChange={setCategories}
            suggestions={suggestions}
            placeholder="Select or add categories..."
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Categorization interface with predefined suggestions.',
      },
    },
  },
}
