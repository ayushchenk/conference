import { usePostApi } from "../../hooks/UsePostApi";
import { usePutApi } from "../../hooks/UsePutApi";
import { Comment } from "../../types/Conference";
import { CreateCommentRequest, UpdateCommentRequest } from "./CreateCommentForm.types";

export const useCreateSubmissionCommentApi = (submissionId: number) => {
  return usePostApi<CreateCommentRequest, Comment>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/${submissionId}/comments`);
}

export const useUpdateSubmissionCommentApi = () => {
  return usePutApi<UpdateCommentRequest, Comment>(import.meta.env.VITE_SUBMISSION_API_URL + `/submission/comments`);
}