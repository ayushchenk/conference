import { User } from "../../types/User";
import { ApiResponse, PageData } from "../../types/ApiResponse";

export type CreateParticipantRequest = {};

export type CreateParticipantData = null;

export type GetParticipantsData = PageData<User>;
export type GetParticipantsResponse = ApiResponse<GetParticipantsData>;

export type DeleteParticipantResponse = {
  data: { userId: number | null };
  isLoading: boolean;
  isError: boolean;
};
