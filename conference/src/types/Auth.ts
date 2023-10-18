export type AuthData = {
    id: number;
    admin: boolean;
    validTo: string;
    roles: {
        [conferenceId: number]: string[]
    };
}