import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import {
  BoolOption,
  PageHeader,
  SaveButton,
  TextOption,
  ToggleableNumberSliderOption,
} from "./SettingsCommon";
import { useIniSettingsStore } from "../../lib/store";

function BootScreen() {
  const v = useIniSettingsStore((state) => state.bootScreen);
  const sv = useIniSettingsStore((state) => state.setBootScreen);

  return (
    <BoolOption
      label="Display boot screen"
      value={v}
      setValue={sv}
      helpText="Show boot screen on some cores such as Minimig."
    />
  );
}

function Recents() {
  const v = useIniSettingsStore((state) => state.recents);
  const sv = useIniSettingsStore((state) => state.setRecents);

  return (
    <BoolOption
      label="Log recently launched files"
      value={v}
      setValue={sv}
      helpText="Enables the Recent Cores menu and allows scripts to track launched games. While it shouldn't be an issue with modern SD cards, be aware this does increase the number of writes."
    />
  );
}

function VideoInfo() {
  const v = useIniSettingsStore((state) => state.videoInfo);
  const sv = useIniSettingsStore((state) => state.setVideoInfo);

  return (
    <ToggleableNumberSliderOption
      label="Display video info"
      value={v}
      setValue={sv}
      defaultValue={0}
      min={1}
      max={10}
      step={1}
      suffix="seconds"
      helpText="Shows an information popup with current display settings when core is launched or video output changes."
    />
  );
}

function ControllerInfo() {
  const v = useIniSettingsStore((state) => state.controllerInfo);
  const sv = useIniSettingsStore((state) => state.setControllerInfo);

  return (
    <ToggleableNumberSliderOption
      label="Display controller info"
      value={v}
      setValue={sv}
      defaultValue={6}
      min={1}
      max={10}
      step={1}
      suffix="seconds"
      helpText="Shows an information popup with controller mappings when a button is first pressed in core."
    />
  );
}

function SharedFolder() {
  const v = useIniSettingsStore((state) => state.sharedFolder);
  const sv = useIniSettingsStore((state) => state.setSharedFolder);

  return (
    <TextOption
      value={v}
      setValue={sv}
      label="Shared folder"
      helpText="Custom shared folder for Minimig and AO486 cores. Path must already exist, and be mounted if a USB device. Can be an absolute path or relative to the core's folder."
    />
  );
}

function LogFileEntry() {
  const v = useIniSettingsStore((state) => state.logFileEntry);
  const sv = useIniSettingsStore((state) => state.setLogFileEntry);

  return (
    <BoolOption
      label="Log current file entry"
      value={v}
      setValue={sv}
      helpText="Log the currently selected item in menu to a file. Useful for scripts."
    />
  );
}

function KeyMenuAsRgui() {
  const v = useIniSettingsStore((state) => state.keyMenuAsRgui);
  const sv = useIniSettingsStore((state) => state.setKeyMenuAsRgui);

  return (
    <BoolOption
      label="Use MENU key as RGUI"
      value={v}
      setValue={sv}
      helpText="Make the MENU key map to RGUI in Minimig (e.g. for Right Amiga)."
    />
  );
}

export default function CoresSettings() {
  return (
    <Stack spacing={3}>
      <PageHeader title="Cores" />

      <VideoInfo />
      <ControllerInfo />
      <Recents />
      <LogFileEntry />
      <BootScreen />
      <KeyMenuAsRgui />
      <SharedFolder />

      <SaveButton />
    </Stack>
  );
}
