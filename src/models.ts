export interface System {
    id: string;
    name: string;
}

export interface Game {
    name: string;
    system: System;
    path: string;
}

export interface Screenshot {
    filename: string;
    path: string;
    core: string;
    modified: string;
    game: string;
}

export interface Wallpaper {
    filename: string;
    name: string;
    width: number;
    height: number;
    active: boolean;
}

export interface MusicState {
    playing: boolean;
    playback: string;
    playlist: string;
    track: string;
}