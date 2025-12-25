import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { QuyUocCotDiemLopHocPhan } from '@renderer/shared/types';
import {
  renderBooleanCell,
  renderBooleanEditCell,
  renderEditCellSelection,
} from '@renderer/shared/utils';

const heDaoTaoOptions = ['Đại học chính quy', 'Cao đẳng', 'Liên thông', 'Thạc sĩ'];

export const quyUocCotDiemLopHocPhanTableColumns: GridColDef<QuyUocCotDiemLopHocPhan>[] =
  generateTableConfigs([
    { field: 'maMonHoc', headerName: 'Mã môn học', width: 100, editable: true, sortable: true },
    {
      field: 'tenMonHoc',
      headerName: 'Tên môn học',
      flex: 1,
      minWidth: 120,
      editable: true,
      sortable: true,
    },
    { field: 'maLHP', headerName: 'Mã LHP', width: 100, editable: true, sortable: true },
    {
      field: 'maLopBanDau',
      headerName: 'Mã lớp ban đầu',
      width: 120,
      editable: true,
      sortable: true,
    },
    { field: 'soTC', headerName: 'Số TC', width: 70, editable: true, sortable: true },
    {
      field: 'LT',
      headerName: 'LT',
      width: 60,
      editable: true,
      sortable: true,
      type: 'boolean',
      renderCell: renderBooleanCell,
      renderEditCell: renderBooleanEditCell,
    },
    { field: 'soTietLT', headerName: 'Số tiết LT', width: 100, editable: true, sortable: true },
    { field: 'soTietTH', headerName: 'Số tiết TH', width: 100, editable: true, sortable: true },
    {
      field: 'quyUocCotDiem',
      headerName: 'Quy ước cột điểm',
      flex: 1,
      minWidth: 130,
      editable: true,
      sortable: true,
    },
    {
      field: 'khoaDiemQT',
      headerName: 'Khóa ĐQT',
      width: 90,
      editable: true,
      sortable: true,
      type: 'boolean',
      renderCell: renderBooleanCell,
      renderEditCell: renderBooleanEditCell,
    },
    {
      field: 'khoaDiemKT',
      headerName: 'Khóa ĐKT',
      width: 90,
      editable: true,
      sortable: true,
      type: 'boolean',
      renderCell: renderBooleanCell,
      renderEditCell: renderBooleanEditCell,
    },
    {
      field: 'heDaoTao',
      headerName: 'Hệ đào tạo',
      width: 140,
      editable: true,
      sortable: true,
      renderEditCell: renderEditCellSelection(heDaoTaoOptions),
    },
  ]);
