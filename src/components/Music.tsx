import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PlayDisabledIcon from "@mui/icons-material/PlayDisabled";

import ControlApi from "../api";

export default function Music() {
    const api = new ControlApi();

    const musicState = useQuery({
        queryKey: ["music"],
        queryFn: api.getMusicState,
        refetchInterval: 1000,
    });

    const playlists = useQuery({
        queryKey: ["music", "playlists"],
        queryFn: api.getMusicPlaylists,
    });

    const playMusic = useMutation({
        mutationFn: api.playMusic,
        onSuccess: () => {
            musicState.refetch();
        },
    });

    const stopMusic = useMutation({
        mutationFn: api.stopMusic,
        onSuccess: () => {
            musicState.refetch();
        },
    });

    const nextMusic = useMutation({
        mutationFn: api.nextMusic,
        onSuccess: () => {
            musicState.refetch();
        },
    });

    const setPlayback = useMutation({
        mutationFn: api.setMusicPlayback,
        onSuccess: () => {
            musicState.refetch();
        },
    });

    const setPlaylist = useMutation({
        mutationFn: api.setMusicPlaylist,
        onSuccess: () => {
            musicState.refetch();
        },
    });

    return (
        <div>
            <div
                style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: "325px",
                    height: "25px",
                    marginBottom: "8px",
                    textAlign: "center",
                }}
            >
                {musicState.data?.track !== ""
                    ? musicState.data?.track.replace(/\.[^/.]+$/, "")
                    : "-"}
            </div>
            <div style={{ marginBottom: "0.5em", textAlign: "center" }}>
                {musicState.data?.playing ? (
                    <Button
                        variant="contained"
                        onClick={() => stopMusic.mutate()}
                        sx={{ marginRight: "0.5em" }}
                    >
                        <StopIcon />
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => playMusic.mutate()}
                        sx={{ marginRight: "0.5em" }}
                    >
                        <PlayArrowIcon />
                    </Button>
                )}
                <Button variant="contained" onClick={() => nextMusic.mutate()}>
                    <SkipNextIcon />
                </Button>
            </div>
            <div style={{ textAlign: "center", marginBottom: "1em" }}>
                <ButtonGroup variant="contained">
                    <Button
                        variant="contained"
                        onClick={() => setPlayback.mutate("random")}
                        disabled={musicState.data?.playback === "random"}
                    >
                        <ShuffleIcon />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setPlayback.mutate("loop")}
                        disabled={musicState.data?.playback === "loop"}
                    >
                        <RepeatOneIcon />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setPlayback.mutate("disabled")}
                        disabled={musicState.data?.playback === "disabled"}
                    >
                        <PlayDisabledIcon />
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                <List>
                    {playlists.data
                        ?.slice()
                        .sort()
                        .map((playlist) => (
                            <ListItem
                                key={playlist}
                                secondaryAction={
                                    <Button
                                        variant="text"
                                        onClick={() =>
                                            setPlaylist.mutate(playlist)
                                        }
                                    >
                                        Change
                                    </Button>
                                }
                                style={
                                    playlist === musicState.data?.playlist
                                        ? {
                                              borderWidth: "2px",
                                              borderStyle: "solid",
                                              borderColor: "#2a0000",
                                              borderRadius: "5px",
                                          }
                                        : {}
                                }
                            >
                                <ListItemText primary={playlist} />
                            </ListItem>
                        ))}
                </List>
            </div>
        </div>
    );
}
