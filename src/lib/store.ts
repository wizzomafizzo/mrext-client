import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SearchServiceStatus } from "./models";

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

export interface IniSettings {
  modified: string[];
  resetModified: () => void;

  // Video
  videoMode: string;
  setVideoMode: (v: string) => void;
  videoModeNtsc: string;
  setVideoModeNtsc: (v: string) => void;
  videoModePal: string;
  setVideoModePal: (v: string) => void;
  verticalScaleMode: number;
  setVerticalScaleMode: (v: number) => void;
  vsyncAdjust: number;
  setVsyncAdjust: (v: number) => void;
  refreshMin: number;
  setRefreshMin: (v: number) => void;
  refreshMax: number;
  setRefreshMax: (v: number) => void;
  dviMode: number;
  setDviMode: (v: number) => void;
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
  hdmiGameMode: number;
  setHdmiGameMode: (v: number) => void;
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
  directVideo: number;
  setDirectVideo: (v: number) => void;
  forcedScandoubler: number;
  setForcedScandoubler: (v: number) => void;
  ypbpr: number;
  setYpbpr: (v: number) => void;
  compositeSync: number;
  setCompositeSync: (v: number) => void;
  vgaScaler: number;
  setVgaScaler: (v: number) => void;
  vgaSog: number;
  setVgaSog: (v: number) => void;
  customAspectRatio1: string;
  setCustomAspectRatio1: (v: string) => void;
  customAspectRatio2: string;
  setCustomAspectRatio2: (v: string) => void;
  hdr: number;
  setHdr: (v: number) => void;
  videoBrightness: number;
  setVideoBrightness: (v: number) => void;
  videoContrast: number;
  setVideoContrast: (v: number) => void;
  videoSaturation: number;
  setVideoSaturation: (v: number) => void;
  videoHue: number;
  setVideoHue: (v: number) => void;
  videoGainOffset: string;
  setVideoGainOffset: (v: string) => void;

  // Cores
  bootScreen: number;
  setBootScreen: (v: number) => void;
  recents: number;
  setRecents: (v: number) => void;
  videoInfo: number;
  setVideoInfo: (v: number) => void;
  controllerInfo: number;
  setControllerInfo: (v: number) => void;
  sharedFolder: string;
  setSharedFolder: (v: string) => void;
  logFileEntry: number;
  setLogFileEntry: (v: number) => void;
  keyMenuAsRgui: number;
  setKeyMenuAsRgui: (v: number) => void;

  // Input devices
  btAutoDisconnect: number;
  setBtAutoDisconnect: (v: number) => void;
  btResetBeforePair: number;
  setBtResetBeforePair: (v: number) => void;
  mouseThrottle: number;
  setMouseThrottle: (v: number) => void;
  resetCombo: number;
  setResetCombo: (v: number) => void;
  player1Controller: string;
  setPlayer1Controller: (v: string) => void;
  player2Controller: string;
  setPlayer2Controller: (v: string) => void;
  player3Controller: string;
  setPlayer3Controller: (v: string) => void;
  player4Controller: string;
  setPlayer4Controller: (v: string) => void;
  sniperMode: number;
  setSniperMode: (v: number) => void;
  spinnerThrottle: number;
  setSpinnerThrottle: (v: number) => void;
  spinnerAxis: number;
  setSpinnerAxis: (v: number) => void;
  gamepadDefaults: number;
  setGamepadDefaults: (v: number) => void;
  disableAutoFire: number;
  setDisableAutoFire: (v: number) => void;
  wheelForce: number;
  setWheelForce: (v: number) => void;
  wheelRange: number;
  setWheelRange: (v: number) => void;
  spinnerVid: string;
  setSpinnerVid: (v: string) => void;
  spinnerPid: string;
  setSpinnerPid: (v: string) => void;
  keyrahMode: string;
  setKeyrahMode: (v: string) => void;
  jammaVid: string;
  setJammaVid: (v: string) => void;
  jammaPid: string;
  setJammaPid: (v: string) => void;
  noMergeVid: string;
  setNoMergeVid: (v: string) => void;
  noMergePid: string;
  setNoMergePid: (v: string) => void;
  noMergeVidPid: string[];
  setNoMergeVidPid: (v: string[]) => void;
  rumble: number;
  setRumble: (v: number) => void;
  keyboardNoMouse: number;
  setKeyboardNoMouse: (v: number) => void;

