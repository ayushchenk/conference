import { GetSubmissionResponse } from "./SubmissionDetails.types";
import { useGetApi } from "../../hooks/UseGetApi";
import { Submission, SubmissionPaper } from "../../types/Conference";

export const useGetSubmissionApi = (submissionId: number): GetSubmissionResponse => {
  return useGetApi<Submission>(`/Submission/${submissionId}`);
};

export const useGetSubmissionPapersApi = (submissionId: number) => {
  return useGetApi<SubmissionPaper[]>(`/Submission/${submissionId}/papers`);
};
