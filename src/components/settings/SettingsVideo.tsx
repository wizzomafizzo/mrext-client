import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

import Typography from "@mui/material/Typography";

import {
    BoolOption,
    NumberOption,
    PageHeader,
    SimpleSelectOption,
    ValuePicker,
} from "./SettingsCommon";
import { useIniSettingsStore } from "../../lib/store";
import { useState, useEffect } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

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

function VideoMode() {
    const videoMode = useIniSettingsStore((state) => state.videoMode);
    const setVideoMode = useIniSettingsStore((state) => state.setVideoMode);

    const toSelection = (v: string): string => {
        if (videoMode === "") {
            return "auto";
        }

        for (const mode of videoModes) {
            if (mode[0] === videoMode) {
                return mode[0];
            }
        }

        return "custom";
    };

    const [selected, setSelected] = useState(toSelection(videoMode));

    const handleSelection = (v: string) => {
        setSelected(v);

        if (v === "auto") {
            setVideoMode("");
        } else if (v === "custom") {
            return;
        } else {
            setVideoMode(v);
        }
    };

    return (
        <FormControl>
            <InputLabel>Video mode</InputLabel>
            <Select
                label="Video mode"
                value={selected}
                onChange={(e) => handleSelection(e.target.value)}
            >
                <MenuItem value="auto">Auto</MenuItem>
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
                            checked={vsyncAdjust > 0}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setVsyncAdjust(1);
                                } else {
                                    setVsyncAdjust(0);
                                    setRefreshMin(0);
                                    setRefreshMax(0);
                                }
                            }}
                        />
                    }
                    label="VSync adjust"
                />
                {vsyncAdjust > 0 ? (
                    <RadioGroup>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={vsyncAdjust === 1}
                                    onChange={(e) =>
                                        e.target.checked && setVsyncAdjust(1)
                                    }
                                />
                            }
                            label="Automatically adjust to match original"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={vsyncAdjust === 2}
                                    onChange={(e) =>
                                        e.target.checked && setVsyncAdjust(2)
                                    }
                                />
                            }
                            label="Low latency mode (single buffer)"
                        />
                    </RadioGroup>
                ) : null}
                <FormHelperText>
                    Makes video butter smooth like on an original emulated
                    system, but requires a display that supports variable pixel
                    clock. Use a 60Hz HDMI video mode as a base, including on
                    50Hz systems.
                </FormHelperText>
            </FormControl>

            {vsyncAdjust > 0 ? (
                <NumberOption
                    value={refreshMin}
                    setValue={setRefreshMin}
                    label="Minimum refresh rate"
                    helpText="When enabled, VSync adjust will not be applied if the refresh rate is below this value. For example, on an NTSC monitor which doesn't support PAL."
                    isEnabled={() => refreshMin > 0}
                    disabledValue={0}
                    defaultValue={60}
                    min={1}
                    max={240}
                />
            ) : null}

            {vsyncAdjust > 0 ? (
                <NumberOption
                    value={refreshMax}
                    setValue={setRefreshMax}
                    label="Maximum refresh rate"
                    helpText="Same as above, but for the maximum. For example, on a PAL monitor which doesn't support NTSC."
                    isEnabled={() => refreshMax > 0}
                    disabledValue={0}
                    defaultValue={50}
                    min={1}
                    max={240}
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
    const setVscaleBorder = useIniSettingsStore(
        (state) => state.setVscaleBorder
    );

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={vscaleBorder > 0}
                        onChange={(e) =>
                            e.target.checked
                                ? setVscaleBorder(1)
                                : setVscaleBorder(0)
                        }
                    />
                }
                label="Vertical scale border"
            />
            {vscaleBorder > 0 ? (
                <Stack spacing={2} direction="row" alignItems="center">
                    <Slider
                        value={vscaleBorder}
                        onChange={(e, v) => setVscaleBorder(Number(v))}
                        step={1}
                        min={1}
                        max={399}
                    />
                    <TextField
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            style: { textAlign: "center" },
                        }}
                        size="small"
                        sx={{ width: "100px" }}
                        value={vscaleBorder}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value < 1) {
                                setVscaleBorder(1);
                            } else if (value > 399) {
                                setVscaleBorder(399);
                            } else {
                                setVscaleBorder(value);
                            }
                        }}
                    />
                </Stack>
            ) : null}
            <FormHelperText>
                Set height of a border on the top and bottom of the screen.
            </FormHelperText>
        </FormControl>
    );
}

function VFilterGeneric(props: {
    label: string;
    value: string;
    setValue: (value: string) => void;
}) {
    const [enabled, setEnabled] = useState(
        props.value && props.value !== "" ? true : false
    );

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
    const vrrMinFramerate = useIniSettingsStore(
        (state) => state.vrrMinFramerate
    );
    const setVrrMinFramerate = useIniSettingsStore(
        (state) => state.setVrrMinFramerate
    );
    const vrrMaxFramerate = useIniSettingsStore(
        (state) => state.vrrMaxFramerate
    );
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

            {vrrMode > 0 ? (
                <NumberOption
                    label="Minimum framerate"
                    value={vrrMinFramerate}
                    setValue={setVrrMinFramerate}
                    isEnabled={() => vrrMinFramerate > 0}
                    disabledValue={0}
                    defaultValue={50}
                    min={1}
                    max={240}
                />
            ) : null}

            {vrrMode > 0 && vrrMode !== 3 ? (
                <NumberOption
                    label="Maximum framerate"
                    value={vrrMaxFramerate}
                    setValue={setVrrMaxFramerate}
                    helpText="Currently only used in FreeSync."
                    isEnabled={() => vrrMaxFramerate > 0}
                    disabledValue={0}
                    defaultValue={60}
                    min={1}
                    max={240}
                />
            ) : null}

            {vrrMode > 0 && vrrMode !== 2 ? (
                <NumberOption
                    label="VESA base framerate"
                    value={vrrVesaFramerate}
                    setValue={setVrrVesaFramerate}
                    helpText="Normally set to the current video mode's output framerate."
                    isEnabled={() => vrrVesaFramerate > 0}
                    disabledValue={0}
                    defaultValue={60}
                    min={1}
                    max={240}
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

    return (
        <BoolOption
            label="YPbPr on VGA output"
            value={v}
            setValue={sv}
        />
    );
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
        <BoolOption
            label="Connect VGA to scaler output"
            value={v}
            setValue={sv}
        />
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

export default function VideoSettings() {
    return (
        <Stack spacing={3}>
            <PageHeader title="Video" />

            <VideoMode />
            <VerticalScale />
            <VSyncAdjust />
            <DVIMode />
            <VScaleBorder />
            <VFilter />
            <VFilterScanlines />
            <VFilterVertical />
            <ShadowMask />
            <ShadowMaskMode />
            <GameMode />
            <LimitHDMIColor />
            <VRRMode />

            <Typography variant="h6">Analog Video</Typography>

            <DirectVideo />
            <ForcedScandoubler />
            <Ypbpr />
            <CompositeSync />
            <VGAScaler />
            <Sog />
        </Stack>
    );
}
