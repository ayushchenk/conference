import { Comment } from "../../types/Conference";

export type CommentSectionProps = {
  submissionId: number;
}

export type CommentsListProps = {
  comments: Comment[];
}