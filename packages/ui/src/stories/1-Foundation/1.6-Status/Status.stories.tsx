import type { StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Minus,
  XCircle,
} from 'lucide-react'

import { Badge } from '../../../components/ui/badge'
import {
  statusStyles,
  statusDotStyles,
  statusIconStyles,
  type StatusKey,
} from '../../../lib/status'

export default {
  title: '1-Foundation/1.6-Status',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The GlueOS semantic status palette. A fixed, universal set of five states applied consistently across all apps, modules, and client deployments — not theme-configurable. Use these tokens for any UI element that communicates status, health, progress, or priority.',
      },
    },
  },
}

// ---------------------------------------------------------------------------
// Helper data
// ---------------------------------------------------------------------------

const states: Array<{
  key: StatusKey
  name: string
  description: string
  icon: React.ReactNode
  examples: string[]
}> = [
  {
    key: 'neutral',
    name: 'Neutral',
    description: 'Not started · Inactive · Inconclusive · Queued · Low priority',
    icon: <Minus className="size-4" />,
    examples: ['Not Started', 'Draft', 'Queued', 'Inconclusive', 'Inactive', 'Low'],
  },
  {
    key: 'active',
    name: 'Active',
    description: 'In progress · Running · Launched · In Design · Processing',
    icon: <Activity className="size-4" />,
    examples: ['In Progress', 'Running', 'Active', 'In Design', 'Launched'],
  },
  {
    key: 'success',
    name: 'Success',
    description: 'Complete · Approved · Healthy · On Track · Resolved · Significant',
    icon: <CheckCircle2 className="size-4" />,
    examples: ['Complete', 'Approved', 'Healthy', 'On Track', 'Resolved', 'Significant', 'Ready'],
  },
  {
    key: 'caution',
    name: 'Caution',
    description: 'At Risk · Pending Review · Expiring · Needs Attention · Flagged · Medium priority',
    icon: <AlertTriangle className="size-4" />,
    examples: ['At Risk', 'In Review', 'Expiring', 'Needs Review', 'Flagged', 'Retrying', 'Medium'],
  },
  {
    key: 'critical',
    name: 'Critical',
    description: 'Blocked · Failed · Rejected · Error · Expired · High priority',
    icon: <XCircle className="size-4" />,
    examples: ['Blocked', 'Failed', 'Rejected', 'Error', 'Expired', 'High'],
  },
]

