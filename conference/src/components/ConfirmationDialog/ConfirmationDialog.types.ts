import { PropsWithChildren, ReactNode } from "react";

export interface ConfirmationDialogProps extends PropsWithChildren {
  title?: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}