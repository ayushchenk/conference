import { GetConferenceResponse, RefreshInviteCodeRequest } from "./ConferenceDetails.types";
import { useGetApi } from "../../hooks/UseGetApi";
import { Conference, InviteCode } from "../../types/Conference";
import { usePutApi } from "../../hooks/UsePutApi";
import { UpdateConferenceRequest } from "../CreateConferenceForm/CreateConferenceForm.types";
import { usePostApi } from "../../hooks/UsePostApi";

export const useGetConferenceApi = (conferenceId: number): GetConferenceResponse => {
  return useGetApi<Conference>(`/Conference/${conferenceId}`);
};

export const useUpdateConferenceApi = () => {
  return usePutApi<UpdateConferenceRequest, Conference>(`/Conference`);
};

export const useGetInviteCodesApi = (conferenceId: number) => {
  return useGetApi<InviteCode[]>(`/conference/${conferenceId}/invite-codes`);
}

export const useRefreshCodeApi = () => {
  return usePostApi<RefreshInviteCodeRequest, InviteCode>("/conference/refresh-code");
}