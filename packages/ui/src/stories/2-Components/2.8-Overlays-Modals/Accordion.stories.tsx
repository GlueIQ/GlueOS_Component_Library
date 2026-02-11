import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../../components/ui/accordion'

const meta = {
  title: '2-Components/2.8-Overlays & Modals/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A vertically stacked set of interactive headings that each reveal a section of content. Built on Radix UI Accordion, it supports single or multiple expanded items and animated open/close transitions.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is GlueOS?</AccordionTrigger>
        <AccordionContent>
          GlueOS is a unified design system that provides a consistent set of
          components, patterns, and guidelines for building cohesive user
          interfaces across all products.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install components?</AccordionTrigger>
        <AccordionContent>
          You can install components individually using the CLI tool or add them
          manually by copying the source files into your project. Each component
          is self-contained with its own styles and dependencies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customize the theme?</AccordionTrigger>
        <AccordionContent>
          Yes. The design system uses CSS variables for theming, allowing you to
          override colors, spacing, typography, and other tokens to match your
          brand identity without modifying the component source code.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>What frameworks are supported?</AccordionTrigger>
        <AccordionContent>
          GlueOS components are built with React and can be used in any React
          project including Next.js, Remix, and Vite-based applications. The
          underlying styles use Tailwind CSS for maximum flexibility.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is accessibility built in?</AccordionTrigger>
        <AccordionContent>
          All components follow WAI-ARIA patterns and are built on Radix UI
          primitives, ensuring proper keyboard navigation, screen reader
          support, and focus management out of the box.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How are updates handled?</AccordionTrigger>
        <AccordionContent>
          Since components live in your codebase, you control when and how to
          adopt updates. Breaking changes are documented in the changelog, and
          migration guides are provided for major version bumps.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting started</AccordionTrigger>
        <AccordionContent>
          To get started, install the core package and add your first component.
          The CLI will automatically configure your project with the necessary
          dependencies, Tailwind configuration, and utility functions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Configuration options</AccordionTrigger>
        <AccordionContent>
          The design system supports a wide range of configuration options
          including custom color palettes, border radius scales, font families,
          and dark mode preferences via the components.json file.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Contributing guidelines</AccordionTrigger>
        <AccordionContent>
          Contributions are welcome. Please follow the established patterns for
          component structure, ensure full accessibility compliance, and include
          Storybook stories with your pull request.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/** Interaction test: expand and collapse accordion items */
export const InteractionTest: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is GlueOS?</AccordionTrigger>
        <AccordionContent>
          GlueOS is a unified design system that provides a consistent set of
          components, patterns, and guidelines for building cohesive user
          interfaces across all products.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install components?</AccordionTrigger>
        <AccordionContent>
          You can install components individually using the CLI tool or add them
          manually by copying the source files into your project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // All items should start collapsed
    const firstTrigger = canvas.getByText('What is GlueOS?')
    await expect(firstTrigger.closest('button')).toHaveAttribute('data-state', 'closed')

    // Click to expand first item
    await userEvent.click(firstTrigger)
    await expect(firstTrigger.closest('button')).toHaveAttribute('data-state', 'open')
    await expect(canvas.getByText(/unified design system/)).toBeVisible()

    // Click second item — first should close (single mode)
    const secondTrigger = canvas.getByText('How do I install components?')
    await userEvent.click(secondTrigger)
    await expect(secondTrigger.closest('button')).toHaveAttribute('data-state', 'open')
    await expect(firstTrigger.closest('button')).toHaveAttribute('data-state', 'closed')

    // Click second item again to collapse it
    await userEvent.click(secondTrigger)
    await expect(secondTrigger.closest('button')).toHaveAttribute('data-state', 'closed')
  },
}
