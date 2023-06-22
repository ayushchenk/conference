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
  isParticipant: boolean;
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
  isValidForReturn: boolean;
  isValidForUpdate: boolean;
  isReviewer: boolean;
};

export type SubmissionPaper = {
  id: number;
  submissionId: number;
  fileName: string;
  base64Content: string;
  createdOn: string;
  typeLabel: string;
};

export type Review = {
  id: number;
  submissionId: number;
  reviewerId: number;
  reviewerEmail: string;
  reviewerName: string;
  score: number;
  evaluation: string;
  confidence: number;
  confidenceLabel: string;
  isAuthor: boolean;
};

export type InviteCode = {
  code: string;
  role: string;
};
