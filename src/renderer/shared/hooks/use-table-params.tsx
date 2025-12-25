import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useCallback, useState } from 'react';

const defaultPage = 0;
const defaultPageSize = 30;
const defaultRowCount = -1;
const defaultSortModels: GridSortModel = [];

export interface TableParams {
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  [key: string]: any;
}

export interface TableConfig {
  paginationMode: 'server';
  sortingMode: 'server';
  rowCount: number;
  initialState: {
    pagination: {
      paginationModel: GridPaginationModel;
    };
  };
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  disableColumnSorting?: boolean;
  pageSizeOptions?: number[];
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onSortModelChange: (model: GridSortModel) => void;
}

export const useTableParams = (defaultState: Partial<TableParams> = {}) => {
  const [params, setParams] = useState<TableParams>({
    page: defaultPage,
    pageSize: defaultPageSize,
    sortModel: defaultSortModels,
    ...defaultState,
  });

  const mergeParams = useCallback((value: Partial<TableParams>) => {
    setParams((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  const handlePaginationModelChange = useCallback(
    (paginationModel: GridPaginationModel) => {
      mergeParams(paginationModel);
    },
    [mergeParams],
  );

  const handleSortModelChange = useCallback(
    (sortModel: GridSortModel) => {
      mergeParams({ sortModel });
    },
    [mergeParams],
  );

  const generateTableConfig = useCallback(
    (total: number | undefined, isPending = false): TableConfig => ({
      sortingMode: 'server',
      paginationMode: 'server',
      rowCount: isPending || total === undefined ? defaultRowCount : total,
      initialState: {
        pagination: {
          paginationModel: {
            page: defaultPage,
            pageSize: defaultPageSize,
          },
        },
      },
      paginationModel: {
        page: params.page,
        pageSize: params.pageSize,
      },
      sortModel: params.sortModel,
      pageSizeOptions: [30, 50, 100],
      onPaginationModelChange: handlePaginationModelChange,
      onSortModelChange: handleSortModelChange,
    }),
    [
      handlePaginationModelChange,
      handleSortModelChange,
      params.page,
      params.pageSize,
      params.sortModel,
    ],
  );

  return {
    params,
    mergeParams,
    generateTableConfig,
  };
};
