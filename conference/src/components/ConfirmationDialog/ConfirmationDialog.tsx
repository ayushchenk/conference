import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { ConfirmationDialogProps } from "./ConfirmationDialog.types";

export const ConfirmationDialog = ({
  text,
  open,
  onConfirm,
  onCancel
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirmation required</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onCancel} autoFocus>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}