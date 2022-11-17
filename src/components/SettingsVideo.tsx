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

import { PageHeader } from "./SettingsCommon";
import { useIniSettingsStore } from "../lib/store";
import { useState, useEffect } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

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
        <FormControl>
            <InputLabel>Vertical scale mode</InputLabel>
            <Select
                value={verticalScaleMode}
                onChange={(e) => setVerticalScaleMode(Number(e.target.value))}
                label="Vertical scale mode"
            >
                <MenuItem value={0}>Fit screen height</MenuItem>
                <MenuItem value={1}>Integer scale only</MenuItem>
                <MenuItem value={2}>0.5 steps of scale</MenuItem>
                <MenuItem value={3}>0.25 steps of scale</MenuItem>
                <MenuItem value={4}>Use core aspect ratio</MenuItem>
                <MenuItem value={5}>Maintain display aspect ratio</MenuItem>
            </Select>
            {verticalScaleMode === 4 || verticalScaleMode === 5 ? (
                <FormHelperText>Integer resolution scaling.</FormHelperText>
            ) : null}
        </FormControl>
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
                <FormControl>
                    <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={refreshMin > 0}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setRefreshMin(60);
                                        } else {
                                            setRefreshMin(0);
                                        }
                                    }}
                                />
                            }
                            label="Set minimum refresh rate"
                        />
                        {refreshMin > 0 ? (
                            <Input
                                size="small"
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: 240,
                                    type: "number",
                                }}
                                value={refreshMin}
                                onChange={(e) =>
                                    setRefreshMin(Number(e.target.value))
                                }
                            />
                        ) : null}
                    </Stack>
                    <FormHelperText>
                        When enabled, VSync adjust will not be applied if the
                        refresh rate is below this value. For example, on an
                        NTSC monitor which doesn't support PAL.
                    </FormHelperText>
                </FormControl>
            ) : null}

            {vsyncAdjust > 0 ? (
                <FormControl>
                    <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={refreshMax > 0}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setRefreshMax(50);
                                        } else {
                                            setRefreshMax(0);
                                        }
                                    }}
                                />
                            }
                            label="Set maximum refresh rate"
                        />
                        {refreshMax > 0 ? (
                            <Input
                                size="small"
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: 240,
                                    type: "number",
                                }}
                                value={refreshMax}
                                onChange={(e) =>
                                    setRefreshMax(Number(e.target.value))
                                }
                            />
                        ) : null}
                    </Stack>
                    <FormHelperText>
                        Same as above, but for the maximum. For example, on a
                        PAL monitor which doesn't support NTSC.
                    </FormHelperText>
                </FormControl>
            ) : null}
        </Stack>
    );
}

export default function VideoSettings() {
    const dviMode = useIniSettingsStore((state) => state.dviMode);
    const setDviMode = useIniSettingsStore((state) => state.setDviMode);
    const vscaleBorder = useIniSettingsStore((state) => state.vscaleBorder);
    const setVscaleBorder = useIniSettingsStore(
        (state) => state.setVscaleBorder
    );

    return (
        <Stack spacing={3}>
            <PageHeader title="Video" />
            <VideoMode />
            <VerticalScale />
            <VSyncAdjust />

            <FormControl>
                <FormControlLabel control={<Checkbox />} label="DVI mode" />
                <FormHelperText>
                    Disables audio being transmitted through HDMI.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Vertical scale border"
                />
                <Stack spacing={2} direction="row" alignItems="center">
                    <Slider />
                    <Input
                        size="small"
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: "number",
                        }}
                    />
                    <span style={{ whiteSpace: "nowrap" }}>height</span>
                </Stack>
                <FormHelperText>
                    Set a border on the top and bottom of the screen.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Set default video filter"
                />
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>LCD Effects/LCD_Effect_07.txt</Typography>
                    <Button size="small">Browse...</Button>
                </Stack>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Set default scanlines video filter"
                />
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>{"<not set>"}</Typography>
                    <Button size="small">Browse...</Button>
                </Stack>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Set default vertical video filter"
                />
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>{"<not set>"}</Typography>
                    <Button size="small">Browse...</Button>
                </Stack>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Set default shadow mask"
                />
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>{"<not set>"}</Typography>
                    <Button size="small">Browse...</Button>
                </Stack>
            </FormControl>

            <FormControl>
                <InputLabel>Default shadow mask mode</InputLabel>
                <Select value={1} label="Default shadow mask mode">
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>1x</MenuItem>
                    <MenuItem value={2}>2x</MenuItem>
                    <MenuItem value={3}>1x rotated</MenuItem>
                    <MenuItem value={4}>2x rotated</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Game mode on HDMI output"
                />
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Limit HDMI color range"
                />
                <FormHelperText>Limits to range of 16-235.</FormHelperText>
            </FormControl>

            <FormControl>
                <InputLabel>Variable refresh rate (VRR)</InputLabel>
                <Select value={0} label="Variable refresh rate (VRR)">
                    <MenuItem value={0}>Disabled</MenuItem>
                    <MenuItem value={1}>Auto detect</MenuItem>
                    <MenuItem value={2}>Force FreeSync</MenuItem>
                    <MenuItem value={3}>Force VESA HDMI Forum VRR</MenuItem>
                </Select>
                <FormHelperText>Do not send VRR control frames.</FormHelperText>
            </FormControl>

            <Typography variant="h6">Analog Video</Typography>

            <FormControl>
                <FormControlLabel control={<Checkbox />} label="Direct video" />
                <FormHelperText>
                    Use only with VGA converters. Enables core video timing over
                    HDMI.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Force scandoubler on VGA output"
                />
                <FormHelperText>Depends on core.</FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="YPbPr on VGA output"
                />
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Composite sync on VGA output"
                />
                <FormHelperText>On HSync signal.</FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Connect VGA to scaler output"
                />
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Sync on green (SoG)"
                />
                <FormHelperText>
                    Requires analog I/O board v6.0 or newer.
                </FormHelperText>
            </FormControl>
        </Stack>
    );
}
