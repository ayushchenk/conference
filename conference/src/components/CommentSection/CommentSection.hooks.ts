import { useGetApi } from "../../hooks/UseGetApi"
import { Comment } from "../../types/Conference";

export const useGetSubmissionCommentsApi = (submissionId: number) => {
  return useGetApi<Comment[]>(`/submission/${submissionId}/comments`);
}