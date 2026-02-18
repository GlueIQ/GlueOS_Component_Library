# GlueIQ Immersion — Component Migration Audit

> **Purpose:** Map every component in the Immersion app to UI system types, migration tiers, and existing @repo/ui coverage.
>
> **Source repo:** glueiq-immersion
> **UI Kit:** @repo/ui (GlueOS Component Library)
> **Audited:** 2026-02-18

---

## Migration Tier Legend

| Tier | Label | Meaning |
|------|-------|---------|
| **T1** | Direct Match | @repo/ui already has this component |
| **T2** | UI Kit Gap | Presentational component that should be added to @repo/ui |
| **T3** | App-Specific | Business logic / workflow component — stays in the app, consumes UI Kit |

---

## Summary

| Category | Total | T1 | T2 | T3 |
|----------|-------|-----|-----|-----|
| UI Primitives | 22 | 22 | 0 | 0 |
| Layout / Shell | 3 | 0 | 1 | 2 |
| Charts | 39 | 0 | 39 | 0 |
| Tool Analyzers | 30 | 0 | 0 | 30 |
| Tool Utilities | 5 | 0 | 2 | 3 |
| Immersion Components | 27 | 0 | 4 | 23 |
| Coaching | 4 | 0 | 1 | 3 |
| Feedback | 2 | 0 | 1 | 1 |
| Settings | 1 | 0 | 0 | 1 |
| Providers | 2 | 0 | 0 | 2 |
| Utilities | 1 | 0 | 0 | 1 |
| Pages | 29 | 0 | 0 | 29 |
| **Totals** | **165** | **22** | **48** | **95** |

---

## 1. UI Primitives (22) — All T1

These are shadcn/ui components in `components/ui/`. Every one has a direct @repo/ui equivalent.

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 1 | Button | components/ui/button.tsx | Button | Actions, form submits, navigation triggers | T1 | Button |
| 2 | Card (+ Header, Title, Description, Content, Footer, Action) | components/ui/card.tsx | Card | Content containers throughout app | T1 | Card |
| 3 | Input | components/ui/input.tsx | Input | Form text fields, search bars | T1 | Input |
| 4 | Select (+ Group, Value, Trigger, Content, Label, Item) | components/ui/select.tsx | Select | Dropdown pickers for filters, forms | T1 | Select |
| 5 | Checkbox | components/ui/checkbox.tsx | Checkbox | Form checkboxes, multi-select lists | T1 | Checkbox |
| 6 | Label | components/ui/label.tsx | Label | Form field labels | T1 | Label |
| 7 | Badge | components/ui/badge.tsx | Badge | Status indicators, tags, categories | T1 | Badge |
| 8 | Dialog (+ Trigger, Portal, Close, Overlay, Content, Header, Footer, Title, Description) | components/ui/dialog.tsx | Dialog | Modals for editing, confirming, creating | T1 | Dialog |
| 9 | Tabs (+ List, Trigger, Content) | components/ui/tabs.tsx | Tabs | Section navigation in analysis views | T1 | Tabs |
| 10 | Textarea | components/ui/textarea.tsx | Textarea | Multi-line input for descriptions, prompts | T1 | Textarea |
| 11 | Avatar (+ Image, Fallback, Badge, Group, GroupCount) | components/ui/avatar.tsx | Avatar | User profile pictures, team members | T1 | Avatar |
| 12 | Tooltip (+ Trigger, Content, Provider) | components/ui/tooltip.tsx | Tooltip | Hover explanations, info tips | T1 | Tooltip |
| 13 | Switch | components/ui/switch.tsx | Switch | Toggle settings, mode switches | T1 | Switch |
| 14 | RadioGroup (+ Item) | components/ui/radio-group.tsx | RadioGroup | Feedback type selection, option groups | T1 | RadioGroup |
| 15 | Accordion (+ Item, Trigger, Content) | components/ui/accordion.tsx | Accordion | Expandable sections in analysis views | T1 | Accordion |
| 16 | Popover (+ Trigger, Content, Anchor, Header, Title, Description) | components/ui/popover.tsx | Popover | Floating panels for quick actions | T1 | Popover |
| 17 | DropdownMenu (+ Trigger, Content, Item, CheckboxItem, RadioGroup, Label, Separator, Sub) | components/ui/dropdown-menu.tsx | DropdownMenu | Action menus, context menus | T1 | DropdownMenu |
| 18 | Table (+ Header, Body, Footer, Row, Head, Cell, Caption) | components/ui/table.tsx | Table | Data tables for lens data, rankings | T1 | Table |
| 19 | Progress | components/ui/progress.tsx | Progress | Analysis progress bars, score indicators | T1 | Progress |
| 20 | Sheet (+ Trigger, Close, Portal, Overlay, Content, Header, Footer, Title, Description) | components/ui/sheet.tsx | Sheet | Mobile sidebar, detail panels | T1 | Sheet |
| 21 | AlertDialog (+ Trigger, Portal, Overlay, Content, Header, Footer, Title, Description, Media, Action, Cancel) | components/ui/alert-dialog.tsx | AlertDialog | Delete confirmations, destructive actions | T1 | AlertDialog |
| 22 | Skeleton | components/ui/skeleton.tsx | Skeleton | Loading placeholders throughout app | T1 | Skeleton |

