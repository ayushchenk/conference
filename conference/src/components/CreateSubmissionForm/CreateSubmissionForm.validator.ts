import * as yup from "yup";
import { maxSubmissionFileSizeMB } from "../../util/Constants";

const fileValidation = yup
  .mixed<File>()
  .test(
    "fileSize",
    `The file size exceeds the maximum limit of ${maxSubmissionFileSizeMB} MB. Please choose a smaller file.`,
    function (value: File | undefined) {
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
  mainFile: fileValidation.required("Main submission file is required"),
  anonymizedFile: fileValidation.nullable(),
  presentationFile: fileValidation.nullable(),
  otherFiles: yup.array(fileValidation).nullable()
});

export const updateValidationSchema = validationSchema.shape({
  mainFile: fileValidation.nullable(),
  anonymizedFile: fileValidation.nullable(),
  presentationFile: fileValidation.nullable(),
  otherFiles: yup.array(fileValidation).nullable()
});
