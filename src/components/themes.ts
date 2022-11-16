import { createTheme, Theme } from "@mui/material";

interface ThemeDefinition {
    id: string;
    displayName: string;
    theme: Theme;
}

export const themes: { [id: string]: ThemeDefinition } = {
    default: {
        id: "default",
        displayName: "Default",
        theme: createTheme({
            palette: {
                background: {
                    default: "#e6d0bb",
                },
                primary: {
                    main: "#2a0000",
                },
                secondary: {
                    main: "#2a0000",
                },
            },
        }),
    },
    tron303: {
        id: "tron303",
        displayName: "Tron303",
        theme: createTheme({
            palette: {
                mode: "dark",
                primary: {
                    main: "#13e8ec",
                },
                secondary: {
                    main: "#13e8ec",
                },
                text: {
                    primary: "#13e8ec",
                    secondary: "#0a6b6d",
                }
            },
        }),
    },
    birdybro: {
        id: "birdybro",
        displayName: "birdybro",
        theme: createTheme({
            palette: {
                mode: "dark",
                background: {
                    default: "#282a36",
                },
                primary: {
                    main: "#a7a4e0",
                    contrastText: "#fff",
                },
                secondary: {
                    main: "#514689",
                },
                text: {
                    primary: "#fff",
                }
            },
        }),
    }
};

export function getActiveTheme(): ThemeDefinition {
    const activeTheme = localStorage.getItem("theme");
    if (activeTheme && themes[activeTheme]) {
        return themes[activeTheme];
    }
    return themes.default;
}
