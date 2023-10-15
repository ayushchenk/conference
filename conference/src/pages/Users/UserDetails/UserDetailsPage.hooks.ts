import { useGetApi } from "../../../hooks/UseGetApi";
import { User } from "../../../types/User";

export const useGetUserApi = (userId: number | string) => {
  return useGetApi<User>(import.meta.env.VITE_USER_API_URL + `/user/${userId}`);
};