import { LoginRequest } from "./LoginForm.types";
import { AuthData } from "../../types/Auth";
import { usePostApi } from "../../hooks/UsePostApi";

export const usePostLoginApi = () => {
    return usePostApi<LoginRequest, AuthData>("/user/login");
};