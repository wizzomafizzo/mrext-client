import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import TvIcon from "@mui/icons-material/Tv";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import SpeakerIcon from "@mui/icons-material/Speaker";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TerminalIcon from "@mui/icons-material/Terminal";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";

import { SettingsPageId, useUIStateStore } from "../../lib/store";

import VideoSettings from "./SettingsVideo";
import InputDevices from "./SettingsInputDevices";
import OSDMenuSettings from "./SettingsOSDMenu";
import CoresSettings from "./SettingsCore";
import Remote from "./SettingsRemote";

import Box from "@mui/material/Box";
import AudioSettings from "./SettingsAudio";
import SystemSettings from "./SettingsSystem";
import { ReactNode, useState } from "react";
import { useListMisterInis } from "../../lib/queries";
import Button from "@mui/material/Button";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { ControlApi } from "../../lib/api";

function SettingsPageLink(props: {
  page: SettingsPageId;
  text: string;
  icon: ReactNode;
}) {
  const setActiveSettingsPage = useUIStateStore(
    (state) => state.setActiveSettingsPage
  );

  return (
    <ListItem disableGutters>
      <ListItemButton onClick={() => setActiveSettingsPage(props.page)}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
        <ArrowForwardIcon />
      </ListItemButton>
    </ListItem>
  );
}

function MainPage() {
  const inis = useListMisterInis();
  const [iniDialogOpen, setIniDialogOpen] = useState(false);
  const api = new ControlApi();

  let activeIni = {
    name: "Main",
    id: 1,
  };

  if (inis.data && inis.data.inis.length > 0) {
    let id = 1;

    if (inis.data.active === 0) {
      id = 1;
    } else {
      id = inis.data.active;
    }

    activeIni.name = inis.data.inis[id - 1].displayName;
    activeIni.id = id;
  }

  const iniButton = (
    <ListItem sx={{ pb: 0, pt: 2 }}>
      <Button
        fullWidth
        variant="contained"
        endIcon={<SwapHorizIcon />}
        onClick={() => setIniDialogOpen(true)}
      >
        Active INI: {activeIni.name}
      </Button>
    </ListItem>
  );

  return (
    <div>
      <Dialog open={iniDialogOpen} onClose={() => setIniDialogOpen(false)}>
        <Box sx={{ p: 2, minWidth: 200 }}>
          <List disablePadding>
            <ListItem sx={{ pt: 0 }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  textAlign: "center",
                  width: 1,
                }}
              >
                Set active INI
              </Typography>
            </ListItem>
            {(inis.data?.inis || []).map(
              (
                ini: {
                  filename: string;
                  displayName: string;
                },
                i: number
              ) => (
                <ListItem key={ini.filename} disableGutters>
                  <Button
                    fullWidth
                    variant={activeIni.id == i + 1 ? "contained" : "outlined"}
                    onClick={() => {
                      setIniDialogOpen(false);
                      api.setMisterIni({ ini: i + 1 }).then(() => {
                        inis.refetch();
                      });
                    }}
                  >
                    {ini.displayName}
                  </Button>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Dialog>
      <List disablePadding>
        {iniButton}
        <SettingsPageLink
          page={SettingsPageId.Video}
          text="Video"
          icon={<TvIcon />}
        />
        <SettingsPageLink
          page={SettingsPageId.Audio}
          text="Audio"
          icon={<SpeakerIcon />}
        />
        <SettingsPageLink
          page={SettingsPageId.InputDevices}
          text="Input devices"
          icon={<SportsEsportsIcon />}
        />
        <SettingsPageLink
          page={SettingsPageId.OSDMenu}
          text="OSD and menu"
          icon={<WysiwygIcon />}
        />
        <SettingsPageLink
          page={SettingsPageId.Cores}
          text="Cores"
          icon={<DeveloperBoardIcon />}
        />
        <SettingsPageLink
          page={SettingsPageId.System}
          text="System"
          icon={<TerminalIcon />}
        />
        <SettingsPageLink
          page={SettingsPageId.Remote}
          text="Remote"
          icon={<SettingsRemoteIcon />}
        />
      </List>
    </div>
  );
}

export default function Settings() {
  const activeSettingsPage = useUIStateStore(
    (state) => state.activeSettingsPage
  );

  const page = (() => {
    switch (activeSettingsPage) {
      case SettingsPageId.Main:
        return <MainPage />;
      case SettingsPageId.Video:
        return <VideoSettings />;
      case SettingsPageId.Audio:
        return <AudioSettings />;
      case SettingsPageId.InputDevices:
        return <InputDevices />;
      case SettingsPageId.OSDMenu:
        return <OSDMenuSettings />;
      case SettingsPageId.Cores:
        return <CoresSettings />;
      case SettingsPageId.System:
        return <SystemSettings />;
      case SettingsPageId.Remote:
        return <Remote />;
    }
  })();

  return <Box>{page}</Box>;
}
