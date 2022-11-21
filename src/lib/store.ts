import create from "zustand";
import { persist } from "zustand/middleware";

export enum SettingsPageId {
    Main,
    Cores,
    Video,
    OSDMenu,
    InputDevices,
    Remote,
    Audio,
    System,
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
            activeTheme: "mister",
            setActiveTheme: (id: string) => set({ activeTheme: id }),
            activeSettingsPage: SettingsPageId.Main,
            setActiveSettingsPage: (page: SettingsPageId) =>
                set({ activeSettingsPage: page }),
        }),
        {
            name: "uiState",
        }
    )
);

export interface IniSettings {
    videoMode: string;
    setVideoMode: (v: string) => void;
    verticalScaleMode: number;
    setVerticalScaleMode: (v: number) => void;
    vsyncAdjust: number;
    setVsyncAdjust: (v: number) => void;
    refreshMin: number;
    setRefreshMin: (v: number) => void;
    refreshMax: number;
    setRefreshMax: (v: number) => void;
    dviMode: boolean;
    setDviMode: (v: boolean) => void;
    vscaleBorder: number;
    setVscaleBorder: (v: number) => void;
    vfilterDefault: string;
    setVfilterDefault: (v: string) => void;
    vfilterVerticalDefault: string;
    setVfilterVerticalDefault: (v: string) => void;
    vfilterScanlinesDefault: string;
    setVfilterScanlinesDefault: (v: string) => void;
    shmaskDefault: string;
    setShmaskDefault: (v: string) => void;
    shmaskModeDefault: number;
    setShmaskModeDefault: (v: number) => void;
    hdmiGameMode: boolean;
    setHdmiGameMode: (v: boolean) => void;
    hdmiLimited: number;
    setHdmiLimited: (v: number) => void;
    vrrMode: number;
    setVrrMode: (v: number) => void;
    vrrMinFramerate: number;
    setVrrMinFramerate: (v: number) => void;
    vrrMaxFramerate: number;
    setVrrMaxFramerate: (v: number) => void;
    vrrVesaFramerate: number;
    setVrrVesaFramerate: (v: number) => void;
    // analog options
    directVideo: boolean;
    setDirectVideo: (v: boolean) => void;
    forcedScandoubler: boolean;
    setForcedScandoubler: (v: boolean) => void;
    ypbpr: boolean;
    setYpbpr: (v: boolean) => void;
    compositeSync: boolean;
    setCompositeSync: (v: boolean) => void;
    vgaScaler: boolean;
    setVgaScaler: (v: boolean) => void;
    vgaSog: boolean;
    setVgaSog: (v: boolean) => void;
}

export const useIniSettingsStore = create<IniSettings>()(
    persist(
        (set, get) => ({
            // video options
            videoMode: "0",
            setVideoMode: (v: string) => set({ videoMode: v }),
            verticalScaleMode: 0,
            setVerticalScaleMode: (v: number) => set({ verticalScaleMode: v }),
            vsyncAdjust: 0,
            setVsyncAdjust: (v: number) => set({ vsyncAdjust: v }),
            refreshMin: 0,
            setRefreshMin: (v: number) => set({ refreshMin: v }),
            refreshMax: 0,
            setRefreshMax: (v: number) => set({ refreshMax: v }),
            dviMode: false,
            setDviMode: (v: boolean) => set({ dviMode: v }),
            vscaleBorder: 0,
            setVscaleBorder: (v: number) => set({ vscaleBorder: v }),
            vfilterDefault: "",
            setVfilterDefault: (v: string) => set({ vfilterDefault: v }),
            vfilterVerticalDefault: "",
            setVfilterVerticalDefault: (v: string) =>
                set({ vfilterVerticalDefault: v }),
            vfilterScanlinesDefault: "",
            setVfilterScanlinesDefault: (v: string) =>
                set({ vfilterScanlinesDefault: v }),
            shmaskDefault: "",
            setShmaskDefault: (v: string) => set({ shmaskDefault: v }),
            shmaskModeDefault: 1,
            setShmaskModeDefault: (v: number) => set({ shmaskModeDefault: v }),
            hdmiGameMode: true,
            setHdmiGameMode: (v: boolean) => set({ hdmiGameMode: v }),
            hdmiLimited: 0,
            setHdmiLimited: (v: number) => set({ hdmiLimited: v }),
            vrrMode: 0,
            setVrrMode: (v: number) => set({ vrrMode: v }),
            vrrMinFramerate: 0,
            setVrrMinFramerate: (v: number) => set({ vrrMinFramerate: v }),
            vrrMaxFramerate: 0,
            setVrrMaxFramerate: (v: number) => set({ vrrMaxFramerate: v }),
            vrrVesaFramerate: 0,
            setVrrVesaFramerate: (v: number) => set({ vrrVesaFramerate: v }),
            // analog video options
            directVideo: false,
            setDirectVideo: (v: boolean) => set({ directVideo: v }),
            forcedScandoubler: false,
            setForcedScandoubler: (v: boolean) => set({ forcedScandoubler: v }),
            ypbpr: false,
            setYpbpr: (v: boolean) => set({ ypbpr: v }),
            compositeSync: false,
            setCompositeSync: (v: boolean) => set({ compositeSync: v }),
            vgaScaler: false,
            setVgaScaler: (v: boolean) => set({ vgaScaler: v }),
            vgaSog: false,
            setVgaSog: (v: boolean) => set({ vgaSog: v }),
        }),
        {
            name: "iniSettings",
        }
    )
);