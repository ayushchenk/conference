import { SignUpRequest } from "./SignUpForm.types";
import { usePostApi } from "../../hooks/UsePostApi";
import { AuthData } from "../../types/Auth";

export const usePostSignUpApi = () => {
    return usePostApi<SignUpRequest, AuthData>("/user/register");
};