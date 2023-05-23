import { IniSettings } from "./store";

export type IniResponse = IniChangesRequest;

export interface IniChangesRequest {
  // Video
  videoMode?: string;
  videoModeNtsc?: string;
  videoModePal?: string;
  verticalScaleMode?: number;
  vsyncAdjust?: number;
  refreshMin?: number;
  refreshMax?: number;
  dviMode?: number;
  vscaleBorder?: number;
  vfilterDefault?: string;
  vfilterVerticalDefault?: string;
  vfilterScanlinesDefault?: string;
  shmaskDefault?: string;
  shmaskModeDefault?: number;
  hdmiGameMode?: number;
  hdmiLimited?: number;
  vrrMode?: number;
  vrrMinFramerate?: number;
  vrrMaxFramerate?: number;
  vrrVesaFramerate?: number;
  directVideo?: number;
  forcedScandoubler?: number;
  ypbpr?: number;
  compositeSync?: number;
  vgaScaler?: number;
  vgaSog?: number;
  customAspectRatio1?: string;
  customAspectRatio2?: string;
  hdr?: number;
  setHdr?: (v?: number) => void;
  videoBrightness?: number;
  videoContrast?: number;
  videoSaturation?: number;
  videoHue?: number;
  videoGainOffset?: string;

  // Cores
  bootScreen?: number;
  recents?: number;
  videoInfo?: number;
  controllerInfo?: number;
  sharedFolder?: string;
  logFileEntry?: number;
  keyMenuAsRgui?: number;

  // Input devices
  btAutoDisconnect?: number;
  btResetBeforePair?: number;
  mouseThrottle?: number;
  resetCombo?: number;
  player1Controller?: string;
  player2Controller?: string;
  player3Controller?: string;
  player4Controller?: string;
  sniperMode?: number;
  spinnerThrottle?: number;
  spinnerAxis?: number;
  gamepadDefaults?: number;
  disableAutoFire?: number;
  wheelForce?: number;
  wheelRange?: number;
  spinnerVid?: string;
  spinnerPid?: string;
  keyrahMode?: string;
  jammaVid?: string;
  jammaPid?: string;
  noMergeVid?: string;
  noMergePid?: string;
  noMergeVidPid?: string[];
  rumble?: number;
  keyboardNoMouse?: number;

  // Audio
  hdmiAudio96k?: number;
  aFilterDefault?: string;

  // System
  fbSize?: number;
  fbTerminal?: number;
  bootCore?: string;
  bootCoreTimeout?: number;
  waitMount?: string;

  // OSD/Menu
  rbfHideDatecode?: number;
  osdRotate?: number;
  browseExpand?: number;
  osdTimeout?: number;
  videoOff?: number;
  menuPal?: number;
  font?: string;
  logo?: number;
}

interface Indexable {
  [key: string]: any;
}

export function newIniRequest(state: IniSettings): IniChangesRequest {
  const changes: IniChangesRequest = {};

  for (const name of state.modified) {
    (changes as Indexable)[name] = (state as Indexable)[name];
  }

  return changes;
}
