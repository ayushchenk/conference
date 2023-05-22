export type SignUpRequest = {
    email: string,
    firstName: string,
    lastName: string,
    country: string,
    affiliation: string,
    webpage: string,
    password: string
}

export type SignUpTokenResponse = {
    accessToken: string,
    expiry: object,
    issued: boolean,
}

export type SignUpDataResponse = {
    email: string,
    token: SignUpTokenResponse,
    userId: boolean,
    roles: string[],
}

export type SignUpResponse = {
    data: SignUpDataResponse | null,
    isError: boolean,
    isLoading: boolean
}