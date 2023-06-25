import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from "@mui/material";
import { UpdateCommentDialogProps } from "./CommentSection.types";
import { CreateCommentForm } from "../CreateCommentForm";
import { useCallback } from "react";
import { Comment } from "../../types/Conference";

export const UpdateCommentDialog = ({
  open,
  comment,
  onClose,
  onUpdate
}: UpdateCommentDialogProps) => {
  const handleSuccess = useCallback((comment: Comment) => {
    onUpdate(comment);
    onClose();
  }, [onUpdate, onClose]);

  if (!comment) {
    return null;
  }

  return (
    <Dialog maxWidth="xl" open={open} onClose={onClose}>
      <DialogTitle>Update a comment</DialogTitle>
      <DialogContent>
        <CreateCommentForm comment={comment} submissionId={comment.submissionId} onCreate={handleSuccess} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}