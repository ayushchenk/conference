import { Conference } from "../../types/Conference";
import { ApiResponse } from "../../types/ApiResponse";

export type GetConferenceResponse = ApiResponse<Conference>;

export type CodeVisibility = {
  role: string,
  visible: boolean
}
