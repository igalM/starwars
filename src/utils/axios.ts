import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../types";

export class Api {
    private api: AxiosInstance;

    private apiConfig: AxiosRequestConfig = {
        timeout: 15000,
        baseURL: process.env.REACT_APP_API_URI,
        headers: {
            common: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        },

    };

    constructor() {
        this.api = axios.create(this.apiConfig);
    }

    public get<T extends ApiResponse>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.get(url, config);
    }
}