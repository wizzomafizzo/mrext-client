import Stack from "@mui/material/Stack";
import {
  BoolOption,
  NumberOption,
  PageHeader,
  SaveButton,
  SimpleSelectOption,
  TextOption,
  ValuePicker,
} from "./SettingsCommon";
import { useIniSettingsStore } from "../../lib/store";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

function FbSize() {
  const v = useIniSettingsStore((state) => state.fbSize);
  const sv = useIniSettingsStore((state) => state.setFbSize);

  return (
    <SimpleSelectOption
      value={v}
      setValue={sv}
      options={[
        "Automatic",
        "Full size",
        "1/2 of resolution",
        "1/4 of resolution",
      ]}
      label={"Framebuffer size"}
      helpText="Set the final resolution of the framebuffer (the Linux console shown when running scripts). It's normal to see graphical glitches when running the framebuffer at a high resolution."
    />
  );
}

function FbTerminal() {
  const v = useIniSettingsStore((state) => state.fbTerminal);
  const sv = useIniSettingsStore((state) => state.setFbTerminal);

  return (
    <BoolOption value={v} setValue={sv} label={"Enable Linux framebuffer"} />
  );
}

function BootCore() {
  const v = useIniSettingsStore((state) => state.bootCore);
  const sv = useIniSettingsStore((state) => state.setBootCore);
  const [enabled, setEnabled] = useState(v && v !== "" ? true : false);

  // TODO: this style of value picker won't work because autoboot is a special option
  //       maybe a base version that accepts options with an explicit label

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
        label="Auto-boot core"
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

function BootCoreTimeout() {
  const v = useIniSettingsStore((state) => state.bootCoreTimeout);
  const sv = useIniSettingsStore((state) => state.setBootCoreTimeout);
  const pv = useIniSettingsStore((state) => state.bootCore);

  return pv !== "" ? (
    <NumberOption
      value={v}
      setValue={sv}
      label="Auto-boot core timeout"
      defaultValue={10}
      min={10}
      max={30}
    />
  ) : null;
}

function WaitMount() {
  const v = useIniSettingsStore((state) => state.waitMount);
  const sv = useIniSettingsStore((state) => state.setWaitMount);

  // TODO: value picker of mount points
  return <TextOption value={v} setValue={sv} label="Wait for mount" />;
}

export default function SystemSettings() {
  return (
    <Stack spacing={3}>
      <PageHeader title="System" />

      <FbSize />
      <FbTerminal />
      <BootCore />
      <BootCoreTimeout />
      <WaitMount />

      <SaveButton />
    </Stack>
  );
}
