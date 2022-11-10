import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import Fab from "@mui/material/Fab";
import { CircularProgress } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import UploadIcon from "@mui/icons-material/Upload";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import ControlApi from "../api";

export default function Wallpaper() {
    const api = new ControlApi();

    const allWallpapers = useQuery({
        queryKey: ["wallpaper"],
        queryFn: api.getWallpapers,
    });

    const deleteWallpaper = useMutation({
        mutationFn: api.deleteWallpaper,
        onSuccess: () => {
            allWallpapers.refetch();
        },
    });

    const uploadWallpaper = useMutation({
        mutationFn: api.getWallpapers,
        onSuccess: () => {
            allWallpapers.refetch();
        },
    });

    const activateWallpaper = useMutation({
        mutationFn: api.setWallpaper,
        onSuccess: () => {
            allWallpapers.refetch();
        },
    });

    const [openDelete, setOpenDelete] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");

    return (
        <div>
            {/* <Fab
                color="primary"
                style={{ position: "fixed", bottom: 16, right: 16 }}
                onClick={() => uploadWallpaper.mutate()}
            >
                {uploadWallpaper.isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <UploadIcon />
                )}
            </Fab> */}

            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {allWallpapers.data
                    ?.slice()
                    .sort()
                    .map((wallpaper) => (
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            key={wallpaper.filename}
                        >
                            <Card
                                sx={
                                    wallpaper.active
                                        ? {
                                              boxShadow:
                                                  "inset 0px 0px 0px 2px #2a0000",
                                              borderRadius: "5px",
                                          }
                                        : {}
                                }
                            >
                                <CardMedia
                                    component="img"
                                    image={api.getWallpaperUrl(
                                        wallpaper.filename
                                    )}
                                    alt={wallpaper.name}
                                />
                                <CardContent sx={{ paddingBottom: 0 }}>
                                    <Typography gutterBottom component="div">
                                        {wallpaper.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    ></Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack
                                        sx={{ width: "100%" }}
                                        direction="row"
                                        spacing={1}
                                        justifyContent="space-between"
                                    >
                                        {wallpaper.active ? (
                                            <Button size="small" disabled>
                                                Active
                                            </Button>
                                        ) : (
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    activateWallpaper.mutate(
                                                        wallpaper.filename
                                                    );
                                                }}
                                                startIcon={
                                                    <StarIcon fontSize="small" />
                                                }
                                            >
                                                Set
                                            </Button>
                                        )}
                                        <a
                                            href={api.getWallpaperUrl(
                                                wallpaper.filename
                                            )}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <IconButton>
                                                <OpenInNewIcon fontSize="small" />
                                            </IconButton>
                                        </a>
                                        {/* <Button size="small">
                                        <DriveFileRenameOutlineIcon fontSize="small" />{" "}
                                        Rename
                                    </Button> */}
                                        {/* <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                setDeleteId(
                                                    screenshot.filename
                                                );
                                                setOpenDelete(true);
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton> */}
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            <Dialog
                open={openDelete}
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteId("");
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete this wallpaper?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)} autoFocus>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        onClick={() => {
                            setOpenDelete(false);
                            deleteWallpaper.mutate(deleteId);
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
