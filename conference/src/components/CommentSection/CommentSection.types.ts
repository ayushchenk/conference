import { Comment } from "../../types/Conference";

export type CommentsListProps = {
  comments: Comment[];
  onUpdate: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
}

export type UpdateCommentDialogProps = {
  open: boolean;
  comment: Comment | null;
  onClose: () => void;
  onUpdate: (comment: Comment) => void;
}