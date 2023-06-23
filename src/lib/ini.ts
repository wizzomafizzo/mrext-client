import { ControlApi } from "./api";
import { create } from "zustand";

const iniKeyMap: { [key: string]: string } = {
  ypbpr: "ypbpr",
  compositeSync: "composite_sync",
  forcedScandoubler: "forced_scandoubler",
  vgaScaler: "vga_scaler",
  vgaSog: "vga_sog",
  keyrahMode: "keyrah_mode",
  resetCombo: "reset_combo",
  keyMenuAsRgui: "key_menu_as_rgui",
  videoMode: "video_mode",
  videoModePal: "video_mode_pal",
  videoModeNtsc: "video_mode_ntsc",
  videoInfo: "video_info",
  vsyncAdjust: "vsync_adjust",
  hdmiAudio96k: "hdmi_audio_96k",
  dviMode: "dvi_mode",
  hdmiLimited: "hdmi_limited",
  keyboardNoMouse: "kbd_nomouse",
  mouseThrottle: "mouse_throttle",
  bootScreen: "bootscreen",
  verticalScaleMode: "vscale_mode",
  vscaleBorder: "vscale_border",
  rbfHideDatecode: "rbf_hide_datecode",
  menuPal: "menu_pal",
  bootCore: "bootcore",
  bootCoreTimeout: "bootcore_timeout",
  font: "font",
  fbSize: "fb_size",
  fbTerminal: "fb_terminal",
  osdTimeout: "osd_timeout",
  directVideo: "direct_video",
  osdRotate: "osd_rotate",
  gamepadDefaults: "gamepad_defaults",
  recents: "recents",
  controllerInfo: "controller_info",
  refreshMin: "refresh_min",
  refreshMax: "refresh_max",
  jammaVid: "jamma_vid",
  jammaPid: "jamma_pid",
  sniperMode: "sniper_mode",
  browseExpand: "browse_expand",
  logo: "logo",
  sharedFolder: "shared_folder",
  noMergeVid: "no_merge_vid",
  noMergePid: "no_merge_pid",
  noMergeVidPid: "no_merge_vidpid",
  customAspectRatio1: "custom_aspect_ratio_1",
  customAspectRatio2: "custom_aspect_ratio_2",
  spinnerVid: "spinner_vid",
  spinnerPid: "spinner_pid",
  spinnerAxis: "spinner_axis",
  spinnerThrottle: "spinner_throttle",
  aFilterDefault: "afilter_default",
  vfilterDefault: "vfilter_default",
  vfilterVerticalDefault: "vfilter_vertical_default",
  vfilterScanlinesDefault: "vfilter_scanlines_default",
  shmaskDefault: "shmask_default",
  shmaskModeDefault: "shmask_mode_default",
  presetDefault: "preset_default",
  logFileEntry: "log_file_entry",
  btAutoDisconnect: "bt_auto_disconnect",
  btResetBeforePair: "bt_reset_before_pair",
  waitMount: "waitmount",
  rumble: "rumble",
  wheelForce: "wheel_force",
  wheelRange: "wheel_range",
  hdmiGameMode: "hdmi_game_mode",
  vrrMode: "vrr_mode",
  vrrMinFramerate: "vrr_min_framerate",
  vrrMaxFramerate: "vrr_max_framerate",
  vrrVesaFramerate: "vrr_vesa_framerate",
  videoOff: "video_off",
  player1Controller: "player_1_controller",
  player2Controller: "player_2_controller",
  player3Controller: "player_3_controller",
  player4Controller: "player_4_controller",
  player5Controller: "player_5_controller",
  player6Controller: "player_6_controller",
  disableAutoFire: "disable_autofire",
  videoBrightness: "video_brightness",
  videoContrast: "video_contrast",
  videoSaturation: "video_saturation",
  videoHue: "video_hue",
  videoGainOffset: "video_gain_offset",
  hdr: "hdr",
  hdrMaxNits: "hdr_max_nits",
  hdrAvgNits: "hdr_avg_nits",
  // : "vga_mode",
  // : "ntsc_mode",
  // : "controller_unique_mapping",
};

interface IniActions {
  setAttribute: (key: string, value: string) => void;
  reset: () => void;
  resetModified: () => void;

