import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";

import {
  BoolOption,
  NumberOption,
  NumberSliderOption,
  PageHeader,
  SaveButton,
  SectionHeader,
  SimpleSelectOption,
  TextOption,
  ToggleableNumberSliderOption,
  ValuePicker,
  VerticalNumberSliderOption,
} from "./SettingsCommon";
import { useState, useEffect } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import { useIniSettingsStore } from "../../lib/ini";

const videoModes = [
  ["0", "1280x720@60"],
  ["1", "1024x768@60"],
  ["2", "720x480@60"],
  ["3", "720x576@50"],
  ["4", "1280x1024@60"],
  ["5", "800x600@60"],
  ["6", "640x480@60"],
  ["7", "1280x720@50"],
  ["8", "1920x1080@60"],
  ["9", "1920x1080@50"],
  ["10", "1366x768@60"],
  ["11", "1024x600@60"],
  ["12", "1920x1440@60"],
  ["13", "2048x1536@60"],
  ["14", "2560x1440@60"],
];

function VideoMode(props: {
  videoMode: string;
  setVideoMode: (value: string) => void;
  label: string;
  defaultLabel: string;
}) {
  const toSelection = (v: string): string => {
    if (props.videoMode === "") {
      return "auto";
    }

    for (const mode of videoModes) {
      if (mode[0] === props.videoMode) {
        return mode[0];
      }
    }

    return "custom";
  };

  const [selected, setSelected] = useState(toSelection(props.videoMode));

  const handleSelection = (v: string) => {
    setSelected(v);

    if (v === "auto") {
      props.setVideoMode("");
    } else if (v === "custom") {
      return;
    } else {
      props.setVideoMode(v);
    }
  };

  useEffect(() => {
    setSelected(toSelection(props.videoMode));
  }, [props.videoMode]);

  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        value={selected}
        onChange={(e) => handleSelection(e.target.value)}
      >
        <MenuItem value="auto">{props.defaultLabel}</MenuItem>
        {videoModes.map((mode) => (
          <MenuItem key={mode[0]} value={mode[0]}>
            {mode[1]}
          </MenuItem>
        ))}
        <MenuItem value="custom">Custom</MenuItem>
      </Select>
    </FormControl>
  );
}

function VerticalScale() {
  const verticalScaleMode = useIniSettingsStore(
    (state) => state.verticalScaleMode
  );
  const setVerticalScaleMode = useIniSettingsStore(
    (state) => state.setVerticalScaleMode
  );

  return (
    <SimpleSelectOption
      label="Vertical scale mode"
      value={verticalScaleMode}
      setValue={setVerticalScaleMode}
      options={[
        "Fit screen height",
        "Integer scale only",
        "0.5 steps of scale",
        "0.25 steps of scale",
        "Use core aspect ratio",
        "Maintain display aspect ratio",
      ]}
      helpText={[
        "",
        "",
        "",
        "",
        "Integer resolution scaling.",
        "Integer resolution scaling.",
      ]}
    />
  );
}

