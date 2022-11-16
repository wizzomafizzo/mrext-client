import { ThemeOptions } from "@mui/material";

interface ThemeDefinition {
    id: string;
    displayName: string;
    options: ThemeOptions;
}

export const themes: { [id: string]: ThemeDefinition } = {
    brown: {
        id: "brown",
        displayName: "MiSTer Brown",
        options: {
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
        },
    },
    tron303: {
        id: "tron303",
        displayName: "Tron303",
        options: {
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
        },
    },
    birdybro: {
        id: "birdybro",
        displayName: "birdybro",
        options: {
            palette: {
                mode: "dark",
                background: {
                    default: "#282a36",
                },
                primary: {
                    main: "#9c5cf7",
                    contrastText: "#fff",
                },
                secondary: {
                    main: "#514689",
                },
                text: {
                    primary: "#fff",
                }
            },
        },
    }
};

export function getActiveTheme(): ThemeDefinition {
    const activeTheme = localStorage.getItem("theme");
    if (activeTheme && themes[activeTheme]) {
        return themes[activeTheme];
    }
    return themes.birdybro;
}
