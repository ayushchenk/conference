import { Comment } from "../../types/Conference";

export type NewCommentFormProps = {
  submissionId: number;
  onCreate: (comment: Comment) => void;
}

export type CreateCommentRequest = {
  text: string;
}

export const initialValues: CreateCommentRequest = {
  text: ""
}