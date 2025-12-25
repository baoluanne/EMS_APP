import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { HinhThucThuOptions } from '@renderer/shared/types/hinh-thuc-thu.types';

export const loaiKhoanThuNgoaiHocPhiColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maLoaiKhoanThu',
    headerName: 'Mã Loại Khoản Thu',
    minWidth: 180,
    flex: 1,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenLoaiKhoanThu',
    headerName: 'Tên Loại Khoản Thu',
    minWidth: 240,
    flex: 1,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'stt',
    headerName: 'STT',
    width: 100,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'xuatHoaDonDienTu',
    headerName: 'Xuất HĐ điện tử',
    width: 160,
    type: 'boolean',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'phanBoDoanThu',
    headerName: 'Phân bổ doanh thu',
    width: 170,
    type: 'boolean',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'hinhThucThu',
    headerName: 'Hình thức thu',
    minWidth: 160,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const option = HinhThucThuOptions.find((opt) => opt.value === params.value);
      return option ? option.label : params.value;
    },
  },
  {
    field: 'maTKNganHang',
    headerName: 'Mã tài khoản NH',
    minWidth: 180,
    flex: 1,
    type: 'string',
    align: 'center',
    headerAlign: 'center',
  },
]);
