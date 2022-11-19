import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { PageHeader } from "./SettingsCommon";

export default function CoresSettings() {
    return (
        <Stack>
            <PageHeader title="Cores" />

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
