export type Token = {
    accessToken: string,
    expiry: string,
    issued: string,
}

export type AuthData = {
    email: string,
    token: Token,
    userId: number,
    roles: string[],
}

export type AuthResponse = {
    data: AuthData | null,
    isError: boolean,
    isLoading: boolean
}