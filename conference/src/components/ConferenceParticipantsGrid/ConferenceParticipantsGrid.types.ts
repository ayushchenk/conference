import { User } from "../../types/User";
import { ApiResponse, PageData } from "../../types/ApiResponse";

export type GetParticipantsData = PageData<User>;
export type GetParticipantsResponse = ApiResponse<GetParticipantsData>;