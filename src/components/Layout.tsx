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

import {
  Navigate,
  NavLink,
  NavLinkProps,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Screenshots from "./Screenshots";
import Systems from "./Systems";
import Wallpaper from "./Wallpaper";
import Music from "./Music";
import Search from "./Search";
import Settings from "./settings/Settings";
import Control from "./Control";
import { SwipeableDrawer } from "@mui/material";
import Menu from "./Menu";
import useWebSocket from "react-use-websocket";
import {WebSocketHook} from "react-use-websocket/dist/lib/types";
import useWs from "./WebSocket";

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
    <ListItemButton component={MyNavLink}>
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



export default function ResponsiveDrawer() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const ws = useWs();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div onClick={() => setMobileOpen(false)}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <img alt="MiSTer Kun Logo" src="/misterkun.svg" height={48} />
        <img alt="MiSTer FPGA Logo" src="/misterlogo.svg" height={48} />
      </Toolbar>
      <List>
        {/*<RouterLink to="/" text="Dashboard" icon={<DashboardIcon />} />*/}
        <RouterLink to="/control" text="Control" icon={<GamepadIcon />} />
        <RouterLink to="menu" text="Menu" icon={<DvrIcon />} />
      </List>
      <Divider />
      <List>
        <RouterLink to="/search" text="Search" icon={<SearchIcon />} />
        <RouterLink
          to="/systems"
          text="Systems"
          icon={<VideogameAssetIcon />}
        />
        <RouterLink
          to="/screenshots"
          text="Screenshots"
          icon={<PhotoCameraBackIcon />}
        />
      </List>
      <Divider />
      <List>
        <RouterLink to="/music" text="Music" icon={<MusicNoteIcon />} />

        <RouterLink
          to="/wallpaper"
          text="Wallpaper"
          icon={<FormatPaintIcon />}
        />
        <RouterLink to="/settings" text="Settings" icon={<SettingsIcon />} />
      </List>
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
          {getPage(location.pathname)?.icon}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginLeft: 1 }}
          >
            {getPage(location.pathname)?.titleText}
          </Typography>
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
          <Route path="/" element={<Navigate to="/systems" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/screenshots" element={<Screenshots />} />
          <Route path="/control" element={<Control />} />
          <Route path="/music" element={<Music />} />
          <Route path="/wallpaper" element={<Wallpaper />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Box>
    </Box>
  );
}
