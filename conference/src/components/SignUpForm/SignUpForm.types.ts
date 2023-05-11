export type SignUpRequest = {
    email: string,
    password: string
}

export type SignUpResponse = {
    data: object,
    isError: boolean,
    isLoading: boolean
}