import { DialogProps } from "@mui/material";

export interface JoinConferenceDialogProps extends DialogProps {
  onSuccess: () => void;
}

export type JoinConferenceRequest = {
  code: string;
}

export const initialValues: JoinConferenceRequest = {
  code: ""
}