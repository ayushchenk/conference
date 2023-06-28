import { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Review } from "../../types/Conference";
import { CreateReviewForm } from "../CreateReviewForm";
import { UpdateReviewDialogProps } from "./SubmissionDetails.types";

export const UpdateReviewDialog = ({ open, review, onClose, onUpdate }: UpdateReviewDialogProps) => {
  const handleUpdate = useCallback(
    (review: Review) => {
      onUpdate(review);
    },
    [onUpdate]
  );

  const handleSuccess = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!review) {
    return null;
  }

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Update a review</DialogTitle>
      <DialogContent>
        <CreateReviewForm review={review} onSuccess={handleSuccess} onUpdate={handleUpdate} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
