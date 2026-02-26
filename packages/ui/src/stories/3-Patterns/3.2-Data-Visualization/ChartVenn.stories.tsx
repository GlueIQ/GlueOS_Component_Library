import type { Meta, StoryObj } from '@storybook/react'
import { ChartVenn } from '../../../patterns/data-visualization/chart-venn'

const meta = {
  title: '3-Patterns/3.2-Data Visualization/Chart Venn',
  component: ChartVenn,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A visual Venn diagram showing overlap between 2 or 3 sets. Perfect for keyword overlap analysis, audience comparisons, feature matrices, and competitive analysis. Supports highlighting specific sets and custom insight messages.',
      },
    },
  },
} satisfies Meta<typeof ChartVenn>

export default meta
type Story = StoryObj<typeof meta>

export const TwoSets: Story = {
  args: {
    title: 'Keyword Overlap',
    description: 'Comparing keyword portfolios',
    sets: [
      { id: 'A', label: 'Your Site', uniqueCount: 450, highlight: true },
      { id: 'B', label: 'Competitor', uniqueCount: 680 },
    ],
    overlaps: [
      { sets: ['A', 'B'], count: 280 },
    ],
  },
}

export const WithInsight: Story = {
  args: {
    title: 'SEO Opportunity Analysis',
    description: 'Find keyword gaps',
    sets: [
      { id: 'client', label: 'acme.com', uniqueCount: 320, highlight: true },
      { id: 'competitor', label: 'competitor.com', uniqueCount: 520 },
    ],
    overlaps: [
      { sets: ['client', 'competitor'], count: 180 },
    ],
    showInsight: true,
    insightMessage: '520 keyword opportunities — competitor.com ranks for keywords you don\'t.',
  },
}

export const AudienceOverlap: Story = {
  args: {
    title: 'Audience Overlap',
    description: 'Platform audience comparison',
    sets: [
      { id: 'email', label: 'Email List', uniqueCount: 12500 },
      { id: 'social', label: 'Social Followers', uniqueCount: 8300 },
    ],
    overlaps: [
      { sets: ['email', 'social'], count: 3200 },
    ],
    showInsight: true,
    insightMessage: '3,200 contacts are on both channels — perfect for cross-channel campaigns.',
  },
}

export const FeatureComparison: Story = {
  args: {
    title: 'Product Feature Comparison',
    description: 'Free vs Pro plan features',
    sets: [
      { id: 'free', label: 'Free Plan', uniqueCount: 8 },
      { id: 'pro', label: 'Pro Plan', uniqueCount: 15 },
    ],
    overlaps: [
      { sets: ['free', 'pro'], count: 12 },
    ],
  },
}

export const ThreeSets: Story = {
  args: {
    title: 'Multi-Platform Content Reach',
    description: 'Content distribution across channels',
    sets: [
      { id: 'blog', label: 'Blog', uniqueCount: 450 },
      { id: 'youtube', label: 'YouTube', uniqueCount: 320 },
      { id: 'podcast', label: 'Podcast', uniqueCount: 180 },
    ],
    overlaps: [
      { sets: ['blog', 'youtube'], count: 120 },
      { sets: ['youtube', 'podcast'], count: 85 },
      { sets: ['blog', 'podcast'], count: 65 },
      { sets: ['blog', 'youtube', 'podcast'], count: 42 },
    ],
  },
}

export const ThreeSetsWithInsight: Story = {
  args: {
    title: 'Technology Stack Overlap',
    description: 'Skills across development teams',
    sets: [
      { id: 'frontend', label: 'Frontend Team', uniqueCount: 12 },
      { id: 'backend', label: 'Backend Team', uniqueCount: 15 },
      { id: 'devops', label: 'DevOps Team', uniqueCount: 8 },
    ],
    overlaps: [
      { sets: ['frontend', 'backend'], count: 5 },
      { sets: ['backend', 'devops'], count: 6 },
      { sets: ['frontend', 'devops'], count: 3 },
      { sets: ['frontend', 'backend', 'devops'], count: 2 },
    ],
    showInsight: true,
    insightMessage: '2 engineers have cross-functional expertise across all three domains.',
  },
}

export const CustomerSegments: Story = {
  args: {
    title: 'Customer Segment Analysis',
    description: 'Enterprise vs SMB vs Startup',
    sets: [
      { id: 'enterprise', label: 'Enterprise', uniqueCount: 85 },
      { id: 'smb', label: 'SMB', uniqueCount: 240 },
      { id: 'startup', label: 'Startup', uniqueCount: 180 },
    ],
    overlaps: [
      { sets: ['enterprise', 'smb'], count: 42 },
      { sets: ['smb', 'startup'], count: 68 },
      { sets: ['enterprise', 'startup'], count: 18 },
      { sets: ['enterprise', 'smb', 'startup'], count: 8 },
    ],
  },
}

export const MarketingChannels: Story = {
  args: {
    title: 'Lead Source Analysis',
    description: 'Where leads come from',
    sets: [
      { id: 'organic', label: 'Organic Search', uniqueCount: 1250 },
      { id: 'paid', label: 'Paid Ads', uniqueCount: 890 },
    ],
    overlaps: [
      { sets: ['organic', 'paid'], count: 320 },
    ],
    showInsight: true,
    insightMessage: '320 leads engaged with both organic and paid channels — high-intent prospects.',
  },
}

export const CompetitiveAnalysis: Story = {
  args: {
    title: 'Competitive Feature Matrix',
    description: 'Product capability comparison',
    sets: [
      { id: 'us', label: 'Our Product', uniqueCount: 45, highlight: true },
      { id: 'competitor', label: 'Main Competitor', uniqueCount: 38 },
    ],
    overlaps: [
      { sets: ['us', 'competitor'], count: 52 },
    ],
    showInsight: true,
    insightMessage: '45 unique features give us a competitive edge in the market.',
  },
}

export const NoOverlap: Story = {
  args: {
    title: 'Distinct Audiences',
    description: 'No overlap between segments',
    sets: [
      { id: 'A', label: 'Segment A', uniqueCount: 500 },
      { id: 'B', label: 'Segment B', uniqueCount: 450 },
    ],
    overlaps: [],
  },
}

export const MinimalTwoSets: Story = {
  args: {
    sets: [
      { id: 'A', label: 'Category A', uniqueCount: 120 },
      { id: 'B', label: 'Category B', uniqueCount: 95 },
    ],
    overlaps: [
      { sets: ['A', 'B'], count: 45 },
    ],
  },
}

export const CustomColors: Story = {
  args: {
    title: 'Brand Awareness',
    description: 'Brand recognition across demographics',
    sets: [
      { id: 'young', label: '18-34 Age Group', uniqueCount: 3200 },
      { id: 'mature', label: '35-54 Age Group', uniqueCount: 2800 },
    ],
    overlaps: [
      { sets: ['young', 'mature'], count: 1200 },
    ],
  },
}
