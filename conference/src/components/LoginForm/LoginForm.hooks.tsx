import { LoginRequest } from "./LoginForm.types";
import { AuthData } from "../../types/Auth";
import { usePostApi } from "../../hooks/UsePostApi";

export const usePostLoginApi = () => {
    return usePostApi<LoginRequest, AuthData>(import.meta.env.VITE_USER_API_URL + "/user/login");
};