  // video
  setVideoMode: (v: string) => void;
  setVideoModeNtsc: (v: string) => void;
  setVideoModePal: (v: string) => void;
  setVerticalScaleMode: (v: string) => void;
  setVsyncAdjust: (v: string) => void;
  setRefreshMin: (v: string) => void;
  setRefreshMax: (v: string) => void;
  setDviMode: (v: string) => void;
  setVscaleBorder: (v: string) => void;
  setVfilterDefault: (v: string) => void;
  setVfilterVerticalDefault: (v: string) => void;
  setVfilterScanlinesDefault: (v: string) => void;
  setShmaskDefault: (v: string) => void;
  setShmaskModeDefault: (v: string) => void;
  setHdmiGameMode: (v: string) => void;
  setHdmiLimited: (v: string) => void;
  setVrrMode: (v: string) => void;
  setVrrMinFramerate: (v: string) => void;
  setVrrMaxFramerate: (v: string) => void;
  setVrrVesaFramerate: (v: string) => void;
  setPresetDefault: (v: string) => void;
  // analog options
  setDirectVideo: (v: string) => void;
  setForcedScandoubler: (v: string) => void;
  setYpbpr: (v: string) => void;
  setCompositeSync: (v: string) => void;
  setVgaScaler: (v: string) => void;
  setVgaSog: (v: string) => void;
  setCustomAspectRatio1: (v: string) => void;
  setCustomAspectRatio2: (v: string) => void;
  setHdr: (v: string) => void;
  setVideoBrightness: (v: string) => void;
  setVideoContrast: (v: string) => void;
  setVideoSaturation: (v: string) => void;
  setVideoHue: (v: string) => void;
  setVideoGainOffset: (v: string) => void;
  setHdrMaxNits: (v: string) => void;
  setHdrAvgNits: (v: string) => void;

  // cores
  setBootScreen: (v: string) => void;
  setRecents: (v: string) => void;
  setVideoInfo: (v: string) => void;
  setControllerInfo: (v: string) => void;
  setSharedFolder: (v: string) => void;
  setLogFileEntry: (v: string) => void;
  setKeyMenuAsRgui: (v: string) => void;

  // input devices
  setBtAutoDisconnect: (v: string) => void;
  setBtResetBeforePair: (v: string) => void;
  setMouseThrottle: (v: string) => void;
  setResetCombo: (v: string) => void;
  setPlayer1Controller: (v: string) => void;
  setPlayer2Controller: (v: string) => void;
  setPlayer3Controller: (v: string) => void;
  setPlayer4Controller: (v: string) => void;
  setPlayer5Controller: (v: string) => void;
  setPlayer6Controller: (v: string) => void;
  setSniperMode: (v: string) => void;
  setSpinnerThrottle: (v: string) => void;
  setSpinnerAxis: (v: string) => void;
  setGamepadDefaults: (v: string) => void;
  setDisableAutoFire: (v: string) => void;
  setWheelForce: (v: string) => void;
  setWheelRange: (v: string) => void;
  setSpinnerVid: (v: string) => void;
  setSpinnerPid: (v: string) => void;
  setKeyrahMode: (v: string) => void;
  setJammaVid: (v: string) => void;
  setJammaPid: (v: string) => void;
  setNoMergeVid: (v: string) => void;
  setNoMergePid: (v: string) => void;
  setNoMergeVidPid: (v: string) => void;
  setRumble: (v: string) => void;
  setKeyboardNoMouse: (v: string) => void;

  // audio
  setHdmiAudio96k: (v: string) => void;
  setAFilterDefault: (v: string) => void;

  // system
  setFbSize: (v: string) => void;
  setFbTerminal: (v: string) => void;
  setBootCore: (v: string) => void;
  setBootCoreTimeout: (v: string) => void;
  setWaitMount: (v: string) => void;

  // osd/menu
  setRbfHideDatecode: (v: string) => void;
  setOsdRotate: (v: string) => void;
  setBrowseExpand: (v: string) => void;
  setOsdTimeout: (v: string) => void;
  setVideoOff: (v: string) => void;
  setMenuPal: (v: string) => void;
  setFont: (v: string) => void;
  setLogo: (v: string) => void;
}

