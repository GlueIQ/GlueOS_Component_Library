export type MigrationTier = "T1" | "T2" | "T3"

export type ComponentCategory =
  | "UI Primitive"
  | "Layout"
  | "Chart"
  | "Tool Analyzer"
  | "Tool Utility"
  | "Immersion"
  | "Coaching"
  | "Feedback"
  | "Settings"
  | "Provider"
  | "Utility"
  | "Page"

export interface AuditComponent {
  id: number
  name: string
  sourcePath: string
  category: ComponentCategory
  uiSystemType: string
  usage: string
  tier: MigrationTier
  uiKitMapping: string | null
}

export const auditComponents: AuditComponent[] = [
  // ─── UI Primitives (T1) ────────────────────────────────────────
  { id: 1, name: "Button", sourcePath: "components/ui/button.tsx", category: "UI Primitive", uiSystemType: "Button", usage: "Actions, form submits, navigation triggers", tier: "T1", uiKitMapping: "Button" },
  { id: 2, name: "Card", sourcePath: "components/ui/card.tsx", category: "UI Primitive", uiSystemType: "Card", usage: "Content containers throughout app", tier: "T1", uiKitMapping: "Card" },
  { id: 3, name: "Input", sourcePath: "components/ui/input.tsx", category: "UI Primitive", uiSystemType: "Input", usage: "Form text fields, search bars", tier: "T1", uiKitMapping: "Input" },
  { id: 4, name: "Select", sourcePath: "components/ui/select.tsx", category: "UI Primitive", uiSystemType: "Select", usage: "Dropdown pickers for filters, forms", tier: "T1", uiKitMapping: "Select" },
  { id: 5, name: "Checkbox", sourcePath: "components/ui/checkbox.tsx", category: "UI Primitive", uiSystemType: "Checkbox", usage: "Form checkboxes, multi-select lists", tier: "T1", uiKitMapping: "Checkbox" },
  { id: 6, name: "Label", sourcePath: "components/ui/label.tsx", category: "UI Primitive", uiSystemType: "Label", usage: "Form field labels", tier: "T1", uiKitMapping: "Label" },
  { id: 7, name: "Badge", sourcePath: "components/ui/badge.tsx", category: "UI Primitive", uiSystemType: "Badge", usage: "Status indicators, tags, categories", tier: "T1", uiKitMapping: "Badge" },
  { id: 8, name: "Dialog", sourcePath: "components/ui/dialog.tsx", category: "UI Primitive", uiSystemType: "Dialog", usage: "Modals for editing, confirming, creating", tier: "T1", uiKitMapping: "Dialog" },
  { id: 9, name: "Tabs", sourcePath: "components/ui/tabs.tsx", category: "UI Primitive", uiSystemType: "Tabs", usage: "Section navigation in analysis views", tier: "T1", uiKitMapping: "Tabs" },
  { id: 10, name: "Textarea", sourcePath: "components/ui/textarea.tsx", category: "UI Primitive", uiSystemType: "Textarea", usage: "Multi-line input for descriptions, prompts", tier: "T1", uiKitMapping: "Textarea" },
  { id: 11, name: "Avatar", sourcePath: "components/ui/avatar.tsx", category: "UI Primitive", uiSystemType: "Avatar", usage: "User profile pictures, team members", tier: "T1", uiKitMapping: "Avatar" },
  { id: 12, name: "Tooltip", sourcePath: "components/ui/tooltip.tsx", category: "UI Primitive", uiSystemType: "Tooltip", usage: "Hover explanations, info tips", tier: "T1", uiKitMapping: "Tooltip" },
  { id: 13, name: "Switch", sourcePath: "components/ui/switch.tsx", category: "UI Primitive", uiSystemType: "Switch", usage: "Toggle settings, mode switches", tier: "T1", uiKitMapping: "Switch" },
  { id: 14, name: "RadioGroup", sourcePath: "components/ui/radio-group.tsx", category: "UI Primitive", uiSystemType: "RadioGroup", usage: "Feedback type selection, option groups", tier: "T1", uiKitMapping: "RadioGroup" },
  { id: 15, name: "Accordion", sourcePath: "components/ui/accordion.tsx", category: "UI Primitive", uiSystemType: "Accordion", usage: "Expandable sections in analysis views", tier: "T1", uiKitMapping: "Accordion" },
  { id: 16, name: "Popover", sourcePath: "components/ui/popover.tsx", category: "UI Primitive", uiSystemType: "Popover", usage: "Floating panels for quick actions", tier: "T1", uiKitMapping: "Popover" },
  { id: 17, name: "DropdownMenu", sourcePath: "components/ui/dropdown-menu.tsx", category: "UI Primitive", uiSystemType: "DropdownMenu", usage: "Action menus, context menus", tier: "T1", uiKitMapping: "DropdownMenu" },
  { id: 18, name: "Table", sourcePath: "components/ui/table.tsx", category: "UI Primitive", uiSystemType: "Table", usage: "Data tables for lens data, rankings", tier: "T1", uiKitMapping: "Table" },
  { id: 19, name: "Progress", sourcePath: "components/ui/progress.tsx", category: "UI Primitive", uiSystemType: "Progress", usage: "Analysis progress bars, score indicators", tier: "T1", uiKitMapping: "Progress" },
  { id: 20, name: "Sheet", sourcePath: "components/ui/sheet.tsx", category: "UI Primitive", uiSystemType: "Sheet", usage: "Mobile sidebar, detail panels", tier: "T1", uiKitMapping: "Sheet" },
  { id: 21, name: "AlertDialog", sourcePath: "components/ui/alert-dialog.tsx", category: "UI Primitive", uiSystemType: "AlertDialog", usage: "Delete confirmations, destructive actions", tier: "T1", uiKitMapping: "AlertDialog" },
  { id: 22, name: "Skeleton", sourcePath: "components/ui/skeleton.tsx", category: "UI Primitive", uiSystemType: "Skeleton", usage: "Loading placeholders throughout app", tier: "T1", uiKitMapping: "Skeleton" },

  // ─── Layout / Shell ────────────────────────────────────────────
  { id: 23, name: "Shell", sourcePath: "components/Shell.tsx", category: "Layout", uiSystemType: "App Shell", usage: "Main layout with sidebar, topbar, user controls, theme toggle", tier: "T2", uiKitMapping: "Sidebar (partial)" },
  { id: 24, name: "Providers", sourcePath: "components/Providers.tsx", category: "Layout", uiSystemType: "Provider Wrapper", usage: "Root providers (Clerk + ThemeProvider)", tier: "T3", uiKitMapping: null },
  { id: 25, name: "ThemeProvider", sourcePath: "components/ThemeProvider.tsx", category: "Layout", uiSystemType: "Theme Provider", usage: "next-themes dark/light mode integration", tier: "T3", uiKitMapping: null },

  // ─── Charts: Gauges & Scores ───────────────────────────────────
  { id: 26, name: "SentimentGauge", sourcePath: "components/charts/SentimentGauge.tsx", category: "Chart", uiSystemType: "Gauge", usage: "Semicircular score gauge (0-100) with color-coded status", tier: "T2", uiKitMapping: null },
  { id: 27, name: "AuthorityGauge", sourcePath: "components/charts/AuthorityGauge.tsx", category: "Chart", uiSystemType: "Gauge", usage: "Circular domain authority score with competitor comparison", tier: "T2", uiKitMapping: null },
  { id: 28, name: "PriceRangeGauge", sourcePath: "components/tools/financial-picture/PriceRangeGauge.tsx", category: "Chart", uiSystemType: "Gauge", usage: "Stock price range indicator (min/current/max)", tier: "T2", uiKitMapping: null },
  { id: 29, name: "AIPresenceScorecard", sourcePath: "components/charts/AIPresenceScorecard.tsx", category: "Chart", uiSystemType: "Scorecard", usage: "Brand visibility grid across AI platforms", tier: "T2", uiKitMapping: null },

  // ─── Charts: Area & Line ───────────────────────────────────────
  { id: 30, name: "TrafficTrendChart", sourcePath: "components/charts/TrafficTrendChart.tsx", category: "Chart", uiSystemType: "Chart – Area", usage: "Multi-domain area chart with gradient fills, summary stats", tier: "T2", uiKitMapping: "ChartAreaInteractive (partial)" },
  { id: 31, name: "TrendTimeline", sourcePath: "components/charts/TrendTimeline.tsx", category: "Chart", uiSystemType: "Chart – Line", usage: "Timeline of trend data points over time", tier: "T2", uiKitMapping: "ChartLineInteractive (partial)" },
  { id: 32, name: "BrandComparisonChart", sourcePath: "components/charts/BrandComparisonChart.tsx", category: "Chart", uiSystemType: "Chart – Area", usage: "Multi-brand comparison area chart", tier: "T2", uiKitMapping: "ChartAreaInteractive (partial)" },
  { id: 33, name: "LensProgressChart", sourcePath: "components/charts/LensProgressChart.tsx", category: "Chart", uiSystemType: "Chart – Line", usage: "Progress tracking across analysis lenses", tier: "T2", uiKitMapping: "ChartLineInteractive (partial)" },

  // ─── Charts: Bar ───────────────────────────────────────────────
  { id: 34, name: "VisibilityRankingBars", sourcePath: "components/charts/VisibilityRankingBars.tsx", category: "Chart", uiSystemType: "Chart – Bar", usage: "Horizontal bars ranking visibility scores", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 35, name: "LinkQualityBars", sourcePath: "components/charts/LinkQualityBars.tsx", category: "Chart", uiSystemType: "Chart – Stacked Bar", usage: "DoFollow vs NoFollow link counts", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 36, name: "ShareBars", sourcePath: "components/charts/ShareBars.tsx", category: "Chart", uiSystemType: "Chart – Bar", usage: "Market share horizontal bars with client highlight", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 37, name: "TrafficComparisonBars", sourcePath: "components/charts/TrafficComparisonBars.tsx", category: "Chart", uiSystemType: "Chart – Bar", usage: "Traffic comparison across domains", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 38, name: "SpendComparison", sourcePath: "components/charts/SpendComparison.tsx", category: "Chart", uiSystemType: "Chart – Bar", usage: "Ad spend comparison across domains", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 39, name: "ReferringDomainsRank", sourcePath: "components/charts/ReferringDomainsRank.tsx", category: "Chart", uiSystemType: "Chart – Bar", usage: "Ranking of referring domains", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 40, name: "GapAnalysis", sourcePath: "components/charts/GapAnalysis.tsx", category: "Chart", uiSystemType: "Chart – Bar", usage: "Keyword gap visualization", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 41, name: "VoiceBreakdown", sourcePath: "components/charts/VoiceBreakdown.tsx", category: "Chart", uiSystemType: "Chart – Bar", usage: "Share of voice breakdown by channel", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },

  // ─── Charts: Pie & Donut ───────────────────────────────────────
  { id: 42, name: "PlatformAdBreakdown", sourcePath: "components/charts/PlatformAdBreakdown.tsx", category: "Chart", uiSystemType: "Chart – Pie", usage: "Ad spend distribution by platform", tier: "T2", uiKitMapping: "ChartPieInteractive (partial)" },
  { id: 43, name: "KeywordDistributionChart", sourcePath: "components/charts/KeywordDistributionChart.tsx", category: "Chart", uiSystemType: "Chart – Pie", usage: "Keyword position distribution", tier: "T2", uiKitMapping: "ChartPieInteractive (partial)" },

  // ─── Charts: Radar ─────────────────────────────────────────────
  { id: 44, name: "VisibilityRadarChart", sourcePath: "components/charts/VisibilityRadarChart.tsx", category: "Chart", uiSystemType: "Chart – Radar", usage: "Visibility metrics across dimensions", tier: "T2", uiKitMapping: null },
  { id: 45, name: "OpportunityRadar", sourcePath: "components/charts/OpportunityRadar.tsx", category: "Chart", uiSystemType: "Chart – Radar", usage: "Opportunity vs threat scores per lens", tier: "T2", uiKitMapping: null },

  // ─── Charts: Scatter / Matrix ──────────────────────────────────
  { id: 46, name: "CompetitiveMatrix", sourcePath: "components/charts/CompetitiveMatrix.tsx", category: "Chart", uiSystemType: "Chart – Scatter", usage: "Competitive positioning scatter plot", tier: "T2", uiKitMapping: null },
  { id: 47, name: "OpportunityMatrix", sourcePath: "components/charts/OpportunityMatrix.tsx", category: "Chart", uiSystemType: "Chart – Scatter", usage: "Keyword opportunity scatter plot", tier: "T2", uiKitMapping: null },
  { id: 48, name: "KeywordROIMatrix", sourcePath: "components/charts/KeywordROIMatrix.tsx", category: "Chart", uiSystemType: "Chart – Scatter", usage: "Keyword ROI vs cost scatter plot", tier: "T2", uiKitMapping: null },
  { id: 49, name: "KeywordVenn", sourcePath: "components/charts/KeywordVenn.tsx", category: "Chart", uiSystemType: "Chart – Venn", usage: "Shared keywords between domains", tier: "T2", uiKitMapping: null },

  // ─── Charts: Distribution ──────────────────────────────────────
  { id: 50, name: "RatingDistribution", sourcePath: "components/charts/RatingDistribution.tsx", category: "Chart", uiSystemType: "Chart – Distribution", usage: "Business ratings distribution", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 51, name: "RegionalBreakdown", sourcePath: "components/charts/RegionalBreakdown.tsx", category: "Chart", uiSystemType: "Chart – Distribution", usage: "Geographic distribution of traffic", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 52, name: "ThemeAnalysis", sourcePath: "components/charts/ThemeAnalysis.tsx", category: "Chart", uiSystemType: "Chart – Distribution", usage: "Content theme frequency analysis", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },

  // ─── Charts: Data Cards & Feeds ────────────────────────────────
  { id: 53, name: "MentionFeed", sourcePath: "components/charts/MentionFeed.tsx", category: "Chart", uiSystemType: "Feed", usage: "Scrollable feed of brand mentions with sentiment", tier: "T2", uiKitMapping: null },
  { id: 54, name: "QuickWinCards", sourcePath: "components/charts/QuickWinCards.tsx", category: "Chart", uiSystemType: "Data Card Grid", usage: "Cards highlighting quick-win opportunities", tier: "T2", uiKitMapping: null },
  { id: 55, name: "ConsumerIntentCards", sourcePath: "components/charts/ConsumerIntentCards.tsx", category: "Chart", uiSystemType: "Data Card Grid", usage: "Consumer buying intent signal cards", tier: "T2", uiKitMapping: null },
  { id: 56, name: "AdPreviewCards", sourcePath: "components/charts/AdPreviewCards.tsx", category: "Chart", uiSystemType: "Data Card Grid", usage: "Visual preview of paid advertisements", tier: "T2", uiKitMapping: null },
  { id: 57, name: "QuestionMining", sourcePath: "components/charts/QuestionMining.tsx", category: "Chart", uiSystemType: "Data Card Grid", usage: "User questions with trend indicators", tier: "T2", uiKitMapping: null },
  { id: 58, name: "RisingOpportunities", sourcePath: "components/charts/RisingOpportunities.tsx", category: "Chart", uiSystemType: "Data Card Grid", usage: "Rising/trending topic cards", tier: "T2", uiKitMapping: null },
  { id: 59, name: "CreativeGallery", sourcePath: "components/charts/CreativeGallery.tsx", category: "Chart", uiSystemType: "Gallery", usage: "Gallery of ad creative assets", tier: "T2", uiKitMapping: null },
  { id: 60, name: "TrendsHeroModule", sourcePath: "components/charts/TrendsHeroModule.tsx", category: "Chart", uiSystemType: "Hero Module", usage: "Featured trend display with chart", tier: "T2", uiKitMapping: null },

  // ─── Charts: Grids & Rankings ──────────────────────────────────
  { id: 61, name: "LocalCompetitorGrid", sourcePath: "components/charts/LocalCompetitorGrid.tsx", category: "Chart", uiSystemType: "Data Grid", usage: "Grid of local competitors with ratings", tier: "T2", uiKitMapping: null },
  { id: 62, name: "PlatformDominanceGrid", sourcePath: "components/charts/PlatformDominanceGrid.tsx", category: "Chart", uiSystemType: "Data Grid", usage: "Platform presence metrics grid", tier: "T2", uiKitMapping: null },
  { id: 63, name: "TopMarketsGrid", sourcePath: "components/charts/TopMarketsGrid.tsx", category: "Chart", uiSystemType: "Data Grid", usage: "Top geographic markets grid", tier: "T2", uiKitMapping: null },
  { id: 64, name: "MarketPodium", sourcePath: "components/charts/MarketPodium.tsx", category: "Chart", uiSystemType: "Ranking", usage: "Podium-style top-3 visualization", tier: "T2", uiKitMapping: null },

  // ─── Charts: Financial Sub-Charts ──────────────────────────────
  { id: 65, name: "EarningsChart", sourcePath: "components/tools/financial-picture/EarningsChart.tsx", category: "Chart", uiSystemType: "Chart – Bar", usage: "Earnings data over quarters", tier: "T2", uiKitMapping: "ChartBarInteractive (partial)" },
  { id: 66, name: "RevenueChart", sourcePath: "components/tools/financial-picture/RevenueChart.tsx", category: "Chart", uiSystemType: "Chart – Area", usage: "Revenue trend line", tier: "T2", uiKitMapping: "ChartAreaInteractive (partial)" },

  // ─── Charts: Specialty ─────────────────────────────────────────
  { id: 67, name: "LocalRankingCard", sourcePath: "components/charts/LocalRankingCard.tsx", category: "Chart", uiSystemType: "Ranking Card", usage: "Local search ranking display", tier: "T2", uiKitMapping: null },

  // ─── Tool Analyzers (T3) ───────────────────────────────────────
  { id: 68, name: "AIDiscoveryAnalyzer", sourcePath: "components/tools/AIDiscoveryAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "AI visibility and presence analysis", tier: "T3", uiKitMapping: null },
  { id: 69, name: "AIVisibilityAnalyzer", sourcePath: "components/tools/AIVisibilityAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "AI platform visibility scoring", tier: "T3", uiKitMapping: null },
  { id: 70, name: "AdCreativeAnalyzer", sourcePath: "components/tools/AdCreativeAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Paid ad creative analysis", tier: "T3", uiKitMapping: null },
  { id: 71, name: "BacklinkAnalyzer", sourcePath: "components/tools/BacklinkAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Backlink quality and authority", tier: "T3", uiKitMapping: null },
  { id: 72, name: "BrandPerceptionAnalyzer", sourcePath: "components/tools/BrandPerceptionAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Brand sentiment and perception", tier: "T3", uiKitMapping: null },
  { id: 73, name: "CompetitiveDominanceAnalyzer", sourcePath: "components/tools/CompetitiveDominanceAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Competitive positioning analysis", tier: "T3", uiKitMapping: null },
  { id: 74, name: "CreativeLibraryAnalyzer", sourcePath: "components/tools/CreativeLibraryAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Ad creative library insights", tier: "T3", uiKitMapping: null },
  { id: 75, name: "FinancialPictureAnalyzer", sourcePath: "components/tools/FinancialPictureAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Financial metrics and stock data", tier: "T3", uiKitMapping: null },
  { id: 76, name: "GeographyAnalyzer", sourcePath: "components/tools/GeographyAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Geographic reach analysis", tier: "T3", uiKitMapping: null },
  { id: 77, name: "GlobalReachAnalyzer", sourcePath: "components/tools/GlobalReachAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "International market reach", tier: "T3", uiKitMapping: null },
  { id: 78, name: "IndustryTrendsAnalyzer", sourcePath: "components/tools/IndustryTrendsAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Industry trend identification", tier: "T3", uiKitMapping: null },
  { id: 79, name: "KeywordGapAnalyzer", sourcePath: "components/tools/KeywordGapAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Keyword gap analysis", tier: "T3", uiKitMapping: null },
  { id: 80, name: "KeywordOpportunityAnalyzer", sourcePath: "components/tools/KeywordOpportunityAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Keyword opportunity detection", tier: "T3", uiKitMapping: null },
  { id: 81, name: "LinkAuthorityAnalyzer", sourcePath: "components/tools/LinkAuthorityAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Link profile and authority", tier: "T3", uiKitMapping: null },
  { id: 82, name: "LocalReachAnalyzer", sourcePath: "components/tools/LocalReachAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Local search and SEO analysis", tier: "T3", uiKitMapping: null },
  { id: 83, name: "MarketIntelligenceAnalyzer", sourcePath: "components/tools/MarketIntelligenceAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Market trends and intelligence", tier: "T3", uiKitMapping: null },
  { id: 84, name: "NewsAnalyzer", sourcePath: "components/tools/NewsAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "News and PR analysis", tier: "T3", uiKitMapping: null },
  { id: 85, name: "OrganicTrafficAnalyzer", sourcePath: "components/tools/OrganicTrafficAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Organic search traffic analysis", tier: "T3", uiKitMapping: null },
  { id: 86, name: "PaidMediaAnalyzer", sourcePath: "components/tools/PaidMediaAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Paid advertising analysis", tier: "T3", uiKitMapping: null },
  { id: 87, name: "PaidMediaIntelligence", sourcePath: "components/tools/PaidMediaIntelligence.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Comprehensive paid media intelligence", tier: "T3", uiKitMapping: null },
  { id: 88, name: "SEOPerformanceAnalyzer", sourcePath: "components/tools/SEOPerformanceAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "SEO performance metrics", tier: "T3", uiKitMapping: null },
  { id: 89, name: "SentimentAnalyzer", sourcePath: "components/tools/SentimentAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Brand sentiment analysis", tier: "T3", uiKitMapping: null },
  { id: 90, name: "ShareOfVoiceAnalyzer", sourcePath: "components/tools/ShareOfVoiceAnalyzer.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer", usage: "Share of voice metrics", tier: "T3", uiKitMapping: null },
  { id: 91, name: "AIDiscoveryPreview", sourcePath: "components/tools/AIDiscoveryPreview.tsx", category: "Tool Analyzer", uiSystemType: "Analyzer Preview", usage: "Preview of AI discovery results", tier: "T3", uiKitMapping: null },
  { id: 92, name: "ToolsHub", sourcePath: "components/tools/ToolsHub.tsx", category: "Tool Analyzer", uiSystemType: "Dashboard", usage: "Central tools dashboard with parallel execution", tier: "T3", uiKitMapping: null },
  { id: 93, name: "ToolsHubExportBar", sourcePath: "components/tools/ToolsHubExportBar.tsx", category: "Tool Analyzer", uiSystemType: "Toolbar", usage: "Multi-tool export toolbar", tier: "T3", uiKitMapping: null },
  { id: 94, name: "ToolExportButton", sourcePath: "components/tools/ToolExportButton.tsx", category: "Tool Analyzer", uiSystemType: "Export Button", usage: "Export tool results to Teams", tier: "T3", uiKitMapping: null },
  { id: 95, name: "FinancialSearchResults", sourcePath: "components/tools/FinancialSearchResults.tsx", category: "Tool Analyzer", uiSystemType: "Search Results", usage: "Financial search results panel", tier: "T3", uiKitMapping: null },
  { id: 96, name: "ToolAnalyzerWrapper", sourcePath: "components/tools/ToolAnalyzerWrapper.tsx", category: "Tool Analyzer", uiSystemType: "Wrapper", usage: "Common wrapper for all analyzers", tier: "T3", uiKitMapping: null },
  { id: 97, name: "CompetitorComparisonTable", sourcePath: "components/tools/CompetitorComparisonTable.tsx", category: "Tool Analyzer", uiSystemType: "Table", usage: "Competitor comparison data table", tier: "T3", uiKitMapping: null },

  // ─── Tool Utilities ────────────────────────────────────────────
  { id: 98, name: "ToolDomainInput", sourcePath: "components/tools/ToolDomainInput.tsx", category: "Tool Utility", uiSystemType: "Domain Input", usage: "Mode toggle + domain/ticker input with immersion integration", tier: "T3", uiKitMapping: null },
  { id: 99, name: "ToolKeywordInput", sourcePath: "components/tools/ToolKeywordInput.tsx", category: "Tool Utility", uiSystemType: "Tag Input", usage: "Multi-keyword tag input with add/remove", tier: "T2", uiKitMapping: null },
  { id: 100, name: "ToolPreview", sourcePath: "components/tools/ToolPreview.tsx", category: "Tool Utility", uiSystemType: "Preview Card", usage: "Grayscale preview with CTA overlay", tier: "T2", uiKitMapping: null },
  { id: 101, name: "ToolResultsPanel", sourcePath: "components/tools/ToolResultsPanel.tsx", category: "Tool Utility", uiSystemType: "Results Panel", usage: "Expandable results display panel", tier: "T3", uiKitMapping: null },
  { id: 102, name: "ToolLoadingState", sourcePath: "components/tools/ToolLoadingState.tsx", category: "Tool Utility", uiSystemType: "Loading State", usage: "Tool-specific loading skeleton", tier: "T3", uiKitMapping: "Skeleton (partial)" },

  // ─── Immersion Components ──────────────────────────────────────
  { id: 103, name: "ImmersionCard", sourcePath: "components/immersion/ImmersionCard.tsx", category: "Immersion", uiSystemType: "Entity Card", usage: "Card showing immersion metadata with delete confirm", tier: "T3", uiKitMapping: null },
  { id: 104, name: "IntakeForm", sourcePath: "components/immersion/IntakeForm.tsx", category: "Immersion", uiSystemType: "Multi-Step Form", usage: "5-step wizard for creating immersions", tier: "T3", uiKitMapping: null },
  { id: 105, name: "AnalysisView", sourcePath: "components/immersion/AnalysisView.tsx", category: "Immersion", uiSystemType: "Dashboard View", usage: "Main analysis results display", tier: "T3", uiKitMapping: null },
  { id: 106, name: "MetricsDashboard", sourcePath: "components/immersion/MetricsDashboard.tsx", category: "Immersion", uiSystemType: "Dashboard", usage: "KPI cards + charts dashboard", tier: "T3", uiKitMapping: null },
  { id: 107, name: "DigitalScorecard", sourcePath: "components/immersion/DigitalScorecard.tsx", category: "Immersion", uiSystemType: "Scorecard Table", usage: "Lens scores table with progress bars", tier: "T2", uiKitMapping: null },
  { id: 108, name: "CompetitiveScorecard", sourcePath: "components/immersion/CompetitiveScorecard.tsx", category: "Immersion", uiSystemType: "Scorecard", usage: "Competitive metrics scorecard", tier: "T2", uiKitMapping: null },
  { id: 109, name: "CompetitiveInsights", sourcePath: "components/immersion/CompetitiveInsights.tsx", category: "Immersion", uiSystemType: "Insights Panel", usage: "Deep competitive analysis display", tier: "T3", uiKitMapping: null },
  { id: 110, name: "CompetitorMatrix", sourcePath: "components/immersion/CompetitorMatrix.tsx", category: "Immersion", uiSystemType: "Matrix Wrapper", usage: "Wrapper around CompetitiveMatrix chart", tier: "T3", uiKitMapping: null },
  { id: 111, name: "CrossToolInsights", sourcePath: "components/immersion/CrossToolInsights.tsx", category: "Immersion", uiSystemType: "Insights Panel", usage: "Cross-tool synthesized insights", tier: "T3", uiKitMapping: null },
  { id: 112, name: "LensDetail", sourcePath: "components/immersion/LensDetail.tsx", category: "Immersion", uiSystemType: "Detail View", usage: "Single lens analysis detail view", tier: "T3", uiKitMapping: null },
  { id: 113, name: "NineBoxNavigator", sourcePath: "components/immersion/NineBoxNavigator.tsx", category: "Immersion", uiSystemType: "Matrix", usage: "9-box strategy matrix navigator", tier: "T3", uiKitMapping: null },
  { id: 114, name: "EditableOverview", sourcePath: "components/immersion/EditableOverview.tsx", category: "Immersion", uiSystemType: "Editable Section", usage: "Inline-editable immersion overview", tier: "T3", uiKitMapping: null },
  { id: 115, name: "SentimentAnalysis", sourcePath: "components/immersion/SentimentAnalysis.tsx", category: "Immersion", uiSystemType: "Analysis Display", usage: "Sentiment results with gauge + feed", tier: "T3", uiKitMapping: null },
  { id: 116, name: "BriefReadiness", sourcePath: "components/immersion/BriefReadiness.tsx", category: "Immersion", uiSystemType: "Checklist", usage: "Readiness checklist for immersion", tier: "T3", uiKitMapping: null },
  { id: 117, name: "StatusBadge", sourcePath: "components/immersion/StatusBadge.tsx", category: "Immersion", uiSystemType: "Status Badge", usage: "Color-coded status badge", tier: "T2", uiKitMapping: "Badge (partial)" },
  { id: 118, name: "AnalysisStatusBanner", sourcePath: "components/immersion/AnalysisStatusBanner.tsx", category: "Immersion", uiSystemType: "Status Banner", usage: "Analysis progress banner", tier: "T2", uiKitMapping: null },
  { id: 119, name: "ProgressTracker", sourcePath: "components/immersion/ProgressTracker.tsx", category: "Immersion", uiSystemType: "Step Indicator", usage: "Multi-stage progress indicator", tier: "T3", uiKitMapping: "Progress (partial)" },
  { id: 120, name: "AddOnSelector", sourcePath: "components/immersion/AddOnSelector.tsx", category: "Immersion", uiSystemType: "Multi-Select", usage: "Add-on feature selector dialog", tier: "T3", uiKitMapping: null },
  { id: 121, name: "EnhancedExportOptions", sourcePath: "components/immersion/EnhancedExportOptions.tsx", category: "Immersion", uiSystemType: "Export Menu", usage: "Advanced export options (PDF, Teams, PPTX)", tier: "T3", uiKitMapping: null },
  { id: 122, name: "ExportOptions", sourcePath: "components/immersion/ExportOptions.tsx", category: "Immersion", uiSystemType: "Export Menu", usage: "Basic export dropdown", tier: "T3", uiKitMapping: null },
  { id: 123, name: "ShareButton", sourcePath: "components/immersion/ShareButton.tsx", category: "Immersion", uiSystemType: "Share Dialog", usage: "Share immersion with team members", tier: "T3", uiKitMapping: null },
  { id: 124, name: "TeamsConnection", sourcePath: "components/immersion/TeamsConnection.tsx", category: "Immersion", uiSystemType: "Integration Config", usage: "Microsoft Teams connection setup", tier: "T3", uiKitMapping: null },
  { id: 125, name: "DeleteImmersionButton", sourcePath: "components/immersion/DeleteImmersionButton.tsx", category: "Immersion", uiSystemType: "Delete Button", usage: "Delete with confirmation dialog", tier: "T3", uiKitMapping: null },
  { id: 126, name: "StartAnalysisButton", sourcePath: "components/immersion/StartAnalysisButton.tsx", category: "Immersion", uiSystemType: "Action Button", usage: "Begin analysis trigger", tier: "T3", uiKitMapping: null },
  { id: 127, name: "StartCollectionButton", sourcePath: "components/immersion/StartCollectionButton.tsx", category: "Immersion", uiSystemType: "Action Button", usage: "Begin data collection trigger", tier: "T3", uiKitMapping: null },
  { id: 128, name: "RerunAnalysisButton", sourcePath: "components/immersion/RerunAnalysisButton.tsx", category: "Immersion", uiSystemType: "Action Button", usage: "Restart analysis trigger", tier: "T3", uiKitMapping: null },
  { id: 129, name: "RerunCollectionButton", sourcePath: "components/immersion/RerunCollectionButton.tsx", category: "Immersion", uiSystemType: "Action Button", usage: "Recollect data trigger", tier: "T3", uiKitMapping: null },

  // ─── Coaching ──────────────────────────────────────────────────
  { id: 130, name: "PromptLibrary", sourcePath: "components/coaching/PromptLibrary.tsx", category: "Coaching", uiSystemType: "Searchable List", usage: "Filterable grid of prompt cards", tier: "T3", uiKitMapping: null },
  { id: 131, name: "PromptCard", sourcePath: "components/coaching/PromptCard.tsx", category: "Coaching", uiSystemType: "Content Card", usage: "Single prompt display card", tier: "T2", uiKitMapping: null },
  { id: 132, name: "PromptEditor", sourcePath: "components/coaching/PromptEditor.tsx", category: "Coaching", uiSystemType: "Editor", usage: "Prompt creation/editing form", tier: "T3", uiKitMapping: null },
  { id: 133, name: "AddOnLibrary", sourcePath: "components/coaching/AddOnLibrary.tsx", category: "Coaching", uiSystemType: "Searchable List", usage: "Library of add-on features", tier: "T3", uiKitMapping: null },

  // ─── Feedback ──────────────────────────────────────────────────
  { id: 134, name: "FeedbackButton", sourcePath: "components/feedback/FeedbackButton.tsx", category: "Feedback", uiSystemType: "Trigger Button", usage: "Opens feedback modal", tier: "T3", uiKitMapping: null },
  { id: 135, name: "FeedbackModal", sourcePath: "components/feedback/FeedbackModal.tsx", category: "Feedback", uiSystemType: "Feedback Form", usage: "Modal with type selection + text input", tier: "T2", uiKitMapping: "Dialog (partial)" },

  // ─── Settings ──────────────────────────────────────────────────
  { id: 136, name: "TeamManagement", sourcePath: "components/settings/TeamManagement.tsx", category: "Settings", uiSystemType: "Settings Panel", usage: "Clerk organization management", tier: "T3", uiKitMapping: null },

  // ─── Providers ─────────────────────────────────────────────────
  { id: 137, name: "ImmersionProvider", sourcePath: "contexts/ImmersionContext.tsx", category: "Provider", uiSystemType: "Context Provider", usage: "Global immersion state + localStorage", tier: "T3", uiKitMapping: null },
  { id: 138, name: "PDFGenerator", sourcePath: "lib/pdf-generator.tsx", category: "Utility", uiSystemType: "PDF Utility", usage: "@react-pdf/renderer document builder", tier: "T3", uiKitMapping: null },

  // ─── Pages ─────────────────────────────────────────────────────
  { id: 139, name: "RootLayout", sourcePath: "app/layout.tsx", category: "Page", uiSystemType: "Root Layout", usage: "HTML + Providers", tier: "T3", uiKitMapping: null },
  { id: 140, name: "Homepage", sourcePath: "app/page.tsx", category: "Page", uiSystemType: "Redirect", usage: "Redirects to /immersions", tier: "T3", uiKitMapping: null },
  { id: 141, name: "SignInPage", sourcePath: "app/sign-in/[[...sign-in]]/page.tsx", category: "Page", uiSystemType: "Auth Page", usage: "Clerk sign-in", tier: "T3", uiKitMapping: null },
  { id: 142, name: "SignUpPage", sourcePath: "app/sign-up/[[...sign-up]]/page.tsx", category: "Page", uiSystemType: "Auth Page", usage: "Clerk sign-up", tier: "T3", uiKitMapping: null },
  { id: 143, name: "AuthenticatedLayout", sourcePath: "app/(authenticated)/layout.tsx", category: "Page", uiSystemType: "App Layout", usage: "Shell + ImmersionProvider", tier: "T3", uiKitMapping: null },
  { id: 144, name: "ImmersionsListPage", sourcePath: "app/(authenticated)/immersions/page.tsx", category: "Page", uiSystemType: "List Page", usage: "Immersion grid with create", tier: "T3", uiKitMapping: null },
  { id: 145, name: "ImmersionDetailPage", sourcePath: "app/(authenticated)/immersions/[id]/page.tsx", category: "Page", uiSystemType: "Detail Page", usage: "Full immersion analysis", tier: "T3", uiKitMapping: null },
  { id: 146, name: "NewImmersionPage", sourcePath: "app/(authenticated)/immersions/new/page.tsx", category: "Page", uiSystemType: "Form Page", usage: "Create new immersion", tier: "T3", uiKitMapping: null },
  { id: 147, name: "AskPage", sourcePath: "app/(authenticated)/ask/page.tsx", category: "Page", uiSystemType: "Chat Page", usage: "AI copilot chat interface", tier: "T3", uiKitMapping: null },
  { id: 148, name: "CoachingPage", sourcePath: "app/(authenticated)/coaching/page.tsx", category: "Page", uiSystemType: "Management Page", usage: "Prompt management", tier: "T3", uiKitMapping: null },
  { id: 149, name: "SettingsPage", sourcePath: "app/(authenticated)/settings/page.tsx", category: "Page", uiSystemType: "Settings Page", usage: "User/team settings", tier: "T3", uiKitMapping: null },
  { id: 150, name: "ToolsPage", sourcePath: "app/(authenticated)/tools/page.tsx", category: "Page", uiSystemType: "Hub Page", usage: "Tools dashboard", tier: "T3", uiKitMapping: null },
  { id: 151, name: "AIVisibilityToolPage", sourcePath: "app/(authenticated)/tools/ai-visibility/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "AI Visibility tool", tier: "T3", uiKitMapping: null },
  { id: 152, name: "OrganicTrafficPage", sourcePath: "app/(authenticated)/tools/organic-traffic/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Organic traffic tool", tier: "T3", uiKitMapping: null },
  { id: 153, name: "PaidMediaPage", sourcePath: "app/(authenticated)/tools/paid-media/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Paid media tool", tier: "T3", uiKitMapping: null },
  { id: 154, name: "SentimentPage", sourcePath: "app/(authenticated)/tools/sentiment/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Sentiment tool", tier: "T3", uiKitMapping: null },
  { id: 155, name: "KeywordGapPage", sourcePath: "app/(authenticated)/tools/keyword-gap/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Keyword gap tool", tier: "T3", uiKitMapping: null },
  { id: 156, name: "ShareOfVoicePage", sourcePath: "app/(authenticated)/tools/share-of-voice/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Share of voice tool", tier: "T3", uiKitMapping: null },
  { id: 157, name: "BacklinksPage", sourcePath: "app/(authenticated)/tools/backlinks/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Backlinks tool", tier: "T3", uiKitMapping: null },
  { id: 158, name: "TrendsPage", sourcePath: "app/(authenticated)/tools/trends/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Trends tool", tier: "T3", uiKitMapping: null },
  { id: 159, name: "GeographyPage", sourcePath: "app/(authenticated)/tools/geography/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Geography tool", tier: "T3", uiKitMapping: null },
  { id: 160, name: "AdCreativePage", sourcePath: "app/(authenticated)/tools/ad-creative/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Ad creative tool", tier: "T3", uiKitMapping: null },
  { id: 161, name: "FinancialPicturePage", sourcePath: "app/(authenticated)/tools/financial-picture/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Financial picture tool", tier: "T3", uiKitMapping: null },
  { id: 162, name: "LocalReachPage", sourcePath: "app/(authenticated)/tools/local-reach/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "Local reach tool", tier: "T3", uiKitMapping: null },
  { id: 163, name: "NewsPage", sourcePath: "app/(authenticated)/tools/news/page.tsx", category: "Page", uiSystemType: "Tool Page", usage: "News tool", tier: "T3", uiKitMapping: null },
  { id: 164, name: "KnowledgeSourcesPage", sourcePath: "app/(authenticated)/knowledge/sources/page.tsx", category: "Page", uiSystemType: "Management Page", usage: "Data sources management", tier: "T3", uiKitMapping: null },
  { id: 165, name: "KnowledgeBasePage", sourcePath: "app/(authenticated)/knowledge/base/page.tsx", category: "Page", uiSystemType: "Search Page", usage: "Knowledge base search", tier: "T3", uiKitMapping: null },
]

// ─── Derived Helpers ─────────────────────────────────────────────

export function getByTier(tier: MigrationTier) {
  return auditComponents.filter((c) => c.tier === tier)
}

export function getByCategory(category: ComponentCategory) {
  return auditComponents.filter((c) => c.category === category)
}

export const tierCounts = {
  T1: auditComponents.filter((c) => c.tier === "T1").length,
  T2: auditComponents.filter((c) => c.tier === "T2").length,
  T3: auditComponents.filter((c) => c.tier === "T3").length,
  total: auditComponents.length,
}

export const categoryCounts = Object.entries(
  auditComponents.reduce(
    (acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  ),
).sort(([, a], [, b]) => b - a)

export const tierColors: Record<MigrationTier, string> = {
  T1: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  T2: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  T3: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
}

export const tierLabels: Record<MigrationTier, string> = {
  T1: "Direct Match",
  T2: "UI Kit Gap",
  T3: "App-Specific",
}
