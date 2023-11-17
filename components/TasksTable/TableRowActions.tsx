import type { TTaskLabelValue, TTask } from '@/lib/schemaTypes'

import {
  DropdownMenuRadioGroup,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast'
import { useTasksStore } from '@/stores/tasksStore'
import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { labels } from '@/lib/data'

interface TableRowActionsProps<TData> {
  row: Row<TData>
}

export default function TableRowActions<TData extends TTask>({
  row,
}: TableRowActionsProps<TData>) {
  const { setEditTaskId, updateLabel, deleteTask } = useTasksStore()
  const task = row.original
  const { toast } = useToast()

  const handleDelete = () => {
    deleteTask(task.id)
    toast({
      description: `Task ${task.id} has been successfully deleted ❌`,
      title: 'Success!',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          variant="ghost"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[160px]" align="end">
        <DropdownMenuItem onClick={() => setEditTaskId(task.id)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              onValueChange={(labelValue) =>
                updateLabel(task.id, labelValue as TTaskLabelValue)
              }
              value={task.label}
            >
              {labels.map((label) => (
                <DropdownMenuRadioItem value={label.value} key={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
