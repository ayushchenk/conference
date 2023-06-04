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
  primaryResearchArea: string;
  secondaryResearchArea: string;
  areaNotes: string;
  organizerWebpage: string;
  contactPhoneNumber: string;
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
  primaryResearchArea: "",
  secondaryResearchArea: "",
  areaNotes: "",
  organizer: "",
  organizerWebpage: "",
  contactPhoneNumber: "",
};
