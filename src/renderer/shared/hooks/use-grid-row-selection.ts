import { GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';

export function useGridRowSelection(allRowIds?: Set<GridRowId>) {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });

  const handleRowSelectionModelChange = (newRowSelectionModel: GridRowSelectionModel) => {
    setSelectedRows(newRowSelectionModel);
  };

  const effectiveRowIds = useMemo(() => {
    if (selectedRows.type === 'include') return selectedRows.ids;
    if (!allRowIds) return selectedRows.ids;
    const result = new Set<GridRowId>();
    allRowIds.forEach((id) => {
      if (!selectedRows.ids.has(id)) result.add(id);
    });
    return result;
  }, [selectedRows, allRowIds]);

  const includeSelectedRows = useMemo<GridRowSelectionModel>(
    () => ({ type: 'include', ids: effectiveRowIds }),
    [effectiveRowIds],
  );

  return {
    // Always expose include-mode with concrete IDs
    selectedRows: includeSelectedRows,
    setSelectedRows,
    handleRowSelectionModelChange,
    rowIds: effectiveRowIds,
  };
}