---

## 2. Layout & Shell (3)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 23 | Shell | components/Shell.tsx | App Shell | Main layout with sidebar, topbar, user controls, theme toggle | T2 | Sidebar (partial) |
| 24 | Providers | components/Providers.tsx | Provider Wrapper | Root providers (Clerk + ThemeProvider) | T3 | — |
| 25 | ThemeProvider | components/ThemeProvider.tsx | Theme Provider | next-themes integration for dark/light mode | T3 | — |

---

## 3. Chart Components (39) — All T2

All chart components are **purely presentational** (props in, visuals out). They are strong candidates for a `@repo/ui/patterns/data-visualization` package.

### Gauges & Scores (4)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 26 | SentimentGauge | components/charts/SentimentGauge.tsx | Gauge | Semicircular score gauge (0-100) with color-coded status | T2 | — |
| 27 | AuthorityGauge | components/charts/AuthorityGauge.tsx | Gauge | Circular domain authority score with competitor comparison | T2 | — |
| 28 | PriceRangeGauge | components/tools/financial-picture/PriceRangeGauge.tsx | Gauge | Stock price range indicator (min/current/max) | T2 | — |
| 29 | AIPresenceScorecard | components/charts/AIPresenceScorecard.tsx | Scorecard | Brand visibility grid across AI platforms | T2 | — |

### Area & Line Charts (4)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 30 | TrafficTrendChart | components/charts/TrafficTrendChart.tsx | Chart – Area | Multi-domain area chart with gradient fills, summary stats | T2 | ChartAreaInteractive (partial) |
| 31 | TrendTimeline | components/charts/TrendTimeline.tsx | Chart – Line | Timeline of trend data points over time | T2 | ChartLineInteractive (partial) |
| 32 | BrandComparisonChart | components/charts/BrandComparisonChart.tsx | Chart – Area | Multi-brand comparison area chart | T2 | ChartAreaInteractive (partial) |
| 33 | LensProgressChart | components/charts/LensProgressChart.tsx | Chart – Line | Progress tracking across analysis lenses | T2 | ChartLineInteractive (partial) |

