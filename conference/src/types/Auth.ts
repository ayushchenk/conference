export type JwtToken = {
    aud: string,
    exp: number,
    iat: number,
    iss: string,
    nameid: string,
    role: string | string[],
    unique_name: string
}

export type AuthData = {
    accessToken: string,
    roles: {
        [conferenceId: number]: string[]
    };
}