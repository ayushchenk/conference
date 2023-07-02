import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi";
import { usePostApi } from "../../hooks/UsePostApi";
import { BooleanResponse } from "../../types/ApiResponse";
import { Review, Submission, SubmissionPaper } from "../../types/Conference";
import { GetSubmissionResponse } from "./SubmissionDetails.types";

export const useGetSubmissionApi = (submissionId: number): GetSubmissionResponse => {
  return useGetApi<Submission>(`/Submission/${submissionId}`);
};

export const useGetSubmissionPapersApi = (submissionId: number) => {
  return useGetApi<SubmissionPaper[]>(`/Submission/${submissionId}/papers`);
};

export const useGetReviewsApi = (submissionId: number) => {
  return useGetApi<Review[]>(`/Submission/${submissionId}/reviews`);
};

export const usePostReturnSubmissionAPI = (submissionId: number) => {
  return usePostApi<{}, {}>(`/Submission/${submissionId}/return`);
};

export const useGetHasPreferenceApi = (submissionId: number) => {
  return useGetApi<BooleanResponse>(`/submission/${submissionId}/has-preference`);
};

export const useAddSubmissionPreferenceApi = (submissionId: number) => {
  return usePostApi<{}, {}>(`/submission/${submissionId}/preferences`);
};

export const useRemoveSubmissionPreferenceApi = (submissionId: number) => {
  return useDeleteApi<{}, {}>(`/submission/${submissionId}/preferences`);
};
