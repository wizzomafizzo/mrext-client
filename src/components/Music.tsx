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
import { Typography } from "@mui/material";

import { UseQueryResult } from "@tanstack/react-query";
import { ServerStatus } from "../models";

export default function Music(props: {
    serverStatus: UseQueryResult<ServerStatus, unknown>;
}) {
    const api = new ControlApi();

    const playlists = useQuery({
        queryKey: ["music", "playlists"],
        queryFn: api.getMusicPlaylists,
    });

    const playMusic = useMutation({
        mutationFn: api.playMusic,
    });

    const stopMusic = useMutation({
        mutationFn: api.stopMusic,
    });

    const nextMusic = useMutation({
        mutationFn: api.nextMusic,
    });

    const setPlayback = useMutation({
        mutationFn: api.setMusicPlayback,
    });

    const setPlaylist = useMutation({
        mutationFn: api.setMusicPlaylist,
    });

    if (props.serverStatus.isLoading) {
        return <div></div>;
    }

    if (props.serverStatus.data?.musicService.running === false) {
        return (
            <div>
                <Typography sx={{ textAlign: "center" }}>
                    Music requires{" "}
                    <a
                        href="https://github.com/wizzomafizzo/MiSTer_BGM"
                        target="_blank"
                        rel="noreferrer"
                    >
                        BGM
                    </a>{" "}
                    to be configured and running on your MiSTer.
                    <br />
                    <br />
                    Please install it and reload this page.
                </Typography>
            </div>
        );
    }

    return (
        <div>
            <div
                style={{
                    marginBottom: "8px",
                    textAlign: "center",
                }}
            >
                {props.serverStatus.data?.musicService.track !== ""
                    ? props.serverStatus.data?.musicService.track.replace(
                          /\.[^/.]+$/,
                          ""
                      )
                    : "—"}
            </div>
            <div style={{ marginBottom: "0.5em", textAlign: "center" }}>
                {props.serverStatus.data?.musicService.playing ? (
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
                        disabled={
                            props.serverStatus.data?.musicService.playback ===
                            "random"
                        }
                    >
                        <ShuffleIcon />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setPlayback.mutate("loop")}
                        disabled={
                            props.serverStatus.data?.musicService.playback ===
                            "loop"
                        }
                    >
                        <RepeatOneIcon />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setPlayback.mutate("disabled")}
                        disabled={
                            props.serverStatus.data?.musicService.playback ===
                            "disabled"
                        }
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
                                    playlist !==
                                    props.serverStatus.data?.musicService
                                        .playlist ? (
                                        <Button
                                            variant="text"
                                            onClick={() =>
                                                setPlaylist.mutate(playlist)
                                            }
                                            startIcon={<PlayArrowIcon />}
                                        >
                                            Play
                                        </Button>
                                    ) : null
                                }
                                // style={
                                //     playlist === musicState.data?.playlist
                                //         ? {
                                //               boxSizing: "border-box",
                                //               borderWidth: "2px",
                                //               borderStyle: "solid",
                                //               borderColor: "#2a0000",
                                //               borderRadius: "5px",
                                //           }
                                //         : {}
                                // }
                                style={
                                    playlist ===
                                    props.serverStatus.data?.musicService
                                        .playlist
                                        ? {
                                              boxShadow:
                                                  "inset 0px 0px 0px 2px #2a0000",
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
