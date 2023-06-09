import { usePostApi } from "../../hooks/UsePostApi";
import { usePutApi } from "../../hooks/UsePutApi";
import { CreateResponseData } from "../../types/ApiResponse";
import { Submission } from "../../types/Conference";

export const usePostCreateSubmissionApi = () => {
  return usePostApi<FormData, CreateResponseData>("/Submission");
};

export const useUpdateSubmissionApi = () => {
  return usePutApi<FormData, Submission>("/Submission");
};