function VSyncAdjust() {
  const vsyncAdjust = useIniSettingsStore((state) => state.vsyncAdjust);
  const setVsyncAdjust = useIniSettingsStore((state) => state.setVsyncAdjust);
  const refreshMin = useIniSettingsStore((state) => state.refreshMin);
  const setRefreshMin = useIniSettingsStore((state) => state.setRefreshMin);
  const refreshMax = useIniSettingsStore((state) => state.refreshMax);
  const setRefreshMax = useIniSettingsStore((state) => state.setRefreshMax);

  return (
    <Stack spacing={3}>
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={Number(vsyncAdjust) > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setVsyncAdjust("1");
                } else {
                  setVsyncAdjust("0");
                  setRefreshMin("0");
                  setRefreshMax("0");
                }
              }}
            />
          }
          label="VSync adjust"
        />
        {Number(vsyncAdjust) > 0 ? (
          <RadioGroup>
            <FormControlLabel
              control={
                <Radio
                  checked={vsyncAdjust === "1"}
                  onChange={(e) => e.target.checked && setVsyncAdjust("1")}
                />
              }
              label="Automatically adjust to match original"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={vsyncAdjust === "2"}
                  onChange={(e) => e.target.checked && setVsyncAdjust("2")}
                />
              }
              label="Low latency mode (single buffer)"
            />
          </RadioGroup>
        ) : null}
        <FormHelperText>
          Makes video butter smooth like on an original emulated system, but
          requires a display that supports variable pixel clock. Use a 60Hz HDMI
          video mode as a base, including on 50Hz systems.
        </FormHelperText>
      </FormControl>

      {Number(vsyncAdjust) > 0 ? (
        <NumberOption
          value={refreshMin}
          setValue={setRefreshMin}
          label="Minimum refresh rate"
          helpText="When enabled, VSync adjust will not be applied if the refresh rate is below this value. For example, on an NTSC monitor which doesn't support PAL."
          min={1}
          max={240}
          defaultValue={"0"}
        />
      ) : null}

      {Number(vsyncAdjust) > 0 ? (
        <NumberOption
          value={refreshMax}
          setValue={setRefreshMax}
          label="Maximum refresh rate"
          helpText="Same as above, but for the maximum. For example, on a PAL monitor which doesn't support NTSC."
          min={1}
          max={240}
          defaultValue={"0"}
        />
      ) : null}
    </Stack>
  );
}

function DVIMode() {
  const dviMode = useIniSettingsStore((state) => state.dviMode);
  const setDviMode = useIniSettingsStore((state) => state.setDviMode);

  return (
    <BoolOption
      label="DVI mode"
      value={dviMode}
      setValue={setDviMode}
      helpText="Disables audio being transmitted through HDMI."
    />
  );
}

function VScaleBorder() {
  const vscaleBorder = useIniSettingsStore((state) => state.vscaleBorder);
  const setVscaleBorder = useIniSettingsStore((state) => state.setVscaleBorder);

  return (
    <ToggleableNumberSliderOption
      label="Vertical scale border"
      value={vscaleBorder}
      setValue={setVscaleBorder}
      min={1}
      max={399}
      defaultValue={"1"}
      step={1}
      helpText="Adds a black border to the top and bottom of the screen."
    />
  );
}

function VFilterGeneric(props: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  const [enabled, setEnabled] = useState(!!(props.value && props.value !== ""));

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={enabled}
            onChange={(e) => {
              setEnabled(e.target.checked);
              if (!e.target.checked) {
                props.setValue("");
              }
            }}
          />
        }
        label={props.label}
      />
      {enabled ? (
        <ValuePicker
          value={props.value}
          setValue={props.setValue}
          options={[
            "Interpolation (Medium).txt",
            "No Interpolation.txt",
            "Scanlines (Medium).txt",
            "Scanlines (Strong).txt",
            "Scanlines (Weak).txt",
          ]}
          formatOption={(option) => option.replace(/\.[^/.]+$/, "")}
        />
      ) : null}
    </FormControl>
  );
}

function VFilter() {
  const vfilter = useIniSettingsStore((state) => state.vfilterDefault);
  const setVfilter = useIniSettingsStore((state) => state.setVfilterDefault);

  return (
    <VFilterGeneric
      label="Default video filter"
      value={vfilter}
      setValue={setVfilter}
    />
  );
}

function VFilterScanlines() {
  const vfilterScanlines = useIniSettingsStore(
    (state) => state.vfilterScanlinesDefault
  );
  const setVfilterScanlines = useIniSettingsStore(
    (state) => state.setVfilterScanlinesDefault
  );

  return (
    <VFilterGeneric
      label="Default scanlines video filter"
      value={vfilterScanlines}
      setValue={setVfilterScanlines}
    />
  );
}

