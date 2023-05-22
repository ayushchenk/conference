export type LoginRequest = {
    email: string,
    password: string
}

export type LoginTokenResponse = {
    accessToken: string,
    expiry: object,
    issued: boolean,
}

export type LoginDataResponse = {
    email: string,
    token: LoginTokenResponse,
    userId: boolean,
    roles: string[],
}

export type LoginResponse = {
    data: LoginDataResponse | null,
    isError: boolean,
    isLoading: boolean
}