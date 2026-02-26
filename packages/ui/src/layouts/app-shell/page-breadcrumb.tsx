"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb"
import { useActiveModule } from "./active-module"

export interface BreadcrumbEntry {
  label: string
  href: string
}

export function PageBreadcrumb({
  breadcrumbs = [],
}: {
  breadcrumbs?: BreadcrumbEntry[]
}) {
  const { activeModule } = useActiveModule()

  return (
    <Breadcrumb data-slot="page-breadcrumb">
      <BreadcrumbList className="flex flex-nowrap items-center gap-1 sm:gap-2">
        <div className="flex items-center gap-1 whitespace-nowrap sm:gap-2">
          <BreadcrumbItem className="inline">
            {breadcrumbs.length === 0 ? (
              <BreadcrumbPage className="text-sm sm:text-base">
                {activeModule.name}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink href="/" className="text-sm sm:text-base">
                {activeModule.name}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
        </div>
        {breadcrumbs.map((crumb, index) => (
          <div
            key={crumb.href}
            className="flex items-center gap-1 whitespace-nowrap sm:gap-2"
          >
            <BreadcrumbItem className="inline">
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage className="text-sm sm:text-base">
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={crumb.href}
                  className="text-sm sm:text-base"
                >
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
