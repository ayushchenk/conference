import { User } from "../../types/User";
import { ApiResponse, PageData } from "../../types/ApiResponse";

export type GetUsersData = PageData<User>;
export type GetUsersResponse = ApiResponse<GetUsersData>;

export type DeleteUserResponse = {
  data: { userId: number | null };
  isLoading: boolean;
  isError: boolean;
};