### Bar Charts (8)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 34 | VisibilityRankingBars | components/charts/VisibilityRankingBars.tsx | Chart – Bar | Horizontal bars ranking visibility scores | T2 | ChartBarInteractive (partial) |
| 35 | LinkQualityBars | components/charts/LinkQualityBars.tsx | Chart – Stacked Bar | DoFollow vs NoFollow link counts | T2 | ChartBarInteractive (partial) |
| 36 | ShareBars | components/charts/ShareBars.tsx | Chart – Bar | Market share horizontal bars with client highlight | T2 | ChartBarInteractive (partial) |
| 37 | TrafficComparisonBars | components/charts/TrafficComparisonBars.tsx | Chart – Bar | Traffic comparison across domains | T2 | ChartBarInteractive (partial) |
| 38 | SpendComparison | components/charts/SpendComparison.tsx | Chart – Bar | Ad spend comparison across domains | T2 | ChartBarInteractive (partial) |
| 39 | ReferringDomainsRank | components/charts/ReferringDomainsRank.tsx | Chart – Bar | Ranking of referring domains | T2 | ChartBarInteractive (partial) |
| 40 | GapAnalysis | components/charts/GapAnalysis.tsx | Chart – Bar | Keyword gap visualization | T2 | ChartBarInteractive (partial) |
| 41 | VoiceBreakdown | components/charts/VoiceBreakdown.tsx | Chart – Bar | Share of voice breakdown by channel | T2 | ChartBarInteractive (partial) |

### Pie & Donut Charts (2)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 42 | PlatformAdBreakdown | components/charts/PlatformAdBreakdown.tsx | Chart – Pie | Ad spend distribution by platform | T2 | ChartPieInteractive (partial) |
| 43 | KeywordDistributionChart | components/charts/KeywordDistributionChart.tsx | Chart – Pie | Keyword position distribution | T2 | ChartPieInteractive (partial) |

### Radar Charts (2)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 44 | VisibilityRadarChart | components/charts/VisibilityRadarChart.tsx | Chart – Radar | Visibility metrics across dimensions | T2 | — |
| 45 | OpportunityRadar | components/charts/OpportunityRadar.tsx | Chart – Radar | Opportunity vs threat scores per lens | T2 | — |

### Scatter / Matrix Charts (4)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 46 | CompetitiveMatrix | components/charts/CompetitiveMatrix.tsx | Chart – Scatter | Competitive positioning scatter plot | T2 | — |
| 47 | OpportunityMatrix | components/charts/OpportunityMatrix.tsx | Chart – Scatter | Keyword opportunity scatter plot | T2 | — |
| 48 | KeywordROIMatrix | components/charts/KeywordROIMatrix.tsx | Chart – Scatter | Keyword ROI vs cost scatter plot | T2 | — |
| 49 | KeywordVenn | components/charts/KeywordVenn.tsx | Chart – Venn | Shared keywords between domains | T2 | — |

### Distribution Charts (3)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 50 | RatingDistribution | components/charts/RatingDistribution.tsx | Chart – Distribution | Business ratings distribution | T2 | ChartBarInteractive (partial) |
| 51 | RegionalBreakdown | components/charts/RegionalBreakdown.tsx | Chart – Distribution | Geographic distribution of traffic | T2 | ChartBarInteractive (partial) |
| 52 | ThemeAnalysis | components/charts/ThemeAnalysis.tsx | Chart – Distribution | Content theme frequency analysis | T2 | ChartBarInteractive (partial) |

### Data Cards & Feeds (8)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 53 | MentionFeed | components/charts/MentionFeed.tsx | Feed | Scrollable feed of brand mentions with sentiment | T2 | — |
| 54 | QuickWinCards | components/charts/QuickWinCards.tsx | Data Card Grid | Cards highlighting quick-win opportunities | T2 | — |
| 55 | ConsumerIntentCards | components/charts/ConsumerIntentCards.tsx | Data Card Grid | Consumer buying intent signal cards | T2 | — |
| 56 | AdPreviewCards | components/charts/AdPreviewCards.tsx | Data Card Grid | Visual preview of paid advertisements | T2 | — |
| 57 | QuestionMining | components/charts/QuestionMining.tsx | Data Card Grid | User questions with trend indicators | T2 | — |
| 58 | RisingOpportunities | components/charts/RisingOpportunities.tsx | Data Card Grid | Rising/trending topic cards | T2 | — |
| 59 | CreativeGallery | components/charts/CreativeGallery.tsx | Gallery | Gallery of ad creative assets | T2 | — |
| 60 | TrendsHeroModule | components/charts/TrendsHeroModule.tsx | Hero Module | Featured trend display with chart | T2 | — |

