import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./lib/themes";

import Layout from "./components/Layout";
import { useUIStateStore } from "./lib/store";

function App() {
    const activeTheme = useUIStateStore((state) => state.activeTheme);

    return (
        <ThemeProvider theme={createTheme(getTheme(activeTheme).options)}>
            <Layout />
        </ThemeProvider>
    );
}

export default App;
