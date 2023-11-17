import { TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  rowsNumber: number
}

export default function TableRowSkeleton({ rowsNumber = 3 }: Props) {
  return Array.from({ length: rowsNumber }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-9 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-9 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-9 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-9 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-9 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-9 w-full" />
      </TableCell>
    </TableRow>
  ))
}
