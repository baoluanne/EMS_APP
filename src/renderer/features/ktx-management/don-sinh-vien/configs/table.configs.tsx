import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const donSinhVienColumns: GridColDef[] = generateTableConfigs([
  { field: 'maDon', headerName: 'Mã đơn', minWidth: 200 },
  { field: 'hoTenSinhVien', headerName: 'Họ tên SV', minWidth: 200, flex: 1 },
  { field: 'maSinhVien', headerName: 'Mã SV', minWidth: 120 },
  { field: 'lop', headerName: 'Lớp', minWidth: 100 },
  {
    field: 'loaiDon',
    headerName: 'Loại đơn',
    minWidth: 140,
    renderCell: (params) => {
      switch (params.value) {
        case 'VaoO':
          return 'Vào ở';
        case 'ChuyenPhong':
          return 'Chuyển phòng';
        case 'GiaHan':
          return 'Gia hạn';
        case 'RoiKtx':
          return 'Rời KTX';
        default:
          return params.value;
      }
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    minWidth: 140,
    renderCell: (params) => {
      const status = params.value;
      let color = 'default';
      if (status === 'DaDuyet') color = 'success';
      if (status === 'TuChoi') color = 'error';
      if (status === 'ChoPheDuyet') color = 'warning';
      return (
        <span style={{ color }}>
          {status === 'ChoPheDuyet'
            ? 'Chờ duyệt'
            : status === 'DaDuyet'
              ? 'Đã duyệt'
              : status === 'TuChoi'
                ? 'Từ chối'
                : status}
        </span>
      );
    },
  },
  { field: 'maPhongHienTai', headerName: 'Phòng hiện tại', minWidth: 120 },
  { field: 'maPhongMuonChuyen', headerName: 'Phòng mong muốn', minWidth: 140 },
  { field: 'maPhongDuocDuyet', headerName: 'Phòng được duyệt', minWidth: 140 },
  {
    field: 'ngayGui',
    headerName: 'Ngày gửi',
    minWidth: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      const value = params;
      if (!value) return null;
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    },
  },
]);
