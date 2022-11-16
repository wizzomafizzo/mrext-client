import React from "react";

import { useQuery } from "@tanstack/react-query";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getActiveTheme } from "./lib/themes";

import Layout from "./components/Layout";

import ControlApi from "./lib/api";

function App() {
    const api = new ControlApi();

    const serverStatus = useQuery({
        queryKey: ["server"],
        queryFn: api.serverStatus,
        refetchInterval: 500,
        // refetchIntervalInBackground: true,
    });

    return (
        <ThemeProvider theme={createTheme(getActiveTheme().options)}>
            <Layout serverStatus={serverStatus} />
        </ThemeProvider>
    );
}

export default App;
