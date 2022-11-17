import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useUIStateStore, SettingsPageId } from "../lib/store";

export function PageHeader(props: { title: string }) {
    const setActiveSettingsPage = useUIStateStore(
        (state) => state.setActiveSettingsPage
    );

    return (
        <Stack spacing={1} direction="row">
            <Button
                variant="text"
                onClick={() => setActiveSettingsPage(SettingsPageId.Main)}
                startIcon={<ArrowBackIcon />}
            >
                Back
            </Button>
            <Typography variant="h5">{props.title}</Typography>
        </Stack>
    );
}
