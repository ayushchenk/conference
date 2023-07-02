import { Conference } from "../../types/Conference";
import { ApiResponse } from "../../types/ApiResponse";

export type GetConferenceResponse = ApiResponse<Conference>;

export type CodeVisibility = {
  role: string,
  code: string,
  visible: boolean
}

export type RefreshInviteCodeRequest = {
  code: string;
}

export type ConferenceInviteCodesProps = {
  conferenceId: number;
}