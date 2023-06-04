import { Conference } from "../../types/Conference";
import { ApiResponse } from "../../types/ApiResponse";

export type GetConferenceResponse = ApiResponse<Conference>;

export type UpdateConferenceRequest = {
  id: number | null;
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
