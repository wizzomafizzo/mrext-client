import React from "react";

import { useQuery } from "@tanstack/react-query";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import Layout from "./components/Layout";

import ControlApi from "./api";

const theme = createTheme({
    palette: {
        background: {
            default: "#E6D0BB",
        },
        primary: {
            main: "#2A0000",
        },
        secondary: {
            main: green[500],
        },
    },
});

function App() {
    const api = new ControlApi();

    const serverStatus = useQuery({
        queryKey: ["server"],
        queryFn: api.serverStatus,
        refetchInterval: 500,
        // refetchIntervalInBackground: true,
    });

    return (
        <ThemeProvider theme={theme}>
            <Layout serverStatus={serverStatus} />
        </ThemeProvider>
    );
}

export default App;
