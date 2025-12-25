import { Box, Stack } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColumnHeaderParams,
  GridRowId,
  GridRowIdGetter,
  GridRowSelectionModel,
  GridValidRowModel,
  useGridApiRef,
  MuiEvent,
} from '@mui/x-data-grid';
import { viVN } from '@mui/x-data-grid/locales';
import { useState, useMemo } from 'react';
import { SelectRowsModal } from './modals/SelectRowsModal';

interface DataGridTableProps<T extends GridValidRowModel> extends DataGridProps {
  getRowId?: GridRowIdGetter<T> | undefined;
  height?: number | string;
  optimizeGrid?: boolean;
}

const noRowsOverlay = () => (
  <Stack height="100%" alignItems="center" justifyContent="center">
    Không có dữ liệu
  </Stack>
);

// Custom Vietnamese locale with pagination translations
const customViVNLocale = {
  ...viVN.components.MuiDataGrid.defaultProps.localeText,
  // Pagination translations - using the correct key for MUI DataGrid
  paginationDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
    `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`,
  MuiTablePagination: {
    labelRowsPerPage: 'Số hàng mỗi trang:',
  },
};

// Function to calculate optimal column width based on content and header
const calculateColumnWidth = (
  header: string,
  data: any[],
  field: string,
  minWidth: number = 100,
  maxWidth: number = 300,
): number => {
  const baseColumns = ['Ngày tạo', 'Ngày cập nhật']; // special padding for date columns since the valueGetter is shorter than the actual content

  const padding = baseColumns.includes(header) ? 0 : 50;
  const charWidth = 6;
  // Calculate header width (approximate character width)
  const headerWidth = header.length * charWidth + padding;

  // Calculate content width
  let maxContentWidth = 0;
  data.forEach((row) => {
    const cellValue = row[field];
    if (cellValue !== null && cellValue !== undefined) {
      const contentLength = String(cellValue).length;
      const contentWidth = contentLength * charWidth + padding;
      maxContentWidth = Math.max(maxContentWidth, contentWidth);
    }
  });

  // Return the maximum of header and content width, clamped between min and max
  return Math.min(Math.max(Math.max(headerWidth, maxContentWidth), minWidth), maxWidth);
};

