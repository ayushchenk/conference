import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useMemo, useState } from "react";
import { ApiResponse } from "../types/ApiResponse";
import { headers } from "../util/Constants";
import { useConferenceId } from "./UseConferenceId";

export function usePutApi<TRequest, TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
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

  const put = useCallback(
    (data: TRequest) => {
      axios
        .put<TData>(path, data, configWithHeaders)
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

  return { response, put };
}
