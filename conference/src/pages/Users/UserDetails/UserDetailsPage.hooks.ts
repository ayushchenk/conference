import { useGetApi } from "../../../hooks/UseGetApi";
import { User } from "../../../types/User";

export const useGetUserApi = (userId: number | string) => {
  return useGetApi<User>(`/user/${userId}`);
};