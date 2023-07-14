import { AxiosError } from "axios";
import { SWRResponse } from "swr";
import { ApiError, ApiResponse } from "../../types/ApiResponse";

export type FormApiErrorAlertProps = {
  response: ApiResponse<any>;
};

export type FormSwrErrorAlertProps = {
  response: SWRResponse<any, AxiosError<ApiError, any>, any>;
};
