import { useCallback, useContext, useEffect, useState } from "react";
import { CreateCommentForm } from "../CreateCommentForm";
import { useGetSubmissionCommentsApi } from "./CommentSection.hooks";
import { CommentsList } from "./CommentsList";
import { Comment } from "../../types/Conference";
import { FormErrorAlert } from "../FormErrorAlert";
import { Typography } from "@mui/material";
import { SubmissionContext } from "../../contexts/SubmissionContext";

export const CommentSection = () => {
  const [rows, setRows] = useState<Comment[]>([]);
  const { submissionId } = useContext(SubmissionContext);

  const comments = useGetSubmissionCommentsApi(submissionId);

  useEffect(() => {
    if (comments.status === "success") {
      setRows(comments.data);
    }
  }, [comments]);

  const handleCreate = useCallback((comment: Comment) => {
    setRows(prevRows => [comment, ...prevRows]);
  }, []);

  const handleUpdate = useCallback((comment: Comment) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      const index = newRows.findIndex(c => c.id === comment.id);
      newRows[index] = comment;
      return newRows;
    });
  }, []);

  const handleDelete = useCallback((comment: Comment) => {
    setRows(prevRows => [...prevRows].filter(c => c.id !== comment.id));
  }, []);

  return (
    <>
      <Typography variant="body1">Leave a comment</Typography>
      <CreateCommentForm submissionId={submissionId} onCreate={handleCreate} />
      <CommentsList comments={rows} onUpdate={handleUpdate} onDelete={handleDelete} />
      <FormErrorAlert response={comments} />
    </>
  );
}