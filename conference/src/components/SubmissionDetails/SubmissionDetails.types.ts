import { PropsWithChildren } from "react";
import { ApiResponse } from "../../types/ApiResponse";
import { Review, Submission } from "../../types/Conference";

export type GetSubmissionResponse = ApiResponse<Submission>;

export interface TabPanelProps extends PropsWithChildren {
  value: string;
}

export type CreateReviewDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export type UpdateReviewDialogProps = {
  open: boolean;
  review: Review | null;
  onClose: () => void;
  onUpdate: (review: Review) => void;
};

export type SubmissionDetailsHeaderProps = {
  showEdit: boolean;
};

export type PreferenceCheckboxProps = {
  submissionId: number;
};
