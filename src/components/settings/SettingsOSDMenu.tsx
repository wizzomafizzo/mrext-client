import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PageHeader } from "./SettingsCommon";

export default function OSDMenuSettings() {
    return (
        <Stack sx={{ minWidth: 120 }} spacing={3}>
            <PageHeader title="OSD & Menu" />

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
