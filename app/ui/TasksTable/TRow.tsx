import { flexRender, type Row } from '@tanstack/react-table'
import { TableCell, TableRow } from '@/app/ui/table'

type Props<TData> = Row<TData>

export default function TRow<TData>({
  getVisibleCells,
  getIsSelected,
}: Props<TData>) {
  return (
    <TableRow data-state={getIsSelected() && 'selected'}>
      {getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
