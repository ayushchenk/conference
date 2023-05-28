import { Conference } from "../../types/Conference";

export type GetConferencesResponse = {
  data: {
    items: Conference[];
  };
  isLoading: boolean;
  isError: boolean;
};
