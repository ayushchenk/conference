import { User } from "../../types/User";

export type AssignReviewerDialogProps = {
  show: boolean;
  reviewers: User[];
  onDialogClose: () => void;
  onReviewerAdd: (user: User) => void;
}