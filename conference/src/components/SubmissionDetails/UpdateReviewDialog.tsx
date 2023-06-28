import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CreateReviewForm } from "../CreateReviewForm";
import { UpdateReviewDialogProps } from "./SubmissionDetails.types";

export const UpdateReviewDialog = ({ open, review, onClose, onUpdate }: UpdateReviewDialogProps) => {
  if (!review) {
    return null;
  }

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Update a review</DialogTitle>
      <DialogContent>
        <CreateReviewForm review={review} onSuccess={onClose} onUpdate={onUpdate} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
