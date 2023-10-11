import { usePostApi } from "../../hooks/UsePostApi";
import { usePutApi } from "../../hooks/UsePutApi";
import { CreateResponseData } from "../../types/ApiResponse";
import { Submission } from "../../types/Conference";

export const usePostCreateSubmissionApi = () => {
  return usePostApi<FormData, CreateResponseData>(import.meta.env.VITE_SUBMISSION_API_URL + "/Submission");
};

export const useUpdateSubmissionApi = () => {
  return usePutApi<FormData, Submission>(import.meta.env.VITE_SUBMISSION_API_URL + "/Submission");
};
