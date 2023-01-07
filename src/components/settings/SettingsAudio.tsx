import Stack from "@mui/material/Stack";
import { BoolOption, PageHeader, ValuePicker } from "./SettingsCommon";
import { useIniSettingsStore } from "../../lib/store";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

function HdmiAudio96k() {
  const v = useIniSettingsStore((state) => state.hdmiAudio96k);
  const sv = useIniSettingsStore((state) => state.setHdmiAudio96k);

  return (
    <BoolOption
      value={v}
      setValue={sv}
      label="Enable 96khz/16bit HDMI audio"
      helpText="Default is 48khz/16bit."
    />
  );
}

function AFilterDefault() {
  const v = useIniSettingsStore((state) => state.aFilterDefault);
  const sv = useIniSettingsStore((state) => state.setAFilterDefault);
  const [enabled, setEnabled] = useState(v && v !== "" ? true : false);

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={enabled}
            onChange={(e) => {
              setEnabled(e.target.checked);
              if (!e.target.checked) {
                sv("");
              }
            }}
          />
        }
        label="Default audio filter"
      />
      {enabled ? (
        <ValuePicker
          value={v}
          setValue={sv}
          options={[
            "Interpolation (Medium).txt",
            "No Interpolation.txt",
            "Scanlines (Medium).txt",
            "Scanlines (Strong).txt",
            "Scanlines (Weak).txt",
          ]}
          formatOption={(option) => option.replace(/\.[^/.]+$/, "")}
        />
      ) : null}
    </FormControl>
  );
}

export default function AudioSettings() {
  return (
    <Stack spacing={3}>
      <PageHeader title="Audio" />

      <HdmiAudio96k />
      <AFilterDefault />
    </Stack>
  );
}
