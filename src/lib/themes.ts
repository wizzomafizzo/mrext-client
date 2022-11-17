import { ThemeOptions } from "@mui/material";

interface ThemeDefinition {
    id: string;
    displayName: string;
    options: ThemeOptions;
}

export const themes: { [id: string]: ThemeDefinition } = {
    tron: {
        id: "tron",
        displayName: "Tron",
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
    mister: {
        id: "mister",
        displayName: "MiSTer",
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

export function getTheme(id: string): ThemeDefinition {
    if (themes[id]) {
        return themes[id];
    } else {
        return themes.mister;
    }
}
