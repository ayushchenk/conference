import { Comment } from "../../types/Conference";

export type CreateCommentFormProps = {
  submissionId: number;
  comment?: Comment;
  onCreate: (comment: Comment) => void;
}

export type CreateCommentRequest = {
  text: string;
}

export type UpdateCommentRequest = {
  id: number;
  text: string;
}

export const initialValues: CreateCommentRequest = {
  text: ""
}