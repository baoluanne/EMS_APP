import { Checkbox } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const khoaChuongTrinhKhungColumns = (
  onToggleBlock: (data: any, isBlock: boolean) => void,
) => {
  return generateTableConfigs([
    {
      field: 'isBlock',
      headerName: 'Khóa',
      width: 60,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox
          checked={params.value}
          onChange={(e) => onToggleBlock(params.row, e.target.checked)}
        />
      ),
      sortable: true,
    },
    {
      field: 'khoaHoc',
      headerName: 'Khóa học',
      minWidth: 120,
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.tenKhoaHoc,
    },
    {
      field: 'bacDaoTao',
      headerName: 'Bậc đào tạo',
      minWidth: 150,
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.tenBacDaoTao,
    },
    {
      field: 'loaiDaoTao',
      headerName: 'Loại đào tạo',
      minWidth: 150,
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.tenLoaiDaoTao,
    },
    {
      field: 'nganhHoc',
      headerName: 'Ngành',
      minWidth: 150,
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.tenNganhHoc,
    },
    {
      field: 'chuyenNganh',
      headerName: 'Chuyên ngành',
      minWidth: 150,
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.tenChuyenNganh,
    },
    {
      field: 'coSoDaoTao',
      headerName: 'Cơ sở',
      minWidth: 120,
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.tenCoSo,
    },
  ]);
};
