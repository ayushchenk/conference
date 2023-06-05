import { GetConferenceResponse, UpdateConferenceRequest } from "./ConferenceDetails.types";
import { useGetApi } from "../../hooks/UseGetApi";
import { Conference } from "../../types/Conference";
import { usePutApi } from "../../hooks/UsePutApi";

export const useGetConferenceApi = (conferenceId: number): GetConferenceResponse => {
  return useGetApi<Conference>(`/Conference/${conferenceId}`);
};

export const useUpdateConferenceApi = () => {
  return usePutApi<UpdateConferenceRequest, Conference>(`/Conference`);
};
