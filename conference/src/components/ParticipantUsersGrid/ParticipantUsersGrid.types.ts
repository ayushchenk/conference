import { User } from "../../types/User";

export type GetUsersResponse = {
  data: {
    items: User[];
    totalCount: number;
    totalPages: number;
  };
  isLoading: boolean;
  isError: boolean;
};

export type DeleteUserResponse = {
  data: { userId: number | null };
  isLoading: boolean;
  isError: boolean;
};
