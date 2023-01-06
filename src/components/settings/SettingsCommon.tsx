import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useUIStateStore, SettingsPageId } from "../../lib/store";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

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

export function ValuePicker(props: {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  formatOption: (option: string) => string;
}) {
  const unsetValue = "<not set>";
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>
          {props.value !== "" ? props.formatOption(props.value) : unsetValue}
        </Typography>
        <Button size="small" onClick={() => setOpen(true)}>
          Browse...
        </Button>
      </Stack>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <List>
          {props.options.map((option) => (
            <ListItem
              button
              onClick={() => {
                props.setValue(option);
                setOpen(false);
              }}
              key={option}
            >
              <ListItemText primary={props.formatOption(option)} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Box>
  );
}

export function BoolOption(props: {
  value: boolean;
  setValue: (value: boolean) => void;
  label: string;
  helpText?: string;
}) {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.value}
            onChange={(e) => props.setValue(e.target.checked)}
          />
        }
        label={props.label}
      />
      {props.helpText && <FormHelperText>{props.helpText}</FormHelperText>}
    </FormControl>
  );
}

export function TextOption(props: {
  value: string;
  setValue: (value: string) => void;
  label: string;
  helpText?: string;
}) {
  return (
    <FormControl>
      {/*<InputLabel>{props.label}</InputLabel>*/}
      <TextField
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        label={props.label}
      />
      {props.helpText && <FormHelperText>{props.helpText}</FormHelperText>}
    </FormControl>
  );
}

export function SimpleSelectOption(props: {
  value: number;
  setValue: (value: number) => void;
  options: string[];
  helpText?: string[] | string;
  label: string;
}) {
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        onChange={(e) => props.setValue(Number(e.target.value))}
        label={props.label}
      >
        {props.options.map((option, i) => (
          <MenuItem key={option} value={i}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {Array.isArray(props.helpText) &&
      props.helpText.length === props.options.length ? (
        <FormHelperText>{props.helpText[props.value]}</FormHelperText>
      ) : props.helpText !== undefined ? (
        <FormHelperText>{props.helpText}</FormHelperText>
      ) : null}
    </FormControl>
  );
}

export function NumberOption(props: {
  value: number;
  setValue: (value: number) => void;
  label: string;
  helpText?: string;
  isEnabled: () => boolean;
  disabledValue: number;
  defaultValue: number;
  min: number;
  max: number;
}) {
  return (
    <FormControl>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={props.isEnabled()}
              onChange={(e) => {
                if (e.target.checked) {
                  props.setValue(props.defaultValue);
                } else {
                  props.setValue(props.disabledValue);
                }
              }}
            />
          }
          label={props.label}
        />
        {props.isEnabled() ? (
          <TextField
            type="number"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              style: { textAlign: "center" },
            }}
            size="small"
            sx={{ width: "100px" }}
            value={props.value}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < props.min) {
                props.setValue(props.min);
              } else if (value > props.max) {
                props.setValue(props.max);
              } else {
                props.setValue(value);
              }
            }}
          />
        ) : null}
      </Stack>
      <FormHelperText>{props.helpText}</FormHelperText>
    </FormControl>
  );
}

export function NumberSliderOption(props: {
  value: number;
  setValue: (value: number) => void;
  label: string;
  helpText?: string;
  min: number;
  max: number;
}) {
  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <Stack spacing={2} direction="row" alignItems="center">
        <Slider
          value={props.value}
          min={props.min}
          max={props.max}
          onChange={(e, v) => props.setValue(v as number)}
        />
        <TextField
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { textAlign: "left" },
          }}
          size="small"
          sx={{ width: 120 }}
          value={props.value}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < props.min) {
              props.setValue(props.min);
            } else if (v > props.max) {
              props.setValue(props.max);
            } else {
              props.setValue(v);
            }
          }}
        />
      </Stack>
      <FormHelperText>{props.helpText}</FormHelperText>
    </FormControl>
  );
}

export function VerticalNumberSliderOption(props: {
  value: number;
  setValue: (value: number) => void;
  label: string;
  min: number;
  max: number;
  step: number;
  commit: (value: number) => void;
}) {
  return (
    <FormControl>
      <Stack spacing={2} alignItems="center">
        <FormLabel>{props.label}</FormLabel>
        <Slider
          step={props.step}
          value={props.value}
          min={props.min}
          max={props.max}
          sx={{ height: 100 }}
          onChange={(e, v) => props.setValue(v as number)}
          onChangeCommitted={(e, v) => props.commit(v as number)}
          orientation="vertical"
        />
        <TextField
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { textAlign: "left" },
            step: props.step,
          }}
          size="small"
          sx={{ width: 90 }}
          value={props.value.toFixed(2)}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < props.min) {
              props.setValue(props.min);
            } else if (v > props.max) {
              props.setValue(props.max);
            } else {
              props.setValue(v);
            }
          }}
        />
      </Stack>
    </FormControl>
  );
}

export function ToggleableNumberSliderOption(props: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  helpText?: string;
  min: number;
  max: number;
  disabledValue: number;
  step: number;
  suffix?: string;
}) {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.value !== props.disabledValue}
            onChange={(e) =>
              e.target.checked
                ? props.setValue(props.min)
                : props.setValue(props.disabledValue)
            }
          />
        }
        label={props.label}
      />
      {props.value !== props.disabledValue ? (
        <Stack spacing={2} direction="row" alignItems="center">
          <Slider
            value={props.value}
            onChange={(e, v) => props.setValue(Number(v))}
            step={props.step}
            min={props.min}
            max={props.max}
          />
          <TextField
            type="number"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              style: { textAlign: "left" },
            }}
            size="small"
            sx={{ width: "110px" }}
            value={props.value}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < props.min) {
                props.setValue(props.min);
              } else if (value > props.max) {
                props.setValue(props.max);
              } else {
                props.setValue(value);
              }
            }}
          />
          <div>{props.suffix}</div>
        </Stack>
      ) : null}
      <FormHelperText>{props.helpText}</FormHelperText>
    </FormControl>
  );
}