### Grids & Rankings (4)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 61 | LocalCompetitorGrid | components/charts/LocalCompetitorGrid.tsx | Data Grid | Grid of local competitors with ratings | T2 | — |
| 62 | PlatformDominanceGrid | components/charts/PlatformDominanceGrid.tsx | Data Grid | Platform presence metrics grid | T2 | — |
| 63 | TopMarketsGrid | components/charts/TopMarketsGrid.tsx | Data Grid | Top geographic markets grid | T2 | — |
| 64 | MarketPodium | components/charts/MarketPodium.tsx | Ranking | Podium-style top-3 visualization | T2 | — |

### Financial Sub-Charts (2)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 65 | EarningsChart | components/tools/financial-picture/EarningsChart.tsx | Chart – Bar | Earnings data over quarters | T2 | ChartBarInteractive (partial) |
| 66 | RevenueChart | components/tools/financial-picture/RevenueChart.tsx | Chart – Area | Revenue trend line | T2 | ChartAreaInteractive (partial) |

### Specialty (2)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 67 | LocalRankingCard | components/charts/LocalRankingCard.tsx | Ranking Card | Local search ranking display | T2 | — |
| 68 | VisibilityRankingBars | components/charts/VisibilityRankingBars.tsx | Chart – Bar | Visibility ranking bars (SEO) | T2 | ChartBarInteractive (partial) |

---

## 4. Tool Analyzer Components (30) — All T3

These are **business-logic orchestrators** that call APIs, manage loading/error states, and compose chart + UI components. They stay in the app.

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 69 | AIDiscoveryAnalyzer | components/tools/AIDiscoveryAnalyzer.tsx | Analyzer | AI visibility and presence analysis | T3 | — |
| 70 | AIVisibilityAnalyzer | components/tools/AIVisibilityAnalyzer.tsx | Analyzer | AI platform visibility scoring | T3 | — |
| 71 | AdCreativeAnalyzer | components/tools/AdCreativeAnalyzer.tsx | Analyzer | Paid ad creative analysis | T3 | — |
| 72 | BacklinkAnalyzer | components/tools/BacklinkAnalyzer.tsx | Analyzer | Backlink quality and authority | T3 | — |
| 73 | BrandPerceptionAnalyzer | components/tools/BrandPerceptionAnalyzer.tsx | Analyzer | Brand sentiment and perception | T3 | — |
| 74 | CompetitiveDominanceAnalyzer | components/tools/CompetitiveDominanceAnalyzer.tsx | Analyzer | Competitive positioning analysis | T3 | — |
| 75 | CreativeLibraryAnalyzer | components/tools/CreativeLibraryAnalyzer.tsx | Analyzer | Ad creative library insights | T3 | — |
| 76 | FinancialPictureAnalyzer | components/tools/FinancialPictureAnalyzer.tsx | Analyzer | Financial metrics and stock data | T3 | — |
| 77 | GeographyAnalyzer | components/tools/GeographyAnalyzer.tsx | Analyzer | Geographic reach analysis | T3 | — |
| 78 | GlobalReachAnalyzer | components/tools/GlobalReachAnalyzer.tsx | Analyzer | International market reach | T3 | — |
| 79 | IndustryTrendsAnalyzer | components/tools/IndustryTrendsAnalyzer.tsx | Analyzer | Industry trend identification | T3 | — |
| 80 | KeywordGapAnalyzer | components/tools/KeywordGapAnalyzer.tsx | Analyzer | Keyword gap analysis | T3 | — |
| 81 | KeywordOpportunityAnalyzer | components/tools/KeywordOpportunityAnalyzer.tsx | Analyzer | Keyword opportunity detection | T3 | — |
| 82 | LinkAuthorityAnalyzer | components/tools/LinkAuthorityAnalyzer.tsx | Analyzer | Link profile and authority | T3 | — |
| 83 | LocalReachAnalyzer | components/tools/LocalReachAnalyzer.tsx | Analyzer | Local search and SEO analysis | T3 | — |
| 84 | MarketIntelligenceAnalyzer | components/tools/MarketIntelligenceAnalyzer.tsx | Analyzer | Market trends and intelligence | T3 | — |
| 85 | NewsAnalyzer | components/tools/NewsAnalyzer.tsx | Analyzer | News and PR analysis | T3 | — |
| 86 | OrganicTrafficAnalyzer | components/tools/OrganicTrafficAnalyzer.tsx | Analyzer | Organic search traffic analysis | T3 | — |
| 87 | PaidMediaAnalyzer | components/tools/PaidMediaAnalyzer.tsx | Analyzer | Paid advertising analysis | T3 | — |
| 88 | PaidMediaIntelligence | components/tools/PaidMediaIntelligence.tsx | Analyzer | Comprehensive paid media intelligence | T3 | — |
| 89 | SEOPerformanceAnalyzer | components/tools/SEOPerformanceAnalyzer.tsx | Analyzer | SEO performance metrics | T3 | — |
| 90 | SentimentAnalyzer | components/tools/SentimentAnalyzer.tsx | Analyzer | Brand sentiment analysis | T3 | — |
| 91 | ShareOfVoiceAnalyzer | components/tools/ShareOfVoiceAnalyzer.tsx | Analyzer | Share of voice metrics | T3 | — |
| 92 | AIDiscoveryPreview | components/tools/AIDiscoveryPreview.tsx | Analyzer Preview | Preview of AI discovery results | T3 | — |
| 93 | ToolsHub | components/tools/ToolsHub.tsx | Dashboard | Central tools dashboard with parallel execution | T3 | — |
| 94 | ToolsHubExportBar | components/tools/ToolsHubExportBar.tsx | Toolbar | Multi-tool export toolbar | T3 | — |
| 95 | ToolExportButton | components/tools/ToolExportButton.tsx | Export Button | Export tool results to Teams | T3 | — |
| 96 | FinancialSearchResults | components/tools/FinancialSearchResults.tsx | Search Results | Financial search results panel | T3 | — |
| 97 | ToolAnalyzerWrapper | components/tools/ToolAnalyzerWrapper.tsx | Wrapper | Common wrapper for all analyzers | T3 | — |
| 98 | CompetitorComparisonTable | components/tools/CompetitorComparisonTable.tsx | Table | Competitor comparison data table | T3 | — |

