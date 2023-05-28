import { ConferenceResponse } from "../../types/Conference";

export type CreateConferenceRequest = {
  title: string;
  acronym: string;
  organizer: string;
  startDate: Date;
  endDate: Date;
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

export type CreateConferenceResponse = {
  data: ConferenceResponse | null;
  isError: boolean;
  isLoading: boolean;
};
