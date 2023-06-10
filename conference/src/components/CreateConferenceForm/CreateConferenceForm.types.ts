export type CreateConferenceRequest = {
  title: string;
  acronym: string;
  organizer: string;
  startDate: string;
  endDate: string;
  keywords: string;
  abstract: string;
  webpage: string;
  venue: string;
  city: string;
  researchAreas: string[];
  areaNotes: string;
  organizerWebpage: string;
  contactPhoneNumber: string;
  isAnonymizedFileRequired: boolean;
};

export const initialValues: CreateConferenceRequest = {
  title: "",
  keywords: "",
  abstract: "",
  acronym: "",
  webpage: "",
  venue: "",
  city: "",
  startDate: String(new Date()),
  endDate: String(new Date()),
  researchAreas: [],
  areaNotes: "",
  organizer: "",
  organizerWebpage: "",
  contactPhoneNumber: "",
  isAnonymizedFileRequired: false
};