function VFilterVertical() {
  const vfilterVertical = useIniSettingsStore(
    (state) => state.vfilterVerticalDefault
  );
  const setVfilterVertical = useIniSettingsStore(
    (state) => state.setVfilterVerticalDefault
  );

  return (
    <VFilterGeneric
      label="Default vertical video filter"
      value={vfilterVertical}
      setValue={setVfilterVertical}
    />
  );
}

function ShadowMask() {
  const shmask = useIniSettingsStore((state) => state.shmaskDefault);
  const setShmask = useIniSettingsStore((state) => state.setShmaskDefault);

  return (
    <VFilterGeneric
      label="Default shadow mask"
      value={shmask}
      setValue={setShmask}
    />
  );
}

function GameMode() {
  const gameMode = useIniSettingsStore((state) => state.hdmiGameMode);
  const setGameMode = useIniSettingsStore((state) => state.setHdmiGameMode);

  return (
    <BoolOption
      label="Game mode on HDMI output"
      value={gameMode}
      setValue={setGameMode}
    />
  );
}

function ShadowMaskMode() {
  const shmaskMode = useIniSettingsStore((state) => state.shmaskModeDefault);
  const setShmaskMode = useIniSettingsStore(
    (state) => state.setShmaskModeDefault
  );

  return (
    <SimpleSelectOption
      label="Default shadow mask mode"
      value={shmaskMode}
      setValue={setShmaskMode}
      options={["None", "1x", "2x", "1x rotated", "2x rotated"]}
    />
  );
}

function LimitHDMIColor() {
  const limitHdmiColor = useIniSettingsStore((state) => state.hdmiLimited);
  const setLimitHdmiColor = useIniSettingsStore(
    (state) => state.setHdmiLimited
  );

  return (
    <SimpleSelectOption
      label="Limit HDMI color range"
      value={limitHdmiColor}
      setValue={setLimitHdmiColor}
      options={["Off", "16-235 color range", "16-255 color range"]}
      helpText={[
        "",
        "Use limited (16-235) color range over HDMI.",
        "Use limited (16-255) color range over HDMI, for VGA converters.",
      ]}
    />
  );
}

function VRRMode() {
  const vrrMode = useIniSettingsStore((state) => state.vrrMode);
  const setVrrMode = useIniSettingsStore((state) => state.setVrrMode);
  const vrrMinFramerate = useIniSettingsStore((state) => state.vrrMinFramerate);
  const setVrrMinFramerate = useIniSettingsStore(
    (state) => state.setVrrMinFramerate
  );
  const vrrMaxFramerate = useIniSettingsStore((state) => state.vrrMaxFramerate);
  const setVrrMaxFramerate = useIniSettingsStore(
    (state) => state.setVrrMaxFramerate
  );
  const vrrVesaFramerate = useIniSettingsStore(
    (state) => state.vrrVesaFramerate
  );
  const setVrrVesaFramerate = useIniSettingsStore(
    (state) => state.setVrrVesaFramerate
  );

  return (
    <Stack spacing={3}>
      <SimpleSelectOption
        label="Variable refresh rate (VRR)"
        value={vrrMode}
        setValue={setVrrMode}
        options={[
          "Off",
          "Auto detect",
          "Force FreeSync",
          "Force VESA HDMI Forum VRR",
        ]}
        helpText={[
          "",
          "Automatically detect VRR from display EDID.",
          "Force enable FreeSync.",
          "Force enable VESA HDMI Forum VRR.",
        ]}
      />

      {Number(vrrMode) > 0 ? (
        <NumberOption
          label="Minimum framerate"
          value={vrrMinFramerate}
          setValue={setVrrMinFramerate}
          min={1}
          max={240}
          defaultValue={"0"}
        />
      ) : null}

      {Number(vrrMode) > 0 && vrrMode !== "3" ? (
        <NumberOption
          label="Maximum framerate"
          value={vrrMaxFramerate}
          setValue={setVrrMaxFramerate}
          helpText="Currently only used in FreeSync."
          min={1}
          max={240}
          defaultValue={"0"}
        />
      ) : null}

      {Number(vrrMode) > 0 && vrrMode !== "2" ? (
        <NumberOption
          label="VESA base framerate"
          value={vrrVesaFramerate}
          setValue={setVrrVesaFramerate}
          helpText="Normally set to the current video mode's output framerate."
          min={1}
          max={240}
          defaultValue={"0"}
        />
      ) : null}
    </Stack>
  );
}

