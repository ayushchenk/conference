export interface JoinConferenceDialogProps {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export type JoinConferenceRequest = {
  code: string;
}

export const initialValues: JoinConferenceRequest = {
  code: ""
}