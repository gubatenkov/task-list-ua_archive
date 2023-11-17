import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import EditTaskDialog from '@/components/EditTaskDialog'
import columns from '@/components/TasksTable/Columns'
import TaskCounter from '@/components/TaskCounter'
import { getServerSession } from 'next-auth'
import { Card } from '@/components/ui/card'
import Table from '@/components/TasksTable'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  return (
    <>
      <Header />
      <main
        className="container mb-12 mt-8 h-full flex-1 flex-col px-4
        sm:px-8"
      >
        <section className="mb-4">
          <h2 className="mb-2 text-4xl font-bold tracking-tight">
            Welcome, Elon!
          </h2>
          <p className="text-muted-foreground">
            Here are <TaskCounter /> tasks on you for today.
          </p>
        </section>
        <Card className="xs:p-8 overflow-hidden p-2">
          <Table columns={columns} />
        </Card>
      </main>
      <EditTaskDialog />
    </>
  )
}
