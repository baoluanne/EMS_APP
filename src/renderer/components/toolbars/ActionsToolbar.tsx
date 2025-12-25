import { Box, Button, Divider } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { FC, ReactNode } from 'react';
import { Add, CopyAll, Delete, Details, Edit, Note } from '@mui/icons-material';
import { ColumnOption, DataOption } from '@renderer/shared/configs';
import { ImportExcelProps } from '@renderer/shared/types';
import { ExportExcel, ImportExcel } from '@renderer/components/toolbars';

export interface ActionsToolbarProps {
  selectedRowIds?: GridRowSelectionModel;
  onDetails?: () => void;
  onAdd?: (options?: { isCloning?: boolean }) => void;
  onJournal?: () => void;
  onEdit?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onImport?: ImportExcelProps;
  onExport?: (dataOption: DataOption, columnOption: ColumnOption) => void;
  customStartActions?: ReactNode;
}

export const ActionsToolbar: FC<ActionsToolbarProps> = ({
  onDetails,
  selectedRowIds,
  onAdd,
  onEdit,
  onCopy,
  onDelete,
  onExport,
  onImport,
  onJournal,
  customStartActions,
}) => {
  const hasActionsBeforeDivider = onAdd || onJournal || onCopy || onEdit || onDetails || onDelete;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        p: 1,
      }}
    >
      {customStartActions}
      {!!onAdd && (
        <Button variant="text" size="small" startIcon={<Add />} onClick={() => onAdd?.()}>
          Thêm mới
        </Button>
      )}
      {!!onJournal && (
        <Button variant="text" size="small" startIcon={<Note />} onClick={onJournal}>
          Nhật kí
        </Button>
      )}
      {!!(onCopy || onAdd) && (
        <Button
          size="small"
          startIcon={<CopyAll />}
          sx={{ color: '#605E5C' }}
          disabled={selectedRowIds?.ids.size !== 1}
          onClick={() => {
            if (onCopy) return onCopy();
            onAdd?.({ isCloning: true });
          }}
        >
          Sao chép
        </Button>
      )}

      {!!onEdit && (
        <Button
          size="small"
          startIcon={<Edit />}
          sx={{ color: '#FFB900' }}
          disabled={selectedRowIds?.ids.size !== 1}
          onClick={onEdit}
        >
          Sửa
        </Button>
      )}
      {!!onDetails && (
        <Button
          size="small"
          startIcon={<Details />}
          sx={{ color: '#2B88D8' }}
          disabled={selectedRowIds?.ids.size === 0}
          onClick={onDetails}
        >
          Chi tiết
        </Button>
      )}
      {!!onDelete && (
        <Button
          size="small"
          color="error"
          startIcon={<Delete />}
          disabled={selectedRowIds?.ids.size === 0}
          onClick={onDelete}
        >
          Xóa
        </Button>
      )}
      {hasActionsBeforeDivider && (onExport || onImport) && (
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      )}
      {!!onExport && <ExportExcel onClickExport={onExport} />}
      {!!onImport && <ImportExcel {...onImport} />}
    </Box>
  );
};
