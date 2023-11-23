'use client'

import {
  FormDescription,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/app/ui/form'
import {
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectItem,
  Select,
} from '@/app/ui/select'
import {
  type SubmitHandler,
  type FieldValues,
  Controller,
  useForm,
} from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { TaskFormSchema } from '@/app/lib/schemaTypes'
import { priorities, statuses } from '@/app/lib/data'
import { useTasksStore } from '@/stores/tasksStore'
import { Button } from '@/app/ui/button'
import { Input } from '@/app/ui/input'

export function EditTaskForm() {
  const form = useForm({
    defaultValues: {
      priority: 'low',
      status: 'todo',
      title: '',
    },
    resolver: valibotResolver(TaskFormSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormDescription>
                This field will be displayed in tasks table on{' '}
                <span className="font-bold">/tasks </span>
                page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          control={form.control}
          name="title"
        />
        <Controller
          render={({ field: { onChange, ref, ...field } }) => (
            <FormItem className="mb-2 w-full text-left xs:mb-0">
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
              <FormDescription>
                Default status value{' '}
                <span className="font-bold">&quot;To-do&quot;</span>
              </FormDescription>
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
              <FormDescription>
                Default priority value{' '}
                <span className="font-bold">&quot;Low&quot;</span>
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
          name="priority"
        />
        <Button className="w-full xs:w-fit" type="submit">
          Create task
        </Button>
      </form>
    </Form>
  )
}
