import { usePostApi } from "../../hooks/UsePostApi";

export const useUploadPresentationApi = (submissionId: number) => {
  return usePostApi<FormData, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/Submission/${submissionId}/papers/presentation`);
};