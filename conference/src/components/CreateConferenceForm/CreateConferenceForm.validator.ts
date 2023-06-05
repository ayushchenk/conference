import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  keywords: yup.string(),
  abstract: yup.string(),
  acronym: yup.string().required("Acronym is required"),
  webpage: yup.string(),
  venue: yup.string(),
  city: yup.string(),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().min(yup.ref("startDate"), "End date can't be before start date").required("End date is required"),
  primaryResearchArea: yup.string(),
  secondaryResearchArea: yup.string(),
  areaNotes: yup.string(),
  organizer: yup.string().required("Organizer is required"),
  organizerWebpage: yup.string(),
  contactPhoneNumber: yup.string(),
});
