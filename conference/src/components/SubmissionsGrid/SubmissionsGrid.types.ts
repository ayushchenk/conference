import { Submission } from "../../types/Conference";
import { ApiResponse, PageData } from "../../types/ApiResponse";

export type GetSubmissionsData = PageData<Submission>;
export type GetSubmissionsResponse = ApiResponse<GetSubmissionsData>;