function DirectVideo() {
  const v = useIniSettingsStore((state) => state.directVideo);
  const sv = useIniSettingsStore((state) => state.setDirectVideo);

  return (
    <BoolOption
      label="Direct video"
      value={v}
      setValue={sv}
      helpText="Use only with VGA converters. Enables core video timing over HDMI."
    />
  );
}

function ForcedScandoubler() {
  const v = useIniSettingsStore((state) => state.forcedScandoubler);
  const sv = useIniSettingsStore((state) => state.setForcedScandoubler);

  return (
    <BoolOption
      label="Force scandoubler on VGA output"
      value={v}
      setValue={sv}
      helpText="Depends on core."
    />
  );
}

function Ypbpr() {
  const v = useIniSettingsStore((state) => state.ypbpr);
  const sv = useIniSettingsStore((state) => state.setYpbpr);

  return <BoolOption label="YPbPr on VGA output" value={v} setValue={sv} />;
}

function CompositeSync() {
  const v = useIniSettingsStore((state) => state.compositeSync);
  const sv = useIniSettingsStore((state) => state.setCompositeSync);

  return (
    <BoolOption
      label="Composite sync on VGA output"
      value={v}
      setValue={sv}
      helpText="On HSync signal."
    />
  );
}

function VGAScaler() {
  const v = useIniSettingsStore((state) => state.vgaScaler);
  const sv = useIniSettingsStore((state) => state.setVgaScaler);

  return (
    <BoolOption label="Connect VGA to scaler output" value={v} setValue={sv} />
  );
}

function Sog() {
  const v = useIniSettingsStore((state) => state.vgaSog);
  const sv = useIniSettingsStore((state) => state.setVgaSog);

  return (
    <BoolOption
      label="Sync on green (SoG)"
      value={v}
      setValue={sv}
      helpText="Requires analog I/O board v6.0 or newer."
    />
  );
}

function MainVideoMode() {
  const videoMode = useIniSettingsStore((state) => state.videoMode);
  const setVideoMode = useIniSettingsStore((state) => state.setVideoMode);

  return (
    <VideoMode
      videoMode={videoMode}
      setVideoMode={setVideoMode}
      label="Video mode"
      defaultLabel="Auto"
    />
  );
}

function ConditionalVideoMode() {
  const videoModeNtsc = useIniSettingsStore((state) => state.videoModeNtsc);
  const setVideoModeNtsc = useIniSettingsStore(
    (state) => state.setVideoModeNtsc
  );

  const videoModePal = useIniSettingsStore((state) => state.videoModePal);
  const setVideoModePal = useIniSettingsStore((state) => state.setVideoModePal);

  const [showSection, setShowSection] = useState(
    videoModeNtsc !== "" || videoModePal !== "" ? "1" : "0"
  );

  const handleSectionToggle = (v: string) => {
    if (v === "0") {
      setVideoModeNtsc("");
      setVideoModePal("");
    }
    setShowSection(v);
  };

  return (
    <>
      <BoolOption
        value={showSection}
        setValue={handleSectionToggle}
        label="Specific video modes for NTSC and PAL"
        helpText="Only active if both NTSC and PAL video modes are set."
      />
      {showSection ? (
        <Stack spacing={3}>
          <VideoMode
            videoMode={videoModeNtsc}
            setVideoMode={setVideoModeNtsc}
            label="NTSC video mode"
            defaultLabel="Disabled"
          />
          <VideoMode
            videoMode={videoModePal}
            setVideoMode={setVideoModePal}
            label="PAL video mode"
            defaultLabel="Disabled"
          />
        </Stack>
      ) : null}
    </>
  );
}

