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
import ControlApi from "../../lib/api";

export default function Remote() {
  const activeTheme = useUIStateStore((state) => state.activeTheme);
  const setActiveTheme = useUIStateStore((state) => state.setActiveTheme);
  const api = new ControlApi();

  const [apiEndpoint, setApiEndpoint] = useState(localStorage.getItem("api"));

  return (
    <>
      <PageHeader title="Remote" noRevert />
      <Stack spacing={2} m={2}>
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

        <FormControl>
          <Button
            variant="outlined"
            onClick={() => {
              api.restartRemoteService();
              // window.location.reload();
            }}
          >
            Restart remote service
          </Button>
        </FormControl>
      </Stack>
    </>
  );
}
