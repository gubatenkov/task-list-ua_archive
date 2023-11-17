import { PlusCircledIcon, Cross2Icon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast'
import { useTasksStore } from '@/stores/tasksStore'
import { priorities, statuses } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'

import TableFacetedFilter from './TableFacetedFilter'
import TableViewOptions from './TableViewOptions'

interface TableToolbarProps<TData> {
  table: Table<TData>
}

export default function TableToolbar<TData>({
  table,
}: TableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const { createTask } = useTasksStore()
  const { toast } = useToast()

  const handleAdd = () => {
    createTask()
    toast({
      description: 'Task has been successfully created ✅',
      title: 'Success!',
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="w-full items-center sm:flex sm:w-fit">
          <div className="mb-2 flex w-full sm:mb-0 sm:mr-8 sm:w-fit">
            <div className="flex w-full sm:w-fit">
              <Input
                onChange={(event) => {
                  table.getColumn('title')?.setFilterValue(event.target.value)
                }}
                value={
                  (table.getColumn('title')?.getFilterValue() as string) ?? ''
                }
                className="mr-2 h-8 w-full sm:mb-0 sm:mr-2 sm:w-[150px] lg:w-[250px]"
                placeholder="Search tasks..."
              />
              <Button
                className="flex !h-8 items-center px-3 py-2"
                onClick={handleAdd}
                variant="default"
              >
                <PlusCircledIcon className="mr-2" height={16} width={16} />
                <span>Add</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            {table.getColumn('status') && (
              <TableFacetedFilter
                column={table.getColumn('status')}
                options={statuses}
                title="Status"
              />
            )}
            {table.getColumn('priority') && (
              <TableFacetedFilter
                column={table.getColumn('priority')}
                options={priorities}
                title="Priority"
              />
            )}
            {isFiltered && (
              <Button
                className="xs:flex hidden h-8 px-2 lg:px-3"
                onClick={() => table.resetColumnFilters()}
                variant="ghost"
              >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <TableViewOptions table={table} />
    </div>
  )
}
