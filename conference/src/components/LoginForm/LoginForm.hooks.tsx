import axios from "axios";
import { useCallback, useState } from "react";
import { LoginRequest } from "./LoginForm.types";
import { AuthResponse } from "../../types/Auth";

export const usePostLoginApi = () => {
    const [response, setResponse] = useState<AuthResponse>({
        data: null,
        isError: false,
        isLoading: true
    });

    const post = useCallback((data: LoginRequest) => {
        axios.post("/Account/Login", data)
            .then(response => {
                setResponse({
                    data: response.data,
                    isError: false,
                    isLoading: false
                });
            })
            .catch(error => {
                console.error(error);
                setResponse({
                    data: null,
                    isError: true,
                    isLoading: false
                });
            });

    }, []);

    return {data: response.data, isError: response.isError, isLoading: response.isLoading, post: post};
};