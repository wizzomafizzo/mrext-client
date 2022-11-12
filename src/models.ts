export interface System {
    id: string;
    name: string;
}

export interface Game {
    name: string;
    system: System;
    path: string;
}

export interface SearchResults {
    data: Game[];
    total: number;
    pageSize: number;
    page: number;
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

export interface MusicServiceStatus {
    running: boolean;
    playing: boolean;
    playback: string;
    playlist: string;
    track: string;
}

export interface SearchServiceStatus {
    ready: boolean;
    indexing: boolean;
    totalSteps: number;
    currentStep: number;
    currentDesc: string;
}

export interface ServerStatus {
    online: boolean;
    searchService: SearchServiceStatus;
    musicService: MusicServiceStatus;
}
