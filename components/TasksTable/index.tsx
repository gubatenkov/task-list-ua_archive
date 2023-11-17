'use client'

import {
  getFacetedUniqueValues,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import {
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from '@/components/ui/table'
import { useTasksStore } from '@/stores/tasksStore'
import { useTableStore } from '@/stores/tableStore'
import { useEffect, useState } from 'react'

import TableRowSkeleton from './TableRowSkeleton'
import TablePagination from './TablePagination'
import TableToolbar from './TableToolbar'

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  // data: TData[]
}

export default function TasksTable<TData, TValue>({
  columns, // data,
}: TableProps<TData, TValue>) {
  const { setColumnFilters, columnFilters } = useTableStore()
  const [isLoading, setIsLoading] = useState(true)
  const { tasks } = useTasksStore()

  const table = useReactTable({
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: false,
    data: tasks as TData[],
    columns,
  })

  // Emulating of fetching table data via API
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="space-y-4">
      <TableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRowSkeleton rowsNumber={5} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isLoading ? null : <TablePagination table={table} />}
    </div>
  )
}
