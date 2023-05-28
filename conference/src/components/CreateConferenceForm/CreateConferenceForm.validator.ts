import * as yup from "yup";

export const validationSchema = yup.object({
    title: yup
        .string()
        .required("Title is required"),
    keywords: yup
        .string()
        .required("Keywords are required"),
    abstract: yup
        .string()
        .required("Abstract is required"),
    acronym: yup
        .string()
        .required("Acronym is required"),
    webpage: yup
        .string()
        .required("Webpage is required"),
    venue: yup
        .string()
        .required("Venue is required"),
    city: yup
        .string()
        .required("City is required"),
    startDate: yup
        .date()
        .required("Start date is required"),
    endDate: yup
        .date()
        .min(yup.ref('startDate'), "End date can't be before start date")
        .required("End date is required"),
    primaryResearchArea: yup
        .string()
        .required("Primary research area is required"),
    secondaryResearchArea: yup
        .string()
        .required("Secondary research area is required"),
    areaNotes: yup
        .string()
        .required("Area notes are required"),
    organizer: yup
        .string()
        .required("Organizer is required"),
    organizerWebpage: yup
        .string()
        .required("Organizer web page is required"),
    contactPhoneNumber: yup
        .string()
        .required("Contact phone number is required"),
});