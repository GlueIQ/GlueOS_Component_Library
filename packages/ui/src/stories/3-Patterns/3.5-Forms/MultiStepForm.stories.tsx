import type { Meta, StoryObj } from '@storybook/react'
import { MultiStepForm } from '../../../patterns/forms/multi-step-form'
import { Input } from '../../../components/ui/input'
import { Field, FieldGroup, FieldLabel } from '../../../components/ui/field'

const meta = {
  title: '3-Patterns/3.5-Forms/MultiStepForm',
  component: MultiStepForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A wizard-style multi-step form with step indicator, navigation, and progress tracking.',
      },
    },
  },
} satisfies Meta<typeof MultiStepForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { steps: [] },
  render: () => (
    <div className="w-full max-w-lg">
      <MultiStepForm
        steps={[
          {
            title: 'Personal Info',
            description: 'Enter your basic information.',
            content: (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full name</FieldLabel>
                  <Input id="name" placeholder="John Doe" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="stepEmail">Email</FieldLabel>
                  <Input id="stepEmail" type="email" placeholder="john@example.com" />
                </Field>
              </FieldGroup>
            ),
          },
          {
            title: 'Company',
            description: 'Tell us about your company.',
            content: (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="company">Company name</FieldLabel>
                  <Input id="company" placeholder="Acme Inc." />
                </Field>
                <Field>
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <Input id="role" placeholder="Software Engineer" />
                </Field>
              </FieldGroup>
            ),
          },
          {
            title: 'Confirmation',
            description: 'Review and confirm your information.',
            content: (
              <div className="py-4 text-center text-sm text-muted-foreground">
                Please review the information you provided in the previous steps before submitting.
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
}
