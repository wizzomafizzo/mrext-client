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

export default function VideoSettings() {
    return (
        <Stack sx={{ margin: 2, mr: 3, ml: 3 }} spacing={2}>
            <PageHeader title="Video" />

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
