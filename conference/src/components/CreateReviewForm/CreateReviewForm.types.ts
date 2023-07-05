export type CreateReviewRequest = {
  evaluation: string;
  score: number;
  confidence?: number;
};

export const initialValues: CreateReviewRequest = {
  evaluation: "",
  score: 0
};
