import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { ApiResponse } from "../types/GetResponse";
import { ApiErrorResponse } from "../types/PostResponse";

export function usePostApi<TRequest, TResponse>(path: string, config?: AxiosRequestConfig<any> | undefined) {
  const [response, setResponse] = useState<ApiResponse<TResponse> | ApiErrorResponse>({
    data: null,
    isError: false,
    isLoading: true,
  });

  const post = useCallback(
    (data: TRequest) => {
      axios
        .post<TResponse>(path, data, config)
        .then((response) => {
          setResponse({
            data: response.data,
            isError: false,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.error(error);
          setResponse({
            data: null,
            isError: true,
            isLoading: false,
          });
        });
    },
    [path, config]
  );

  return { data: response.data, isError: response.isError, isLoading: response.isLoading, post: post };
}
