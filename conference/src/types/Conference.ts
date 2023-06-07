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
  primaryResearchArea: string;
  secondaryResearchArea: string;
  areaNotes: string;
  organizer: string;
  organizerWebpage: string;
  contactPhoneNumber: string;
};

export type Submission = {
  id: number;
  conferenceId: number;
  authorId: number;
  authoutEmail: string | null;
  authorName: string | null;
  status: number;
  statusLabel: string | null;
  title: string | null;
  keywords: string | null;
  abstract: string | null;
};

export type SubmissionPaper = {
  id: number;
  submissionId: number;
  fileName: string;
  base64Content: string;
};
