import { useDeleteApi } from "../../hooks/UseDeleteApi";
import { useGetApi } from "../../hooks/UseGetApi"
import { Comment } from "../../types/Conference";

export const useGetSubmissionCommentsApi = (submissionId: number) => {
  return useGetApi<Comment[]>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/${submissionId}/comments`);
}

export const useDeleteSubmissionCommentApi = () => {
  return useDeleteApi<{}, {}>(import.meta.env.VITE_SUBMISSION_API_URL + '/submission/comments/{0}');
}