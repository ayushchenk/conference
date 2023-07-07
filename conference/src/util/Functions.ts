import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ErrorApiResponse, LoadingApiResponse, NotInitiatedResponse, SuccessApiResponse } from "../types/ApiResponse";
import { User } from "../types/User";
import { Auth } from "./Auth";
import { GridPaginationModel } from "@mui/x-data-grid";

//string of type "{0} text {1} ..."
export function format(str: string, ...params: any[]) {
  return str.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof params[index] == "undefined" ? match : params[index];
  });
}

export function buildFormData(values: { [key: string]: any }): FormData {
  const formData = new FormData();
  for (const [field, value] of Object.entries(values)) {
    if (value instanceof File) {
      formData.append(field, value);
      continue;
    }

    if (Array.isArray(value)) {
      const values = Array.from(value);
      for (const val of values) {
        formData.append(field, val instanceof File ? val : String(val));
      }
      continue;
    }

    formData.append(field, String(value));
  }
  return formData;
}

export function getConferenceRoles(user: User | null, conferenceId: number) {
  return user?.roles[conferenceId] ?? [];
}

export function createNotInitiatedResponse(): NotInitiatedResponse {
  return {
    status: "not-initiated",
    data: null,
    error: null
  }
}

export function createLoadingResponse(): LoadingApiResponse {
  return {
    status: "loading",
    data: null,
    error: null
  }
}

export function createSuccessResponse<T>(response: AxiosResponse<T>): SuccessApiResponse<T> {
  return {
    status: "success",
    data: response.data,
    error: null
  }
}

export function createErrorResponse(error: any): ErrorApiResponse {
  return {
    status: "error",
    data: null,
    error: error?.response?.data
  }
}

export function setupAxios() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.interceptors.request.use(function (config) {
    const token = Auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export const axiosFetcher = (params: any[]) => {
  const [path, config] = params;

  return axios
    .get(path, config)
    .then(r => r.data);
}

export function createConfigFromPage(paging: GridPaginationModel, query?: string) {
  var config: AxiosRequestConfig = {
    params: {
      pageIndex: paging.page,
      pageSize: paging.pageSize
    }
  }

  if (query) {
    config.params.query = query;
  }

  return config;
}