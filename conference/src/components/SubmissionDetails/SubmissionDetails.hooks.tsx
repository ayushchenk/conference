import { useGetApi } from "../../hooks/UseGetApi";
import { usePostApi } from "../../hooks/UsePostApi";
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