const mappingGroups: Array<{
  domain: string
  rows: Array<{ label: string; state: StatusKey }>
}> = [
  {
    domain: 'Workflow / Progress',
    rows: [
      { label: 'Not Started / Draft', state: 'neutral' },
      { label: 'In Progress / In Design', state: 'active' },
      { label: 'In Review / Pending', state: 'caution' },
      { label: 'Approved / Complete', state: 'success' },
      { label: 'Blocked', state: 'critical' },
    ],
  },
  {
    domain: 'Health / Operations',
    rows: [
      { label: 'Healthy / Resolved', state: 'success' },
      { label: 'Degraded / Retrying', state: 'caution' },
      { label: 'Error / Failed', state: 'critical' },
    ],
  },
  {
    domain: 'Campaign / Launch',
    rows: [
      { label: 'Ready', state: 'success' },
      { label: 'Needs Review', state: 'caution' },
      { label: 'Blocked', state: 'critical' },
    ],
  },
  {
    domain: 'Strategic / Initiative',
    rows: [
      { label: 'On Track', state: 'success' },
      { label: 'At Risk', state: 'caution' },
      { label: 'Behind / Failed', state: 'critical' },
    ],
  },
  {
    domain: 'Asset Lifecycle',
    rows: [
      { label: 'Active', state: 'success' },
      { label: 'Expiring', state: 'caution' },
      { label: 'Expired', state: 'critical' },
    ],
  },
  {
    domain: 'Priority / Impact',
    rows: [
      { label: 'Low', state: 'neutral' },
      { label: 'Medium', state: 'caution' },
      { label: 'High', state: 'critical' },
    ],
  },
  {
    domain: 'AI Governance',
    rows: [
      { label: 'Approved', state: 'success' },
      { label: 'Flagged', state: 'caution' },
      { label: 'Rejected', state: 'critical' },
    ],
  },
  {
    domain: 'A/B Testing',
    rows: [
      { label: 'Running', state: 'active' },
      { label: 'Significant', state: 'success' },
      { label: 'Inconclusive', state: 'neutral' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const SemanticTokens: StoryObj = {
  name: 'Semantic Tokens',
  render: () => (
    <div className="space-y-6 p-8">
      <div>
        <h3 className="text-lg font-semibold">Five Semantic States</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Every status indicator in GlueOS maps to one of these five states. The same color applies
          whether the indicator is a badge, a dot, or an icon.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {states.map((s) => (
          <div key={s.key} className="flex flex-col gap-3 rounded-lg border bg-card p-4">
            {/* Indicator trio */}
            <div className="flex items-center gap-2.5">
              <span className={`size-2.5 rounded-full shrink-0 ${statusDotStyles[s.key]}`} />
              <Badge variant="outline" className={statusStyles[s.key]}>
                {s.name}
              </Badge>
              <span className={statusIconStyles[s.key]}>{s.icon}</span>
            </div>
            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
            {/* Example labels */}
            <div className="flex flex-wrap gap-1">
              {s.examples.slice(0, 3).map((ex) => (
                <Badge key={ex} variant="outline" className={`text-[10px] ${statusStyles[s.key]}`}>
                  {ex}
                </Badge>
              ))}
            </div>
            {/* Token key */}
            <code className="text-[10px] font-mono text-muted-foreground bg-muted rounded px-1.5 py-0.5">
              statusStyles.{s.key}
            </code>
          </div>
        ))}
      </div>

      {/* Class strings reference */}
      <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-semibold">Badge className reference</h4>
        <div className="space-y-1.5">
          {states.map((s) => (
            <div key={s.key} className="flex items-start gap-3">
              <span className={`size-2 rounded-full mt-1.5 shrink-0 ${statusDotStyles[s.key]}`} />
              <code className="text-[11px] font-mono text-muted-foreground break-all">
                <span className="text-foreground font-semibold">{s.key}:</span>{' '}
                {statusStyles[s.key]}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const StatusMappings: StoryObj = {
  name: 'Status Mappings',
  render: () => (
    <div className="space-y-6 p-8">
      <div>
        <h3 className="text-lg font-semibold">Domain Label → Semantic Token</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Reference for mapping any product status label to the correct semantic token. When adding
          a new status indicator, find the closest domain category and follow the pattern.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mappingGroups.map((group) => (
          <div key={group.domain} className="rounded-lg border bg-card">
            <div className="px-4 py-2.5 border-b bg-muted/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {group.domain}
              </p>
            </div>
            <div className="p-3 space-y-1.5">
              {group.rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">{row.label}</span>
                  <Badge variant="outline" className={`text-[10px] shrink-0 ${statusStyles[row.state]}`}>
                    {row.state}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const IndicatorTypes: StoryObj = {
  name: 'Indicator Types',
  render: () => (
    <div className="space-y-6 p-8">
      <div>
        <h3 className="text-lg font-semibold">Three Indicator Formats</h3>
        <p className="text-sm text-muted-foreground mt-1">
          The same semantic token applies to all three formats. Choose the format based on
          available space and context.
        </p>
      </div>
      <div className="rounded-lg border overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 px-4 py-2.5 bg-muted/40 border-b">
          <p className="text-xs font-semibold text-muted-foreground">State</p>
          <p className="text-xs font-semibold text-muted-foreground">Badge</p>
          <p className="text-xs font-semibold text-muted-foreground">Dot indicator</p>
          <p className="text-xs font-semibold text-muted-foreground">Icon</p>
        </div>
        {states.map((s, i) => (
          <div
            key={s.key}
            className={`grid grid-cols-4 gap-4 px-4 py-3 items-center ${i < states.length - 1 ? 'border-b' : ''}`}
          >
            <div>
              <p className="text-sm font-medium">{s.name}</p>
              <code className="text-[10px] font-mono text-muted-foreground">.{s.key}</code>
            </div>
            <div>
              <Badge variant="outline" className={statusStyles[s.key]}>
                {s.examples[0]}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${statusDotStyles[s.key]}`} />
              <span className="text-xs text-muted-foreground">{s.examples[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={statusIconStyles[s.key]}>{s.icon}</span>
              <span className="text-xs text-muted-foreground">{s.examples[0]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
        <h4 className="text-sm font-semibold">Usage</h4>
        <div className="space-y-1">
          <code className="block text-xs font-mono text-muted-foreground">
            {`// Badge (import statusStyles from "@repo/ui")`}
          </code>
          <code className="block text-xs font-mono text-muted-foreground">
            {`<Badge variant="outline" className={statusStyles.success}>On Track</Badge>`}
          </code>
          <code className="block text-xs font-mono text-muted-foreground mt-2">
            {`// Dot (import statusDotStyles from "@repo/ui")`}
          </code>
          <code className="block text-xs font-mono text-muted-foreground">
            {`<span className={\`size-2 rounded-full \${statusDotStyles.caution}\`} />`}
          </code>
          <code className="block text-xs font-mono text-muted-foreground mt-2">
            {`// Icon (import statusIconStyles from "@repo/ui")`}
          </code>
          <code className="block text-xs font-mono text-muted-foreground">
            {`<CheckCircle2 className={statusIconStyles.success} />`}
          </code>
        </div>
      </div>
    </div>
  ),
}

export const DarkMode: StoryObj = {
  name: 'Dark Mode',
  render: () => (
    <div className="dark bg-background text-foreground rounded-lg">
      <div className="space-y-6 p-8">
        <div>
          <h3 className="text-lg font-semibold">Dark Mode</h3>
          <p className="text-sm text-muted-foreground mt-1">
            All five states render correctly in dark mode via paired dark: utilities in each token.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {states.map((s) => (
            <div key={s.key} className="flex flex-col gap-3 rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2.5">
                <span className={`size-2.5 rounded-full shrink-0 ${statusDotStyles[s.key]}`} />
                <Badge variant="outline" className={statusStyles[s.key]}>
                  {s.name}
                </Badge>
                <span className={statusIconStyles[s.key]}>{s.icon}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {s.examples.slice(0, 3).map((ex) => (
                  <Badge key={ex} variant="outline" className={`text-[10px] ${statusStyles[s.key]}`}>
                    {ex}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
