import create from 'zustand'
import { persist } from 'zustand/middleware'

export enum SettingsPageId {
    Main,
    Cores,
    Video,
    OSDMenu,
    InputDevices,
    Remote,
}

export interface UIState {
    activeTheme: string;
    setActiveTheme: (theme: string) => void;
    activeSettingsPage: SettingsPageId;
    setActiveSettingsPage: (page: SettingsPageId) => void;
}

export const useUIStateStore = create<UIState>()(
    persist(
        (set, get) => ({
            activeTheme: "birdybro",
            setActiveTheme: (id: string) => set({ activeTheme: id }),
            activeSettingsPage: SettingsPageId.Main,
            setActiveSettingsPage: (page: SettingsPageId) => set({ activeSettingsPage: page }),
        }),
        {
            name: 'uiState',
        }
    )
)
