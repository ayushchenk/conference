import { useCallback, useEffect, useState } from "react";
import { CreateCommentForm } from "../CreateCommentForm";
import { CommentSectionProps } from "./CommentSection.types";
import { useGetSubmissionCommentsApi } from "./CommentSection.hooks";
import { CommentsList } from "./CommentsList";
import { Comment } from "../../types/Conference";
import { FormErrorAlert } from "../FormErrorAlert";

export const CommentSection = ({ submissionId }: CommentSectionProps) => {
  const [rows, setRows] = useState<Comment[]>([]);

  const comments = useGetSubmissionCommentsApi(submissionId);

  useEffect(() => {
    if (comments.status === "success") {
      setRows(comments.data);
    }
  }, [comments]);

  const handleCreate = useCallback((comment: Comment) => {
    setRows(prevRows => [comment, ...prevRows]);
  }, []);

  return (
    <>
      <CreateCommentForm submissionId={submissionId} onCreate={handleCreate} />
      <CommentsList comments={rows} />
      <FormErrorAlert response={comments} />
    </>
  );
}