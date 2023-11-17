'use client'

import {
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectItem,
  Select,
} from '@/components/ui/select'
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'
import {
  type SubmitHandler,
  type FieldValues,
  Controller,
  useForm,
} from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useTasksStore } from '@/stores/tasksStore'
import { TaskFormSchema } from '@/lib/schemaTypes'
import { priorities, statuses } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function EditTaskForm() {
  const { clearEditTaskId, updateEditTask, getEditTask } = useTasksStore()
  const editTask = getEditTask()
  const form = useForm({
    defaultValues: {
      priority: editTask?.priority ?? '',
      status: editTask?.status ?? '',
      title: editTask?.title ?? '',
    },
    resolver: valibotResolver(TaskFormSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    updateEditTask(data)
    clearEditTaskId()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          render={({ field }) => (
            <FormItem className="mb-2 text-left">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          control={form.control}
          name="title"
        />
        <div className="xs:flex-row xs:gap-4 !mt-0 flex flex-col items-center justify-between">
          <Controller
            render={({ field: { onChange, ref, ...field } }) => (
              <FormItem className="xs:mb-0 mb-2 w-full text-left">
                <FormLabel>Status</FormLabel>
                <Select onValueChange={onChange} {...field}>
                  <SelectTrigger className="w-full" ref={ref}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statuses.map(({ label, value }) => (
                        <SelectItem value={value} key={value}>
                          <span>{label}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="status"
          />
          <Controller
            render={({ field: { onChange, ref, ...field } }) => (
              <FormItem className="w-full text-left">
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={onChange} {...field}>
                  <SelectTrigger className="w-full" ref={ref}>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {priorities.map(({ label, value }) => (
                        <SelectItem value={value} key={value}>
                          <span>{label}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="priority"
          />
        </div>
        <Button className="!mt-8 w-full" type="submit">
          Apply changes
        </Button>
      </form>
    </Form>
  )
}
