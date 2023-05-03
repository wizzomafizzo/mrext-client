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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ControlApi from "../lib/api";

export default function Control() {
  const api = new ControlApi();

  return (
    <Box margin={3}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button
            variant="contained"
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
              api.sendKeyboard("up");
            }}
          >
            <KeyboardArrowUpIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
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
        <Grid item xs={4}></Grid>
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
            variant="contained"
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
            variant="contained"
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
            variant="contained"
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
            variant="contained"
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
            variant="contained"
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
            variant="contained"
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
            variant="contained"
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
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              api.sendKeyboard("reset");
            }}
            startIcon={<RestartAltIcon />}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
