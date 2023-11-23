import { EditTaskForm } from '@/app/ui/EditTaskForm'
import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { Separator } from '@/app/ui/separator'
import { Card } from '@/app/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Task',
  description: '',
}

export default function Page() {
  return (
    <>
      <section className="mb-4">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Task List', href: '/tasks' },
            {
              href: '/tasks/create',
              label: 'Create Task',
              active: true,
            },
          ]}
        />
      </section>
      <Card className="overflow-hidden p-4 xs:p-8">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            To create a task
          </h2>
          <p className="text-muted-foreground">
            Manage new task settings and add it to the list.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="mx-auto max-w-2xl">
          <EditTaskForm />
        </div>
      </Card>
    </>
  )
}
