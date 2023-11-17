'use client'

import type { TTaskPriority, TTaskStatus, TTask } from '@/lib/schemaTypes'

import { priorities, statuses, iconsMap, labels } from '@/lib/data'
import { DividerHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

import TableColumnHeader from './TableColumnHeader'
import TableRowActions from './TableRowActions'

const columns: ColumnDef<TTask>[] = [
  {
    cell: () => <p>#</p>,
    enableSorting: false,
    enableHiding: false,
    header: () => {},
    id: 'select',
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Task" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
    accessorKey: 'id',
  },
  {
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      )
    },
    header: ({ column }) => <TableColumnHeader column={column} title="Title" />,
    accessorKey: 'title',
  },
  {
    cell: ({ row }) => {
      const status: TTaskStatus | undefined = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      const Icon =
        status.icon in iconsMap ? iconsMap[status.icon] : DividerHorizontalIcon

      return (
        <div className="flex w-[100px] items-center">
          {status.icon in iconsMap && (
            <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    accessorKey: 'status',
  },
  {
    cell: ({ row }) => {
      const priority: TTaskPriority | undefined = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      )

      if (!priority) {
        return null
      }

      const Icon =
        priority.icon in iconsMap
          ? iconsMap[priority.icon]
          : DividerHorizontalIcon

      return (
        <div className="flex items-center">
          {priority.icon && (
            <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    header: ({ column }) => (
      <TableColumnHeader title="Priority" column={column} />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    accessorKey: 'priority',
  },
  {
    cell: ({ row }) => <TableRowActions row={row} />,
    id: 'actions',
  },
]

export default columns
