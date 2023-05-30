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

export type ConferenceResponse = {
  id: number;
};
