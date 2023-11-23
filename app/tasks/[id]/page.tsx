import { EditTaskForm } from '@/app/ui/EditTaskForm'
import Breadcrumbs from '@/app/ui/Breadcrumbs'
import { Separator } from '@/app/ui/separator'
import { Card } from '@/app/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Task',
  description: '',
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <section className="mb-4">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Task List', href: '/tasks' },
            {
              href: `/tasks/${id}`,
              label: 'Edit Task',
              active: true,
            },
          ]}
        />
      </section>
      <Card className="overflow-hidden p-4 xs:p-8">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Edit Task</h2>
          <p className="text-muted-foreground">
            Update the task <span className="font-bold">{id}</span> and save
            info.
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
