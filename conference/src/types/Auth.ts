export type Token = {
    accessToken: string,
    expiry: Date,
    issued: Date,
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