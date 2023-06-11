import { GridPaginationModel } from "@mui/x-data-grid";

export const defaultPage: GridPaginationModel = {
  page: 0,
  pageSize: 10,
};

export const userRoles: string[] = ["Admin", "Author", "Reviewer"];

export const maxSubmissionFileSizeMB: number = 2;