import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";

import { CircularProgress } from "@mui/material";

import ControlApi from "../api";

export default function Search() {
    const api = new ControlApi();

    const [searchQuery, setSearchQuery] = React.useState("");

    const searchGames = useQuery({
        queryKey: ["games", "search", searchQuery],
        queryFn: () => api.searchGames(searchQuery),
    });

    const launchGame = useMutation({
        mutationFn: api.launchGame,
    });

    const [searchInput, setSearchInput] = React.useState("");

    return (
        <div>
            <Stack sx={{ alignItems: "center" }}>
                <TextField
                    label="Name"
                    variant="standard"
                    sx={{
                        width: "100%",
                        maxWidth: "400px",
                        marginBottom: "0.5em",
                    }}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            let q = searchInput;
                            setSearchQuery(q);
                        }
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ width: "100%", maxWidth: "200px" }}
                    onClick={() => {
                        let q = searchInput;
                        setSearchQuery(q);
                    }}
                    startIcon={<SearchIcon />}
                >
                    Search
                </Button>
                {searchGames.isLoading ? (
                    <div style={{ textAlign: "center", marginTop: "2em" }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <List sx={{ marginTop: "1em" }} disablePadding>
                        {searchGames.data?.slice().sort(
                            (a, b) => a.system.id.localeCompare(b.system.id)
                        ).map((game) => (
                            <ListItem key={game.path} disableGutters disablePadding>
                                <ListItemButton
                                    onClick={() => launchGame.mutate(game.path)}
                                >
                                    <ListItemText
                                        primary={game.name}
                                        secondary={game.system.name}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Stack>
        </div>
    );
}
