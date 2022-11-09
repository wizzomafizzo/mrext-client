import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Fab from "@mui/material/Fab";
import { CircularProgress } from "@mui/material";

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

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

import ControlApi from "../api";

export default function Screenshots() {
    const api = new ControlApi();

    const allScreenshots = useQuery({
        queryKey: ["screenshots"],
        queryFn: api.getScreenshots,
    });

    const takeScreenshot = useMutation({
        mutationFn: api.takeScreenshot,
        onSuccess: () => {
            allScreenshots.refetch();
        },
    });

    const deleteScreenshot = useMutation({
        mutationFn: api.deleteScreenshot,
        onSuccess: () => {
            allScreenshots.refetch();
        },
    });

    const [openDelete, setOpenDelete] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");

    return (
        <div>
            <Fab
                color="primary"
                style={{ position: "fixed", bottom: 16, right: 16 }}
                onClick={() => takeScreenshot.mutate()}
            >
                {takeScreenshot.isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <AddAPhotoIcon />
                )}
            </Fab>

            {allScreenshots.data
                ?.slice()
                .sort(
                    (a, b) =>
                        new Date(b.modified).getTime() -
                        new Date(a.modified).getTime()
                )
                .map((screenshot) => (
                    <div key={screenshot.path}>
                        <Card sx={{ maxWidth: 326, marginBottom: 2 }}>
                            <CardMedia
                                component="img"
                                image={api.getScreenshotUrl(screenshot.path)}
                                alt={screenshot.path}
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
                                    {screenshot.game}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Added: {screenshot.modified}
                                    <br />
                                    Core: {screenshot.core}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">
                                    <ShareIcon fontSize="small" /> Share
                                </Button>
                                <Button
                                    color="error"
                                    size="small"
                                    onClick={() => {
                                        setDeleteId(screenshot.path);
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
                        Delete this screenshot?
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
                            deleteScreenshot.mutate(deleteId);
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
