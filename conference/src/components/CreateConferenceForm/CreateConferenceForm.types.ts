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

export const initialValues: CreateConferenceRequest = {
  title: "",
  keywords: "",
  abstract: "",
  acronym: "",
  webpage: "",
  venue: "",
  city: "",
  startDate: new Date(),
  endDate: new Date(),
  primaryResearchArea: "",
  secondaryResearchArea: "",
  areaNotes: "",
  organizer: "",
  organizerWebpage: "",
  contactPhoneNumber: "",
};