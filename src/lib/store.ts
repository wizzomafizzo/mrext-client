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
  bootScreen: boolean;
  setBootScreen: (v: boolean) => void;
  recents: boolean;
  setRecents: (v: boolean) => void;
  videoInfo: number;
  setVideoInfo: (v: number) => void;
  controllerInfo: number;
  setControllerInfo: (v: number) => void;
  sharedFolder: string;
  setSharedFolder: (v: string) => void;
  logFileEntry: boolean;
  setLogFileEntry: (v: boolean) => void;
  keyMenuAsRgui: boolean;
  setKeyMenuAsRgui: (v: boolean) => void;

  // Input devices
  btAutoDisconnect: number;
  setBtAutoDisconnect: (v: number) => void;
  btResetBeforePair: boolean;
  setBtResetBeforePair: (v: boolean) => void;
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
  autoFire: boolean;
  setAutoFire: (v: boolean) => void;
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

  // Audio
  hdmiAudio96k: boolean;
  setHdmiAudio96k: (v: boolean) => void;
  aFilterDefault: string;
  setAFilterDefault: (v: string) => void;
}

export const useIniSettingsStore = create<IniSettings>()(
  persist(
    (set, get) => ({
      // Video
      videoMode: "",
      setVideoMode: (v: string) => set({ videoMode: v }),
      videoModeNtsc: "",
      setVideoModeNtsc: (v: string) => set({ videoModeNtsc: v }),
      videoModePal: "",
      setVideoModePal: (v: string) => set({ videoModePal: v }),
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
      customAspectRatio1: "",
      setCustomAspectRatio1: (v: string) => set({ customAspectRatio1: v }),
      customAspectRatio2: "",
      setCustomAspectRatio2: (v: string) => set({ customAspectRatio2: v }),
      hdr: 0,
      setHdr: (v: number) => set({ hdr: v }),
      videoBrightness: 50,
      setVideoBrightness: (v: number) => set({ videoBrightness: v }),
      videoContrast: 50,
      setVideoContrast: (v: number) => set({ videoContrast: v }),
      videoSaturation: 100,
      setVideoSaturation: (v: number) => set({ videoSaturation: v }),
      videoHue: 0,
      setVideoHue: (v: number) => set({ videoHue: v }),
      videoGainOffset: "1,0,1,0,1,0",
      setVideoGainOffset: (v: string) => set({ videoGainOffset: v }),

      // Cores
      bootScreen: true,
      setBootScreen: (v: boolean) => set({ bootScreen: v }),
      recents: false,
      setRecents: (v: boolean) => set({ recents: v }),
      videoInfo: 0,
      setVideoInfo: (v: number) => set({ videoInfo: v }),
      controllerInfo: 6,
      setControllerInfo: (v: number) => set({ controllerInfo: v }),
      sharedFolder: "",
      setSharedFolder: (v: string) => set({ sharedFolder: v }),
      logFileEntry: false,
      setLogFileEntry: (v: boolean) => set({ logFileEntry: v }),
      keyMenuAsRgui: false,
      setKeyMenuAsRgui: (v: boolean) => set({ keyMenuAsRgui: v }),

      // Input devices
      btAutoDisconnect: 0,
      setBtAutoDisconnect: (v: number) => set({ btAutoDisconnect: v }),
      btResetBeforePair: false,
      setBtResetBeforePair: (v: boolean) => set({ btResetBeforePair: v }),
      mouseThrottle: 10,
      setMouseThrottle: (v: number) => set({ mouseThrottle: v }),
      resetCombo: 0,
      setResetCombo: (v: number) => set({ resetCombo: v }),
      player1Controller: "",
      setPlayer1Controller: (v: string) => set({ player1Controller: v }),
      player2Controller: "",
      setPlayer2Controller: (v: string) => set({ player2Controller: v }),
      player3Controller: "",
      setPlayer3Controller: (v: string) => set({ player3Controller: v }),
      player4Controller: "",
      setPlayer4Controller: (v: string) => set({ player4Controller: v }),
      sniperMode: 0,
      setSniperMode: (v: number) => set({ sniperMode: v }),
      spinnerThrottle: 100,
      setSpinnerThrottle: (v: number) => set({ spinnerThrottle: v }),
      spinnerAxis: 1,
      setSpinnerAxis: (v: number) => set({ spinnerAxis: v }),
      gamepadDefaults: 0,
      setGamepadDefaults: (v: number) => set({ gamepadDefaults: v }),
      autoFire: true,
      setAutoFire: (v: boolean) => set({ autoFire: v }),
      wheelForce: 50,
      setWheelForce: (v: number) => set({ wheelForce: v }),
      wheelRange: 200,
      setWheelRange: (v: number) => set({ wheelRange: v }),
      spinnerVid: "",
      setSpinnerVid: (v: string) => set({ spinnerVid: v }),
      spinnerPid: "",
      setSpinnerPid: (v: string) => set({ spinnerPid: v }),
      keyrahMode: "",
      setKeyrahMode: (v: string) => set({ keyrahMode: v }),
      jammaVid: "",
      setJammaVid: (v: string) => set({ jammaVid: v }),
      jammaPid: "",
      setJammaPid: (v: string) => set({ jammaPid: v }),
      noMergeVid: "",
      setNoMergeVid: (v: string) => set({ noMergeVid: v }),
      noMergePid: "",
      setNoMergePid: (v: string) => set({ noMergePid: v }),
      noMergeVidPid: [],
      setNoMergeVidPid: (v: string[]) => set({ noMergeVidPid: v }),

      // Audio
      hdmiAudio96k: false,
      setHdmiAudio96k: (v: boolean) => set({ hdmiAudio96k: v }),
      aFilterDefault: "",
      setAFilterDefault: (v: string) => set({ aFilterDefault: v }),
    }),
    {
      name: "iniSettings",
    }
  )
);
