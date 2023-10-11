import { usePostApi } from "../../hooks/UsePostApi"
import { AuthData } from "../../types/Auth";
import { JoinConferenceRequest } from "./JoinConferenceDialog.types";

export const useJoinConferenceApi = () => {
  return usePostApi<JoinConferenceRequest, AuthData>(import.meta.env.VITE_CONFERENCE_API_URL + "/conference/join");
}