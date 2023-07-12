import React, { ReactNode } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import GamepadIcon from "@mui/icons-material/Gamepad";
import SettingsIcon from "@mui/icons-material/Settings";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DvrIcon from "@mui/icons-material/Dvr";
import SignalWifiBadIcon from "@mui/icons-material/SignalWifiBad";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import LanIcon from "@mui/icons-material/Lan";
import TerminalIcon from "@mui/icons-material/Terminal";

import {
  Navigate,
  NavLink,
  NavLinkProps,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Screenshots from "./Screenshots";
import Systems from "./Systems";
import Wallpaper from "./Wallpaper";
import Music from "./Music";
import Search from "./Search";
import Settings from "./settings/Settings";
import Control from "./Control";
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  SwipeableDrawer,
} from "@mui/material";
import { Menu } from "./Menu";
import useWs from "./WebSocket";
import {
  SettingsPageId,
  useServerStateStore,
  useUIStateStore,
} from "../lib/store";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ControlApi } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import ListItem from "@mui/material/ListItem";
import moment from "moment";
import { Network } from "./Network";
import { Scripts } from "./Scripts";

const drawerWidth = 240;

interface Page {
  path: string;
  titleText: string;
  buttonText: string;
  icon: ReactNode;
}

const pages: Page[] = [
  {
    path: "/",
    titleText: "Dashboard",
    buttonText: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/search",
    titleText: "Search",
    buttonText: "Search",
    icon: <SearchIcon />,
  },
  {
    path: "/systems",
    titleText: "Systems",
    buttonText: "Systems",
    icon: <VideogameAssetIcon />,
  },
  {
    path: "/screenshots",
    titleText: "Screenshots",
    buttonText: "Screenshots",
    icon: <PhotoCameraBackIcon />,
  },
  {
    path: "/control",
    titleText: "Control",
    buttonText: "Control",
    icon: <GamepadIcon />,
  },
  {
    path: "/settings",
    titleText: "Settings",
    buttonText: "Settings",
    icon: <SettingsIcon />,
  },
  {
    path: "/wallpaper",
    titleText: "Wallpaper",
    buttonText: "Wallpaper",
    icon: <FormatPaintIcon />,
  },
  {
    path: "/music",
    titleText: "Music",
    buttonText: "Music",
    icon: <MusicNoteIcon />,
  },
  {
    path: "/menu",
    titleText: "Menu",
    buttonText: "Menu",
    icon: <DvrIcon />,
  },
  {
    path: "/network",
    titleText: "Network",
    buttonText: "Network",
    icon: <LanIcon />,
  },
  {
    path: "/scripts",
    titleText: "Scripts",
    buttonText: "Scripts",
    icon: <TerminalIcon />,
  },
];

function getPage(path: string): Page | undefined {
  for (const page of pages) {
    if (page.path === path) {
      return page;
    }
  }
}

type RouterLinkProps = React.PropsWithChildren<{
  to: string;
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  closeDrawer: () => void;
}>;

