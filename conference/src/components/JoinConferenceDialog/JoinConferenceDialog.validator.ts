import * as yup from "yup";

export const validationSchema = yup.object({
  code: yup.string().trim()
    .required("Code is required")
    .max(20, "Maximum length for code is 20")
});
