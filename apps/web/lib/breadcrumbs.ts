export interface Breadcrumb {
  label: string
  href: string
}

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const breadcrumbMap: Record<string, Breadcrumb[]> = {
    '/dashboard': [{ label: 'Dashboards', href: '/dashboard' }],
    '/dashboard/my-day': [
      { label: 'Dashboards', href: '/dashboard' },
      { label: 'My Day', href: '/dashboard/my-day' },
    ],
    '/dashboard/my-assignments': [
      { label: 'Dashboards', href: '/dashboard' },
      { label: 'My Assignments', href: '/dashboard/my-assignments' },
    ],
    '/dashboard/my-contributions': [
      { label: 'Dashboards', href: '/dashboard' },
      { label: 'My Contributions', href: '/dashboard/my-contributions' },
    ],
    '/dashboard/leaderboards': [
      { label: 'Dashboards', href: '/dashboard' },
      { label: 'Leaderboards', href: '/dashboard/leaderboards' },
    ],
    '/clients': [{ label: 'Clients', href: '/clients' }],
    '/clients/client-goals': [
      { label: 'Clients', href: '/clients' },
      { label: 'Client Goals', href: '/clients/client-goals' },
    ],
    '/clients/performance': [
      { label: 'Clients', href: '/clients' },
      { label: 'Performance', href: '/clients/performance' },
    ],
    '/tools': [{ label: 'Tools', href: '/tools' }],
    '/tools/claude-skills': [
      { label: 'Tools', href: '/tools' },
      { label: 'Claude Skills', href: '/tools/claude-skills' },
    ],
    '/tools/studio-fx': [
      { label: 'Tools', href: '/tools' },
      { label: 'Studio FX', href: '/tools/studio-fx' },
    ],
    '/tools/workflows': [
      { label: 'Tools', href: '/tools' },
      { label: 'Workflows', href: '/tools/workflows' },
    ],
    '/tools/maker-tools': [
      { label: 'Tools', href: '/tools' },
      { label: 'Maker Tools', href: '/tools/maker-tools' },
    ],
    '/analytics': [{ label: 'Analytics', href: '/analytics' }],
    '/analytics/individual': [
      { label: 'Analytics', href: '/analytics' },
      { label: 'Individual', href: '/analytics/individual' },
    ],
    '/analytics/team': [
      { label: 'Analytics', href: '/analytics' },
      { label: 'Team', href: '/analytics/team' },
    ],
    '/analytics/client': [
      { label: 'Analytics', href: '/analytics' },
      { label: 'Client', href: '/analytics/client' },
    ],
    '/active-work': [{ label: 'Active Work', href: '/active-work' }],
    '/active-work/all-work': [
      { label: 'Active Work', href: '/active-work' },
      { label: 'All Work', href: '/active-work/all-work' },
    ],
    '/active-work/retainers': [
      { label: 'Active Work', href: '/active-work' },
      { label: 'Retainers', href: '/active-work/retainers' },
    ],
    '/active-work/projects': [
      { label: 'Active Work', href: '/active-work' },
      { label: 'Projects', href: '/active-work/projects' },
    ],
    '/domain-hubs': [{ label: 'Domain Hubs', href: '/domain-hubs' }],
    '/domain-hubs/client-delivery': [
      { label: 'Domain Hubs', href: '/domain-hubs' },
      { label: 'Client Delivery', href: '/domain-hubs/client-delivery' },
    ],
    '/domain-hubs/strategy': [
      { label: 'Domain Hubs', href: '/domain-hubs' },
      { label: 'Strategy', href: '/domain-hubs/strategy' },
    ],
    '/domain-hubs/creative': [
      { label: 'Domain Hubs', href: '/domain-hubs' },
      { label: 'Creative', href: '/domain-hubs/creative' },
    ],
    '/domain-hubs/media-performance': [
      { label: 'Domain Hubs', href: '/domain-hubs' },
      { label: 'Media & Performance', href: '/domain-hubs/media-performance' },
    ],
    '/domain-hubs/data-analytics': [
      { label: 'Domain Hubs', href: '/domain-hubs' },
      { label: 'Data & Analytics', href: '/domain-hubs/data-analytics' },
    ],
    '/domain-hubs/technology-ai': [
      { label: 'Domain Hubs', href: '/domain-hubs' },
      { label: 'Technology & AI', href: '/domain-hubs/technology-ai' },
    ],
    '/domain-hubs/operations': [
      { label: 'Domain Hubs', href: '/domain-hubs' },
      { label: 'Operations', href: '/domain-hubs/operations' },
    ],
    '/knowledge/ask-glueiq': [
      { label: 'Ask GlueIQ', href: '/knowledge/ask-glueiq' },
    ],
    '/knowledge/training-paths': [
      { label: 'Training Paths', href: '/knowledge/training-paths' },
    ],
    '/knowledge/knowledge-base': [
      { label: 'Knowledge Base', href: '/knowledge/knowledge-base' },
    ],
    '/knowledge/industry-snapshots': [
      { label: 'Industry Snapshots', href: '/knowledge/industry-snapshots' },
    ],
  }

  return breadcrumbMap[pathname] || []
}
