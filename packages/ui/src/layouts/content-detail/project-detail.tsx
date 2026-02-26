/**
 * ProjectDetail Layout
 *
 * A project detail page with header, stats, tasks, team, and comments.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface ProjectDetailProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  stats?: React.ReactNode
  tasks?: React.ReactNode
  team?: React.ReactNode
  comments?: React.ReactNode
}

export function ProjectDetail({
  header,
  stats,
  tasks,
  team,
  comments,
  children,
  className,
  ...props
}: ProjectDetailProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header}
      {stats}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {tasks}
          {comments}
        </div>
        <div className="space-y-6">
          {team}
          {children}
        </div>
      </div>
    </div>
  )
}
