import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { ApiResponse } from "../types/ApiResponse";
import { format } from "../util/Functions";

export function useDeleteApi<TRequest, TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
  const [response, setResponse] = useState<ApiResponse<TData>>({
    data: null,
    isError: false,
    isLoading: true,
    error: null,
  });

  const performDelete = useCallback(
    (data?: TRequest, ...urlParams: (string | number)[]) => {
      axios
        .delete<TData>(format(path, urlParams), { data: data, ...config })
        .then((response) => {
          setResponse({
            data: response.data,
            isError: false,
            isLoading: false,
            error: null,
          });
        })
        .catch((error) => {
          console.error(error);
          setResponse({
            data: null,
            isError: true,
            isLoading: false,
            error: error.response.data,
          });
        });
    },
    [path, config]
  );

  return { response, performDelete: performDelete };
}
