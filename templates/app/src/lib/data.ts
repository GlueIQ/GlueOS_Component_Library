// ---------------------------------------------------------------------------
// __APP_NAME__ — Data Layer
// ---------------------------------------------------------------------------
// This is the example data layer pattern. Replace with real data fetching:
// - Server components: fetch from API / database directly
// - Client components: tRPC, SWR, React Query, or React Context + useReducer
//
// @glueos/data (planned) will provide a shared data access layer once available.

import type { Item } from '../types'

// ---------------------------------------------------------------------------
// Seed data — remove when connecting to real data
// ---------------------------------------------------------------------------

export const exampleItems: Item[] = [
  {
    id: '1',
    name: 'Example Item Alpha',
    description: 'The first example record. Replace with real data.',
    status: 'Active',
    category: 'Primary',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-15',
    createdBy: 'system',
  },
  {
    id: '2',
    name: 'Example Item Beta',
    description: 'A draft item awaiting review.',
    status: 'Draft',
    category: 'Secondary',
    createdAt: '2026-01-05',
    updatedAt: '2026-01-14',
    createdBy: 'system',
  },
  {
    id: '3',
    name: 'Example Item Gamma',
    description: 'Active record in the primary category.',
    status: 'Active',
    category: 'Primary',
    createdAt: '2026-01-08',
    updatedAt: '2026-01-13',
    createdBy: 'system',
  },
  {
    id: '4',
    name: 'Example Item Delta',
    description: 'An archived record no longer in use.',
    status: 'Archived',
    category: 'Legacy',
    createdAt: '2025-12-01',
    updatedAt: '2026-01-10',
    createdBy: 'system',
  },
  {
    id: '5',
    name: 'Example Item Epsilon',
    description: 'Another active record demonstrating the list pattern.',
    status: 'Active',
    category: 'Secondary',
    createdAt: '2026-01-10',
    updatedAt: '2026-01-09',
    createdBy: 'system',
  },
]

// ---------------------------------------------------------------------------
// Data access helpers — replace with real queries
// ---------------------------------------------------------------------------

export function getItemById(id: string): Item | undefined {
  return exampleItems.find((item) => item.id === id)
}

export function getItemsByStatus(status: Item['status']): Item[] {
  return exampleItems.filter((item) => item.status === status)
}

// ---------------------------------------------------------------------------
// Type re-export for convenience
// ---------------------------------------------------------------------------

export type { Item, ItemStatus } from '../types'
