import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PageHeader } from "./SettingsCommon";

export default function InputDevices() {
    return (
        <Stack>
            <PageHeader title="Input Devices" />

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
                    Automatically disconnect and shutdown bluetooth devices
                    after inactivity for specified time.
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Reset bluetooth dongle before pairing"
                />
                <FormHelperText>
                    May fix issues where bluetooths device will not pair with
                    dongle.
                </FormHelperText>
            </FormControl>
        </Stack>
    );
}
