import { GridColumnVisibilityModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { useGridRowSelection } from './use-grid-row-selection';
import { useTableParams } from './use-table-params';

export const useTableParamsSelection = () => {
  const gridRowSelection = useGridRowSelection();
  const tableParams = useTableParams();
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});

  return {
    ...gridRowSelection,
    ...tableParams,
    tableConfig: {
      columnVisibilityModel,
      onColumnVisibilityModelChange: setColumnVisibilityModel,
    },
    columnVisibilityModel,
    setColumnVisibilityModel,
  };
};
