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

export type ApiErrorResponse = {
  data: ApiError | null;
  isLoading: boolean;
  isError: true;
};
