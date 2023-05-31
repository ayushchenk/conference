import { CreateConferenceRequest } from "./CreateConferenceForm.types";
import { usePostApi } from "../../hooks/UsePostApi";
import { CreateResponse } from "../../types/ApiResponse";

export const usePostCreateConferenceApi = () => {
  return usePostApi<CreateConferenceRequest, CreateResponse>("/Conference");
};
