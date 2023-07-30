import * as yup from "yup";
import { fileValidation } from "../../util/Constants";

export const validationSchema = yup.object({
  file: fileValidation.required("File is required")
});

