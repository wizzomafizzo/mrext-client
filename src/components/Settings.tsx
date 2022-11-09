import React from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";

import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import Typography from "@mui/material/Typography";

import SettingsIcon from "@mui/icons-material/Settings";
// import HelpIcon from '@mui/icons-material/Help';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import TvIcon from "@mui/icons-material/Tv";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import SaveIcon from "@mui/icons-material/Save";
import SpeakerIcon from "@mui/icons-material/Speaker";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TerminalIcon from "@mui/icons-material/Terminal";

// import ControlApi from "../api";

interface IniSettings {
    // cores
    bootScreen: boolean;
    recents: boolean;
    videoInfo: number;
    controllerInfo: number;
    sharedFolder: string;
    logFileEntry: boolean;
    keyMenuAsRgui: boolean;
    // video
    videoMode: string;
}

enum SettingsPage {
    Main,
    Cores,
    Video,
    OSDMenu,
    InputDevices,
}

function PageHeader(props: { title: string; backFn: () => void }) {
    return (
        <Stack spacing={1} direction="row">
            <Button
                variant="text"
                onClick={() => props.backFn()}
                startIcon={<ArrowBackIcon />}
            >
                Back
            </Button>
            <Typography variant="h5">{props.title}</Typography>
        </Stack>
    );
}

function CoresSettings(props: {
    setCurrentPage: React.Dispatch<React.SetStateAction<SettingsPage>>;
}) {
    return (
        <Stack sx={{ minWidth: 120 }} spacing={3}>
            <PageHeader
                title="Cores"
                backFn={() => props.setCurrentPage(SettingsPage.Main)}
            />

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Display core boot screen"
                />
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Track recently launched files"
                />
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Display video info"
                />
                <Stack spacing={2} direction="row" alignItems="center">
                    <Slider />
                    <span style={{ whiteSpace: "nowrap" }}>3 seconds</span>
                </Stack>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Display controller info"
                />
                <Stack spacing={2} direction="row" alignItems="center">
                    <Slider />
                    <span style={{ whiteSpace: "nowrap" }}>8 seconds</span>
                </Stack>
            </FormControl>
        </Stack>
    );
}

function VideoSettings(props: {
    setCurrentPage: React.Dispatch<React.SetStateAction<SettingsPage>>;
}) {
    return (
        <Stack sx={{ minWidth: 120 }} spacing={3}>
            <PageHeader
                title="Video"
                backFn={() => props.setCurrentPage(SettingsPage.Main)}
            />

            <FormControl>
                <InputLabel>Video mode</InputLabel>
                <Select value={0} label="Video mode">
                    <MenuItem value={0}>1280x720@60</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>Vertical scale mode</InputLabel>
                <Select value={0} label="Vertical scale mode">
                    <MenuItem value={0}>Fit screen height</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <FormControlLabel control={<Checkbox />} label="VSync adjust" />
                <FormHelperText>
                    Automatically adjust VSync rate to match original.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Set minimum refresh rate"
                    />
                    <Input
                        size="small"
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: "number",
                        }}
                        defaultValue={0}
                    />
                </Stack>
            </FormControl>

            <FormControl>
                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Set maximum refresh rate"
                    />
                    <Input
                        size="small"
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: "number",
                        }}
                        defaultValue={0}
                    />
                </Stack>
            </FormControl>

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

function InputDevices(props: {
    setCurrentPage: React.Dispatch<React.SetStateAction<SettingsPage>>;
}) {
    return (
        <Stack sx={{ minWidth: 120 }} spacing={3}>
            <PageHeader
                title="Input Devices"
                backFn={() => props.setCurrentPage(SettingsPage.Main)}
            />

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Automatically disconnect bluetooth"
                />
                <Stack spacing={2} direction="row" alignItems="center">
                <Input
                        size="small"
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: "number",
                        }}
                        defaultValue={0}
                    />
                    <Typography>minutes</Typography>
                </Stack>
                <FormHelperText>
                    Automatically disconnect and shutdown bluetooth devices after inactivity for specified time.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Reset bluetooth dongle before pairing"
                />
                <FormHelperText>
                    May fix issues where bluetooths device will not pair with dongle.
                </FormHelperText>
            </FormControl>
        </Stack>
    );
}

