import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@repo/ui/components/ui/container'
import { Button } from '@repo/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card'
import { Badge } from '@repo/ui/components/ui/badge'
import { SortableTable, type SortableColumn } from '@repo/ui/patterns/data-tables/sortable-table'
import { exampleItems, type ExampleItem } from '../../../lib/data'

// ---------------------------------------------------------------------------
// Example detail data — replace with real data fetching (e.g. Prisma, tRPC)
// ---------------------------------------------------------------------------

interface DetailRow extends Record<string, unknown> {
  field: string
  value: string
  updated: string
}

const detailColumns: SortableColumn<DetailRow>[] = [
  { key: 'field', header: 'Field', sortable: true },
  { key: 'value', header: 'Value' },
  { key: 'updated', header: 'Last Updated', sortable: true },
]

// ---------------------------------------------------------------------------
// Page (Server Component)
// ---------------------------------------------------------------------------

interface DetailPageProps {
  params: Promise<{ id: string }>
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params
  const item = exampleItems.find((i) => i.id === id)

  if (!item) notFound()

  const rows: DetailRow[] = [
    { field: 'Name', value: item.name, updated: item.updatedAt },
    { field: 'Status', value: item.status, updated: item.updatedAt },
    { field: 'Category', value: item.category, updated: item.updatedAt },
  ]

  return (
    <Container className="py-8 space-y-8">
      {/* Back navigation */}
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/__APP_SLUG__">
            <ArrowLeft className="mr-1 size-4" />
            Back to __APP_NAME__
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{item.status}</Badge>
          <Button>Edit</Button>
        </div>
      </div>

      {/* Detail table */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Field-level view of this record</CardDescription>
        </CardHeader>
        <CardContent>
          <SortableTable columns={detailColumns} data={rows} />
        </CardContent>
      </Card>
    </Container>
  )
}
