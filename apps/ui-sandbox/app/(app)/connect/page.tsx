"use client"

import { useState } from "react"
import { Activity, AlertCircle, CheckCircle2, Clock, Database, RefreshCw, Wifi, WifiOff } from "lucide-react"

import { Container } from "@repo/ui/components/ui/container"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { Separator } from "@repo/ui/components/ui/separator"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { StatsGrid } from "@repo/ui/patterns/data-visualization/stats-grid"

// ---------------------------------------------------------------------------
// Knowledge Graph
// ---------------------------------------------------------------------------

type NodeType   = "source" | "hub" | "module"
type NodeStatus = "healthy" | "warning" | "error"

interface KGNode {
  id:       string
  label:    string
  sublabel: string
  abbr:     string
  type:     NodeType
  x:        number
  y:        number
  color:    string
  status?:  NodeStatus
}

interface KGEdge { from: string; to: string }

const HX = 450
const HY = 228
const R: Record<NodeType, number> = { source: 20, hub: 32, module: 20 }

const kgNodes: KGNode[] = [
  // Sources — left column, 8 nodes centered on HY=228
  { id: "google-ads",   abbr: "GA", label: "Google Ads",    sublabel: "Paid Search",       type: "source", x: 160, y:  35, color: "#3b82f6", status: "healthy" },
  { id: "meta-ads",     abbr: "FB", label: "Meta Ads",       sublabel: "Paid Social",       type: "source", x: 160, y:  90, color: "#6366f1", status: "healthy" },
  { id: "salesforce",   abbr: "SF", label: "Salesforce",     sublabel: "CRM",               type: "source", x: 160, y: 145, color: "#0ea5e9", status: "healthy" },
  { id: "hubspot",      abbr: "HS", label: "HubSpot",         sublabel: "CRM",               type: "source", x: 160, y: 200, color: "#f97316", status: "warning" },
  { id: "linkedin",     abbr: "LI", label: "LinkedIn Ads",   sublabel: "Paid Social",       type: "source", x: 160, y: 255, color: "#1e40af", status: "healthy" },
  { id: "marketo",      abbr: "MK", label: "Marketo",         sublabel: "Marketing Auto.",   type: "source", x: 160, y: 310, color: "#9333ea", status: "error"   },
  { id: "snowflake",    abbr: "SN", label: "Snowflake",       sublabel: "Data Warehouse",    type: "source", x: 160, y: 365, color: "#06b6d4", status: "healthy" },
  { id: "ga4",          abbr: "G4", label: "GA4",             sublabel: "Web Analytics",     type: "source", x: 160, y: 420, color: "#f59e0b", status: "healthy" },
  // Hub — center
  { id: "glue",         abbr: "GL", label: "GlueOS Connect", sublabel: "Knowledge Graph",   type: "hub",    x: HX,  y: HY,  color: "#6366f1" },
  // Modules — right column, 5 nodes centered on HY=228
  { id: "intelligence", abbr: "IN", label: "Intelligence",    sublabel: "Perf. Analytics",   type: "module", x: 740, y:  84, color: "#3b82f6" },
  { id: "zoltar",       abbr: "ZL", label: "Zoltar",          sublabel: "Forecasting",       type: "module", x: 740, y: 156, color: "#8b5cf6" },
  { id: "horizon",      abbr: "HZ", label: "Horizon",         sublabel: "Strategic Planning",type: "module", x: 740, y: 228, color: "#10b981" },
  { id: "optimize",     abbr: "OP", label: "Optimize",        sublabel: "Optimization",      type: "module", x: 740, y: 300, color: "#f59e0b" },
  { id: "lumen",        abbr: "LU", label: "Lumen",           sublabel: "Exec. Intelligence",type: "module", x: 740, y: 372, color: "#06b6d4" },
]

const kgEdges: KGEdge[] = [
  ...kgNodes.filter(n => n.type === "source").map(n => ({ from: n.id, to: "glue" })),
  ...kgNodes.filter(n => n.type === "module").map(n => ({ from: "glue", to: n.id })),
]

