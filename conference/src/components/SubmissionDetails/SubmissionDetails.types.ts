import { ApiResponse } from "../../types/ApiResponse";
import { Review, Submission } from "../../types/Conference";

export type GetSubmissionResponse = ApiResponse<Submission>;

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type CreateReviewDialogProps = {
  open: boolean;
  onClose: () => void;
};

export type UpdateReviewDialogProps = {
  open: boolean;
  review: Review | null;
  onClose: () => void;
  onUpdate: (review: Review) => void;
};
