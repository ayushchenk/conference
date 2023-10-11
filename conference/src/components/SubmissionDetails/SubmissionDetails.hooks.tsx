import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi";
import { usePostApi } from "../../hooks/UsePostApi";
import { BooleanResponse } from "../../types/ApiResponse";
import { Review, Submission, SubmissionPaper } from "../../types/Conference";
import { GetSubmissionResponse } from "./SubmissionDetails.types";

export const useGetSubmissionApi = (submissionId: number): GetSubmissionResponse => {
  return useGetApi<Submission>(import.meta.env.VITE_SUBMISSION_API_URL + `/Submission/${submissionId}`);
};

export const useGetSubmissionPapersApi = (submissionId: number) => {
  return useGetApi<SubmissionPaper[]>(import.meta.env.VITE_SUBMISSION_API_URL + `/Submission/${submissionId}/papers`);
};

export const useGetReviewsApi = (submissionId: number) => {
  return useGetApi<Review[]>(import.meta.env.VITE_SUBMISSION_API_URL + `/Submission/${submissionId}/reviews`);
};

export const usePostReturnSubmissionApi = (submissionId: number) => {
  return usePostApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/Submission/${submissionId}/return`);
};

export const useAcceptSubmissionApi = (submissionId: number) => {
  return usePostApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/Submission/${submissionId}/accept`);
};

export const useAcceptSuggestionsSubmissionApi = (submissionId: number) => {
  return usePostApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/Submission/${submissionId}/accept-with-suggestions`);
};

export const useRejectSubmissionApi = (submissionId: number) => {
  return usePostApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/Submission/${submissionId}/reject`);
};

export const useGetHasPreferenceApi = (submissionId: number) => {
  return useGetApi<BooleanResponse>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/${submissionId}/has-preference`);
};

export const useAddSubmissionPreferenceApi = (submissionId: number) => {
  return usePostApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/${submissionId}/preferences`);
};

export const useRemoveSubmissionPreferenceApi = (submissionId: number) => {
  return useDeleteApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/${submissionId}/preferences`);
};

export const useDownloadPaperApi = () => {
  return usePostApi<{}, Blob>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/papers/{0}/download`, {
    responseType: "blob"
  });
};