interface IniState {
  // video
  videoMode: string;
  videoModeNtsc: string;
  videoModePal: string;
  verticalScaleMode: string;
  vsyncAdjust: string;
  refreshMin: string;
  refreshMax: string;
  dviMode: string;
  vscaleBorder: string;
  vfilterDefault: string;
  vfilterVerticalDefault: string;
  vfilterScanlinesDefault: string;
  shmaskDefault: string;
  shmaskModeDefault: string;
  hdmiGameMode: string;
  hdmiLimited: string;
  vrrMode: string;
  vrrMinFramerate: string;
  vrrMaxFramerate: string;
  vrrVesaFramerate: string;
  presetDefault: string;
  // analog options
  directVideo: string;
  forcedScandoubler: string;
  ypbpr: string;
  compositeSync: string;
  vgaScaler: string;
  vgaSog: string;
  customAspectRatio1: string;
  customAspectRatio2: string;
  hdr: string;
  videoBrightness: string;
  videoContrast: string;
  videoSaturation: string;
  videoHue: string;
  videoGainOffset: string;
  hdrMaxNits: string;
  hdrAvgNits: string;

  // cores
  bootScreen: string;
  recents: string;
  videoInfo: string;
  controllerInfo: string;
  sharedFolder: string;
  logFileEntry: string;
  keyMenuAsRgui: string;

  // input devices
  btAutoDisconnect: string;
  btResetBeforePair: string;
  mouseThrottle: string;
  resetCombo: string;
  player1Controller: string;
  player2Controller: string;
  player3Controller: string;
  player4Controller: string;
  player5Controller: string;
  player6Controller: string;
  sniperMode: string;
  spinnerThrottle: string;
  spinnerAxis: string;
  gamepadDefaults: string;
  disableAutoFire: string;
  wheelForce: string;
  wheelRange: string;
  spinnerVid: string;
  spinnerPid: string;
  keyrahMode: string;
  jammaVid: string;
  jammaPid: string;
  noMergeVid: string;
  noMergePid: string;
  noMergeVidPid: string;
  rumble: string;
  keyboardNoMouse: string;

  // audio
  hdmiAudio96k: string;
  aFilterDefault: string;

  // system
  fbSize: string;
  fbTerminal: string;
  bootCore: string;
  bootCoreTimeout: string;
  waitMount: string;

  // osd/menu
  rbfHideDatecode: string;
  osdRotate: string;
  browseExpand: string;
  osdTimeout: string;
  videoOff: string;
  menuPal: string;
  font: string;
  logo: string;
}

type IniStore = IniState &
  IniActions & {
    modified: string[];
  };

const initialState: IniState = {
  // video
  videoMode: "",
  videoModeNtsc: "",
  videoModePal: "",
  verticalScaleMode: "0",
  vsyncAdjust: "0",
  refreshMin: "0",
  refreshMax: "0",
  dviMode: "2",
  vscaleBorder: "0",
  vfilterDefault: "",
  vfilterVerticalDefault: "",
  vfilterScanlinesDefault: "",
  shmaskDefault: "",
  shmaskModeDefault: "0",
  hdmiGameMode: "0",
  hdmiLimited: "0",
  vrrMode: "0",
  vrrMinFramerate: "0",
  vrrMaxFramerate: "0",
  vrrVesaFramerate: "0",
  directVideo: "0",
  forcedScandoubler: "0",
  ypbpr: "0",
  compositeSync: "0",
  vgaScaler: "0",
  vgaSog: "0",
  customAspectRatio1: "",
  customAspectRatio2: "",
  hdr: "0",
  videoBrightness: "50",
  videoContrast: "50",
  videoSaturation: "100",
  videoHue: "0",
  videoGainOffset: "1, 0, 1, 0, 1, 0",
  presetDefault: "",
  hdrMaxNits: "1000",
  hdrAvgNits: "250",

  // cores
  bootScreen: "1",
  recents: "0",
  videoInfo: "0",
  controllerInfo: "6",
  sharedFolder: "",
  logFileEntry: "0",
  keyMenuAsRgui: "0",

  // input devices
  btAutoDisconnect: "0",
  btResetBeforePair: "0",
  mouseThrottle: "0",
  resetCombo: "0",
  player1Controller: "",
  player2Controller: "",
  player3Controller: "",
  player4Controller: "",
  player5Controller: "",
  player6Controller: "",
  sniperMode: "0",
  spinnerThrottle: "0",
  spinnerAxis: "0",
  gamepadDefaults: "0",
  disableAutoFire: "0",
  wheelForce: "50",
  wheelRange: "0",
  spinnerVid: "",
  spinnerPid: "",
  keyrahMode: "",
  jammaVid: "",
  jammaPid: "",
  noMergeVid: "",
  noMergePid: "",
  noMergeVidPid: "",
  rumble: "1",
  keyboardNoMouse: "0",

  // audio
  hdmiAudio96k: "0",
  aFilterDefault: "",

  // system
  fbSize: "0",
  fbTerminal: "1",
  bootCore: "",
  bootCoreTimeout: "0",
  waitMount: "",

  // osd/menu
  rbfHideDatecode: "0",
  osdRotate: "0",
  browseExpand: "1",
  osdTimeout: "0",
  videoOff: "0",
  menuPal: "0",
  font: "",
  logo: "1",
};

