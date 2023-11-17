import {
  DoubleArrowRightIcon,
  DoubleArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@radix-ui/react-icons'
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Table } from '@tanstack/react-table'

interface TablePaginationProps<TData> {
  table: Table<TData>
}

export default function TablePagination<TData>({
  table,
}: TablePaginationProps<TData>) {
  return (
    <div className="xs:px-2 flex w-full items-center justify-between">
      <div className="xs:block hidden" />
      <div
        className="xs:flex-row xs:w-fit flex w-full flex-col items-center
        space-x-6 lg:space-x-8"
      >
        <div
          className="xs:mb-0 xs:w-fit mb-2 flex w-full items-center
          justify-between space-x-2"
        >
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem value={`${pageSize}`} key={pageSize}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="xs:space-x-2 xs:w-fit !ml-0 flex w-full items-center">
          <div
            className="xs:w-[100px] xs:mr-0 mr-auto flex w-fit items-center
            justify-center text-sm font-medium"
          >
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            variant="outline"
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="xs:mr-0 mr-2 h-8 w-8 p-0"
            variant="outline"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="h-8 w-8 p-0"
            variant="outline"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            variant="outline"
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
