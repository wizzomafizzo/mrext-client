import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import Layout from "./components/Layout";

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
    return (
        <ThemeProvider theme={theme}>
            <Layout />
        </ThemeProvider>
    );
}

export default App;
