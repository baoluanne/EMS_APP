import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const loaiThuPhiMonHocColumns: GridColDef[] = generateTableConfigs([
  {
    field: 'maLoaiThuPhi',
    headerName: 'Mã loại thu phí',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'tenLoaiThuPhi',
    headerName: 'Tên loại thu phí',
    flex: 1.5,
    minWidth: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'stt',
    headerName: 'STT',
    type: 'number',
    flex: 0.5,
    minWidth: 80,
    align: 'center',
    headerAlign: 'center',
  },

  {
    field: 'capSoHoaDonDienTu',
    headerName: 'Cấp số hóa đơn điện tử',
    flex: 1,
    type: 'boolean',
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },

  {
    field: 'congThucQuyDoi',
    headerName: 'Công thức quy đổi',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'maTKNganHang',
    headerName: 'Mã tài khoản ngân hàng',
    flex: 1,
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    flex: 1.5,
    minWidth: 200,
    align: 'left',
    headerAlign: 'center',
  },
]);
