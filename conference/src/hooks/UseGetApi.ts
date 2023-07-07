import { AxiosError, AxiosRequestConfig } from "axios";
import { useConfigWithHeaders } from "./UseConfigWithHeaders";
import useSWR from "swr";
import { ApiError } from "../types/ApiResponse";

export function useGetApi<TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
  const configWithHeaders = useConfigWithHeaders(config);
  return useSWR<TData, AxiosError<ApiError>>([path, configWithHeaders]);
}