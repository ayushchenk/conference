import { usePostApi } from "../../hooks/UsePostApi"
import { JoinConferenceRequest } from "./JoinConferenceDialog.types";

export const useJoinConferenceApi = () => {
  return usePostApi<JoinConferenceRequest, {}>("/conference/join");
}