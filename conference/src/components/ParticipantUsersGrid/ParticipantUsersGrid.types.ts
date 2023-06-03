import { User } from "../../types/User";
import { ApiResponse, PageData } from "../../types/ApiResponse";

export type GetParticipantUsersData = PageData<User>;
export type GetParticipantUsersResponse = ApiResponse<GetParticipantUsersData>;
