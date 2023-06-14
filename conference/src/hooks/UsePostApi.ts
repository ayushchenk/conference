import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState, useMemo } from "react";
import { ApiResponse } from "../types/ApiResponse";
import { format } from "../util/Functions";
import { headers } from "../util/Constants";
import { useConferenceId } from "./UseConferenceId";

export function usePostApi<TRequest, TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
  const conferenceId = useConferenceId();

  const [response, setResponse] = useState<ApiResponse<TData>>({
    data: null,
    isError: false,
    isLoading: true,
    error: null,
  });

  const configWithHeaders: AxiosRequestConfig<any> = useMemo(() => ({
    ...config,
    headers: {
      [headers.conference]: conferenceId
    }
  }), [config, conferenceId]);

  const post = useCallback(
    (data: TRequest, ...urlParams: (string | number)[]) => {
      axios
        .post<TData>(format(path, urlParams), data, configWithHeaders)
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
            error: error?.response?.data,
          });
        });
    },
    [path, configWithHeaders]
  );

  return { response, post: post };
}
