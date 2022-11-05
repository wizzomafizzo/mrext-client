import axios from "axios";

import { Screenshot, System } from "./models";

export default class ControlApi {
    constructor() {
        axios.defaults.baseURL = "http://10.0.0.210:8000"
    }

    async getScreenshots(): Promise<Screenshot[]> {
        return (await axios.get<Screenshot[]>(`/screenshots`)).data;
    }

    async takeScreenshot(): Promise<Screenshot> {
        return (await axios.post<Screenshot>(`/screenshots`)).data;
    }

    async deleteScreenshot(path: string): Promise<void> {
        await axios.delete(`/screenshots/${path}`);
    }

    async getSystems(): Promise<System[]> {
        return (await axios.get<System[]>(`/systems`)).data;
    }

    async launchSystem(id: string): Promise<void> {
        await axios.post(`/systems/${id}`);
    }
}
