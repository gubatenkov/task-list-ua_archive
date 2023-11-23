import type { TTaskLabelValue, TTask } from '@/app/lib/schemaTypes'
import type { Row } from '@tanstack/react-table'

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
} from '@/app/ui/dropdown-menu'
import { startTransition, SetStateAction, Dispatch } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { updateTaskLabelById } from '@/app/lib/actions'
import { useToast } from '@/app/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/ui/button'
import { labels } from '@/app/lib/data'

interface TableRowActionsProps<TData> {
  setLocalData: Dispatch<SetStateAction<TData[]>>
  row: Row<TData>
}

export default function TableRowActions<TData extends TTask>({
  setLocalData,
  row,
}: TableRowActionsProps<TData>) {
  const task = row.original
  const { toast } = useToast()
  const router = useRouter()

  const handleLabelChange = (labelValue: string) => {
    const newLabel = labelValue as TTaskLabelValue
    // First immediately update label in local task
    setLocalData((prev) => {
      return prev.map((prevTask) =>
        prevTask.id === task.id
          ? {
              ...prevTask,
              label: newLabel,
            }
          : prevTask
      )
    })
    // Then query update of task label in database
    updateTaskLabelById(task.id, newLabel)
  }

  const handleDelete = () => {
    // deleteTask(task.id)
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
        <DropdownMenuItem onClick={() => router.push(`/tasks/${task.id}`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              onValueChange={handleLabelChange}
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
