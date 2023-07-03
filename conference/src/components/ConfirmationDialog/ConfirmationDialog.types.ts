export type ConfirmationDialogProps = {
  text: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void; 
}