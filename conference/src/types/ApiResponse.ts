export type ApiResponse<T> = {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    error: ApiError | null;
};

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