function CustomAspectRatios() {
  // TODO: this should probably be select options
  const v1 = useIniSettingsStore((state) => state.customAspectRatio1);
  const sv1 = useIniSettingsStore((state) => state.setCustomAspectRatio1);

  const v2 = useIniSettingsStore((state) => state.customAspectRatio2);
  const sv2 = useIniSettingsStore((state) => state.setCustomAspectRatio2);

  return (
    <>
      <TextOption value={v1} setValue={sv1} label="Custom aspect ratio 1" />
      <TextOption value={v2} setValue={sv2} label="Custom aspect ratio 2" />
    </>
  );
}

function Hdr() {
  const v = useIniSettingsStore((state) => state.hdr);
  const sv = useIniSettingsStore((state) => state.setHdr);

  return (
    <SimpleSelectOption
      value={v}
      setValue={sv}
      options={[
        "Disabled",
        "BT2020 color space",
        "DCI P3 color space",
        "HLG mode",
      ]}
      helpText={v == "1" ? "Faux-HDR, use color controls to tweak." : undefined}
      label="HDR"
    />
  );
}

function VideoBrightness() {
  const v = useIniSettingsStore((state) => state.videoBrightness);
  const sv = useIniSettingsStore((state) => state.setVideoBrightness);

  return (
    <NumberSliderOption
      value={v}
      setValue={sv}
      label="Brightness"
      min={0}
      max={100}
    />
  );
}

function VideoContrast() {
  const v = useIniSettingsStore((state) => state.videoContrast);
  const sv = useIniSettingsStore((state) => state.setVideoContrast);

  return (
    <NumberSliderOption
      value={v}
      setValue={sv}
      label="Contrast"
      min={0}
      max={100}
    />
  );
}

function VideoSaturation() {
  const v = useIniSettingsStore((state) => state.videoSaturation);
  const sv = useIniSettingsStore((state) => state.setVideoSaturation);

  return (
    <NumberSliderOption
      value={v}
      setValue={sv}
      label="Saturation"
      min={0}
      max={100}
    />
  );
}

function VideoHue() {
  const v = useIniSettingsStore((state) => state.videoHue);
  const sv = useIniSettingsStore((state) => state.setVideoHue);

  return (
    <NumberSliderOption value={v} setValue={sv} label="Hue" min={0} max={360} />
  );
}

function VideoGainOffset() {
  const v = useIniSettingsStore((state) => state.videoGainOffset);
  const sv = useIniSettingsStore((state) => state.setVideoGainOffset);

  const readOption = (i: number) => {
    if (i < 0 || i > 5) {
      throw new Error("Invalid video gain offset index");
    }

    const vals = v.split(",");
    if (vals.length !== 6) {
      throw new Error("Invalid video gain offset value");
    }

    return vals[i];
  };

  const setOptions = () => {
    const vals = [rg, ro, gg, go, bg, bo];
    sv(vals.join(","));
  };

  const [rg, setRg] = useState(readOption(0));
  const [ro, setRo] = useState(readOption(1));
  const [gg, setGg] = useState(readOption(2));
  const [go, setGo] = useState(readOption(3));
  const [bg, setBg] = useState(readOption(4));
  const [bo, setBo] = useState(readOption(5));

  useEffect(() => {
    setRg(readOption(0));
    setRo(readOption(1));
    setGg(readOption(2));
    setGo(readOption(3));
    setBg(readOption(4));
    setBo(readOption(5));
  }, [v]);

  useEffect(() => {
    setOptions();
  }, [rg, ro, gg, go, bg, bo]);

  return (
    <>
      <FormLabel>Video gain offset</FormLabel>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          justifyContent: "space-between",
          pt: 1,
        }}
      >
        <VerticalNumberSliderOption
          value={rg}
          setValue={setRg}
          label="Rg"
          min={-2.0}
          max={2.0}
          step={0.01}
        />
        <VerticalNumberSliderOption
          value={ro}
          setValue={setRo}
          label="Ro"
          min={-2.0}
          max={2.0}
          step={0.01}
        />
        <VerticalNumberSliderOption
          value={gg}
          setValue={setGg}
          label="Gg"
          min={-2.0}
          max={2.0}
          step={0.01}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          justifyContent: "space-between",
          pt: 1,
        }}
      >
        <VerticalNumberSliderOption
          value={go}
          setValue={setGo}
          label="Go"
          min={-2.0}
          max={2.0}
          step={0.01}
        />
        <VerticalNumberSliderOption
          value={bg}
          setValue={setBg}
          label="Bg"
          min={-2.0}
          max={2.0}
          step={0.01}
        />
        <VerticalNumberSliderOption
          value={bo}
          setValue={setBo}
          label="Bo"
          min={-2.0}
          max={2.0}
          step={0.01}
        />
      </Stack>
    </>
  );
}

