import { GetSubmissionResponse } from "./SubmissionDetails.types";
import { useGetApi } from "../../hooks/UseGetApi";
import { Submission } from "../../types/Conference";

export const useGetSubmissionApi = (submissionId: number): GetSubmissionResponse => {
  return useGetApi<Submission>(`/Submission/${submissionId}`);
};
