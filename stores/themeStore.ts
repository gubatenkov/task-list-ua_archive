import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'

type Theme = 'system' | 'light' | 'dark'

type Store = {
  setTheme: (theme: Theme) => void
  theme: Theme
}

export const useThemeStore = create<Store>()(
  persist(
    (set) => ({
      setTheme: (theme) => {
        set({ theme })
      },
      theme: 'system',
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: 'theme-storage',
    }
  )
)
