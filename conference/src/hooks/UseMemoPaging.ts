import { GridPaginationModel } from "@mui/x-data-grid";
import { AxiosRequestConfig } from "axios";
import { useMemo } from "react";

export function useMemoPaging(paging: GridPaginationModel, query?: string) {
  const config: AxiosRequestConfig<any> = useMemo(() => {
    const cfg: AxiosRequestConfig = {
      params: { pageIndex: paging.page, pageSize: paging.pageSize }
    };

    if (query) {
      cfg.params.query = query;
    }

    return cfg;

  }, [paging.page, paging.pageSize, query]);

  return config;
}