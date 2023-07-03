import { createContext } from "react";

export type SubmissionContextType = {
  submissionId: number;
  isClosed: boolean;
}

const defaultValue: SubmissionContextType = {
  submissionId: 0,
  isClosed: true
}

export const SubmissionContext = createContext<SubmissionContextType>(defaultValue);