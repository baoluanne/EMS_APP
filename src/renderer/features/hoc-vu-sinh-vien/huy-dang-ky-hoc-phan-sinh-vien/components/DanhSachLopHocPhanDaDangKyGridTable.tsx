import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { DataGridTable } from '@renderer/components/Table';
import { Typography } from '@mui/material';
import { columnsDanhSachLopHocPhanDaDangKy } from '@renderer/features/hoc-vu-sinh-vien/huy-dang-ky-hoc-phan-sinh-vien';
import { z } from 'zod';

export const DanhSachLopHocPhanDaDangKyGridTable = () => {
  const { data, isRefetching, handleRowSelectionModelChange, selectedRows, tableConfig } =
    useCrudPaginationModal<any, any>({
      defaultValues: {},
      defaultState: {},
      entity: 'SinhVienDangKiHocPhan',
      schema: z.object({
        id: z.string().optional(),
        idSinhVien: z.string().uuid().optional(),
      }),
    });

  return (
    <>
      <Typography variant="subtitle1" fontWeight={700} sx={{ my: 1 }}>
        Danh sách lớp học phần đã đăng ký
      </Typography>
      <DataGridTable
        columns={columnsDanhSachLopHocPhanDaDangKy}
        rows={data?.result}
        checkboxSelection
        loading={isRefetching}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectedRows}
        height="350px"
        {...tableConfig}
      />
    </>
  );
};
