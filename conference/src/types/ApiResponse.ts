export type ApiResponse<T> = NotInitiatedResponse | LoadingApiResponse | ErrorApiResponse | SuccessApiResponse<T>;

export type NotInitiatedResponse = {
  status: "not-initiated",
  data: null,
  error: null
}

export type LoadingApiResponse = {
  status: "loading",
  data: null,
  error: null
}

export type ErrorApiResponse = {
  status: "error",
  data: null,
  error: ApiError
}

export type SuccessApiResponse<T> = {
  status: "success",
  data: T,
  error: null
}

export type PageData<T> = {
  items: T[];
  totalCount: number;
  totalPages: number;
}

export type ApiError = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors: {
    [key: string]: string[];
  };
};

export type CreateResponseData = {
  id: number;
}

export type BooleanResponse = {
  result: boolean;
}