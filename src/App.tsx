import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getActiveTheme } from "./lib/themes";

import Layout from "./components/Layout";

function App() {
    return (
        <ThemeProvider theme={createTheme(getActiveTheme().options)}>
            <Layout />
        </ThemeProvider>
    );
}

export default App;
