export type Conference = {
  id: number;
  userid: number;
  title: string;
  keywords: string;
  abstract: string;
  createdon: Date;
  updatedon: Date;
  acronym: string;
  webpage: string;
  venue: string;
  city: string;
  startDate: Date;
  endDate: Date;
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
