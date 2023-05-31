import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "../types/ApiResponse";

export function useGetApi<TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
    const [response, setResponse] = useState<ApiResponse<TData>>({
        data: null,
        isError: false,
        isLoading: true,
        error: null
    });

    useEffect(() => {
        axios
            .get<TData>(path, config)
            .then((response) => {
                setResponse({
                    data: response.data,
                    isError: false,
                    isLoading: false,
                    error: null
                });
            })
            .catch((error) => {
                console.error(error);
                setResponse({
                    data: null,
                    isError: true,
                    isLoading: false,
                    error: error.response.data
                });
            });
    }, [path, config]);

    return response;
}