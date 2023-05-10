import React, { useCallback, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";

import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

import {
  Box,
  CircularProgress,
  ClickAwayListener,
  FormControl,
  Grow,
  MenuList,
  Paper,
  Popper,
  useScrollTrigger,
  Zoom,
} from "@mui/material";

import ControlApi from "../lib/api";
import { useIndexedSystems, useServerStatus } from "../lib/queries";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Game, SearchResults } from "../lib/models";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ScrollToTopFab from "./ScrollToTop";

function SearchResultsList(props: { results?: SearchResults }) {
  const api = new ControlApi();
  const launchGame = useMutation({
    mutationFn: api.launchGame,
  });

  const displayed = new Set<string>();
  const displayResults: Game[] = [];

  if (props.results && props.results.data) {
    for (const game of props.results.data) {
      if (displayed.has(game.name)) {
        continue;
      }

      displayed.add(game.name);
      displayResults.push(game);
    }
  }

  return (
    <Box width={1}>
      {props.results ? (
        <Typography
          variant="body2"
          sx={{ marginTop: "0.5em", textAlign: "center" }}
        >
          Found {displayed.size} {displayed.size === 1 ? "game" : "games"}
        </Typography>
      ) : null}
      <List sx={{ marginTop: 2 }} disablePadding>
        {displayResults
          ?.sort((a, b) => a.system.id.localeCompare(b.system.id))
          .map((game) => (
            <ListItem key={game.path} disableGutters disablePadding>
              <ListItemButton
                onClick={() => launchGame.mutate(game.path)}
                disableGutters
              >
                <ListItemText
                  primary={game.name}
                  secondary={game.system.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
}

export default function Search() {
  const api = new ControlApi();
  const serverStatus = useServerStatus();
  const systems = useIndexedSystems();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchSystem, setSearchSystem] = React.useState("all");

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const searchGames = useMutation({
    mutationFn: () =>
      api.searchGames({
        query: searchQuery,
        system: searchSystem,
      }),
  });

  const startIndex = useMutation({
    mutationFn: api.startSearchIndex,
  });

  const resultsList = useMemo(() => {
    return <SearchResultsList results={searchGames.data} />;
  }, [searchGames.data]);

  if (serverStatus.isLoading) {
    return <></>;
  }

  if (serverStatus.data?.searchService.indexing === true) {
    return (
      <Box m={2}>
        <Typography variant="h5">Indexing games...</Typography>
        <LinearProgress
          variant="determinate"
          value={
            (serverStatus.data?.searchService.currentStep /
              serverStatus.data?.searchService.totalSteps) *
            100
          }
        />
        <Typography>{serverStatus.data?.searchService.currentDesc}</Typography>
      </Box>
    );
  }

  if (serverStatus.data?.searchService.ready === false) {
    return (
      <Box m={2} sx={{ textAlign: "center" }}>
        <Typography sx={{ marginBottom: 2 }}>
          Searching needs an index of game files to be created. This is only
          required on first setup, or if the games on disk have changed.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            startIndex.mutate();
          }}
        >
          Generate Index
        </Button>
      </Box>
    );
  }

  return (
    <Box m={2}>
      <Grid
        container
        sx={{ alignItems: "center" }}
        spacing={{ xs: 2, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 12, md: 12 }}
      >
        <Grid item xs={8}>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              autoComplete="off"
              sx={{ width: "100%" }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchGames.mutate();
                }
              }}
              placeholder="Search"
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <Stack width={1} direction="row">
              <Select
                value={searchSystem}
                onChange={(e) => setSearchSystem(e.target.value)}
                size="small"
                sx={{ flexGrow: 1 }}
              >
                <MenuItem value="all">All systems</MenuItem>
                {systems.data?.systems
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((system) => (
                    <MenuItem key={system.id} value={system.id}>
                      {system.name}
                    </MenuItem>
                  ))}
              </Select>
              <Box ref={anchorRef}>
                <IconButton onClick={() => handleToggle()}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              searchGames.mutate();
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Stack sx={{ alignItems: "center" }}>
        {searchGames.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "2em" }}>
            <CircularProgress />
          </div>
        ) : (
          resultsList
        )}
        <ScrollToTopFab />
      </Stack>
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
            <Paper sx={{ m: 1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem
                    onClick={(e) => {
                      setOpen(false);
                      startIndex.mutate();
                    }}
                  >
                    Regenerate index
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
