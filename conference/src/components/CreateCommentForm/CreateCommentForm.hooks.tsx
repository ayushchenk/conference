import { usePostApi } from "../../hooks/UsePostApi";
import { Comment } from "../../types/Conference";
import { CreateCommentRequest } from "./CreateCommentForm.types";

export const usePostSubmissionCommentApi = (submissionId: number) => {
  return usePostApi<CreateCommentRequest, Comment>(`/submission/${submissionId}/comments`);
}