const distinct = (arr: string[]) => [...new Set(arr)];

export const useIniSettingsStore = create<IniStore>()((set) => ({
  ...initialState,

  modified: [],

  setAttribute: (key: string, value: string) =>
    set(() => ({
      [key]: value,
    })),

  reset: () => set(initialState),
  resetModified: () => set({ modified: [] }),

  // video
  setVideoMode: (v: string) =>
    set((state) => ({
      videoMode: v,
      modified: distinct([...state.modified, "videoMode"]),
    })),
  setVideoModeNtsc: (v: string) =>
    set((state) => ({
      videoModeNtsc: v,
      modified: distinct([...state.modified, "setVideoModeNtsc"]),
    })),
  setVideoModePal: (v: string) =>
    set((state) => ({
      videoModePal: v,
      modified: distinct([...state.modified, "videoModePal"]),
    })),
  setVerticalScaleMode: (v: string) =>
    set((state) => ({
      verticalScaleMode: v,
      modified: distinct([...state.modified, "verticalScaleMode"]),
    })),
  setVsyncAdjust: (v: string) =>
    set((state) => ({
      vsyncAdjust: v,
      modified: distinct([...state.modified, "vsyncAdjust"]),
    })),
  setRefreshMin: (v: string) =>
    set((state) => ({
      refreshMin: v,
      modified: distinct([...state.modified, "refreshMin"]),
    })),
  setRefreshMax: (v: string) =>
    set((state) => ({
      refreshMax: v,
      modified: distinct([...state.modified, "refreshMax"]),
    })),
  setDviMode: (v: string) =>
    set((state) => ({
      dviMode: v,
      modified: distinct([...state.modified, "dviMode"]),
    })),
  setVscaleBorder: (v: string) =>
    set((state) => ({
      vscaleBorder: v,
      modified: distinct([...state.modified, "vscaleBorder"]),
    })),
  setVfilterDefault: (v: string) =>
    set((state) => ({
      vfilterDefault: v,
      modified: distinct([...state.modified, "vfilterDefault"]),
    })),
  setVfilterVerticalDefault: (v: string) =>
    set((state) => ({
      vfilterVerticalDefault: v,
      modified: distinct([...state.modified, "vfilterVerticalDefault"]),
    })),
  setVfilterScanlinesDefault: (v: string) =>
    set((state) => ({
      vfilterScanlinesDefault: v,
      modified: distinct([...state.modified, "vfilterScanlinesDefault"]),
    })),
  setShmaskDefault: (v: string) =>
    set((state) => ({
      shmaskDefault: v,
      modified: distinct([...state.modified, "shmaskDefault"]),
    })),
  setShmaskModeDefault: (v: string) =>
    set((state) => ({
      shmaskModeDefault: v,
      modified: distinct([...state.modified, "shmaskModeDefault"]),
    })),
  setHdmiGameMode: (v: string) =>
    set((state) => ({
      hdmiGameMode: v,
      modified: distinct([...state.modified, "hdmiGameMode"]),
    })),
  setHdmiLimited: (v: string) =>
    set((state) => ({
      hdmiLimited: v,
      modified: distinct([...state.modified, "hdmiLimited"]),
    })),
  setVrrMode: (v: string) =>
    set((state) => ({
      vrrMode: v,
      modified: distinct([...state.modified, "vrrMode"]),
    })),
  setVrrMinFramerate: (v: string) =>
    set((state) => ({
      vrrMinFramerate: v,
      modified: distinct([...state.modified, "vrrMinFramerate"]),
    })),
  setVrrMaxFramerate: (v: string) =>
    set((state) => ({
      vrrMaxFramerate: v,
      modified: distinct([...state.modified, "vrrMaxFramerate"]),
    })),
  setVrrVesaFramerate: (v: string) =>
    set((state) => ({
      vrrVesaFramerate: v,
      modified: distinct([...state.modified, "vrrVesaFramerate"]),
    })),
  setDirectVideo: (v: string) =>
    set((state) => ({
      directVideo: v,
      modified: distinct([...state.modified, "directVideo"]),
    })),
  setForcedScandoubler: (v: string) =>
    set((state) => ({
      forcedScandoubler: v,
      modified: distinct([...state.modified, "forcedScandoubler"]),
    })),
  setYpbpr: (v: string) =>
    set((state) => ({
      ypbpr: v,
      modified: distinct([...state.modified, "ypbpr"]),
    })),
  setCompositeSync: (v: string) =>
    set((state) => ({
      compositeSync: v,
      modified: distinct([...state.modified, "compositeSync"]),
    })),
  setVgaScaler: (v: string) =>
    set((state) => ({
      vgaScaler: v,
      modified: distinct([...state.modified, "vgaScaler"]),
    })),
  setVgaSog: (v: string) =>
    set((state) => ({
      vgaSog: v,
      modified: distinct([...state.modified, "vgaSog"]),
    })),
  setCustomAspectRatio1: (v: string) =>
    set((state) => ({
      customAspectRatio1: v,
      modified: distinct([...state.modified, "customAspectRatio1"]),
    })),
  setCustomAspectRatio2: (v: string) =>
    set((state) => ({
      customAspectRatio2: v,
      modified: distinct([...state.modified, "customAspectRatio2"]),
    })),
  setHdr: (v: string) =>
    set((state) => ({
      hdr: v,
      modified: [...state.modified, "hdr"],
    })),
  setVideoBrightness: (v: string) =>
    set((state) => ({
      videoBrightness: v,
      modified: distinct([...state.modified, "videoBrightness"]),
    })),
  setVideoContrast: (v: string) =>
    set((state) => ({
      videoContrast: v,
      modified: distinct([...state.modified, "videoContrast"]),
    })),
  setVideoSaturation: (v: string) =>
    set((state) => ({
      videoSaturation: v,
      modified: distinct([...state.modified, "videoSaturation"]),
    })),
  setVideoHue: (v: string) =>
    set((state) => ({
      videoHue: v,
      modified: distinct([...state.modified, "videoHue"]),
    })),
  setVideoGainOffset: (v: string) =>
    set((state) => ({
      videoGainOffset: v,
      modified: distinct([...state.modified, "videoGainOffset"]),
    })),
  setPresetDefault: (v: string) =>
    set((state) => ({
      presetDefault: v,
      modified: distinct([...state.modified, "presetDefault"]),
    })),
  setHdrMaxNits: (v: string) =>
    set((state) => ({
      hdrMaxNits: v,
      modified: distinct([...state.modified, "hdrMaxNits"]),
    })),
  setHdrAvgNits: (v: string) =>
    set((state) => ({
      hdrAvgNits: v,
      modified: distinct([...state.modified, "hdrAvgNits"]),
    })),

  // cores
  setBootScreen: (v: string) =>
    set((state) => ({
      bootScreen: v,
      modified: distinct([...state.modified, "bootScreen"]),
    })),
  setRecents: (v: string) =>
    set((state) => ({
      recents: v,
      modified: distinct([...state.modified, "recents"]),
    })),
  setVideoInfo: (v: string) =>
    set((state) => ({
      videoInfo: v,
      modified: distinct([...state.modified, "videoInfo"]),
    })),
  setControllerInfo: (v: string) =>
    set((state) => ({
      controllerInfo: v,
      modified: distinct([...state.modified, "controllerInfo"]),
    })),
  setSharedFolder: (v: string) =>
    set((state) => ({
      sharedFolder: v,
      modified: distinct([...state.modified, "sharedFolder"]),
    })),
  setLogFileEntry: (v: string) =>
    set((state) => ({
      logFileEntry: v,
      modified: distinct([...state.modified, "logFileEntry"]),
    })),
  setKeyMenuAsRgui: (v: string) =>
    set((state) => ({
      keyMenuAsRgui: v,
      modified: distinct([...state.modified, "keyMenuAsRgui"]),
    })),

  // input devices
  setBtAutoDisconnect: (v: string) =>
    set((state) => ({
      btAutoDisconnect: v,
      modified: distinct([...state.modified, "btAutoDisconnect"]),
    })),
  setBtResetBeforePair: (v: string) =>
    set((state) => ({
      btResetBeforePair: v,
      modified: distinct([...state.modified, "btResetBeforePair"]),
    })),
  setMouseThrottle: (v: string) =>
    set((state) => ({
      mouseThrottle: v,
      modified: distinct([...state.modified, "mouseThrottle"]),
    })),
  setResetCombo: (v: string) =>
    set((state) => ({
      resetCombo: v,
      modified: distinct([...state.modified, "resetCombo"]),
    })),
  setPlayer1Controller: (v: string) =>
    set((state) => ({
      player1Controller: v,
      modified: distinct([...state.modified, "player1Controller"]),
    })),
  setPlayer2Controller: (v: string) =>
    set((state) => ({
      player2Controller: v,
      modified: distinct([...state.modified, "player2Controller"]),
    })),
  setPlayer3Controller: (v: string) =>
    set((state) => ({
      player3Controller: v,
      modified: distinct([...state.modified, "player3Controller"]),
    })),
  setPlayer4Controller: (v: string) =>
    set((state) => ({
      player4Controller: v,
      modified: distinct([...state.modified, "player4Controller"]),
    })),
  setPlayer5Controller: (v: string) =>
    set((state) => ({
      player5Controller: v,
      modified: distinct([...state.modified, "player5Controller"]),
    })),
  setPlayer6Controller: (v: string) =>
    set((state) => ({
      player6Controller: v,
      modified: distinct([...state.modified, "player6Controller"]),
    })),
  setSniperMode: (v: string) =>
    set((state) => ({
      sniperMode: v,
      modified: distinct([...state.modified, "sniperMode"]),
    })),
  setSpinnerThrottle: (v: string) =>
    set((state) => ({
      spinnerThrottle: v,
      modified: distinct([...state.modified, "spinnerThrottle"]),
    })),
  setSpinnerAxis: (v: string) =>
    set((state) => ({
      spinnerAxis: v,
      modified: distinct([...state.modified, "spinnerAxis"]),
    })),
  setGamepadDefaults: (v: string) =>
    set((state) => ({
      gamepadDefaults: v,
      modified: distinct([...state.modified, "gamepadDefaults"]),
    })),
  setDisableAutoFire: (v: string) =>
    set((state) => ({
      disableAutoFire: v,
      modified: distinct([...state.modified, "disableAutoFire"]),
    })),
  setWheelForce: (v: string) =>
    set((state) => ({
      wheelForce: v,
      modified: distinct([...state.modified, "wheelForce"]),
    })),
  setWheelRange: (v: string) =>
    set((state) => ({
      wheelRange: v,
      modified: distinct([...state.modified, "wheelRange"]),
    })),
  setSpinnerVid: (v: string) =>
    set((state) => ({
      spinnerVid: v,
      modified: distinct([...state.modified, "spinnerVid"]),
    })),
  setSpinnerPid: (v: string) =>
    set((state) => ({
      spinnerPid: v,
      modified: distinct([...state.modified, "spinnerPid"]),
    })),
  setKeyrahMode: (v: string) =>
    set((state) => ({
      keyrahMode: v,
      modified: distinct([...state.modified, "keyrahMode"]),
    })),
  setJammaVid: (v: string) =>
    set((state) => ({
      jammaVid: v,
      modified: distinct([...state.modified, "jammaVid"]),
    })),
  setJammaPid: (v: string) =>
    set((state) => ({
      jammaPid: v,
      modified: distinct([...state.modified, "jammaPid"]),
    })),
  setNoMergeVid: (v: string) =>
    set((state) => ({
      noMergeVid: v,
      modified: distinct([...state.modified, "noMergeVid"]),
    })),
  setNoMergePid: (v: string) =>
    set((state) => ({
      noMergePid: v,
      modified: distinct([...state.modified, "noMergePid"]),
    })),
  setNoMergeVidPid: (v: string) =>
    set((state) => ({
      noMergeVidPid: v,
      modified: distinct([...state.modified, "noMergeVidPid"]),
    })),
  setRumble: (v: string) =>
    set((state) => ({
      rumble: v,
      modified: distinct([...state.modified, "rumble"]),
    })),
  setKeyboardNoMouse: (v: string) =>
    set((state) => ({
      keyboardNoMouse: v,
      modified: distinct([...state.modified, "keyboardNoMouse"]),
    })),

  // audio
  setHdmiAudio96k: (v: string) =>
    set((state) => ({
      hdmiAudio96k: v,
      modified: distinct([...state.modified, "hdmiAudio96k"]),
    })),
  setAFilterDefault: (v: string) =>
    set((state) => ({
      aFilterDefault: v,
      modified: distinct([...state.modified, "aFilterDefault"]),
    })),

  // system
  setFbSize: (v: string) =>
    set((state) => ({
      fbSize: v,
      modified: distinct([...state.modified, "fbSize"]),
    })),
  setFbTerminal: (v: string) =>
    set((state) => ({
      fbTerminal: v,
      modified: distinct([...state.modified, "fbTerminal"]),
    })),
  setBootCore: (v: string) =>
    set((state) => ({
      bootCore: v,
      modified: distinct([...state.modified, "bootCore"]),
    })),
  setBootCoreTimeout: (v: string) =>
    set((state) => ({
      bootCoreTimeout: v,
      modified: distinct([...state.modified, "bootCoreTimeout"]),
    })),
  setWaitMount: (v: string) =>
    set((state) => ({
      waitMount: v,
      modified: distinct([...state.modified, "waitMount"]),
    })),

  // osd/menu
  setRbfHideDatecode: (v: string) =>
    set((state) => ({
      rbfHideDatecode: v,
      modified: distinct([...state.modified, "rbfHideDatecode"]),
    })),
  setOsdRotate: (v: string) =>
    set((state) => ({
      osdRotate: v,
      modified: distinct([...state.modified, "osdRotate"]),
    })),
  setBrowseExpand: (v: string) =>
    set((state) => ({
      browseExpand: v,
      modified: distinct([...state.modified, "browseExpand"]),
    })),
  setOsdTimeout: (v: string) =>
    set((state) => ({
      osdTimeout: v,
      modified: distinct([...state.modified, "osdTimeout"]),
    })),
  setVideoOff: (v: string) =>
    set((state) => ({
      videoOff: v,
      modified: distinct([...state.modified, "videoOff"]),
    })),
  setMenuPal: (v: string) =>
    set((state) => ({
      menuPal: v,
      modified: distinct([...state.modified, "menuPal"]),
    })),
  setFont: (v: string) =>
    set((state) => ({
      font: v,
      modified: distinct([...state.modified, "font"]),
    })),
  setLogo: (v: string) =>
    set((state) => ({
      logo: v,
      modified: distinct([...state.modified, "logo"]),
    })),
}));

