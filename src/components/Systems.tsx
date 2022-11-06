import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import Button from "@mui/material/Button";

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
                {/* <ListItem
                    key="menu"
                    secondaryAction={
                        <Button
                            variant="text"
                            onClick={() => launchCore.mutate("menu")}
                        >
                            Launch
                        </Button>
                    }
                >
                    <ListItemText primary="Menu" />
                </ListItem> */}
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
                                >
                                    Launch
                                </Button>
                            }
                        >
                            <ListItemText primary={system.name} />
                        </ListItem>
                    ))}
            </List>
        </div>
    );
}
