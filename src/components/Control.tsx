import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PersonIcon from "@mui/icons-material/Person";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ControlApi from "../lib/api";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Dialog } from "@mui/material";

const keyMap: { [key: string]: number } = {
  ESC: 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "4": 5,
  "5": 6,
  "6": 7,
  "7": 8,
  "8": 9,
  "9": 10,
  "0": 11,
  "-": 12,
  "=": 13,
  "{backspace}": 14,
  "{tab}": 15,
  q: 16,
  w: 17,
  e: 18,
  r: 19,
  t: 20,
  y: 21,
  u: 22,
  i: 23,
  o: 24,
  p: 25,
  "[": 26,
  "]": 27,
  "{enter}": 28,
  a: 30,
  s: 31,
  d: 32,
  f: 33,
  g: 34,
  h: 35,
  j: 36,
  k: 37,
  l: 38,
  ";": 39,
  "'": 40,
  "`": 41,
  "\\": 43,
  z: 44,
  x: 45,
  c: 46,
  v: 47,
  b: 48,
  n: 49,
  m: 50,
  ",": 51,
  ".": 52,
  "/": 53,
  "{space}": 57,
  F1: 59,
  F2: 60,
  F3: 61,
  F4: 62,
  F5: 63,
  F6: 64,
  F7: 65,
  F8: 66,
  F9: 67,
  F10: 68,
  SCRLK: 70,
  PAUSE: 72,
  F11: 87,
  F12: 88,
  HOME: 102,
  "{up}": 103,
  PGUP: 104,
  "{left}": 105,
  "{right}": 106,
  END: 107,
  "{down}": 108,
  PGDN: 109,
  INS: 110,
  DEL: 111,
  PRTSC: 210, // maybe, check this
  // hold shift
  "!": -2,
  "@": -3,
  "#": -4,
  $: -5,
  "%": -6,
  "^": -7,
  "&": -8,
  "*": -9,
  "(": -10,
  ")": -11,
  _: -12,
  "+": -13,
  Q: -16,
  W: -17,
  E: -18,
  R: -19,
  T: -20,
  Y: -21,
  U: -22,
  I: -23,
  O: -24,
  P: -25,
  "{": -26,
  "}": -27,
  A: -30,
  S: -31,
  D: -32,
  F: -33,
  G: -34,
  H: -35,
  J: -36,
  K: -37,
  L: -38,
  ":": -39,
  '"': -40,
  "~": -41,
  "|": -43,
  Z: -44,
  X: -45,
  C: -46,
  V: -47,
  B: -48,
  N: -49,
  M: -50,
  "<": -51,
  ">": -52,
  "?": -53,
};

export default function Control() {
  const api = new ControlApi();
  const [keyboardLayout, setKeyboardLayout] = React.useState("default");
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);

  return (
    <Box margin={3}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            size="large"
            sx={{ width: "100%", height: 75 }}
            onClick={() => {
              api.sendKeyboard("back");
            }}
          >
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "100%", height: 75 }}
            onClick={() => {
              api.sendKeyboard("up");
            }}
          >
            <KeyboardArrowUpIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            size="large"
            sx={{ width: "100%", height: 75 }}
            onClick={() => {
              api.sendKeyboard("osd");
            }}
          >
            OSD
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "100%", height: 75 }}
            onClick={() => {
              api.sendKeyboard("left");
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "100%", height: 75 }}
            onClick={() => {
              api.sendKeyboard("confirm");
            }}
          >
            OK
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "100%", height: 75 }}
            onClick={() => {
              api.sendKeyboard("right");
            }}
          >
            <KeyboardArrowRightIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            size="large"
            sx={{ width: "100%", height: 75 }}
            onClick={() => {
              api.sendKeyboard("cancel");
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "100%", height: 75 }}
            onClick={() => {
              api.sendKeyboard("down");
            }}
          >
            <KeyboardArrowDownIcon />
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("volume_up");
            }}
            startIcon={<VolumeUpIcon />}
          >
            Vol. up
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("screenshot");
            }}
            startIcon={<AddAPhotoIcon />}
          >
            Screenshot
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("volume_down");
            }}
            startIcon={<VolumeDownIcon />}
          >
            Vol. down
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("raw_screenshot");
            }}
            startIcon={<AddAPhotoIcon />}
          >
            Raw
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("volume_mute");
            }}
            startIcon={<VolumeOffIcon />}
          >
            Mute
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("user");
            }}
            startIcon={<PersonIcon />}
          >
            User
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("pair_bluetooth");
            }}
            startIcon={<BluetoothIcon />}
          >
            Pair BT
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("reset");
            }}
            startIcon={<RestartAltIcon />}
          >
            Reset
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => {
              setKeyboardOpen(true);
            }}
            startIcon={<KeyboardIcon />}
          >
            Keyboard
          </Button>
        </Grid>
      </Grid>

      <Dialog
        onClose={() => setKeyboardOpen(false)}
        open={keyboardOpen}
        fullWidth
        PaperProps={{ sx: { position: "fixed", bottom: 10, m: 0, maxWidth: "95%", width: "95%" } }}
      >
        <div style={{ color: "black" }}>
          <Keyboard
            layoutName={keyboardLayout}
            layout={{
              default: [
                "q w e r t y u i o p",
                "a s d f g h j k l",
                "{shiftup} z x c v b n m {backspace}",
                "{numbers} , {space} . {enter}",
              ],
              shift: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "{shiftdown} Z X C V B N M {backspace}",
                "{numbers} , {space} . {enter}",
              ],
              numbers: [
                "1 2 3 4 5 6 7 8 9 0",
                "@ # $ _ & - + ( ) /",
                "{symbols} * \" ' : ; ! ? {backspace}",
                "{abc} , {space} . {enter}",
              ],
              symbols: [
                "ESC F1 F2 F3 F4 F5 F6",
                "{tab} F7 F8 F9 F10 F11 F12",
                "PRTSC SCRLK PAUSE INS",
                "DEL PGUP PGDN HOME",
                "{left} {up} {down} {right} END",
                "^ < > = { } ~ | \\",
                "{numbers} % [ ] ` {backspace}",
                "{abc} , {space} . {enter}",
              ],
            }}
            display={{
              "{numbers}": "123",
              "{enter}": "↵",
              "{tab}": "⇥",
              "{backspace}": "⌫",
              "{shiftup}": "⇧",
              "{shiftdown}": "⬆",
              "{abc}": "ABC",
              "{space}": "_________",
              "{symbols}": "FN~",
              "{left}": "←",
              "{right}": "→",
              "{up}": "↑",
              "{down}": "↓",
            }}
            onKeyPress={(input) => {
              if (input === "{shiftup}") {
                setKeyboardLayout("shift");
                return;
              } else if (input === "{shiftdown}") {
                setKeyboardLayout("default");
                return;
              } else if (input === "{numbers}") {
                setKeyboardLayout("numbers");
                return;
              } else if (input === "{symbols}") {
                setKeyboardLayout("symbols");
                return;
              } else if (input === "{abc}") {
                setKeyboardLayout("default");
                return;
              }

              if (input in keyMap) {
                api.sendRawKeyboard(keyMap[input]);
              }
            }}
          />
        </div>
      </Dialog>
    </Box>
  );
}
