import type { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table'

import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'

type Store = {
  setColumnFilters: OnChangeFn<ColumnFiltersState> | undefined
  columnFilters: ColumnFiltersState | undefined
}

export const useTableStore = create<Store>()(
  persist(
    (set) => ({
      setColumnFilters: (updaterOrValue) => {
        if (typeof updaterOrValue === 'function') {
          const updater = updaterOrValue
          set((prev) => ({
            columnFilters: updater(prev.columnFilters ?? []),
          }))
        }
      },
      columnFilters: [],
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: 'table-storage',
    }
  )
)
