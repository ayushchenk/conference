import { usePostApi } from "../../hooks/UsePostApi";
import { usePutApi } from "../../hooks/UsePutApi";
import { Comment } from "../../types/Conference";
import { CreateCommentRequest, UpdateCommentRequest } from "./CreateCommentForm.types";

export const useCreateSubmissionCommentApi = (submissionId: number) => {
  return usePostApi<CreateCommentRequest, Comment>(`/submission/${submissionId}/comments`);
}

export const useUpdateSubmissionCommentApi = () => {
  return usePutApi<UpdateCommentRequest, Comment>(`/submission/comments`);
}