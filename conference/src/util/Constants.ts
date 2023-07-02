import { GridPaginationModel } from "@mui/x-data-grid";

export const defaultPage: GridPaginationModel = {
  page: 0,
  pageSize: 10,
};

export const userRoles: string[] = ["Chair", "Author", "Reviewer"];

export const maxSubmissionFileSizeMB: number = 2;
export const maxOtherFilesInSubmission: number = 3;

export const headers = {
  conference: "x-conference-id",
};

export const errorAlertTimeout = 5000;

export const submissionConfidenceOptions = [
  { value: 1, label: "Very Low" },
  { value: 2, label: "Low" },
  { value: 3, label: "Medium" },
  { value: 4, label: "High" },
  { value: 5, label: "Very High" },
];
