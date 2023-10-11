import { GetConferenceResponse, RefreshInviteCodeRequest } from "./ConferenceDetails.types";
import { useGetApi } from "../../hooks/UseGetApi";
import { Conference, InviteCode } from "../../types/Conference";
import { usePutApi } from "../../hooks/UsePutApi";
import { UpdateConferenceRequest } from "../CreateConferenceForm/CreateConferenceForm.types";
import { usePostApi } from "../../hooks/UsePostApi";

export const useGetConferenceApi = (conferenceId: number): GetConferenceResponse => {
  return useGetApi<Conference>(import.meta.env.VITE_CONFERENCE_API_URL + `/Conference/${conferenceId}`);
};

export const useUpdateConferenceApi = () => {
  return usePutApi<UpdateConferenceRequest, Conference>(import.meta.env.VITE_CONFERENCE_API_URL + `/Conference`);
};

export const useGetInviteCodesApi = (conferenceId: number) => {
  return useGetApi<InviteCode[]>(import.meta.env.VITE_CONFERENCE_API_URL + `/conference/${conferenceId}/invite-codes`);
}

export const useRefreshCodeApi = () => {
  return usePostApi<RefreshInviteCodeRequest, InviteCode>(import.meta.env.VITE_CONFERENCE_API_URL + "/conference/refresh-code");
}