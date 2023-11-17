'use client'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from '@/components/ui/dialog'
import { EditTaskForm } from '@/components/EditTaskForm'
import { useTasksStore } from '@/stores/tasksStore'

export default function EditTaskDialog() {
  const { clearEditTaskId, editTaskId } = useTasksStore()

  return (
    <Dialog onOpenChange={clearEditTaskId} open={Boolean(editTaskId)}>
      <DialogContent
        className="w-full max-w-[calc(100%-2rem)] rounded-md p-4 pt-6
        sm:max-w-[425px] sm:p-6"
      >
        <DialogHeader>
          <DialogTitle className="mb-1 w-full text-center">
            Edit task {editTaskId}
          </DialogTitle>
          <EditTaskForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
