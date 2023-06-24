import { ApiResponse } from "../../types/ApiResponse";
import { Submission } from "../../types/Conference";

export type GetSubmissionResponse = ApiResponse<Submission>;

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type SubmissionDetailsHeaderProps = {
  showEdit: boolean
}

export type PreferenceCheckboxProps = {
  submissionId: number;
}