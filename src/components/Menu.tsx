import React, { useState } from "react";
import { useListMenuFolder } from "../lib/queries";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListItemText from "@mui/material/ListItemText";
import { MenuItem as MEMenuItem } from "../lib/models";
import moment from "moment";
import ListItemButton from "@mui/material/ListItemButton";
import ScrollToTopFab from "./ScrollToTop";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import ControlApi from "../lib/api";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { formatCurrentPath } from "./Shortcuts";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";

enum Sort {
  NameAsc,
  NameDesc,
  DateAsc,
  DateDesc,
}

export default function Menu() {
  const api = new ControlApi();

  const [currentPath, setCurrentPath] = useState<string>("");
  const [sort, setSort] = useState<Sort>(Sort.NameAsc);

  const listMenuFolder = useListMenuFolder(currentPath);

  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const sortAnchorRef = React.useRef<HTMLButtonElement>(null);
  const handleSortClose = (event: Event) => {
    if (
      sortAnchorRef.current &&
      sortAnchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setSortOpen(false);
  };

  const icon = (item: MEMenuItem) => {
    switch (item.type) {
      case "folder":
        return <FolderOpenIcon />;
      case "rbf":
        return <DeveloperBoardIcon />;
      default:
        return <VideogameAssetIcon />;
    }
  };

  const sortItems = (items: MEMenuItem[] | undefined) => {
    if (!items) {
      return [];
    }

    const sorted = [...items];

    switch (sort) {
      case Sort.NameAsc:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case Sort.NameDesc:
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case Sort.DateAsc:
        sorted.sort((a, b) => moment(a.modified).diff(moment(b.modified)));
        break;
      case Sort.DateDesc:
        sorted.sort((a, b) => moment(b.modified).diff(moment(a.modified)));
        break;
    }

    const folders = sorted.filter((item) => item.type === "folder");
    const files = sorted.filter((item) => item.type !== "folder");

    return [...folders, ...files];
  };

  const resetScroll = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <Paper
        sx={{
          boxShadow: 2,
          position: "fixed",
          width: 1,
          height: "55px",
          zIndex: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{ p: 1, pl: 2, alignItems: "center", height: "55px" }}
        >
          <IconButton
            sx={{ pl: 0, pr: 4 }}
            disabled={currentPath === "" || currentPath === "."}
            onClick={() => {
              setCurrentPath("");
              resetScroll();
            }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontSize: "1rem", flexGrow: 1 }}>
            {formatCurrentPath(currentPath)}
          </Typography>
          <IconButton
            ref={sortAnchorRef}
            onClick={() => setSortOpen(!sortOpen)}
          >
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Paper>
      <Box sx={{ height: "55px" }}></Box>
      {listMenuFolder.isLoading ? <LinearProgress /> : null}
      <Box>
        {!listMenuFolder.isLoading ? (
          <List>
            {listMenuFolder.data?.up ? (
              <ListItemButton
                onClick={() => {
                  setCurrentPath(
                    listMenuFolder.data.up ? listMenuFolder.data.up : ""
                  );
                  resetScroll();
                }}
              >
                <ListItemIcon>
                  <ArrowBackIcon />
                </ListItemIcon>
                <ListItemText primary="Go back" />
              </ListItemButton>
            ) : null}
            {sortItems(listMenuFolder.data?.items).map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => {
                  if (item.next) {
                    setCurrentPath(item.next);
                    resetScroll();
                  } else {
                    api.launchFile(item.path);
                  }
                }}
              >
                <ListItemIcon>{icon(item)}</ListItemIcon>
                <ListItemText
                  primary={item.namesTxt ? item.namesTxt : item.name}
                  secondary={
                    item.version
                      ? moment(item.version).format("YYYY-MM-DD")
                      : null
                  }
                />
              </ListItemButton>
            ))}
          </List>
        ) : null}
        <ScrollToTopFab />
      </Box>
      <Popper
        sx={{
          zIndex: 2,
        }}
        open={sortOpen}
        anchorEl={sortAnchorRef.current}
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
            <Paper sx={{ m: 1, mt: 0 }}>
              <ClickAwayListener onClickAway={handleSortClose}>
                <MenuList dense>
                  {/*<MenuItem*/}
                  {/*  onClick={(e) => {*/}
                  {/*    setSortOpen(false);*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <ListItemIcon>*/}
                  {/*    <CheckBoxOutlineBlankOutlinedIcon />*/}
                  {/*  </ListItemIcon>*/}
                  {/*  <ListItemText>Show hidden files</ListItemText>*/}
                  {/*</MenuItem>*/}
                  <Typography sx={{ pl: 1, fontWeight: 500 }}>
                    Sort by
                  </Typography>
                  <MenuItem
                    onClick={(e) => {
                      setSort(Sort.NameAsc);
                      setSortOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      {sort === Sort.NameAsc ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText>Name (ascending)</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setSort(Sort.NameDesc);
                      setSortOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      {sort === Sort.NameDesc ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText>Name (descending)</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setSort(Sort.DateAsc);
                      setSortOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      {sort === Sort.DateAsc ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText>Modified (ascending)</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setSort(Sort.DateDesc);
                      setSortOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      {sort === Sort.DateDesc ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText>Modified (descending)</ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
