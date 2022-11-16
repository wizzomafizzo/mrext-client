import React from "react";

import { useQuery } from "@tanstack/react-query";

import { ThemeProvider } from "@mui/material/styles";
import { themes, getActiveTheme } from "./components/themes";

import Layout from "./components/Layout";

import ControlApi from "./api";

function App() {
    const api = new ControlApi();

    const serverStatus = useQuery({
        queryKey: ["server"],
        queryFn: api.serverStatus,
        refetchInterval: 500,
        // refetchIntervalInBackground: true,
    });

    const activeTheme = getActiveTheme();

    return (
        <ThemeProvider theme={activeTheme.theme}>
            <Layout serverStatus={serverStatus} />
        </ThemeProvider>
    );
}

export default App;