  // Audio
  hdmiAudio96k: number;
  setHdmiAudio96k: (v: number) => void;
  aFilterDefault: string;
  setAFilterDefault: (v: string) => void;

  // System
  fbSize: number;
  setFbSize: (v: number) => void;
  fbTerminal: number;
  setFbTerminal: (v: number) => void;
  bootCore: string;
  setBootCore: (v: string) => void;
  bootCoreTimeout: number;
  setBootCoreTimeout: (v: number) => void;
  waitMount: string;
  setWaitMount: (v: string) => void;

  // OSD/Menu
  rbfHideDatecode: number;
  setRbfHideDatecode: (v: number) => void;
  osdRotate: number;
  setOsdRotate: (v: number) => void;
  browseExpand: number;
  setBrowseExpand: (v: number) => void;
  osdTimeout: number;
  setOsdTimeout: (v: number) => void;
  videoOff: number;
  setVideoOff: (v: number) => void;
  menuPal: number;
  setMenuPal: (v: number) => void;
  font: string;
  setFont: (v: string) => void;
  logo: number;
  setLogo: (v: number) => void;
}

export const useIniSettingsStore = create<IniSettings>()((set, get) => ({
  modified: [],
  resetModified: () => set({ modified: [] }),

  // Video
  videoMode: "",
  setVideoMode: (v: string) =>
    set((state) => ({
      videoMode: v,
      modified: [...state.modified, "videoMode"],
    })),
  videoModeNtsc: "",
  setVideoModeNtsc: (v: string) =>
    set((state) => ({
      videoModeNtsc: v,
      modified: [...state.modified, "setVideoModeNtsc"],
    })),
  videoModePal: "",
  setVideoModePal: (v: string) =>
    set((state) => ({
      videoModePal: v,
      modified: [...state.modified, "videoModePal"],
    })),
  verticalScaleMode: 0,
  setVerticalScaleMode: (v: number) =>
    set((state) => ({
      verticalScaleMode: v,
      modified: [...state.modified, "verticalScaleMode"],
    })),
  vsyncAdjust: 0,
  setVsyncAdjust: (v: number) =>
    set((state) => ({
      vsyncAdjust: v,
      modified: [...state.modified, "vsyncAdjust"],
    })),
  refreshMin: 0,
  setRefreshMin: (v: number) =>
    set((state) => ({
      refreshMin: v,
      modified: [...state.modified, "refreshMin"],
    })),
  refreshMax: 0,
  setRefreshMax: (v: number) =>
    set((state) => ({
      refreshMax: v,
      modified: [...state.modified, "refreshMax"],
    })),
  dviMode: 2,
  setDviMode: (v: number) =>
    set((state) => ({
      dviMode: v,
      modified: [...state.modified, "dviMode"],
    })),
  vscaleBorder: 0,
  setVscaleBorder: (v: number) =>
    set((state) => ({
      vscaleBorder: v,
      modified: [...state.modified, "vscaleBorder"],
    })),
  vfilterDefault: "",
  setVfilterDefault: (v: string) =>
    set((state) => ({
      vfilterDefault: v,
      modified: [...state.modified, "vfilterDefault"],
    })),
  vfilterVerticalDefault: "",
  setVfilterVerticalDefault: (v: string) =>
    set((state) => ({
      vfilterVerticalDefault: v,
      modified: [...state.modified, "vfilterVerticalDefault"],
    })),
  vfilterScanlinesDefault: "",
  setVfilterScanlinesDefault: (v: string) =>
    set((state) => ({
      vfilterScanlinesDefault: v,
      modified: [...state.modified, "vfilterScanlinesDefault"],
    })),
  shmaskDefault: "",
  setShmaskDefault: (v: string) =>
    set((state) => ({
      shmaskDefault: v,
      modified: [...state.modified, "shmaskDefault"],
    })),
  shmaskModeDefault: 0,
  setShmaskModeDefault: (v: number) =>
    set((state) => ({
      shmaskModeDefault: v,
      modified: [...state.modified, "shmaskModeDefault"],
    })),
  hdmiGameMode: 0,
  setHdmiGameMode: (v: number) =>
    set((state) => ({
      hdmiGameMode: v,
      modified: [...state.modified, "hdmiGameMode"],
    })),
  hdmiLimited: 0,
  setHdmiLimited: (v: number) =>
    set((state) => ({
      hdmiLimited: v,
      modified: [...state.modified, "hdmiLimited"],
    })),
  vrrMode: 0,
  setVrrMode: (v: number) =>
    set((state) => ({
      vrrMode: v,
      modified: [...state.modified, "vrrMode"],
    })),
  vrrMinFramerate: 0,
  setVrrMinFramerate: (v: number) =>
    set((state) => ({
      vrrMinFramerate: v,
      modified: [...state.modified, "vrrMinFramerate"],
    })),
  vrrMaxFramerate: 0,
  setVrrMaxFramerate: (v: number) =>
    set((state) => ({
      vrrMaxFramerate: v,
      modified: [...state.modified, "vrrMaxFramerate"],
    })),
  vrrVesaFramerate: 0,
  setVrrVesaFramerate: (v: number) =>
    set((state) => ({
      vrrVesaFramerate: v,
      modified: [...state.modified, "vrrVesaFramerate"],
    })),
  directVideo: 0,
  setDirectVideo: (v: number) =>
    set((state) => ({
      directVideo: v,
      modified: [...state.modified, "directVideo"],
    })),
  forcedScandoubler: 0,
  setForcedScandoubler: (v: number) =>
    set((state) => ({
      forcedScandoubler: v,
      modified: [...state.modified, "forcedScandoubler"],
    })),
  ypbpr: 0,
  setYpbpr: (v: number) =>
    set((state) => ({ ypbpr: v, modified: [...state.modified, "ypbpr"] })),
  compositeSync: 0,
  setCompositeSync: (v: number) =>
    set((state) => ({
      compositeSync: v,
      modified: [...state.modified, "compositeSync"],
    })),
  vgaScaler: 0,
  setVgaScaler: (v: number) =>
    set((state) => ({
      vgaScaler: v,
      modified: [...state.modified, "vgaScaler"],
    })),
  vgaSog: 0,
  setVgaSog: (v: number) =>
    set((state) => ({
      vgaSog: v,
      modified: [...state.modified, "vgaSog"],
    })),
  customAspectRatio1: "",
  setCustomAspectRatio1: (v: string) =>
    set((state) => ({
      customAspectRatio1: v,
      modified: [...state.modified, "customAspectRatio1"],
    })),
  customAspectRatio2: "",
  setCustomAspectRatio2: (v: string) =>
    set((state) => ({
      customAspectRatio2: v,
      modified: [...state.modified, "customAspectRatio2"],
    })),
  hdr: 0,
  setHdr: (v: number) =>
    set((state) => ({ hdr: v, modified: [...state.modified, "hdr"] })),
  videoBrightness: 50,
  setVideoBrightness: (v: number) =>
    set((state) => ({
      videoBrightness: v,
      modified: [...state.modified, "videoBrightness"],
    })),
  videoContrast: 50,
  setVideoContrast: (v: number) =>
    set((state) => ({
      videoContrast: v,
      modified: [...state.modified, "videoContrast"],
    })),
  videoSaturation: 100,
  setVideoSaturation: (v: number) =>
    set((state) => ({
      videoSaturation: v,
      modified: [...state.modified, "videoSaturation"],
    })),
  videoHue: 0,
  setVideoHue: (v: number) =>
    set((state) => ({
      videoHue: v,
      modified: [...state.modified, "videoHue"],
    })),
  videoGainOffset: "1, 0, 1, 0, 1, 0",
  setVideoGainOffset: (v: string) =>
    set((state) => ({
      videoGainOffset: v,
      modified: [...state.modified, "videoGainOffset"],
    })),

  // Cores
  bootScreen: 1,
  setBootScreen: (v: number) =>
    set((state) => ({
      bootScreen: v,
      modified: [...state.modified, "bootScreen"],
    })),
  recents: 0,
  setRecents: (v: number) =>
    set((state) => ({
      recents: v,
      modified: [...state.modified, "recents"],
    })),
  videoInfo: 0,
  setVideoInfo: (v: number) =>
    set((state) => ({
      videoInfo: v,
      modified: [...state.modified, "videoInfo"],
    })),
  controllerInfo: 6,
  setControllerInfo: (v: number) =>
    set((state) => ({
      controllerInfo: v,
      modified: [...state.modified, "controllerInfo"],
    })),
  sharedFolder: "",
  setSharedFolder: (v: string) =>
    set((state) => ({
      sharedFolder: v,
      modified: [...state.modified, "sharedFolder"],
    })),
  logFileEntry: 0,
  setLogFileEntry: (v: number) =>
    set((state) => ({
      logFileEntry: v,
      modified: [...state.modified, "logFileEntry"],
    })),
  keyMenuAsRgui: 0,
  setKeyMenuAsRgui: (v: number) =>
    set((state) => ({
      keyMenuAsRgui: v,
      modified: [...state.modified, "keyMenuAsRgui"],
    })),

  // Input devices
  btAutoDisconnect: 0,
  setBtAutoDisconnect: (v: number) =>
    set((state) => ({
      btAutoDisconnect: v,
      modified: [...state.modified, "btAutoDisconnect"],
    })),
  btResetBeforePair: 0,
  setBtResetBeforePair: (v: number) =>
    set((state) => ({
      btResetBeforePair: v,
      modified: [...state.modified, "btResetBeforePair"],
    })),
  mouseThrottle: 0,
  setMouseThrottle: (v: number) =>
    set((state) => ({
      mouseThrottle: v,
      modified: [...state.modified, "mouseThrottle"],
    })),
  resetCombo: 0,
  setResetCombo: (v: number) =>
    set((state) => ({
      resetCombo: v,
      modified: [...state.modified, "resetCombo"],
    })),
  player1Controller: "",
  setPlayer1Controller: (v: string) =>
    set((state) => ({
      player1Controller: v,
      modified: [...state.modified, "player1Controller"],
    })),
  player2Controller: "",
  setPlayer2Controller: (v: string) =>
    set((state) => ({
      player2Controller: v,
      modified: [...state.modified, "player2Controller"],
    })),
  player3Controller: "",
  setPlayer3Controller: (v: string) =>
    set((state) => ({
      player3Controller: v,
      modified: [...state.modified, "player3Controller"],
    })),
  player4Controller: "",
  setPlayer4Controller: (v: string) =>
    set((state) => ({
      player4Controller: v,
      modified: [...state.modified, "player4Controller"],
    })),
  sniperMode: 0,
  setSniperMode: (v: number) =>
    set((state) => ({
      sniperMode: v,
      modified: [...state.modified, "sniperMode"],
    })),
  spinnerThrottle: 0,
  setSpinnerThrottle: (v: number) =>
    set((state) => ({
      spinnerThrottle: v,
      modified: [...state.modified, "spinnerThrottle"],
    })),
  spinnerAxis: 0,
  setSpinnerAxis: (v: number) =>
    set((state) => ({
      spinnerAxis: v,
      modified: [...state.modified, "spinnerAxis"],
    })),
  gamepadDefaults: 0,
  setGamepadDefaults: (v: number) =>
    set((state) => ({
      gamepadDefaults: v,
      modified: [...state.modified, "gamepadDefaults"],
    })),
  disableAutoFire: 0,
  setDisableAutoFire: (v: number) =>
    set((state) => ({
      disableAutoFire: v,
      modified: [...state.modified, "disableAutoFire"],
    })),
  wheelForce: 50,
  setWheelForce: (v: number) =>
    set((state) => ({
      wheelForce: v,
      modified: [...state.modified, "wheelForce"],
    })),
  wheelRange: 0,
  setWheelRange: (v: number) =>
    set((state) => ({
      wheelRange: v,
      modified: [...state.modified, "wheelRange"],
    })),
  spinnerVid: "",
  setSpinnerVid: (v: string) =>
    set((state) => ({
      spinnerVid: v,
      modified: [...state.modified, "spinnerVid"],
    })),
  spinnerPid: "",
  setSpinnerPid: (v: string) =>
    set((state) => ({
      spinnerPid: v,
      modified: [...state.modified, "spinnerPid"],
    })),
  keyrahMode: "",
  setKeyrahMode: (v: string) =>
    set((state) => ({
      keyrahMode: v,
      modified: [...state.modified, "keyrahMode"],
    })),
  jammaVid: "",
  setJammaVid: (v: string) =>
    set((state) => ({
      jammaVid: v,
      modified: [...state.modified, "jammaVid"],
    })),
  jammaPid: "",
  setJammaPid: (v: string) =>
    set((state) => ({
      jammaPid: v,
      modified: [...state.modified, "jammaPid"],
    })),
  noMergeVid: "",
  setNoMergeVid: (v: string) =>
    set((state) => ({
      noMergeVid: v,
      modified: [...state.modified, "noMergeVid"],
    })),
  noMergePid: "",
  setNoMergePid: (v: string) =>
    set((state) => ({
      noMergePid: v,
      modified: [...state.modified, "noMergePid"],
    })),
  noMergeVidPid: [],
  setNoMergeVidPid: (v: string[]) =>
    set((state) => ({
      noMergeVidPid: v,
      modified: [...state.modified, "noMergeVidPid"],
    })),
  rumble: 1,
  setRumble: (v: number) =>
    set((state) => ({
      rumble: v,
      modified: [...state.modified, "rumble"],
    })),
  keyboardNoMouse: 0,
  setKeyboardNoMouse: (v: number) =>
    set((state) => ({
      keyboardNoMouse: v,
      modified: [...state.modified, "keyboardNoMouse"],
    })),

  // Audio
  hdmiAudio96k: 0,
  setHdmiAudio96k: (v: number) =>
    set((state) => ({
      hdmiAudio96k: v,
      modified: [...state.modified, "hdmiAudio96k"],
    })),
  aFilterDefault: "",
  setAFilterDefault: (v: string) =>
    set((state) => ({
      aFilterDefault: v,
      modified: [...state.modified, "aFilterDefault"],
    })),

  // System
  fbSize: 0,
  setFbSize: (v: number) =>
    set((state) => ({
      fbSize: v,
      modified: [...state.modified, "fbSize"],
    })),
  fbTerminal: 1,
  setFbTerminal: (v: number) =>
    set((state) => ({
      fbTerminal: v,
      modified: [...state.modified, "fbTerminal"],
    })),
  bootCore: "",
  setBootCore: (v: string) =>
    set((state) => ({
      bootCore: v,
      modified: [...state.modified, "bootCore"],
    })),
  bootCoreTimeout: 0,
  setBootCoreTimeout: (v: number) =>
    set((state) => ({
      bootCoreTimeout: v,
      modified: [...state.modified, "bootCoreTimeout"],
    })),
  waitMount: "",
  setWaitMount: (v: string) =>
    set((state) => ({
      waitMount: v,
      modified: [...state.modified, "waitMount"],
    })),

  // OSD/Menu
  rbfHideDatecode: 0,
  setRbfHideDatecode: (v: number) =>
    set((state) => ({
      rbfHideDatecode: v,
      modified: [...state.modified, "rbfHideDatecode"],
    })),
  osdRotate: 0,
  setOsdRotate: (v: number) =>
    set((state) => ({
      osdRotate: v,
      modified: [...state.modified, "osdRotate"],
    })),
  browseExpand: 1,
  setBrowseExpand: (v: number) =>
    set((state) => ({
      browseExpand: v,
      modified: [...state.modified, "browseExpand"],
    })),
  osdTimeout: 0,
  setOsdTimeout: (v: number) =>
    set((state) => ({
      osdTimeout: v,
      modified: [...state.modified, "osdTimeout"],
    })),
  videoOff: 0,
  setVideoOff: (v: number) =>
    set((state) => ({
      videoOff: v,
      modified: [...state.modified, "videoOff"],
    })),
  menuPal: 0,
  setMenuPal: (v: number) =>
    set((state) => ({
      menuPal: v,
      modified: [...state.modified, "menuPal"],
    })),
  font: "",
  setFont: (v: string) =>
    set((state) => ({
      font: v,
      modified: [...state.modified, "font"],
    })),
  logo: 1,
  setLogo: (v: number) =>
    set((state) => ({
      logo: v,
      modified: [...state.modified, "logo"],
    })),
}));
