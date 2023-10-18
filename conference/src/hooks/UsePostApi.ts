import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { ApiResponse } from "../types/ApiResponse";
import { createErrorResponse, createLoadingResponse, createNotInitiatedResponse, createSuccessResponse, format } from "../util/Functions";
import { useConfigWithHeaders } from "./UseConfigWithHeaders";

export function usePostApi<TRequest, TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
  const [response, setResponse] = useState<ApiResponse<TData>>(createNotInitiatedResponse());

  const configWithHeaders = useConfigWithHeaders(config);

  const post = useCallback(
    (data: TRequest, ...urlParams: (string | number)[]) => {
      setResponse(createLoadingResponse());
      axios
      .post<TData>(format(path, urlParams), data, configWithHeaders)
        .then((response) => {
          setResponse(createSuccessResponse(response));
        })
        .catch((error) => {
          setResponse(createErrorResponse(error));
        });
    },
    [path, configWithHeaders]
  );

  const reset = useCallback(() => setResponse(createNotInitiatedResponse()), []);

  return { response, post: post, reset };
}
