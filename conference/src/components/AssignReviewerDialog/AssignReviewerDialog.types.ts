import { User } from "../../types/User";

export type AssignReviewerDialogProps = {
  show: boolean;
  submissionId: number;
  onDialogClose: () => void;
  onReviewerAdd: (user: User) => void;
}