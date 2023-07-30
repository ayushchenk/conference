export type UploadPresentationDialogProps = {
  open: boolean;
  onClose: () => void;
}

export type UploadPresentationRequest = {
  file?: File;
}