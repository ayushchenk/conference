export type ApiResponse<T> = {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
};

export type PageData<T> = {
    items: T[];
    totalCount: number;
    totalPages: number;
}