const kgInfo: Record<string, { headline: string; detail: string }> = {
  "google-ads":   { headline: "Google Ads — Paid Search",              detail: "Status: Healthy · Last sync 4 min ago · 24.1K campaign metric records" },
  "meta-ads":     { headline: "Meta Ads — Paid Social",                detail: "Status: Healthy · Last sync 6 min ago · 18.7K records synced" },
  "salesforce":   { headline: "Salesforce — CRM",                      detail: "Status: Healthy · Last sync 12 min ago · 9.4K contact and pipeline records" },
  "hubspot":      { headline: "HubSpot — CRM",                         detail: "Status: Degraded · Rate limit exceeded · Partial sync: 4.1K / 6.2K records" },
  "linkedin":     { headline: "LinkedIn Ads — Paid Social",            detail: "Status: Healthy · Last sync 8 min ago · 11.3K ad performance records" },
  "marketo":      { headline: "Marketo — Marketing Automation",        detail: "Status: Error · Auth token expired · Last successful sync: 3 hours ago" },
  "snowflake":    { headline: "Snowflake — Data Warehouse",            detail: "Status: Healthy · Last sync 22 min ago · 142K records — largest source" },
  "ga4":          { headline: "GA4 — Web Analytics",                   detail: "Status: Healthy · Last sync 15 min ago · 88.4K behavioral event records" },
  "glue":         { headline: "GlueOS Connect — Knowledge Graph",      detail: "14 connected sources · 5 intelligent modules · 330K+ records unified · 92% sync health" },
  "intelligence": { headline: "Intelligence — Performance Analytics",  detail: "Receives: Campaign metrics, CRM pipeline, Web behavior, Paid social signals" },
  "zoltar":       { headline: "Zoltar — Predictive Forecasting",       detail: "Receives: Pipeline data, CRM signals, Historical spend, Conversion patterns" },
  "horizon":      { headline: "Horizon — Strategic Planning",          detail: "Receives: Market signals, Budget actuals, Initiative progress, Competitive data" },
  "optimize":     { headline: "Optimize — Campaign Optimization",      detail: "Receives: Channel performance, Creative metrics, Bid data, Audience segments" },
  "lumen":        { headline: "Lumen — Executive Intelligence",        detail: "Receives: Blended KPIs, Brand health, Market position, Financial performance" },
}