function OSDMenuSettings(props: {
    setCurrentPage: React.Dispatch<React.SetStateAction<SettingsPage>>;
}) {
    return (
        <Stack sx={{ minWidth: 120 }} spacing={3}>
            <PageHeader
                title="OSD & Menu"
                backFn={() => props.setCurrentPage(SettingsPage.Main)}
            />

            <FormControl>
                <FormLabel>Menu font</FormLabel>
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>myfont.pf</Typography>
                    <Button>Select font...</Button>
                </Stack>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>OSD rotation</InputLabel>
                <Select value={0} label="OSD rotation">
                    <MenuItem value={0}>No rotation</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Show core release dates"
                />
                <FormHelperText>
                    Display core's release date next to its menu entry.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Expand file browser selection"
                />
                <FormHelperText>
                    Long file names selected in the OSD and menu will be shown
                    using two lines.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="OSD timeout"
                />
                <Stack spacing={2} direction="row" alignItems="center">
                    <Slider />
                    <span style={{ whiteSpace: "nowrap" }}>1 minute</span>
                </Stack>
                <FormHelperText>
                    Delay before OSD in the menu is hidden and screen is dimmed
                    after inactivity.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Blank screen on timeout"
                />
                <FormHelperText>
                    Display a blank black screen after OSD timeout.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Show MiSTer logo on background"
                />
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label="PAL mode for menu"
                />
            </FormControl>
        </Stack>
    );
}

function MainPage(props: {
    setCurrentPage: React.Dispatch<React.SetStateAction<SettingsPage>>;
}) {
    return (
        <Stack sx={{ minWidth: 120 }} spacing={2}>
            <List>
                <ListItem disableGutters>
                    <ListItemButton
                        onClick={() => props.setCurrentPage(SettingsPage.Video)}
                    >
                        <ListItemIcon>
                            <TvIcon />
                        </ListItemIcon>
                        <ListItemText primary="Video" />
                        <ArrowForwardIcon />
                    </ListItemButton>
                </ListItem>

                <ListItem disableGutters>
                    <ListItemButton
                        onClick={() => props.setCurrentPage(SettingsPage.Video)}
                    >
                        <ListItemIcon>
                            <SpeakerIcon />
                        </ListItemIcon>
                        <ListItemText primary="Audio" />
                        <ArrowForwardIcon />
                    </ListItemButton>
                </ListItem>

                <ListItem disableGutters>
                    <ListItemButton
                        onClick={() =>
                            props.setCurrentPage(SettingsPage.InputDevices)
                        }
                    >
                        <ListItemIcon>
                            <SportsEsportsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Input devices" />
                        <ArrowForwardIcon />
                    </ListItemButton>
                </ListItem>

                <ListItem disableGutters>
                    <ListItemButton
                        onClick={() =>
                            props.setCurrentPage(SettingsPage.OSDMenu)
                        }
                    >
                        <ListItemIcon>
                            <WysiwygIcon />
                        </ListItemIcon>
                        <ListItemText primary="OSD and menu" />
                        <ArrowForwardIcon />
                    </ListItemButton>
                </ListItem>

                <ListItem disableGutters>
                    <ListItemButton
                        onClick={() => props.setCurrentPage(SettingsPage.Cores)}
                    >
                        <ListItemIcon>
                            <DeveloperBoardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cores" />
                        <ArrowForwardIcon />
                    </ListItemButton>
                </ListItem>

                <ListItem disableGutters>
                    <ListItemButton
                        onClick={() => props.setCurrentPage(SettingsPage.Video)}
                    >
                        <ListItemIcon>
                            <TerminalIcon />
                        </ListItemIcon>
                        <ListItemText primary="System" />
                        <ArrowForwardIcon />
                    </ListItemButton>
                </ListItem>
            </List>
        </Stack>
    );
}

export default function Settings() {
    // const api = new ControlApi();

    const [currentPage, setCurrentPage] = React.useState(SettingsPage.Main);

    return (
        <div>
            <div style={{ marginBottom: "45px" }}>
                {currentPage === SettingsPage.Main && (
                    <MainPage setCurrentPage={setCurrentPage} />
                )}
                {currentPage === SettingsPage.Cores && (
                    <CoresSettings setCurrentPage={setCurrentPage} />
                )}
                {currentPage === SettingsPage.Video && (
                    <VideoSettings setCurrentPage={setCurrentPage} />
                )}
                {currentPage === SettingsPage.OSDMenu && (
                    <OSDMenuSettings setCurrentPage={setCurrentPage} />
                )}
                {currentPage === SettingsPage.InputDevices && (
                    <InputDevices setCurrentPage={setCurrentPage} />
                )}
            </div>
            <Stack
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "#E6D0BB",
                    borderTop: 1,
                    borderColor: "divider",
                    boxShadow: 3,
                    zIndex: 1,
                }}
                spacing={2}
                direction="row"
                justifyContent="center"
                padding={1}
            >
                <Button
                    variant="outlined"
                    color="success"
                    disabled={false}
                    startIcon={<SaveIcon />}
                >
                    Apply settings
                </Button>
                <Button variant="text" color="error" disabled={false}>
                    Discard changes
                </Button>
            </Stack>
        </div>
    );
}
