export type SignUpRequest = {
    email: string,
    firstName: string,
    lastName: string,
    country: string,
    affiliation: string,
    webpage: string,
    password: string
}

export const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    affiliation: "",
    webpage: "",
    password: "",
    passwordRepeat: ""
};