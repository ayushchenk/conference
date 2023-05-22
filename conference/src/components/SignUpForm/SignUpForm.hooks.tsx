import axios from "axios";
import { useCallback, useState } from "react";
import { SignUpRequest, SignUpResponse } from "./SignUpForm.types";

export const usePostSignUpApi = () => {
    const [response, setResponse] = useState<SignUpResponse>({
        data: null,
        isError: false,
        isLoading: true
    });

    const post = useCallback((data: SignUpRequest) => {
        axios.post("/Account/Register", data)
            .then(response => {
                setResponse({
                    data: response.data,
                    isError: false,
                    isLoading: false
                });
            })
            .catch(error => {
                setResponse({
                    data: null,
                    isError: true,
                    isLoading: false
                });
            });

    }, []);

    return {data: response.data, isError: response.isError, isLoading: response.isLoading, post: post};
};