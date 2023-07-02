import { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CreateReviewForm } from "../CreateReviewForm";
import { CreateReviewDialogProps } from "./SubmissionDetails.types";

export const CreateReviewDialog = ({ open, onClose }: CreateReviewDialogProps) => {
  const handleSuccess = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Write a review</DialogTitle>
      <DialogContent>
        <CreateReviewForm onSuccess={handleSuccess} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
