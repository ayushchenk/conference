export type CreateSubmissionRequest = {
  conferenceId: string;
  title: string;
  keywords: string;
  abstract: string;
  file: File | null;
};

export const initialValues: CreateSubmissionRequest = {
  conferenceId: "",
  title: "",
  keywords: "",
  abstract: "",
  file: null,
};
