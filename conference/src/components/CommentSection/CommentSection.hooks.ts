import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi"
import { Comment } from "../../types/Conference";

export const useGetSubmissionCommentsApi = (submissionId: number) => {
  return useGetApi<Comment[]>(`/submission/${submissionId}/comments`);
}

export const useDeleteSubmissionCommentApi = () => {
  return useDeleteApi<{},{}>('/submission/comments/{0}');
}