import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { ApiResponse } from "../types/ApiResponse";
import { createErrorResponse, createLoadingResponse, createSuccessResponse, format } from "../util/Functions";
import { useConfigWithHeaders } from "./UseConfigWithHeaders";

export function useDeleteApi<TRequest, TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
  const [response, setResponse] = useState<ApiResponse<TData>>(createLoadingResponse());

  const configWithHeaders = useConfigWithHeaders(config);

  const performDelete = useCallback(
    (data?: TRequest, ...urlParams: (string | number)[]) => {
      axios
        .delete<TData>(format(path, urlParams), { data: data, ...configWithHeaders })
        .then((response) => {
          setResponse(createSuccessResponse(response));
        })
        .catch((error) => {
          console.error(error);
          setResponse(createErrorResponse(error));
        });
    },
    [path, configWithHeaders]
  );

  return { response, performDelete };
}