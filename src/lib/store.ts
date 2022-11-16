import create from 'zustand'
import { persist } from 'zustand/middleware'

export interface UIState {
    activeTheme: string;
    setActiveTheme: (theme: string) => void;
}

export const useUIStateStore = create<UIState>()(
    persist(
        (set, get) => ({
            activeTheme: "birdybro",
            setActiveTheme: (id: string) => set({ activeTheme: id }),
        }),
        {
            name: 'uiState',
        }
    )
)
