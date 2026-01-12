import { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { FormDetailsModal } from '@renderer/components/modals';
import { DataGridTable } from '@renderer/components/Table';
import { useCrudPagination } from '@renderer/shared/hooks/use-crud-pagination';
import { getTrangThaiLabel } from '../../danh-sach-thiet-bi/TrangThaiThietBiEnum';

interface Props {
  open: boolean;
  onClose: () => void;
  dotKiemKeId: string | null;
  tenDotKiemKe?: string;
}

export const ChiTietKiemKeModal = ({ onClose, dotKiemKeId, tenDotKiemKe }: Props) => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({});

  const { data, isRefetching, generateTableConfig } = useCrudPagination<any>({
    entity: 'ChiTietKiemKe',
    endpoint: `pagination?DotKiemKeId=${dotKiemKeId}`,
    enabled: !!dotKiemKeId,
    defaultState: {
      pageSize: 100,
    },
  });

  const detailRows = (data as any)?.result ?? [];

  const handleColumnChange = (model: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(model);
  };

  const tableConfig = {
    columnVisibilityModel,
    onColumnVisibilityModelChange: handleColumnChange,
    ...generateTableConfig((data as any)?.totalCount ?? 0, isRefetching),
  };

  const columns: GridColDef[] = [
    {
      field: 'maThietBi',
      headerName: 'Mã thiết bị',
      width: 150,
      valueGetter: (_, row) => row.thietBi?.maThietBi,
    },
    {
      field: 'tenThietBi',
      headerName: 'Tên thiết bị',
      flex: 1,
      valueGetter: (_, row) => row.thietBi?.tenThietBi,
    },
    {
      field: 'trangThaiSoSach',
      headerName: 'Trạng thái sổ sách',
      width: 180,
      renderCell: (params) => <Chip label={getTrangThaiLabel(params.value)} size="small" />,
    },
    {
      field: 'trangThaiThucTe',
      headerName: 'Trạng thái thực tế',
      width: 180,
      renderCell: (params) => (
        <Chip
          label={getTrangThaiLabel(params.value)}
          size="small"
          color={params.row.khopDot ? 'success' : 'warning'}
        />
      ),
    },
    {
      field: 'khopDot',
      headerName: 'Đối soát',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" color={params.value ? 'success.main' : 'error.main'}>
          {params.value ? '✓ Khớp' : '✕ Lệch'}
        </Typography>
      ),
    },
    { field: 'ghiChu', headerName: 'Ghi chú', flex: 1 },
  ];

  return (
    <FormDetailsModal
      title={`Chi tiết đợt: ${tenDotKiemKe || ''}`}
      onClose={onClose}
      onSave={onClose}
      maxWidth="lg"
      saveTitle="Đóng"
    >
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGridTable
          rows={detailRows}
          columns={columns}
          loading={isRefetching}
          getRowId={(row) => row.id}
          hideFooter
          {...tableConfig}
        />
      </Box>
    </FormDetailsModal>
  );
};
