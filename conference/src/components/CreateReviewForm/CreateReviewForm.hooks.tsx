import { usePostApi } from "../../hooks/UsePostApi";
import { usePutApi } from "../../hooks/UsePutApi";
import { CreateResponseData } from "../../types/ApiResponse";
import { Review } from "../../types/Conference";
import { CreateReviewRequest } from "./CreateReviewForm.types";

export const usePostCreateReviewApi = (submissionId: number) => {
  return usePostApi<CreateReviewRequest, CreateResponseData>(`/Submission/${submissionId}/reviews`);
};

export const useUpdateReviewApi = () => {
  return usePutApi<CreateReviewRequest, Review>(`/Submission/reviews`);
};
