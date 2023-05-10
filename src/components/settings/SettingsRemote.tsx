import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useUIStateStore } from "../../lib/store";
import { themes } from "../../lib/themes";
import { PageHeader } from "./SettingsCommon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function Remote() {
  const activeTheme = useUIStateStore((state) => state.activeTheme);
  const setActiveTheme = useUIStateStore((state) => state.setActiveTheme);

  const [apiEndpoint, setApiEndpoint] = useState(localStorage.getItem("api"));

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

      {!import.meta.env.PROD ? (
        <FormControl>
          <TextField
            label="API endpoint"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
          />
          <Button
            onClick={() => {
              localStorage.setItem("api", apiEndpoint ? apiEndpoint : "");
              window.location.reload();
            }}
          >
            Set endpoint
          </Button>
        </FormControl>
      ) : null}
    </Stack>
  );
}
