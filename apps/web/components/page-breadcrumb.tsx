'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/ui/breadcrumb'
import { getBreadcrumbs } from '@/lib/breadcrumbs'
import { useActiveModule } from '@/lib/active-module'

export function PageBreadcrumb() {
  const pathname = usePathname()
  const { activeModule } = useActiveModule()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <Breadcrumb data-slot="page-breadcrumb">
      <BreadcrumbList className="flex items-center gap-1 sm:gap-2 flex-nowrap">
        <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <BreadcrumbItem className="inline">
            {breadcrumbs.length === 0 ? (
              <BreadcrumbPage className="text-sm sm:text-base">{activeModule.name}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href="/" className="text-sm sm:text-base">
                {activeModule.name}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
        </div>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <BreadcrumbItem className="inline">
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage className="text-sm sm:text-base">{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href} className="text-sm sm:text-base">
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
