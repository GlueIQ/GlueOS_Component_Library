export interface Breadcrumb {
  label: string
  href: string
}

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const breadcrumbMap: Record<string, Breadcrumb[]> = {
    '/overview': [{ label: 'Overview', href: '/overview' }],
    '/generator': [{ label: 'Generator', href: '/generator' }],
  }

  return breadcrumbMap[pathname] || []
}
