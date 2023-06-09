import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  keywords: yup.string().trim(),
  abstract: yup.string().trim(),
  acronym: yup.string().trim().required("Acronym is required"),
  webpage: yup.string().trim(),
  venue: yup.string().trim(),
  city: yup.string().trim(),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().min(yup.ref("startDate"), "End date can't be before start date").required("End date is required"),
  researchAreas: yup.array().min(1, "Research areas are requried").max(10, "Maximum 10 research areas are supported"),
  areaNotes: yup.string().trim(),
  organizer: yup.string().trim().required("Organizer is required"),
  organizerWebpage: yup.string().trim().url("Should be a valid URL"),
  contactPhoneNumber: yup.string().trim(),
});
