import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import ControlApi from "../api";

export default function Systems() {
    const api = new ControlApi();

    const allSystems = useQuery({
        queryKey: ["systems"],
        queryFn: api.getSystems,
    });

    const launchCore = useMutation({
        mutationFn: api.launchSystem,
    });

    return (
        <div>
            <List>
                {allSystems.data
                    ?.slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((system) => (
                        <ListItem
                            key={system.id}
                            secondaryAction={
                                <Button
                                    variant="text"
                                    onClick={() => launchCore.mutate(system.id)}
                                >Launch</Button>
                            }
                        >
                            <ListItemText primary={system.name} />
                        </ListItem>
                    ))}
            </List>
        </div>
    );
}