function ColorControlPresets() {
  const setBrightness = useIniSettingsStore(
    (state) => state.setVideoBrightness
  );
  const setContrast = useIniSettingsStore((state) => state.setVideoContrast);
  const setSaturation = useIniSettingsStore(
    (state) => state.setVideoSaturation
  );
  const setHue = useIniSettingsStore((state) => state.setVideoHue);
  const setGainOffset = useIniSettingsStore(
    (state) => state.setVideoGainOffset
  );

  return (
    <FormControl>
      <FormLabel>Presets</FormLabel>
      <Stack direction="row" spacing={3}>
        <Button
          variant="outlined"
          onClick={() => {
            setBrightness("50");
            setContrast("50");
            setSaturation("100");
            setHue("0");
            setGainOffset("1,0,1,0,1,0");
          }}
        >
          Default
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setBrightness("50");
            setContrast("50");
            setSaturation("100");
            setHue("180");
            setGainOffset("-1,1,-1,1,-1,1");
          }}
        >
          Inverted
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setBrightness("50");
            setContrast("50");
            setSaturation("80");
            setHue("0");
            setGainOffset("1.1,-0.1,1.3,-0.15,0.9,0.05");
          }}
        >
          Warm
        </Button>
      </Stack>
    </FormControl>
  );
}

export function GeneralVideoSettings() {
  return (
    <>
      <PageHeader title="General Video" />
      <Stack spacing={2} m={2}>
        <MainVideoMode />
        <VerticalScale />
        <VRRMode />
        <VSyncAdjust />

        <SectionHeader text="Advanced" />
        <DVIMode />
        <GameMode />
        <LimitHDMIColor />
        <ConditionalVideoMode />
        <CustomAspectRatios />
      </Stack>
      <SaveButton />
    </>
  );
}

export function VideoFiltersSettings() {
  return (
    <>
      <PageHeader title="Video Filters" />
      <Stack spacing={2} m={2}>
        <VScaleBorder />
        <VFilter />
        <VFilterScanlines />
        <VFilterVertical />
        <ShadowMask />
        <ShadowMaskMode />

        <SectionHeader text="HDMI color controls" />
        <Hdr />
        <Card>
          <Stack m={1}>
            <VideoBrightness />
            <VideoContrast />
            <VideoSaturation />
            <VideoHue />
            <VideoGainOffset />
          </Stack>
        </Card>
        <ColorControlPresets />
      </Stack>
      <SaveButton />
    </>
  );
}

export function AnalogVideoSettings() {
  return (
    <>
      <PageHeader title="Analog Video" />
      <Stack spacing={2} m={2}>
        <DirectVideo />
        <ForcedScandoubler />
        <Ypbpr />
        <CompositeSync />
        <VGAScaler />
        <Sog />
      </Stack>
      <SaveButton />
    </>
  );
}
