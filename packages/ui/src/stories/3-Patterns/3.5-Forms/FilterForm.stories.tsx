import type { Meta, StoryObj } from '@storybook/react'
import { FilterForm } from '../../../patterns/forms/filter-form'

const meta = {
  title: '3-Patterns/3.5-Forms/FilterForm',
  component: FilterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An advanced filter form with search, status, category, and sort controls. Composed of Card, Field, Input, Select, and Button components.',
      },
    },
  },
} satisfies Meta<typeof FilterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <FilterForm />,
}
