import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";

import { CircularProgress } from "@mui/material";

import ControlApi from "../lib/api";
import { useServerStatus } from "../lib/queries";

export default function Search() {
    const api = new ControlApi();
    const serverStatus = useServerStatus();

    let searchQuery = "";

    // const searchGames = useQuery({
    //     queryKey: ["games", "search", searchQuery],
    //     queryFn: () => api.searchGames(searchQuery),
    //     enabled: false,
    // });

    const searchGames = useMutation({
        mutationFn: () => api.searchGames(searchQuery),
    });

    const startIndex = useMutation({
        mutationFn: api.startSearchIndex,
    });

    const launchGame = useMutation({
        mutationFn: api.launchGame,
    });

    if (serverStatus.isLoading) {
        return <div></div>;
    }

    if (serverStatus.data?.searchService.indexing === true) {
        return (
            <div>
                <Typography variant="h5">Indexing games...</Typography>
                <LinearProgress
                    variant="determinate"
                    value={
                        (serverStatus.data?.searchService.currentStep /
                            serverStatus.data?.searchService.totalSteps) *
                        100
                    }
                />
                <Typography>
                    {serverStatus.data?.searchService.currentDesc}
                </Typography>
            </div>
        );
    }

    if (serverStatus.data?.searchService.ready === false) {
        return (
            <div style={{ textAlign: "center" }}>
                <Typography sx={{ marginBottom: 2 }}>
                    Searching needs an index of game files to be created. This
                    is only required on first setup, or if the games on disk
                    have changed.
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                        startIndex.mutate();
                    }}
                >
                    Generate Index
                </Button>
            </div>
        );
    }

    return (
        <div style={{ margin: "10px" }}>
            <Grid
                container
                sx={{ alignItems: "center" }}
                spacing={{ xs: 2, sm: 2, md: 3 }}
                columns={{ xs: 4, sm: 12, md: 12 }}
            >
                <Grid item xs={8}>
                    <TextField
                        label="Name"
                        variant="standard"
                        sx={{ width: "100%" }}
                        onChange={(e) => (searchQuery = e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchGames.mutate();
                            }
                        }}
                    />
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
                    <div>
                        {searchGames.data ? (
                            <Typography
                                variant="body2"
                                sx={{ marginTop: "0.5em", textAlign: "center" }}
                            >
                                Found {searchGames.data?.total}{" "}
                                {searchGames.data?.total === 1
                                    ? "game"
                                    : "games"}{" "}
                                {searchGames.data?.total >
                                searchGames.data?.pageSize
                                    ? " (showing first " +
                                      searchGames.data?.pageSize +
                                      ")"
                                    : ""}
                            </Typography>
                        ) : null}
                        <List sx={{ marginTop: "0.75em" }} disablePadding>
                            {searchGames.data?.data
                                ?.sort((a, b) =>
                                    a.system.id.localeCompare(b.system.id)
                                )
                                .map((game) => (
                                    <ListItem
                                        key={game.path}
                                        disableGutters
                                        disablePadding
                                    >
                                        <ListItemButton
                                            onClick={() =>
                                                launchGame.mutate(game.path)
                                            }
                                        >
                                            <ListItemText
                                                primary={game.name}
                                                secondary={game.system.name}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                )}
            </Stack>
        </div>
    );
}
