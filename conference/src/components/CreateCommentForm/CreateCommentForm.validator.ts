import * as yup from "yup";

export const validationSchema = yup.object({
  text: yup.string().trim().required("Text is required").max(1000)
});