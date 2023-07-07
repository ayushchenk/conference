import { useState } from "react";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { defaultPage } from "../../util/Constants";
import { useGetSubmissionsApi, useSubmissionsGridColumns } from "./SubmissionsGrid.hooks";
import { FormErrorAlert2 } from "../FormErrorAlert";
import { NoRowsOverlay } from "../Util/NoRowsOverlay";
import { NoResultsOverlay } from "../Util/NoResultsOverlay";
import { useDebounceQuery } from "../../hooks/UseDebouncedQuery";

export const SubmissionsGrid = () => {
  const [currentPage, setCurrentPage] = useState<GridPaginationModel>(defaultPage);
  const columns = useSubmissionsGridColumns();
  const { debouncedQuery, debouncedInput } = useDebounceQuery("Search by title, keywords and research areas");
  const submissions = useGetSubmissionsApi(currentPage, debouncedQuery);

  return (
    <>
      {debouncedInput}
      <DataGrid
        autoHeight
        rows={submissions.data?.items ?? []}
        columns={columns}
        initialState={{ pagination: { paginationModel: currentPage } }}
        pageSizeOptions={[5, 10, 15, 25]}
        onPaginationModelChange={setCurrentPage}
        paginationMode="server"
        loading={submissions.isLoading}
        rowCount={submissions.data?.totalCount ?? 0}
        slots={{
          noRowsOverlay: () => <NoRowsOverlay>No submissions uploaded yet</NoRowsOverlay>,
          noResultsOverlay: NoResultsOverlay
        }}
      />
      <FormErrorAlert2 error={submissions.error} />
    </>
  );
};
