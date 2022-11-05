export interface System {
    id: string;
    name: string;
}

export interface Game {
    name: string;
    system: string;
    path: string;
}

export interface Screenshot {
    filename: string;
    path: string;
    core: string;
    modified: string;
    game: string;
}