import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { ConfirmationDialogProps } from "./ConfirmationDialog.types";

export const ConfirmationDialog = ({
  title,
  children,
  open,
  onConfirm,
  onCancel
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title ?? "Confirmation required"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onCancel} autoFocus>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}