---

## 5. Tool Input Components (5)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 99 | ToolDomainInput | components/tools/ToolDomainInput.tsx | Domain Input | Mode toggle + domain/ticker input with immersion integration | T3 | — |
| 100 | ToolKeywordInput | components/tools/ToolKeywordInput.tsx | Tag Input | Multi-keyword tag input with add/remove | T2 | — |
| 101 | ToolPreview | components/tools/ToolPreview.tsx | Preview Card | Grayscale preview with CTA overlay | T2 | — |
| 102 | ToolResultsPanel | components/tools/ToolResultsPanel.tsx | Results Panel | Expandable results display panel | T3 | — |
| 103 | ToolLoadingState | components/tools/ToolLoadingState.tsx | Loading State | Tool-specific loading skeleton | T3 | Skeleton (partial) |

---

## 6. Immersion Components (27)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 104 | ImmersionCard | components/immersion/ImmersionCard.tsx | Entity Card | Card showing immersion metadata with delete confirm | T3 | — |
| 105 | IntakeForm | components/immersion/IntakeForm.tsx | Multi-Step Form | 5-step wizard for creating immersions | T3 | — |
| 106 | AnalysisView | components/immersion/AnalysisView.tsx | Dashboard View | Main analysis results display | T3 | — |
| 107 | MetricsDashboard | components/immersion/MetricsDashboard.tsx | Dashboard | KPI cards + charts dashboard | T3 | — |
| 108 | DigitalScorecard | components/immersion/DigitalScorecard.tsx | Scorecard Table | Lens scores table with progress bars | T2 | — |
| 109 | CompetitiveScorecard | components/immersion/CompetitiveScorecard.tsx | Scorecard | Competitive metrics scorecard | T2 | — |
| 110 | CompetitiveInsights | components/immersion/CompetitiveInsights.tsx | Insights Panel | Deep competitive analysis display | T3 | — |
| 111 | CompetitorMatrix | components/immersion/CompetitorMatrix.tsx | Matrix Wrapper | Wrapper around CompetitiveMatrix chart | T3 | — |
| 112 | CrossToolInsights | components/immersion/CrossToolInsights.tsx | Insights Panel | Cross-tool synthesized insights | T3 | — |
| 113 | LensDetail | components/immersion/LensDetail.tsx | Detail View | Single lens analysis detail view | T3 | — |
| 114 | NineBoxNavigator | components/immersion/NineBoxNavigator.tsx | Matrix | 9-box strategy matrix navigator | T3 | — |
| 115 | EditableOverview | components/immersion/EditableOverview.tsx | Editable Section | Inline-editable immersion overview | T3 | — |
| 116 | SentimentAnalysis | components/immersion/SentimentAnalysis.tsx | Analysis Display | Sentiment results with gauge + feed | T3 | — |
| 117 | BriefReadiness | components/immersion/BriefReadiness.tsx | Checklist | Readiness checklist for immersion | T3 | — |
| 118 | StatusBadge | components/immersion/StatusBadge.tsx | Status Badge | Color-coded status badge | T2 | Badge (partial) |
| 119 | AnalysisStatusBanner | components/immersion/AnalysisStatusBanner.tsx | Status Banner | Analysis progress banner | T2 | — |
| 120 | ProgressTracker | components/immersion/ProgressTracker.tsx | Step Indicator | Multi-stage progress indicator | T3 | Progress (partial) |
| 121 | AddOnSelector | components/immersion/AddOnSelector.tsx | Multi-Select | Add-on feature selector dialog | T3 | — |
| 122 | EnhancedExportOptions | components/immersion/EnhancedExportOptions.tsx | Export Menu | Advanced export options (PDF, Teams, PPTX) | T3 | — |
| 123 | ExportOptions | components/immersion/ExportOptions.tsx | Export Menu | Basic export dropdown | T3 | — |
| 124 | ShareButton | components/immersion/ShareButton.tsx | Share Dialog | Share immersion with team members | T3 | — |
| 125 | TeamsConnection | components/immersion/TeamsConnection.tsx | Integration Config | Microsoft Teams connection setup | T3 | — |
| 126 | DeleteImmersionButton | components/immersion/DeleteImmersionButton.tsx | Delete Button | Delete with confirmation dialog | T3 | — |
| 127 | StartAnalysisButton | components/immersion/StartAnalysisButton.tsx | Action Button | Begin analysis trigger | T3 | — |
| 128 | StartCollectionButton | components/immersion/StartCollectionButton.tsx | Action Button | Begin data collection trigger | T3 | — |
| 129 | RerunAnalysisButton | components/immersion/RerunAnalysisButton.tsx | Action Button | Restart analysis trigger | T3 | — |
| 130 | RerunCollectionButton | components/immersion/RerunCollectionButton.tsx | Action Button | Recollect data trigger | T3 | — |

