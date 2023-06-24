import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useUIStateStore } from "../../lib/store";
import { themes } from "../../lib/themes";
import { PageHeader, SectionHeader } from "./SettingsCommon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  ControlApi,
  getApiEndpoint,
  getStoredApiEndpoint,
  setApiEndpoint,
  getStoredWsEndpoint,
  getWsEndpoint,
  setWsEndpoint,
} from "../../lib/api";
import { Card } from "@mui/material";

export default function Remote() {
  const activeTheme = useUIStateStore((state) => state.activeTheme);
  const setActiveTheme = useUIStateStore((state) => state.setActiveTheme);
  const api = new ControlApi();

  const storedApiEndpoint = getStoredApiEndpoint();
  const [settingApiEndpoint, setSettingApiEndpoint] = useState(
    storedApiEndpoint ? storedApiEndpoint : ""
  );

  const storedWsEndpoint = getStoredWsEndpoint();
  const [settingWsEndpoint, setSettingWsEndpoint] = useState(
    storedWsEndpoint ? storedWsEndpoint : ""
  );

  return (
    <>
      <PageHeader title="Remote" noRevert />
      <Stack spacing={3} m={2}>
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

        <SectionHeader text={"Advanced"} />

        <FormControl>
          <Button
            variant="outlined"
            onClick={() => {
              api.restartRemoteService();
            }}
          >
            Restart remote service
          </Button>
        </FormControl>

        <Card>
          <Stack m={1} spacing={1}>
            <FormControl>
              <TextField
                label="API endpoint URL"
                value={settingApiEndpoint}
                placeholder={getApiEndpoint()}
                onChange={(e) => setSettingApiEndpoint(e.target.value)}
                autoComplete="off"
              />
            </FormControl>
            <FormControl>
              <TextField
                label="WebSocket endpoint URL"
                value={settingWsEndpoint}
                placeholder={getWsEndpoint()}
                onChange={(e) => setSettingWsEndpoint(e.target.value)}
                autoComplete="off"
                helperText="Leave blank to auto-configure based on API endpoint URL."
              />
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => {
                setApiEndpoint(settingApiEndpoint);
                setWsEndpoint(settingWsEndpoint);
                window.location.reload();
              }}
            >
              Save endpoints
            </Button>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}
