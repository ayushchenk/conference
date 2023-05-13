export type SignUpRequest = {
    email: string,
    firstName: string,
    lastName: string,
    country: string,
    affiliation: string,
    webpage: string,
    password: string
}

export type SignUpResponse = {
    data: object,
    isError: boolean,
    isLoading: boolean
}