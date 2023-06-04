import { GridPaginationModel } from "@mui/x-data-grid";
import { AxiosRequestConfig } from "axios";
import { useMemo } from "react";

export function useMemoPaging(paging: GridPaginationModel) {
  const config: AxiosRequestConfig<any> = useMemo(
    () => ({
      params: { pageIndex: paging.page, pageSize: paging.pageSize },
    }),
    [paging.page, paging.pageSize]
  );

  return config;
}