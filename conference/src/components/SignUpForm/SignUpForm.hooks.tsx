import { SignUpRequest } from "./SignUpForm.types";
import { usePostApi } from "../../hooks/UsePostApi";
import { AuthData } from "../../types/Auth";

export const usePostSignUpApi = () => {
    return usePostApi<SignUpRequest, AuthData>(import.meta.env.VITE_USER_API_URL + "/user/register");
};