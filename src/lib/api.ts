import axios from "axios";

import {
  IndexedSystems,
  Screenshot,
  SearchResults,
  ServerStatus,
  System,
  Wallpaper,
} from "./models";

export type KeyboardCodes =
  | "up"
  | "down"
  | "left"
  | "right"
  | "volume_up"
  | "volume_down"
  | "volume_mute"
  | "menu"
  | "back"
  | "confirm"
  | "cancel"
  | "osd"
  | "screenshot"
  | "raw_screenshot"
  | "pair_bluetooth"
  | "change_background"
  | "core_select"
  | "user"
  | "reset"
  | "toggle_core_dates"
  | "console"
  | "computer_osd";

export default class ControlApi {
  apiUrl: string;

  constructor() {
    let apiUrl = localStorage.getItem("api");

    if (apiUrl) {
      axios.defaults.baseURL = apiUrl;
      this.apiUrl = apiUrl;
    } else {
      axios.defaults.baseURL = "/api";
      this.apiUrl = "/api";
    }
  }

  async serverStatus(): Promise<ServerStatus> {
    return (await axios.get<ServerStatus>(`/server`)).data;
  }

  // screenshots

  async getScreenshots(): Promise<Screenshot[]> {
    return (await axios.get<Screenshot[]>(`/screenshots`)).data;
  }

  getScreenshotUrl(path: string): string {
    return `${this.apiUrl}/screenshots/${path}`;
  }

  async takeScreenshot(): Promise<Screenshot> {
    return (await axios.post<Screenshot>(`/screenshots`)).data;
  }

  async deleteScreenshot(path: string): Promise<void> {
    await axios.delete(`/screenshots/${path}`);
  }

  // systems

  async getSystems(): Promise<System[]> {
    return (await axios.get<System[]>(`/systems`)).data;
  }

  async launchSystem(id: string): Promise<void> {
    await axios.post(`/systems/${id}`);
  }

  // wallpaper

  async getWallpapers(): Promise<Wallpaper[]> {
    return (await axios.get<Wallpaper[]>(`/wallpapers`)).data;
  }

  getWallpaperUrl(filename: string): string {
    return `${this.apiUrl}/wallpapers/${filename}`;
  }

  async setWallpaper(filename: string): Promise<void> {
    await axios.post(`/wallpapers/${filename}`);
  }

  async deleteWallpaper(filename: string): Promise<void> {
    await axios.delete(`/wallpapers/${filename}`);
  }

  // music

  async playMusic(): Promise<void> {
    await axios.post(`/music/play`);
  }

  async stopMusic(): Promise<void> {
    await axios.post(`/music/stop`);
  }

  async nextMusic(): Promise<void> {
    await axios.post(`/music/next`);
  }

  async setMusicPlayback(playback: string): Promise<void> {
    await axios.post(`/music/playback/${playback}`);
  }

  async setMusicPlaylist(playlist: string): Promise<void> {
    await axios.post(`/music/playlist/${playlist}`);
  }

  async getMusicPlaylists(): Promise<string[]> {
    return (await axios.get<string[]>(`/music/playlist`)).data;
  }

  // games

  async searchGames(data: {
    query: string;
    system: string;
  }): Promise<SearchResults> {
    return (await axios.post<SearchResults>(`/games/search`, data)).data;
  }

  async launchGame(path: string): Promise<void> {
    await axios.post(`/games/launch`, { path });
  }

  async startSearchIndex(): Promise<void> {
    await axios.post(`/games/index`);
  }

  async indexedSystems(): Promise<IndexedSystems> {
    return (await axios.get<IndexedSystems>(`/games/search/systems`)).data;
  }

  // control

  async sendKeyboard(key: KeyboardCodes) {
    await axios.post(`/controls/keyboard/${key}`);
  }

  async sendRawKeyboard(key: number) {
    await axios.post(`/controls/keyboard_raw/${key}`);
  }
}