function KnowledgeGraph() {
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered,  setHovered]  = useState<string | null>(null)
  const active = selected ?? hovered

  // Edge appearance helpers
  const edgeStroke = (e: KGEdge): string => {
    const from = kgNodes.find(n => n.id === e.from)!
    if (from.type === "source") {
      return from.status === "error" ? "#ef4444" : from.status === "warning" ? "#f59e0b" : "#10b981"
    }
    return kgNodes.find(n => n.id === e.to)?.color ?? "#6366f1"
  }

  const edgeOpacity = (e: KGEdge): number => {
    if (!active) return 0.25
    const at = kgNodes.find(n => n.id === active)?.type
    if (active === "glue")  return 0.65
    if (at === "source") { if (e.from === active) return 0.9; if (e.from === "glue") return 0.45; return 0.04 }
    if (at === "module") { if (e.to === active)   return 0.9; if (e.to === "glue")   return 0.45; return 0.04 }
    return 0.25
  }

  const edgeWidth = (e: KGEdge): number => {
    if (!active) return 1
    const at = kgNodes.find(n => n.id === active)?.type
    if (active === "glue") return 1.5
    if (at === "source" && (e.from === active || e.from === "glue")) return 2
    if (at === "module" && (e.to   === active || e.to   === "glue")) return 2
    return 1
  }

  const nodeOp = (id: string): number => {
    if (!active || id === active || id === "glue") return 1
    const at = kgNodes.find(n => n.id === active)?.type
    const tt = kgNodes.find(n => n.id === id)?.type
    if (active === "glue") return 0.75
    if (at === "source") return tt === "source" ? 0.12 : 0.75
    if (at === "module") return tt === "module" ? 0.12 : 0.75
    return 1
  }

  const info = active ? kgInfo[active] : null

  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="inline-block size-2 rounded-full bg-emerald-500" />Healthy</span>
        <span className="flex items-center gap-1.5"><span className="inline-block size-2 rounded-full bg-amber-500"  />Degraded</span>
        <span className="flex items-center gap-1.5"><span className="inline-block size-2 rounded-full bg-red-500"    />Error</span>
        <span className="ml-auto hidden sm:inline">Click any node to explore connections</span>
      </div>

      {/* SVG canvas */}
      <div className="rounded-lg border bg-muted/20 overflow-hidden">
        <svg
          viewBox="0 0 900 470"
          className="w-full"
          style={{ display: "block" }}
          aria-label="Interactive knowledge graph showing data sources connected to GlueOS modules"
        >
          {/* Edges */}
          {kgEdges.map((edge, i) => {
            const from = kgNodes.find(n => n.id === edge.from)!
            const to   = kgNodes.find(n => n.id === edge.to)!
            const mx   = (from.x + to.x) / 2
            const d    = from.type === "source"
              ? `M ${from.x} ${from.y} C ${mx} ${from.y} ${mx} ${HY} ${HX} ${HY}`
              : `M ${HX} ${HY} C ${mx} ${HY} ${mx} ${to.y} ${to.x} ${to.y}`
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={edgeStroke(edge)}
                strokeWidth={edgeWidth(edge)}
                opacity={edgeOpacity(edge)}
                strokeLinecap="round"
                style={{ transition: "opacity 0.18s ease, stroke-width 0.15s ease" }}
              />
            )
          })}

          {/* Nodes */}
          {kgNodes.map((node) => {
            const r      = R[node.type]
            const isSel  = node.id === selected
            const isHov  = node.id === hovered && !isSel
            const isHub  = node.type === "hub"
            const sColor = node.status === "error" ? "#ef4444" : node.status === "warning" ? "#f59e0b" : null

            return (
              <g
                key={node.id}
                opacity={nodeOp(node.id)}
                style={{ cursor: "pointer", transition: "opacity 0.18s ease" }}
                onClick={() => setSelected(selected === node.id ? null : node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Selection glow */}
                {isSel && <circle cx={node.x} cy={node.y} r={r + 9}  fill={node.color} opacity={0.18} />}
                {/* Hover ring */}
                {isHov && <circle cx={node.x} cy={node.y} r={r + 6}  fill="none" stroke={node.color} strokeWidth={1.5} opacity={0.3} />}
                {/* Status ring (warning / error) */}
                {sColor && <circle cx={node.x} cy={node.y} r={r + 3}  fill="none" stroke={sColor} strokeWidth={2} opacity={0.65} />}
                {/* Main circle */}
                <circle cx={node.x} cy={node.y} r={r} fill={node.color} />
                {/* Hub inner detail ring */}
                {isHub && <circle cx={node.x} cy={node.y} r={r - 9} fill="none" stroke="white" strokeWidth={1} opacity={0.3} />}
                {/* Abbreviation inside circle */}
                <text
                  x={node.x} y={node.y + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="white"
                  fontSize={isHub ? 12 : 9}
                  fontWeight="700"
                  letterSpacing="0.05em"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {node.abbr}
                </text>

                {/* Source labels (left) */}
                {node.type === "source" && <>
                  <text x={node.x - r - 9} y={node.y - 5}  textAnchor="end" fontSize={11} fontWeight="500" fill="currentColor" style={{ pointerEvents: "none", userSelect: "none" }}>{node.label}</text>
                  <text x={node.x - r - 9} y={node.y + 8}  textAnchor="end" fontSize={9}  fill="currentColor" opacity={0.5}    style={{ pointerEvents: "none", userSelect: "none" }}>{node.sublabel}</text>
                </>}

                {/* Hub labels (below) */}
                {node.type === "hub" && <>
                  <text x={node.x} y={node.y + r + 14} textAnchor="middle" fontSize={11} fontWeight="600" fill="currentColor" style={{ pointerEvents: "none", userSelect: "none" }}>{node.label}</text>
                  <text x={node.x} y={node.y + r + 27} textAnchor="middle" fontSize={9}  fill="currentColor" opacity={0.5}    style={{ pointerEvents: "none", userSelect: "none" }}>{node.sublabel}</text>
                </>}

                {/* Module labels (right) */}
                {node.type === "module" && <>
                  <text x={node.x + r + 9} y={node.y - 5}  textAnchor="start" fontSize={11} fontWeight="500" fill="currentColor" style={{ pointerEvents: "none", userSelect: "none" }}>{node.label}</text>
                  <text x={node.x + r + 9} y={node.y + 8}  textAnchor="start" fontSize={9}  fill="currentColor" opacity={0.5}    style={{ pointerEvents: "none", userSelect: "none" }}>{node.sublabel}</text>
                </>}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Info panel */}
      <div className="min-h-[60px] rounded-md border bg-muted/30 px-4 py-3 flex items-center transition-all">
        {info ? (
          <div>
            <p className="text-sm font-medium">{info.headline}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{info.detail}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Click any node to explore data connections across the knowledge graph</p>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page data
// ---------------------------------------------------------------------------

const stats = [
  { label: "Connected Sources", value: "14", icon: <Database className="size-4" />, description: "Across 5 categories" },
  { label: "Sync Health",        value: "92%", icon: <Activity className="size-4" />, trend: { value: 2, label: "vs last week" } },
  { label: "Failed Syncs (24h)", value: "3",   icon: <AlertCircle className="size-4" />, description: "2 require attention" },
  { label: "Avg Freshness",      value: "18 min", icon: <Clock className="size-4" />, description: "Across all active syncs" },
]

interface Integration {
  id: string; name: string; category: string
  status: "healthy" | "warning" | "error"
  lastSync: string; records: string; color: string
}

const integrations: Integration[] = [
  { id: "1", name: "Google Ads",       category: "Paid Search",      status: "healthy", lastSync: "4 min ago",  records: "24.1K", color: "bg-blue-500"    },
  { id: "2", name: "Meta Ads",         category: "Paid Social",       status: "healthy", lastSync: "6 min ago",  records: "18.7K", color: "bg-indigo-500"  },
  { id: "3", name: "Salesforce",       category: "CRM",               status: "healthy", lastSync: "12 min ago", records: "9.4K",  color: "bg-sky-500"     },
  { id: "4", name: "HubSpot",          category: "CRM",               status: "warning", lastSync: "41 min ago", records: "6.2K",  color: "bg-orange-500"  },
  { id: "5", name: "LinkedIn Ads",     category: "Paid Social",       status: "healthy", lastSync: "8 min ago",  records: "11.3K", color: "bg-blue-700"    },
  { id: "6", name: "Marketo",          category: "Marketing Auto.",   status: "error",   lastSync: "3 hr ago",   records: "31.8K", color: "bg-purple-600"  },
  { id: "7", name: "Snowflake",        category: "Data Warehouse",    status: "healthy", lastSync: "22 min ago", records: "142K",  color: "bg-cyan-500"    },
  { id: "8", name: "Google Analytics", category: "Web Analytics",     status: "healthy", lastSync: "15 min ago", records: "88.4K", color: "bg-amber-500"   },
]

const statusIcon: Record<string, React.ReactNode> = {
  healthy: <CheckCircle2 className="size-3.5 text-emerald-500" />,
  warning: <AlertCircle  className="size-3.5 text-amber-500"  />,
  error:   <WifiOff      className="size-3.5 text-red-500"    />,
}

const statusLabel: Record<string, string> = {
  healthy: "Healthy", warning: "Degraded", error: "Error",
}

interface SyncError {
  id: string; source: string; errorType: string
  time: string; records: string
  status: "Retrying" | "Failed" | "Resolved"
}

const syncErrors: SyncError[] = [
  { id: "1", source: "Marketo",      errorType: "Auth token expired",    time: "3 hr ago",   records: "0 synced",               status: "Failed"   },
  { id: "2", source: "HubSpot",      errorType: "Rate limit exceeded",   time: "41 min ago", records: "Partial — 4.1K/6.2K",    status: "Retrying" },
  { id: "3", source: "Salesforce",   errorType: "Schema drift detected", time: "Yesterday",  records: "Resolved after replay",   status: "Resolved" },
  { id: "4", source: "Google Ads",   errorType: "API quota warning",     time: "Yesterday",  records: "Full sync completed",     status: "Resolved" },
  { id: "5", source: "Snowflake",    errorType: "Timeout — large table", time: "2 days ago", records: "Resolved — index added",  status: "Resolved" },
]

const errorStatusStyles: Record<string, string> = {
  Retrying: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Failed:   "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  Resolved: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ConnectPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Connect"
        description="Data integration hub — connected sources, knowledge graph, and pipeline health."
        actions={<Button>Add Integration</Button>}
      />

      {/* Data Health Signal */}
      <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 dark:border-green-800 dark:bg-green-950/40">
        <div className="flex items-start gap-3">
          <Database className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
              Data Health Signal
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-green-900 dark:text-green-200">
              14 sources are connected with overall sync health at 92%. 3 sync failures occurred in the last 24 hours — Marketo authentication expired, blocking campaign data from flowing into Intelligence and Optimize. Average data freshness is 18 minutes across healthy connectors. Resolve the Marketo token to restore full pipeline visibility.
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* Knowledge Graph */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Knowledge Graph</CardTitle>
              <CardDescription>
                Live data flows from connected sources through GlueOS into downstream intelligence modules
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">View Schema</Button>
          </div>
        </CardHeader>
        <CardContent>
          <KnowledgeGraph />
        </CardContent>
      </Card>

      {/* Integration grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Connected Sources</h2>
          <Button variant="ghost" size="sm">Run Diagnostics</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((integration) => (
            <Card key={integration.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className={`size-9 rounded-lg ${integration.color} flex items-center justify-center shrink-0`}>
                    <Wifi className="size-4 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    {statusIcon[integration.status]}
                    <span className="text-xs text-muted-foreground">{statusLabel[integration.status]}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold">{integration.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{integration.category}</p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-md bg-muted/50 p-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Last sync</p>
                    <p className="text-xs font-medium">{integration.lastSync}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Records</p>
                    <p className="text-xs font-medium">{integration.records}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sync errors */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CardTitle>Recent Sync Errors</CardTitle>
              <Badge variant="destructive" className="text-xs">3 active</Badge>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">Retry Failed</Button>
          </div>
          <CardDescription>Sync failures and warnings from the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {syncErrors.map((e, i) => (
              <div key={e.id}>
                <div className="flex items-center justify-between gap-4 py-3 px-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <RefreshCw className="size-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{e.source}</p>
                        <span className="text-xs text-muted-foreground">{e.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{e.errorType} · {e.records}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`shrink-0 ${errorStatusStyles[e.status]}`}>
                    {e.status}
                  </Badge>
                </div>
                {i < syncErrors.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
