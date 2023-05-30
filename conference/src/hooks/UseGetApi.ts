import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "../types/GetResponse";

export function useGetApi<TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
    const [response, setResponse] = useState<ApiResponse<TData>>({
        data: null,
        isError: false,
        isLoading: true
    });

    useEffect(() => {
        axios
            .get<TData>(path, config)
            .then((response) => {
                setResponse({
                    data: response.data,
                    isError: false,
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.error(error);
                setResponse({
                    data: null,
                    isError: true,
                    isLoading: false,
                });
            });
    }, [path, config]);

    return response;
}