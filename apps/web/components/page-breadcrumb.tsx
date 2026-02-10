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

export function PageBreadcrumb() {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1 sm:gap-2 flex-nowrap">
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
