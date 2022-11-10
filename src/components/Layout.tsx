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

import misterLogo from "../images/misterlogo.svg";

import {
    Routes,
    Route,
    useLocation,
    NavLink,
    NavLinkProps,
    Navigate,
} from "react-router-dom";

import Screenshots from "./Screenshots";
import Systems from "./Systems";
import Wallpaper from "./Wallpaper";
import Music from "./Music";
import Search from "./Search";
import Settings from "./Settings";

const drawerWidth = 240;

interface Page {
    path: string;
    title: string;
    icon: ReactNode;
}

const pages: { [key: string]: Page } = {
    "/": {
        path: "/",
        title: "Dashboard",
        icon: <DashboardIcon />,
    },
    "/search": {
        path: "/search",
        title: "Search Games",
        icon: <SearchIcon />,
    },
    "/systems": {
        path: "/systems",
        title: "Systems",
        icon: <VideogameAssetIcon />,
    },
    "/screenshots": {
        path: "/screenshots",
        title: "Screenshots",
        icon: <PhotoCameraBackIcon />,
    },
    "/control": {
        path: "/control",
        title: "Control",
        icon: <GamepadIcon />,
    },
    "/settings": {
        path: "/settings",
        title: "Settings",
        icon: <SettingsIcon />,
    },
    "/wallpaper": {
        path: "/wallpaper",
        title: "Wallpaper",
        icon: <FormatPaintIcon />,
    },
    "/music": {
        path: "/music",
        title: "Music",
        icon: <MusicNoteIcon />,
    },
};

function getPage(path: string) {
    return pages[path] || "";
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
                    const { className: previousClasses, ...rest } =
                        navLinkProps;
                    const elementClasses = previousClasses?.toString() ?? "";
                    return (
                        <NavLink
                            {...rest}
                            ref={ref}
                            to={props.to}
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? elementClasses + " Mui-selected"
                                    : elementClasses
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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div onClick={() => setMobileOpen(false)}>
            <Toolbar sx={{ justifyContent: "center" }}>
                <img alt="MiSTer FPGA" src={misterLogo} height={55} />
            </Toolbar>
            <List>
                {/* <RouterLink to="/" text="Dashboard" icon={<DashboardIcon />} />
                <RouterLink
                    to="/control"
                    text="Control"
                    icon={<GamepadIcon />}
                /> */}
                <RouterLink to="/music" text="Music" icon={<MusicNoteIcon />} />
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
                <RouterLink
                    to="/wallpaper"
                    text="Wallpaper"
                    icon={<FormatPaintIcon />}
                />
                {/* <RouterLink
                    to="/settings"
                    text="Settings"
                    icon={<SettingsIcon />}
                /> */}
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
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {getPage(location.pathname).icon}
                    <Typography variant="h6" noWrap component="div" sx={{marginLeft: 1}}>
                        {getPage(location.pathname).title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={window.document.body}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
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
                </Drawer>
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
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/systems" element={<Systems />} />
                    <Route path="/" element={<Navigate to="/systems" />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/screenshots" element={<Screenshots />} />
                    <Route path="/control" element={<div></div>} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/wallpaper" element={<Wallpaper />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Box>
        </Box>
    );
}
