import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SearchServiceStatus } from "./models";

export enum SettingsPageId {
  Main,
  Cores,
  GeneralVideo,
  OSDMenu,
  InputDevices,
  Remote,
  Audio,
  System,
  VideoFilters,
  AnalogVideo,
}

export interface UIState {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
  activeSettingsPage: SettingsPageId;
  setActiveSettingsPage: (page: SettingsPageId) => void;
  lastFavoriteFolder: string;
  setLastFavoriteFolder: (folder: string) => void;
}

export const useUIStateStore = create<UIState>()(
  persist(
    (set, get) => ({
      activeTheme: "mister",
      setActiveTheme: (id: string) => set({ activeTheme: id }),
      activeSettingsPage: SettingsPageId.Main,
      setActiveSettingsPage: (page: SettingsPageId) =>
        set({ activeSettingsPage: page }),
      lastFavoriteFolder: "",
      setLastFavoriteFolder: (folder: string) =>
        set({ lastFavoriteFolder: folder }),
    }),
    {
      name: "uiState",
    }
  )
);

export interface ServerState {
  search: SearchServiceStatus;
  setSearch: (search: SearchServiceStatus) => void;
  activeGame: string;
  setActiveGame: (game: string) => void;
  activeCore: string;
  setActiveCore: (core: string) => void;
}

export const useServerStateStore = create<ServerState>()((set, get) => ({
  search: {
    ready: true,
    indexing: false,
    totalSteps: 0,
    currentStep: 0,
    currentDesc: "",
  },
  setSearch: (search: SearchServiceStatus) => set({ search }),
  activeGame: "",
  setActiveGame: (game: string) => set({ activeGame: game }),
  activeCore: "",
  setActiveCore: (core: string) => set({ activeCore: core }),
}));

// TODO: KBD_NOMOUSE
// TODO: RUMBLE
// TODO: DVI_MODE is presented as a bool, but defaults to 2, don't know what 0 and 1 actually do
// TODO: add max length to all string inputs
// TODO: preset_default
// TODO: vga_mode (replace ypbr)
// TODO: ntsc_mode
// TODO: hdr_max_nits
// TODO: hdr_avg_nits
// TODO: spinner_axis has new option