function RouterLink(props: RouterLinkProps) {
  type MyNavLinkProps = Omit<NavLinkProps, "to">;
  const MyNavLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, MyNavLinkProps>(
        (navLinkProps, ref) => {
          const { className: previousClasses, ...rest } = navLinkProps;
          const elementClasses = previousClasses?.toString() ?? "";
          return (
            <NavLink
              {...rest}
              ref={ref}
              to={props.to}
              end
              className={({ isActive }) =>
                isActive ? elementClasses + " Mui-selected" : elementClasses
              }
            />
          );
        }
      ),
    [props.to]
  );
  return (
    <ListItemButton
      component={MyNavLink}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
        props.closeDrawer();
      }}
    >
      <ListItemIcon
        sx={{
          ".Mui-selected > &": {
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItemButton>
  );
}

function PlayingButton() {
  const ws = useWs();
  const serverState = useServerStateStore();
  let icon = <PauseIcon />;
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const api = new ControlApi();

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  if (ws.readyState !== WebSocket.OPEN) {
    icon = <SignalWifiBadIcon />;
  } else if (serverState.activeGame !== "" || serverState.activeCore !== "") {
    icon = <PlayArrowIcon />;
  } else {
    icon = <PauseIcon />;
  }

  const parseActiveGame = (activeGame: string) => {
    const game = activeGame.split("/").pop();
    return game?.split(".").shift();
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        sx={{ ml: 3, color: "primary.contrastText" }}
        onClick={() => setOpen(!open)}
      >
        {icon}
      </IconButton>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper sx={{ mr: 1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Stack sx={{ p: 1 }}>
                  <Typography>
                    Core: {serverState.activeCore || "None"}
                  </Typography>
                  <Typography>
                    Game: {parseActiveGame(serverState.activeGame) || "None"}
                  </Typography>
                  {serverState.activeCore ? (
                    <Button
                      onClick={() => {
                        api.launchMenu();
                        setOpen(false);
                      }}
                    >
                      Exit to menu
                    </Button>
                  ) : null}
                </Stack>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default function ResponsiveDrawer() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const api = new ControlApi();
  const ws = useWs();
  const uiState = useUIStateStore();
  const sysInfo = useQuery({
    queryKey: ["sysInfo"],
    queryFn: api.sysInfo,
  });
  const peers = useQuery({
    queryKey: ["settings", "remote", "peers"],
    queryFn: api.getPeers,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Stack>
          <Stack direction="row">
            <img alt="MiSTer Kun Logo" src="/misterkun.svg" height={43} />
            <img alt="MiSTer FPGA Logo" src="/misterlogo.svg" height={43} />
          </Stack>
          {sysInfo.data ? (
            <Typography fontSize="x-small" textAlign="center">
              {sysInfo.data.hostname} v{sysInfo.data.version}
            </Typography>
          ) : null}
        </Stack>
      </Toolbar>
      <List>
        {/*<RouterLink to="/" text="Dashboard" icon={<DashboardIcon />} closeDrawer={handleDrawerToggle} />*/}
        <RouterLink
          to="/control"
          text="Control"
          icon={<GamepadIcon />}
          closeDrawer={handleDrawerToggle}
        />
        <RouterLink
          to="menu"
          text="Menu"
          icon={<DvrIcon />}
          closeDrawer={handleDrawerToggle}
        />
      </List>
      <Divider />
      <List>
        <RouterLink
          to="/search"
          text="Search"
          icon={<SearchIcon />}
          closeDrawer={handleDrawerToggle}
        />
        <RouterLink
          to="/systems"
          text="Systems"
          icon={<VideogameAssetIcon />}
          closeDrawer={handleDrawerToggle}
        />
        <RouterLink
          to="/screenshots"
          text="Screenshots"
          icon={<PhotoCameraBackIcon />}
          closeDrawer={handleDrawerToggle}
        />
      </List>
      <Divider />
      <List>
        <RouterLink
          to="/music"
          text="Music"
          icon={<MusicNoteIcon />}
          closeDrawer={handleDrawerToggle}
        />
        <RouterLink
          to="/wallpaper"
          text="Wallpaper"
          icon={<FormatPaintIcon />}
          closeDrawer={handleDrawerToggle}
        />
        <RouterLink
          to="/scripts"
          text="Scripts"
          icon={<TerminalIcon />}
          closeDrawer={handleDrawerToggle}
        />
        <RouterLink
          to="/settings"
          text="Settings"
          icon={<SettingsIcon />}
          onClick={() => uiState.setActiveSettingsPage(SettingsPageId.Main)}
          closeDrawer={handleDrawerToggle}
        />
      </List>
      <Divider />
      {sysInfo.data && sysInfo.data.ips ? (
        <div onClick={() => sysInfo.refetch()}>
          <List dense sx={{ pb: 0.6 }}>
            <ListItem>
              <ListItemText
                primary="Last system update"
                secondary={
                  sysInfo.data.updated === ""
                    ? "Never"
                    : moment(sysInfo.data.updated).fromNow()
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  sysInfo.data.ips.length > 1 ? "IP addresses" : "IP address"
                }
                secondary={sysInfo.data.ips.join(", ")}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Hostname"
                secondary={
                  sysInfo.data.hostname +
                  (sysInfo.data.dns !== "" ? " (" + sysInfo.data.dns + ")" : "")
                }
              />
            </ListItem>
          </List>
        </div>
      ) : null}
      {peers.data && peers.data.peers && peers.data.peers.length > 1 ? (
        <Box sx={{ p: 1, pt: 0 }}>
          <Button
            sx={{ width: 1 }}
            variant="outlined"
            startIcon={<LanIcon />}
            onClick={() => {
              navigate("/network");
              setMobileOpen(false);
            }}
          >
            Browse MiSTers
          </Button>
        </Box>
      ) : null}
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "secondary.main",
            color: "primary.contrastText",
            pr: 1,
            pl: 2.2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            sx={{
              flexGrow: 1,
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: 1 }}
            >
              {getPage(location.pathname)?.titleText}
            </Typography>
          </Stack>
          <PlayingButton />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <SwipeableDrawer
          container={window.document.body}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
          disableBackdropTransition
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/systems" element={<Systems />} />
          <Route path="/" element={<Navigate to="/control" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/screenshots" element={<Screenshots />} />
          <Route path="/control" element={<Control />} />
          <Route path="/music" element={<Music />} />
          <Route path="/wallpaper" element={<Wallpaper />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/network" element={<Network />} />
          <Route path="/scripts" element={<Scripts />} />
        </Routes>
      </Box>
    </Box>
  );
}
