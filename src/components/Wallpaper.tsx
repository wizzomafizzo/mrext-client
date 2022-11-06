import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import Fab from "@mui/material/Fab";
import { CircularProgress } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import StarIcon from "@mui/icons-material/Star";
import UploadIcon from "@mui/icons-material/Upload";

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
            <Fab
                color="primary"
                style={{ position: "fixed", bottom: 16, right: 16 }}
                onClick={() => uploadWallpaper.mutate()}
            >
                {uploadWallpaper.isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <UploadIcon />
                )}
            </Fab>

            {allWallpapers.data
                ?.slice()
                .sort()
                .map((screenshot) => (
                    <div key={screenshot.filename}>
                        <Card sx={{ maxWidth: 326, marginBottom: 2 }}>
                            <CardMedia
                                component="img"
                                image={
                                    "http://10.0.0.210:8000/wallpaper/" +
                                    screenshot.filename
                                }
                                alt={screenshot.name}
                            />
                            <CardContent sx={{ paddingBottom: 0 }}>
                                <Typography
                                    gutterBottom
                                    component="div"
                                    style={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {screenshot.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                ></Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        activateWallpaper.mutate(
                                            screenshot.filename
                                        );
                                    }}
                                >
                                    <StarIcon fontSize="small" /> Activate
                                </Button>
                                <Button size="small">
                                    <DriveFileRenameOutlineIcon fontSize="small" />{" "}
                                    Rename
                                </Button>
                                <Button
                                    color="error"
                                    size="small"
                                    onClick={() => {
                                        setDeleteId(screenshot.filename);
                                        setOpenDelete(true);
                                    }}
                                >
                                    <DeleteIcon fontSize="small" /> Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}

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
