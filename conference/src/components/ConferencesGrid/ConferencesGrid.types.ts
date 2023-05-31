import { Conference } from "../../types/Conference";
import { ApiResponse, PageData } from "../../types/ApiResponse";

export type GetConferencesData = PageData<Conference>;
export type GetConferencesResponse = ApiResponse<GetConferencesData>;
