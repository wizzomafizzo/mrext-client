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

export interface IniSettings {
  modified: boolean;
  setModified: (modified: boolean) => void;

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

export const useIniSettingsStore = create<IniSettings>()(
  persist(
    (set, get) => ({
      modified: false,
      setModified: (v: boolean) => set({ modified: v }),

      // Video
      videoMode: "",
      setVideoMode: (v: string) => set({ videoMode: v, modified: true }),
      videoModeNtsc: "",
      setVideoModeNtsc: (v: string) =>
        set({ videoModeNtsc: v, modified: true }),
      videoModePal: "",
      setVideoModePal: (v: string) => set({ videoModePal: v, modified: true }),
      verticalScaleMode: 0,
      setVerticalScaleMode: (v: number) =>
        set({ verticalScaleMode: v, modified: true }),
      vsyncAdjust: 0,
      setVsyncAdjust: (v: number) => set({ vsyncAdjust: v, modified: true }),
      refreshMin: 0,
      setRefreshMin: (v: number) => set({ refreshMin: v, modified: true }),
      refreshMax: 0,
      setRefreshMax: (v: number) => set({ refreshMax: v, modified: true }),
      dviMode: 2,
      setDviMode: (v: number) => set({ dviMode: v, modified: true }),
      vscaleBorder: 0,
      setVscaleBorder: (v: number) => set({ vscaleBorder: v, modified: true }),
      vfilterDefault: "",
      setVfilterDefault: (v: string) =>
        set({ vfilterDefault: v, modified: true }),
      vfilterVerticalDefault: "",
      setVfilterVerticalDefault: (v: string) =>
        set({ vfilterVerticalDefault: v, modified: true }),
      vfilterScanlinesDefault: "",
      setVfilterScanlinesDefault: (v: string) =>
        set({ vfilterScanlinesDefault: v, modified: true }),
      shmaskDefault: "",
      setShmaskDefault: (v: string) =>
        set({ shmaskDefault: v, modified: true }),
      shmaskModeDefault: 0,
      setShmaskModeDefault: (v: number) =>
        set({ shmaskModeDefault: v, modified: true }),
      hdmiGameMode: 0,
      setHdmiGameMode: (v: number) => set({ hdmiGameMode: v, modified: true }),
      hdmiLimited: 0,
      setHdmiLimited: (v: number) => set({ hdmiLimited: v, modified: true }),
      vrrMode: 0,
      setVrrMode: (v: number) => set({ vrrMode: v, modified: true }),
      vrrMinFramerate: 0,
      setVrrMinFramerate: (v: number) =>
        set({ vrrMinFramerate: v, modified: true }),
      vrrMaxFramerate: 0,
      setVrrMaxFramerate: (v: number) =>
        set({ vrrMaxFramerate: v, modified: true }),
      vrrVesaFramerate: 0,
      setVrrVesaFramerate: (v: number) =>
        set({ vrrVesaFramerate: v, modified: true }),
      directVideo: 0,
      setDirectVideo: (v: number) => set({ directVideo: v, modified: true }),
      forcedScandoubler: 0,
      setForcedScandoubler: (v: number) =>
        set({ forcedScandoubler: v, modified: true }),
      ypbpr: 0,
      setYpbpr: (v: number) => set({ ypbpr: v, modified: true }),
      compositeSync: 0,
      setCompositeSync: (v: number) =>
        set({ compositeSync: v, modified: true }),
      vgaScaler: 0,
      setVgaScaler: (v: number) => set({ vgaScaler: v, modified: true }),
      vgaSog: 0,
      setVgaSog: (v: number) => set({ vgaSog: v, modified: true }),
      customAspectRatio1: "",
      setCustomAspectRatio1: (v: string) =>
        set({ customAspectRatio1: v, modified: true }),
      customAspectRatio2: "",
      setCustomAspectRatio2: (v: string) =>
        set({ customAspectRatio2: v, modified: true }),
      hdr: 0,
      setHdr: (v: number) => set({ hdr: v, modified: true }),
      videoBrightness: 50,
      setVideoBrightness: (v: number) =>
        set({ videoBrightness: v, modified: true }),
      videoContrast: 50,
      setVideoContrast: (v: number) =>
        set({ videoContrast: v, modified: true }),
      videoSaturation: 100,
      setVideoSaturation: (v: number) =>
        set({ videoSaturation: v, modified: true }),
      videoHue: 0,
      setVideoHue: (v: number) => set({ videoHue: v, modified: true }),
      videoGainOffset: "1, 0, 1, 0, 1, 0",
      setVideoGainOffset: (v: string) =>
        set({ videoGainOffset: v, modified: true }),

      // Cores
      bootScreen: 1,
      setBootScreen: (v: number) => set({ bootScreen: v, modified: true }),
      recents: 0,
      setRecents: (v: number) => set({ recents: v, modified: true }),
      videoInfo: 0,
      setVideoInfo: (v: number) => set({ videoInfo: v, modified: true }),
      controllerInfo: 6,
      setControllerInfo: (v: number) =>
        set({ controllerInfo: v, modified: true }),
      sharedFolder: "",
      setSharedFolder: (v: string) => set({ sharedFolder: v, modified: true }),
      logFileEntry: 0,
      setLogFileEntry: (v: number) => set({ logFileEntry: v, modified: true }),
      keyMenuAsRgui: 0,
      setKeyMenuAsRgui: (v: number) =>
        set({ keyMenuAsRgui: v, modified: true }),

      // Input devices
      btAutoDisconnect: 0,
      setBtAutoDisconnect: (v: number) =>
        set({ btAutoDisconnect: v, modified: true }),
      btResetBeforePair: 0,
      setBtResetBeforePair: (v: number) =>
        set({ btResetBeforePair: v, modified: true }),
      mouseThrottle: 0,
      setMouseThrottle: (v: number) =>
        set({ mouseThrottle: v, modified: true }),
      resetCombo: 0,
      setResetCombo: (v: number) => set({ resetCombo: v, modified: true }),
      player1Controller: "",
      setPlayer1Controller: (v: string) =>
        set({ player1Controller: v, modified: true }),
      player2Controller: "",
      setPlayer2Controller: (v: string) =>
        set({ player2Controller: v, modified: true }),
      player3Controller: "",
      setPlayer3Controller: (v: string) =>
        set({ player3Controller: v, modified: true }),
      player4Controller: "",
      setPlayer4Controller: (v: string) =>
        set({ player4Controller: v, modified: true }),
      sniperMode: 0,
      setSniperMode: (v: number) => set({ sniperMode: v, modified: true }),
      spinnerThrottle: 0,
      setSpinnerThrottle: (v: number) =>
        set({ spinnerThrottle: v, modified: true }),
      spinnerAxis: 0,
      setSpinnerAxis: (v: number) => set({ spinnerAxis: v, modified: true }),
      gamepadDefaults: 0,
      setGamepadDefaults: (v: number) =>
        set({ gamepadDefaults: v, modified: true }),
      disableAutoFire: 0,
      setDisableAutoFire: (v: number) =>
        set({ disableAutoFire: v, modified: true }),
      wheelForce: 50,
      setWheelForce: (v: number) => set({ wheelForce: v, modified: true }),
      wheelRange: 0,
      setWheelRange: (v: number) => set({ wheelRange: v, modified: true }),
      spinnerVid: "",
      setSpinnerVid: (v: string) => set({ spinnerVid: v, modified: true }),
      spinnerPid: "",
      setSpinnerPid: (v: string) => set({ spinnerPid: v, modified: true }),
      keyrahMode: "",
      setKeyrahMode: (v: string) => set({ keyrahMode: v, modified: true }),
      jammaVid: "",
      setJammaVid: (v: string) => set({ jammaVid: v, modified: true }),
      jammaPid: "",
      setJammaPid: (v: string) => set({ jammaPid: v, modified: true }),
      noMergeVid: "",
      setNoMergeVid: (v: string) => set({ noMergeVid: v, modified: true }),
      noMergePid: "",
      setNoMergePid: (v: string) => set({ noMergePid: v, modified: true }),
      noMergeVidPid: [],
      setNoMergeVidPid: (v: string[]) =>
        set({ noMergeVidPid: v, modified: true }),
      rumble: 1,
      setRumble: (v: number) => set({ rumble: v, modified: true }),
      keyboardNoMouse: 0,
      setKeyboardNoMouse: (v: number) =>
        set({ keyboardNoMouse: v, modified: true }),

      // Audio
      hdmiAudio96k: 0,
      setHdmiAudio96k: (v: number) => set({ hdmiAudio96k: v, modified: true }),
      aFilterDefault: "",
      setAFilterDefault: (v: string) =>
        set({ aFilterDefault: v, modified: true }),

      // System
      fbSize: 0,
      setFbSize: (v: number) => set({ fbSize: v, modified: true }),
      fbTerminal: 1,
      setFbTerminal: (v: number) => set({ fbTerminal: v, modified: true }),
      bootCore: "",
      setBootCore: (v: string) => set({ bootCore: v, modified: true }),
      bootCoreTimeout: 0,
      setBootCoreTimeout: (v: number) =>
        set({ bootCoreTimeout: v, modified: true }),
      waitMount: "",
      setWaitMount: (v: string) => set({ waitMount: v, modified: true }),

      // OSD/Menu
      rbfHideDatecode: 0,
      setRbfHideDatecode: (v: number) =>
        set({ rbfHideDatecode: v, modified: true }),
      osdRotate: 0,
      setOsdRotate: (v: number) => set({ osdRotate: v, modified: true }),
      browseExpand: 1,
      setBrowseExpand: (v: number) => set({ browseExpand: v, modified: true }),
      osdTimeout: 0,
      setOsdTimeout: (v: number) => set({ osdTimeout: v, modified: true }),
      videoOff: 0,
      setVideoOff: (v: number) => set({ videoOff: v, modified: true }),
      menuPal: 0,
      setMenuPal: (v: number) => set({ menuPal: v, modified: true }),
      font: "",
      setFont: (v: string) => set({ font: v, modified: true }),
      logo: 1,
      setLogo: (v: number) => set({ logo: v, modified: true }),
    }),
    {
      name: "iniSettings",
    }
  )
);