---

## 7. Coaching Components (4)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 131 | PromptLibrary | components/coaching/PromptLibrary.tsx | Searchable List | Filterable grid of prompt cards | T3 | — |
| 132 | PromptCard | components/coaching/PromptCard.tsx | Content Card | Single prompt display card | T2 | — |
| 133 | PromptEditor | components/coaching/PromptEditor.tsx | Editor | Prompt creation/editing form | T3 | — |
| 134 | AddOnLibrary | components/coaching/AddOnLibrary.tsx | Searchable List | Library of add-on features | T3 | — |

---

## 8. Feedback Components (2)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 135 | FeedbackButton | components/feedback/FeedbackButton.tsx | Trigger Button | Opens feedback modal | T3 | — |
| 136 | FeedbackModal | components/feedback/FeedbackModal.tsx | Feedback Form | Modal with type selection + text input | T2 | Dialog (partial) |

---

## 9. Settings (1)

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 137 | TeamManagement | components/settings/TeamManagement.tsx | Settings Panel | Clerk organization management | T3 | — |

---

## 10. Contexts & Providers (2) — All T3

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 138 | ImmersionProvider / useImmersion | contexts/ImmersionContext.tsx | Context Provider | Global immersion state + localStorage | T3 | — |
| 139 | PDFGenerator | lib/pdf-generator.tsx | PDF Utility | @react-pdf/renderer document builder | T3 | — |

