import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { ApiResponse } from "../types/ApiResponse";
import { createErrorResponse, createLoadingResponse, createNotInitiatedResponse, createSuccessResponse } from "../util/Functions";
import { useConfigWithHeaders } from "./UseConfigWithHeaders";

export function usePutApi<TRequest, TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
  const [response, setResponse] = useState<ApiResponse<TData>>(createNotInitiatedResponse());

  const configWithHeaders = useConfigWithHeaders(config);

  const put = useCallback(
    (data: TRequest) => {
      setResponse(createLoadingResponse());
      axios
        .put<TData>(path, data, configWithHeaders)
        .then((response) => {
          setResponse(createSuccessResponse(response));
        })
        .catch((error) => {
          setResponse(createErrorResponse(error));
        });
    },
    [path, configWithHeaders]
  );

  return { response, put };
}
