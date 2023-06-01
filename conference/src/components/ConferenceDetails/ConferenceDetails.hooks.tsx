import { GetConferenceResponse } from "./ConferenceDetails.types";
import { useGetApi } from "../../hooks/UseGetApi";
import { Conference } from "../../types/Conference";

export const useGetConferenceApi = (conferenceId: number): GetConferenceResponse => {
  return useGetApi<Conference>(`/Conference/${conferenceId}`);
};