---

## 11. Page Components (29) — All T3

Pages are route-level components. They compose UI Kit + app-specific components and are always T3.

| # | Component | Source Path | UI System Type | Usage in Immersion | Tier | @repo/ui Mapping |
|---|-----------|-------------|----------------|-------------------|------|-----------------|
| 140 | RootLayout | app/layout.tsx | Root Layout | HTML + Providers | T3 | — |
| 141 | Homepage | app/page.tsx | Redirect | Redirects to /immersions | T3 | — |
| 142 | SignInPage | app/sign-in/[[...sign-in]]/page.tsx | Auth Page | Clerk sign-in | T3 | — |
| 143 | SignUpPage | app/sign-up/[[...sign-up]]/page.tsx | Auth Page | Clerk sign-up | T3 | — |
| 144 | AuthenticatedLayout | app/(authenticated)/layout.tsx | App Layout | Shell + ImmersionProvider | T3 | — |
| 145 | ImmersionsListPage | app/(authenticated)/immersions/page.tsx | List Page | Immersion grid with create | T3 | — |
| 146 | ImmersionDetailPage | app/(authenticated)/immersions/[id]/page.tsx | Detail Page | Full immersion analysis | T3 | — |
| 147 | NewImmersionPage | app/(authenticated)/immersions/new/page.tsx | Form Page | Create new immersion | T3 | — |
| 148 | AskPage | app/(authenticated)/ask/page.tsx | Chat Page | AI copilot chat interface | T3 | — |
| 149 | CoachingPage | app/(authenticated)/coaching/page.tsx | Management Page | Prompt management | T3 | — |
| 150 | SettingsPage | app/(authenticated)/settings/page.tsx | Settings Page | User/team settings | T3 | — |
| 151 | ToolsPage | app/(authenticated)/tools/page.tsx | Hub Page | Tools dashboard | T3 | — |
| 152 | AIVisibilityToolPage | app/(authenticated)/tools/ai-visibility/page.tsx | Tool Page | AI Visibility tool | T3 | — |
| 153 | OrganicTrafficPage | app/(authenticated)/tools/organic-traffic/page.tsx | Tool Page | Organic traffic tool | T3 | — |
| 154 | PaidMediaPage | app/(authenticated)/tools/paid-media/page.tsx | Tool Page | Paid media tool | T3 | — |
| 155 | SentimentPage | app/(authenticated)/tools/sentiment/page.tsx | Tool Page | Sentiment tool | T3 | — |
| 156 | KeywordGapPage | app/(authenticated)/tools/keyword-gap/page.tsx | Tool Page | Keyword gap tool | T3 | — |
| 157 | ShareOfVoicePage | app/(authenticated)/tools/share-of-voice/page.tsx | Tool Page | Share of voice tool | T3 | — |
| 158 | BacklinksPage | app/(authenticated)/tools/backlinks/page.tsx | Tool Page | Backlinks tool | T3 | — |
| 159 | TrendsPage | app/(authenticated)/tools/trends/page.tsx | Tool Page | Trends tool | T3 | — |
| 160 | GeographyPage | app/(authenticated)/tools/geography/page.tsx | Tool Page | Geography tool | T3 | — |
| 161 | AdCreativePage | app/(authenticated)/tools/ad-creative/page.tsx | Tool Page | Ad creative tool | T3 | — |
| 162 | FinancialPicturePage | app/(authenticated)/tools/financial-picture/page.tsx | Tool Page | Financial picture tool | T3 | — |
| 163 | LocalReachPage | app/(authenticated)/tools/local-reach/page.tsx | Tool Page | Local reach tool | T3 | — |
| 164 | NewsPage | app/(authenticated)/tools/news/page.tsx | Tool Page | News tool | T3 | — |
| 165 | KnowledgeSourcesPage | app/(authenticated)/knowledge/sources/page.tsx | Management Page | Data sources management | T3 | — |

