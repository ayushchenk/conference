export type CreateSubmissionRequest = {
  conferenceId: number;
  title: string;
  keywords: string;
  researchAreas: string[];
  abstract: string;
  mainFile?: File;
  presentationFile?: File;
  anonymizedFile?: File;
  otherFiles?: File[];
};

export const initialValues: CreateSubmissionRequest = {
  conferenceId: 0,
  title: "",
  keywords: "",
  researchAreas: [],
  abstract: ""
};