const flip = (data: { [key: string]: string }) =>
  Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

const iniKeyMapReverse = flip(iniKeyMap);

interface Indexable {
  [key: string]: any;
}

function newIniRequest(state: IniStore): {
  [key: string]: string;
} {
  const changes: { [key: string]: string } = {};

  for (const name of state.modified) {
    if (!(name in iniKeyMap)) {
      console.error(`Unknown ini key: ${name}`);
      continue;
    }
    const key = iniKeyMap[name];
    changes[key] = (state as Indexable)[name];
  }

  return changes;
}

export function saveMisterIni(id: number, state: IniStore) {
  const changes = newIniRequest(state);
  console.log(changes);
  const api = new ControlApi();
  return api
    .saveMisterIni(id, changes)
    .then(() => {
      state.resetModified();
    })
    .catch((e) => {
      console.error(e);
    });
}

export function loadMisterIni(id: number, state: IniStore) {
  const api = new ControlApi();
  return api
    .loadMisterIni(id)
    .then((data) => {
      console.log("Loading ini data");
      for (const mKey in data) {
        if (mKey in iniKeyMapReverse) {
          const key = iniKeyMapReverse[mKey];
          if (state.modified.includes(key)) {
            console.log(`Skipping ini key ${mKey} as ${key} is modified`);
            continue;
          }
          state.setAttribute(key, data[mKey]);
          console.log(`Loaded ini key ${mKey} as ${key}, value ${data[mKey]}`);
        } else {
          console.warn(`Unknown ini key ${mKey}`);
        }
      }
    })
    .catch((e) => {
      console.error(e);
    });
}
