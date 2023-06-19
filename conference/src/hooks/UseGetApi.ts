import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "../types/ApiResponse";
import { useConfigWithHeaders } from "./UseConfigWithHeaders";
import { createErrorResponse, createLoadingResponse, createSuccessResponse } from "../util/Functions";

export function useGetApi<TData>(path: string, config?: AxiosRequestConfig<any> | undefined) {
  const [response, setResponse] = useState<ApiResponse<TData>>(createLoadingResponse());

  const configWithHeaders = useConfigWithHeaders(config);

  useEffect(() => {
    axios
      .get<TData>(path, configWithHeaders)
      .then((response) => {
        setResponse(createSuccessResponse(response));
      })
      .catch((error) => {
        setResponse(createErrorResponse(error));
      });
  }, [path, configWithHeaders]);

  return response;
}