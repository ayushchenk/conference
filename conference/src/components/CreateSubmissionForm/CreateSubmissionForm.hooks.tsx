import { usePostApi } from "../../hooks/UsePostApi";
import { CreateResponseData } from "../../types/ApiResponse";

export const usePostCreateSubmissionApi = () => {
  return usePostApi<FormData, CreateResponseData>("/Submission", {});
};
