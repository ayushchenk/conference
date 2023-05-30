import { Conference } from "../../types/Conference";

export type GetConferenceResponse = {
  data: Conference | null;
  isLoading: boolean;
  isError: boolean;
};
