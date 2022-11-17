import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useUIStateStore } from "../lib/store";
import { themes } from "../lib/themes";
import { PageHeader } from "./SettingsCommon";

export default function Remote() {
    const activeTheme = useUIStateStore((state) => state.activeTheme);
    const setActiveTheme = useUIStateStore((state) => state.setActiveTheme);

    return (
        <Stack sx={{ minWidth: 120 }} spacing={3}>
            <PageHeader title="Remote" />

            <FormControl>
                <InputLabel>Theme</InputLabel>
                <Select
                    value={activeTheme}
                    label="Theme"
                    onChange={(e) => setActiveTheme(e.target.value)}
                >
                    {Object.keys(themes).map((id) => (
                        <MenuItem key={id} value={id}>
                            {themes[id].displayName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
}
