import * as yup from "yup";
import { fileValidation, maxOtherFilesInSubmission } from "../../util/Constants";

const validationSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  keywords: yup.string().trim().required("Keywords is required"),
  researchAreas: yup.array().min(1, "Research areas are requried").max(10, "Maximum of 10 research areas are supported"),
  abstract: yup.string().trim().required("Abstract is required"),
});

export const createValidationSchema = validationSchema.shape({
  mainFile: fileValidation.required("Main submission file is required"),
  anonymizedFile: fileValidation.nullable(),
  presentationFile: fileValidation.nullable(),
  otherFiles: yup.array(fileValidation).nullable().max(maxOtherFilesInSubmission, "Maximum of 3 other files are allowed")
});

export const updateValidationSchema = validationSchema.shape({
  mainFile: fileValidation.nullable(),
  anonymizedFile: fileValidation.nullable(),
  presentationFile: fileValidation.nullable(),
  otherFiles: yup.array(fileValidation).nullable().max(maxOtherFilesInSubmission, "Maximum of 3 other files are allowed")
});
