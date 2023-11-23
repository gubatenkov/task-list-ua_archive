import type { Metadata } from 'next'

import {
  getUserTasksByParamsAndFilters,
  fetchTasksCount,
} from '@/app/lib/actions'
import columns from '@/app/ui/TasksTable/Columns'
import TaskCounter from '@/app/ui/TaskCounter'
import { Skeleton } from '@/app/ui/skeleton'
import Table from '@/app/ui/TasksTable'
import { Card } from '@/app/ui/card'
import { Suspense } from 'react'

type Props = {
  searchParams?: {
    priority?: string[] | string
    status?: string[] | string
    search_query?: string
    per_page?: string
    page?: string
  }
}

export const metadata: Metadata = {
  title: 'View All',
  description: '',
}

export default async function Home({ searchParams }: Props) {
  const { totalTaskCount, tasks } = await getUserTasksByParamsAndFilters({
    perPageParam: searchParams?.per_page,
    query: searchParams?.search_query,
    priority: searchParams?.priority,
    pageParam: searchParams?.page,
    status: searchParams?.status,
  })

  return (
    <>
      <section className="mb-2 xs:mb-4">
        <h2 className="mb-0 text-2xl font-bold leading-5 tracking-tight xs:mb-1 xs:text-4xl xs:leading-10">
          Welcome, Elon!
        </h2>
        <div className="inline-flex items-center text-xs text-muted-foreground xs:text-base">
          <p>Here are</p>
          <Suspense fallback={<Skeleton className="mx-2 h-6 w-8" />}>
            <TaskCounter />
          </Suspense>
          <p>tasks on you for today.</p>
        </div>
      </section>
      <Card className="overflow-hidden p-2 xs:p-4">
        <Table totalTaskCount={totalTaskCount} columns={columns} data={tasks} />
      </Card>
    </>
  )
}
