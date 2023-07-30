import { GridPaginationModel } from "@mui/x-data-grid";
import * as yup from "yup";

export const defaultPage: GridPaginationModel = {
  page: 0,
  pageSize: 10,
};

export const userRoles: string[] = ["Chair", "Author", "Reviewer"];

export const maxSubmissionFileSizeMB: number = 2;
export const maxOtherFilesInSubmission: number = 3;

export const headers = {
  conference: "x-conference-id",
  filename: "filename"
};

export const errorAlertTimeout = 5000;

export const submissionConfidenceOptions = [
  { value: 1, label: "Very Low" },
  { value: 2, label: "Low" },
  { value: 3, label: "Medium" },
  { value: 4, label: "High" },
  { value: 5, label: "Very High" },
];

export const fileValidation = yup
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