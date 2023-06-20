import { usePostApi } from "../../hooks/UsePostApi"
import { AuthData } from "../../types/Auth";
import { JoinConferenceRequest } from "./JoinConferenceDialog.types";

export const useJoinConferenceApi = () => {
  return usePostApi<JoinConferenceRequest, AuthData>("/conference/join");
}