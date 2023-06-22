import { usePostApi } from "../../hooks/UsePostApi";
import { CreateResponseData } from "../../types/ApiResponse";
import { CreateReviewRequest } from "./CreateReviewForm.types";

export const usePostCreateReviewApi = (submissionId: number) => {
  return usePostApi<CreateReviewRequest, CreateResponseData>(`/Submission/${submissionId}/reviews`);
};
