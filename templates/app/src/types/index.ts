// ---------------------------------------------------------------------------
// __APP_NAME__ — TypeScript Types
// ---------------------------------------------------------------------------
// Define app-specific types here. Use ontology entity types from the platform
// (campaigns, audiences, channels, etc.) where applicable instead of inventing
// custom entity models.

export interface AppConfig {
  slug: string
  name: string
  description: string
  icon: string
  version: string
}

// ---------------------------------------------------------------------------
// Example entity — replace with your domain model
// ---------------------------------------------------------------------------

export type ItemStatus = 'Active' | 'Draft' | 'Archived'

export interface Item {
  id: string
  name: string
  description: string
  status: ItemStatus
  category: string
  createdAt: string
  updatedAt: string
  createdBy: string
}
