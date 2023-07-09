import Box from "@mui/material/Box";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useListMenuFolder } from "../lib/queries";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ListItemText from "@mui/material/ListItemText";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LinearProgress from "@mui/material/LinearProgress";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useMutation } from "@tanstack/react-query";
import { ControlApi } from "../lib/api";
import { useUIStateStore } from "../lib/store";

export const formatCurrentPath = (path: string) => {
  if (path === "" || path === ".") {
    return "Home";
  }

  if (path.includes("/")) {
    const parts = path.split("/");
    path = parts[parts.length - 1];
  }

  if (path.startsWith("_")) {
    return path.substring(1);
  }

  return path;
};

export function MenuFolderPicker(props: {
  path: string;
  setPath: (path: string) => void;
  defaultPath?: string;
  close: () => void;
  verb?: string;
}) {
  const [currentPath, setCurrentPath] = useState<string>(
    props.defaultPath ? props.defaultPath : props.path
  );
  const listMenuFolder = useListMenuFolder(currentPath);

  const setCurrent = (path: string) => {
    setCurrentPath(path);
  };

  const results = (
    <List
      sx={{
        maxHeight: "400px",
        overflow: "auto",
      }}
    >
      {listMenuFolder.data?.up ? (
        <ListItemButton
          onClick={() => {
            const path = listMenuFolder.data.up ? listMenuFolder.data.up : "";
            setCurrent(path);
          }}
        >
          <ListItemIcon>
            <ArrowUpwardIcon />
          </ListItemIcon>
          <ListItemText primary="Go up" />
        </ListItemButton>
      ) : null}
      {listMenuFolder.data?.items
        .filter((i) => i.type === "folder")
        .map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => {
              if (item.next) {
                setCurrent(item.next);
              }
            }}
          >
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
    </List>
  );

  return (
    <Stack
      sx={{
        minHeight: "400px",
        minWidth: "300px",
      }}
    >
      <Paper
        sx={{
          p: 1,
          borderRadius: 0,
        }}
      >
        <Stack direction="row" sx={{ pl: 1, alignItems: "center" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {formatCurrentPath(currentPath)}
          </Typography>
          <Button onClick={props.close}>Cancel</Button>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1, mb: 1 }}
          onClick={() => {
            props.setPath(currentPath);
            props.close();
          }}
          disabled={listMenuFolder.isLoading || props.path === currentPath}
        >
          {props.verb ? props.verb : "Select"} {formatCurrentPath(currentPath)}
        </Button>
      </Paper>
      {listMenuFolder.isLoading ? <LinearProgress /> : null}
      {results}
    </Stack>
  );
}

export function MenuFolderPickerDialog(props: {
  path: string;
  setPath: (path: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultPath?: string;
}) {
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <MenuFolderPicker
        path={props.path}
        setPath={props.setPath}
        defaultPath={props.defaultPath}
        close={() => props.setOpen(false)}
      />
    </Dialog>
  );
}

export function SingleShortcut(props: { path: string; back: () => void }) {
  const api = new ControlApi();
  const uiState = useUIStateStore();

  const [folderPickerOpen, setFolderPickerOpen] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<string>(
    uiState.lastFavoriteFolder
  );

  const [filename] = props.path.split("/").slice(-1);
  const name = filename.substring(0, filename.lastIndexOf(".")) || filename;

  const [mglName, setMglName] = useState<string>(name);

  // TODO: this behaviour is inconsistent with the rename file option
  const cleanName = (name: string) => {
    return name.replaceAll(/[<>:"/\\|?*]*/g, "");
  };

  const createShortcut = useMutation({
    mutationFn: () =>
      api.createLauncher({
        name: mglName,
        gamePath: props.path,
        folder: selectedFolder,
      }),
    onSuccess: () => {
      props.back();
    },
  });

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <Box>
        <FormLabel>Create shortcut for...</FormLabel>
        <Typography>{name}</Typography>
      </Box>
      <Box>
        <FormLabel>Menu folder</FormLabel>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ flexGrow: 1 }}>
            {formatCurrentPath(selectedFolder)}
          </Typography>
          <Button variant="outlined" onClick={() => setFolderPickerOpen(true)}>
            Select
          </Button>
        </Stack>
      </Box>
      <FormControl>
        <TextField
          label="Shortcut name"
          variant="outlined"
          value={mglName}
          onChange={(e) => setMglName(cleanName(e.target.value))}
        />
      </FormControl>
      {createShortcut.isError ? (
        <Typography align="center" color="error">
          Could not create shortcut.
        </Typography>
      ) : null}
      <Box>
        <Stack spacing={1}>
          <Button onClick={() => createShortcut.mutate()} variant="contained">
            Create shortcut
          </Button>
          <Button onClick={() => props.back()}>Cancel</Button>
        </Stack>
      </Box>
      <MenuFolderPickerDialog
        path={selectedFolder}
        setPath={(path) => {
          setSelectedFolder(path);
          uiState.setLastFavoriteFolder(path);
        }}
        open={folderPickerOpen}
        setOpen={setFolderPickerOpen}
        defaultPath={uiState.lastFavoriteFolder}
      />
    </Stack>
  );
}
