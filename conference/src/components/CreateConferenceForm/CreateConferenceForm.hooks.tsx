import { CreateConferenceRequest, CreateConferenceResponse } from "./CreateConferenceForm.types";
import { usePostApi } from "../../hooks/UsePostApi";

export const usePostCreateConferenceApi = () => {
  return usePostApi<CreateConferenceRequest, CreateConferenceResponse>("/Conference");
};