---

## T2 Gap List — Components to Build in @repo/ui

Ordered by reusability and impact across potential client apps.

### Priority 1 — High Reuse (foundational patterns)

| UI System Type | Immersion Examples | Description | Estimated Effort |
|----------------|-------------------|-------------|-----------------|
| **Gauge** | SentimentGauge, AuthorityGauge, PriceRangeGauge | Semicircular/circular score gauge with color thresholds | Medium |
| **Scorecard** | AIPresenceScorecard, DigitalScorecard, CompetitiveScorecard | Grid of KPI metrics with scores and visual indicators | Medium |
| **Status Banner** | AnalysisStatusBanner | Colored banner with icon, message, and progress | Small |
| **Status Badge** | StatusBadge | Extended Badge with color mapping for workflow states | Small |
| **Feed** | MentionFeed | Scrollable feed of items with metadata, icons, and actions | Medium |
| **Data Card Grid** | QuickWinCards, ConsumerIntentCards, AdPreviewCards | Card grid for displaying structured data items | Medium |
| **Tag Input** | ToolKeywordInput | Multi-value input with tag chips and add/remove | Small |
| **App Shell** | Shell | Sidebar + topbar + content layout shell | Large |

### Priority 2 — Chart Patterns (extends existing recharts foundation)

| UI System Type | Immersion Examples | Description | Estimated Effort |
|----------------|-------------------|-------------|-----------------|
| **Chart – Radar** | VisibilityRadarChart, OpportunityRadar | Radar/spider chart pattern | Small |
| **Chart – Scatter/Matrix** | CompetitiveMatrix, OpportunityMatrix, KeywordROIMatrix | Scatter plot with quadrant lines and bubble sizing | Medium |
| **Chart – Stacked Bar** | LinkQualityBars | Stacked bar variant of bar chart | Small |
| **Chart – Venn** | KeywordVenn | Venn diagram overlap visualization | Medium |

### Priority 3 — Specialized Patterns

| UI System Type | Immersion Examples | Description | Estimated Effort |
|----------------|-------------------|-------------|-----------------|
| **Preview Card** | ToolPreview | Grayscale content card with CTA overlay | Small |
| **Gallery** | CreativeGallery | Image/creative asset gallery grid | Medium |
| **Hero Module** | TrendsHeroModule | Featured content display with chart | Medium |
| **Data Grid** | LocalCompetitorGrid, PlatformDominanceGrid, TopMarketsGrid | Structured grid for multi-attribute entities | Medium |
| **Ranking** | MarketPodium, LocalRankingCard | Ranked list / podium visualization | Small |
| **Feedback Form** | FeedbackModal | Modal with type selector, text input, submission | Small |
| **Content Card** | PromptCard | Card with metadata badges, hover actions, selection state | Small |

### Summary: 20 new component types needed across 48 component instances

---

## Shared Patterns & Notes

1. **All 39 chart components use recharts** — The UI Kit already has a `Chart` wrapper (`packages/ui/src/components/ui/chart.tsx`) and 4 interactive chart patterns. Extending this with Radar, Scatter, and Gauge patterns would cover most of the T2 chart gap.

2. **Cards are heavily used** — The UI Kit Card is already T1, but several T2 patterns (Scorecard, Data Card Grid, Preview Card, Content Card) are specialized Card compositions. These could be implemented as Card pattern variants.

3. **The "Gauge" pattern appears 3 times** — SentimentGauge, AuthorityGauge, and PriceRangeGauge share the same visual pattern (semicircular/arc SVG with score display). A single configurable Gauge component would cover all three.

4. **Feed and Data Card Grid are generic patterns** — MentionFeed, QuickWinCards, ConsumerIntentCards, AdPreviewCards, QuestionMining, and RisingOpportunities all follow a "list/grid of cards with structured metadata" pattern. A single flexible Feed/CardGrid component could serve all of them.

5. **Tag Input is a common form pattern** — The ToolKeywordInput pattern (multi-value input with chips) is widely used across apps and should be a core UI Kit form component.