export const DataGridTable = <T extends GridValidRowModel>({
  getRowId = (row) => row.id,
  height = 'fit-content',
  optimizeGrid = true,
  ...props
}: DataGridTableProps<T>) => {
  const [isSelectRowsOpen, setIsSelectRowsOpen] = useState(false);
  const apiRef = useGridApiRef();
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set<GridRowId>(),
  });

  const OPTIMIZE_COLUMN_MIN_WIDTH = 50;
  const OPTIMIZE_COLUMN_MAX_WIDTH = 250;

  // Calculate optimized columns when optimizeGrid is true
  const optimizedColumns = useMemo(() => {
    if (!optimizeGrid || !props.columns || !props.rows) {
      return props.columns;
    }

    const data = props.rows as T[];
    return props.columns.map((column, index) => {
      if (column.field && column.headerName) {
        const isLastColumn = index === props.columns.length - 1;
        const calculatedWidth = calculateColumnWidth(
          column.headerName,
          data,
          column.field,
          optimizeGrid
            ? OPTIMIZE_COLUMN_MIN_WIDTH
            : (column.minWidth as number) || OPTIMIZE_COLUMN_MIN_WIDTH,
          optimizeGrid
            ? OPTIMIZE_COLUMN_MAX_WIDTH
            : (column.maxWidth as number) || OPTIMIZE_COLUMN_MAX_WIDTH,
        );

        // For the last column, preserve flex behavior to fill remaining space
        if (isLastColumn) {
          return {
            ...column,
            align: optimizeGrid ? 'center' : column.align || 'center',
            headerAlign: optimizeGrid ? 'center' : column.headerAlign || 'center',
            minWidth: calculatedWidth,
            flex: column.flex || 1, // Preserve or set flex to fill remaining space
          };
        }

        // For all other columns, use fixed width optimization
        return {
          ...column,
          align: optimizeGrid ? 'center' : column.align || 'center',
          headerAlign: optimizeGrid ? 'center' : column.headerAlign || 'center',
          width: calculatedWidth,
          minWidth: calculatedWidth,
          maxWidth: calculatedWidth,
        };
      }
      return column;
    });
  }, [optimizeGrid, props.columns, props.rows]);

  // handle select/unselect rows
  const handleSelectRows = ({
    from,
    to,
    checked,
  }: {
    from: number;
    to: number;
    checked: boolean;
  }) => {
    const allRows = (props.rows as unknown as T[]) ?? [];
    if (allRows.length === 0) {
      setIsSelectRowsOpen(false);
      return;
    }

    const startIndex = Math.max(0, Math.min(from, to) - 1);
    const endIndex = Math.min(allRows.length - 1, Math.max(from, to) - 1);

    const rangeIds = allRows
      .slice(startIndex, endIndex + 1)
      .map((row) => (getRowId as GridRowIdGetter<T>)(row)) as unknown as GridRowId[];

    // If checked: replace selection with exactly the range.
    // If unchecked: remove the range from current selection.
    const nextIds = checked
      ? new Set<GridRowId>(rangeIds)
      : (() => {
          const current = new Set<GridRowId>(selectionModel.ids);
          rangeIds.forEach((id) => current.delete(id));
          return current;
        })();

    const model: GridRowSelectionModel = { type: 'include', ids: nextIds };
    setSelectionModel(model);
    apiRef.current?.setRowSelectionModel(model);
    setIsSelectRowsOpen(false);
  };

  // event right click on datagrid header
  const handleContextMenuOnHeader: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const headerEl = target.closest('.MuiDataGrid-columnHeader');
    if (headerEl) {
      event.preventDefault();
      setIsSelectRowsOpen(true);
    }
  };

  return (
    <Box
      sx={{ height, width: '100%', overflow: 'auto', flexGrow: 1, marginBottom: '1rem' }}
      onContextMenu={handleContextMenuOnHeader}
    >
      <DataGrid
        apiRef={apiRef}
        getRowId={getRowId}
        disableRowSelectionOnClick={false}
        checkboxSelection
        rowHeight={40}
        keepNonExistentRowsSelected
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={(model) => {
          setSelectionModel(model);
        }}
        slots={{
          noRowsOverlay,
        }}
        disableColumnFilter
        localeText={customViVNLocale}
        pageSizeOptions={[30, 50, 100]}
        sx={{
          borderRadius: '0.5rem',
          minWidth: '150px',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f3f3f3',
            fontWeight: 'bold',
            height: '40px',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#fafafa',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #eee',
            fontSize: '12px',
            whiteSpace: 'normal !important',
            wordBreak: 'break-word',
            lineHeight: '1rem',
            display: 'flex',
            alignItems: 'center',
            py: 1,
          },
          '& .MuiCheckbox-root': {
            padding: 0,
          },
          '& .MuiDataGrid-columnHeader': {
            outline: 'none !important',
            backgroundColor: '#f0f0f0',
          },
          '& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            whiteSpace: 'normal !important',
            wordBreak: 'break-word',
            textAlign: 'center',
            fontSize: '12px',
          },
          '& .MuiDataGrid-main': {
            borderRadius: '0.5rem',
          },
          '$ .MuiFormControl-root': {
            marginTop: '1rem !important',
          },
          '& .MuiTablePagination-selectLabel': {
            fontSize: '12px',
          },
          '& .MuiTablePagination-select': {
            fontSize: '12px',
          },
          '& .MuiTablePagination-displayedRows': {
            fontSize: '12px',
          },
          '& .MuiTablePagination-actions': {
            marginTop: '0 !important',
          },
          '& .MuiDataGrid-columnHeader:hover .MuiDataGrid-iconButtonContainer': {
            visibility: 'hidden',
            width: 0,
          },
          '& .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--sorted .MuiDataGrid-iconButtonContainer':
            {
              visibility: 'visible',
              width: 'auto',
            },
        }}
        onColumnHeaderClick={(
          _params: GridColumnHeaderParams,
          event: MuiEvent<React.MouseEvent>,
        ) => {
          event.defaultMuiPrevented = true;
        }}
        {...props}
        columns={optimizedColumns}
      />
      {isSelectRowsOpen && (
        <SelectRowsModal onClose={() => setIsSelectRowsOpen(false)} onSelect={handleSelectRows} />
      )}
    </Box>
  );
};
