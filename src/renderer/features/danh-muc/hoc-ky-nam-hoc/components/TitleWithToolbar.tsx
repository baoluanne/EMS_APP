import { Box, Stack, Typography } from '@mui/material';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { FcLibrary } from 'react-icons/fc';

export const TitleWithToolbar = ({
  title,
  selectedRows,
  onAdd,
  onEdit,
  setIsDeleteOpenModal,
  onImport,
  onExport,
}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" px={1}>
      <Stack flex={1} direction="row" alignItems="center">
        <FcLibrary size={18}></FcLibrary>
        <Typography
          variant="subtitle1"
          sx={{
            px: 1,
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ flex: 1, height: 1, borderBottom: '1px solid #ccc' }} />
      </Stack>

      <ActionsToolbar
        selectedRowIds={selectedRows}
        onDelete={setIsDeleteOpenModal}
        onAdd={onAdd}
        onEdit={onEdit}
        onImport={onImport}
        onExport={onExport}
      />
    </Stack>
  );
};
