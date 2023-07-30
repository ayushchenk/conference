import { usePostApi } from "../../hooks/UsePostApi";

export const useUploadPresentationApi = (submissionId: number) => {
  return usePostApi<FormData, {}>(`/Submission/${submissionId}/papers/presentation`);
};