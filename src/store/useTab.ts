import { create } from 'zustand'

interface TabStore {
  tabActive: number
  changeTabActive: (tabActive: number) => void
}

export const useTab = create<TabStore>((set) => ({
  tabActive: 1,
  changeTabActive: (tabActive) => set({ tabActive })
}))
