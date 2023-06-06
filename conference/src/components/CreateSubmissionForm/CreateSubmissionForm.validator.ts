import * as yup from "yup";
import { maxSubmissionFileSizeMB } from "../../util/Constants";

export const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  keywords: yup.string().required("Keywords is required"),
  abstract: yup.string().required("Abstract is required"),
  file: yup
    .mixed()
    .required("File is required")
    .test("fileSize", "The file is too large", (value: any) => {
      return value?.size <= maxSubmissionFileSizeMB * 1024 * 1024;
    }),
});
