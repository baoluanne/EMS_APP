import { Drawer, Box, Typography, Stack, IconButton, Divider, Button } from '@mui/material';
import { Close, FileDownloadOutlined } from '@mui/icons-material';
import { DataGridTable } from '@renderer/components/Table';
import { lichSuViPhamColumns } from '../configs/table.configs';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { exportPaginationToExcel } from '@renderer/shared/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  studentData: any;
}

export const ViolationHistorySidebar = ({ open, onClose, studentData }: Props) => {
  const sinhVienId = studentData?.sinhVienId || studentData?.id;

  const { data, isRefetching } = useCrudPagination<any>({
    entity: 'ViPhamNoiQuyKTX',
    endpoint: `pagination?SinhVienId=${sinhVienId || ''}`,
    enabled: !!sinhVienId && open,
  });

  const handleExportExcel = () => {
    const rows = data?.result || [];
    if (rows.length === 0) return;

    const student = studentData?.sinhVien || studentData;
    const studentName = `${student?.maSinhVien || ''}_${student?.ten || ''}`;

    exportPaginationToExcel({
      entity: 'ViPhamNoiQuyKtx',
      filteredData: rows,
      columns: lichSuViPhamColumns,
      options: {
        dataOption: 'filtered',
        columnOption: 'all',
      },
      columnVisibilityModel: {},
      fileName: `Lich_su_vi_pham_${studentName}`,
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 800 } }}>
      <Box sx={{ p: 3, height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={700}>
            Lịch sử vi phạm chi tiết
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FileDownloadOutlined />}
              onClick={handleExportExcel}
              disabled={!data?.result?.length}
              sx={{ borderRadius: 2 }}
            >
              Xuất Excel
            </Button>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Box mb={3}>
          <Typography variant="body2" color="text.secondary">
            Sinh viên:
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            {studentData?.sinhVien?.maSinhVien || studentData?.maSinhVien} -{' '}
            {studentData?.sinhVien?.hoDem || studentData?.hoDem}{' '}
            {studentData?.sinhVien?.ten || studentData?.ten}
          </Typography>
        </Box>

        <DataGridTable
          rows={data?.result || []}
          columns={lichSuViPhamColumns}
          loading={isRefetching}
          height="calc(100% - 180px)"
          hideFooter
          getRowId={(row) => row.id}
        />
      </Box>
    </Drawer>
  );
};
