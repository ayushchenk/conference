import * as yup from "yup";
import { maxSubmissionFileSizeMB } from "../../util/Constants";

const fileValidation = yup
  .mixed()
  .test(
    "fileSize",
    `The file size exceeds the maximum limit of ${maxSubmissionFileSizeMB} MB. Please choose a smaller file.`,
    (value: any) => {
      if (value === undefined) {
        return true;
      }
      return value.size <= maxSubmissionFileSizeMB * 1024 * 1024;
    }
  );

const validationSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  keywords: yup.string().trim().required("Keywords is required"),
  abstract: yup.string().trim().required("Abstract is required"),
});

export const createValidationSchema = validationSchema.shape({
  file: fileValidation.required("File is required"),
});

export const updateValidationSchema = validationSchema.shape({
  file: fileValidation.nullable(),
});
