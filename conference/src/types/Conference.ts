export type Conference = {
  id: number;
  userid: number;
  title: string;
  keywords: string;
  abstract: string;
  createdon: string;
  updatedon: string;
  acronym: string;
  webpage: string;
  venue: string;
  city: string;
  startDate: string;
  endDate: string;
  researchAreas: string[];
  areaNotes: string;
  organizer: string;
  organizerWebpage: string;
  contactPhoneNumber: string;
  isAnonymizedFileRequired: boolean;
};

export type Submission = {
  id: number;
  conferenceId: number;
  authorId: number;
  authoutEmail: string;
  authorName: string;
  status: number;
  statusLabel: string;
  title: string;
  keywords: string;
  abstract: string;
  isValidForReturn: boolean,
  isValidForUpdate: boolean
};

export type SubmissionPaper = {
  id: number;
  submissionId: number;
  fileName: string;
  base64Content: string;
  createdOn: string;
  typeLabel: string;
};
