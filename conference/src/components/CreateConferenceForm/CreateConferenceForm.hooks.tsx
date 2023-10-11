import { CreateConferenceRequest } from "./CreateConferenceForm.types";
import { usePostApi } from "../../hooks/UsePostApi";
import { CreateResponseData } from "../../types/ApiResponse";

export const usePostCreateConferenceApi = () => {
  return usePostApi<CreateConferenceRequest, CreateResponseData>(import.meta.env.VITE_CONFERENCE_API_URL + "/Conference");
};
