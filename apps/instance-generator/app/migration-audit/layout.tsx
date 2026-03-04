import { ReactNode } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MigrationAuditLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
        <span className="text-sm font-semibold">Migration Audit</span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col p-6 pt-0">{children}</div>
    </>
  )
}
