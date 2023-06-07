import * as yup from "yup";
import { maxSubmissionFileSizeMB } from "../../util/Constants";

export const validationSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  keywords: yup.string().trim().required("Keywords is required"),
  abstract: yup.string().trim().required("Abstract is required"),
  file: yup
    .mixed()
    .required("File is required")
    .test(
      "fileSize",
      `The file size exceeds the maximum limit of ${maxSubmissionFileSizeMB} MB. Please choose a smaller file.`,
      (value: any) => {
        return value?.size <= maxSubmissionFileSizeMB * 1024 * 1024;
      }
    ),
});
