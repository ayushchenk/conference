import { Conference } from "../../types/Conference"

export type GetConferencesResponse = {
    data: Conference[],
    isLoading: boolean,
    isError: boolean
}