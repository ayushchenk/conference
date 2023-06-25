import { Comment } from "../../types/Conference";

export type CommentSectionProps = {
  submissionId: number;
}

export type CommentsListProps = {
  comments: Comment[];
  onUpdate: (comment: Comment) => void;
}

export type UpdateCommentDialogProps = {
  open: boolean;
  comment: Comment | null;
  onClose: () => void;
  onUpdate: (comment: Comment) => void;
}