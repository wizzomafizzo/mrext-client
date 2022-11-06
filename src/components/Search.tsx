import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

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
            <TextField
                label="Game name"
                variant="standard"
                sx={{ width: "320px", marginBottom: "0.5em" }}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <br />
            <Button
                variant="contained"
                sx={{ width: "320px" }}
                onClick={() => {
                    let q = searchInput;
                    setSearchQuery(q);
                }}
            >
                Search
            </Button>
            {searchGames.isLoading ? (
                <div style={{ textAlign: "center", marginTop: "2em" }}>
                    <CircularProgress />
                </div>
            ) : (
                <List>
                    {searchGames.data?.map((game) => (
                        <ListItem
                            key={game.path}
                            secondaryAction={
                                <Button
                                    variant="text"
                                    onClick={() => launchGame.mutate(game.path)}
                                    sx={{ marginTop: "20px" }}
                                >
                                    Launch
                                </Button>
                            }
                        >
                            <ListItemText
                                primary={game.name}
                                secondary={game.system.name}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
}
