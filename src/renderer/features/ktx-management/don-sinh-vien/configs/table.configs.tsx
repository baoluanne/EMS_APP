import { GridColDef } from '@mui/x-data-grid';
import { DonKtxResponse } from '@renderer/features/ktx-management/don-sinh-vien/type';
import dayjs from 'dayjs';

export const donSinhVienColumns: GridColDef<DonKtxResponse>[] = [
  { field: 'maDon', headerName: 'Mã đơn', width: 150 },
  { field: 'maSinhVien', headerName: 'Mã SV', width: 120 },
  { field: 'hoTenSinhVien', headerName: 'Họ tên', flex: 1, minWidth: 180 },
  {
    field: 'loaiDon',
    headerName: 'Loại đơn',
    width: 140,
    valueFormatter: (params: any) => {
      const map: Record<string, string> = {
        VaoO: 'Vào ở',
        ChuyenPhong: 'Chuyển phòng',
        GiaHanKtx: 'Gia hạn',
        RoiKtx: 'Rời KTX',
      };
      return map[params.value as string] || params.value;
    },
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 140,
    renderCell: (params) => {
      let color = 'black';
      let text = params.value;
      if (params.value === 'ChoPhuyet') {
        color = 'orange';
        text = 'Chờ duyệt';
      } else if (params.value === 'DaDuyet') {
        color = 'green';
        text = 'Đã duyệt';
      } else if (params.value === 'TuChoi') {
        color = 'red';
        text = 'Từ chối';
      }

      return <span style={{ color, fontWeight: 600 }}>{text}</span>;
    },
  },
  {
    field: 'ngayGuiDon',
    headerName: 'Ngày gửi',
    width: 150,
    valueFormatter: (params: any) =>
      params.value ? dayjs(params.value).format('DD/MM/YYYY HH:mm') : '',
  },
  { field: 'maPhongHienTai', headerName: 'Phòng hiện tại', width: 120 },
  { field: 'maPhongMuonChuyen', headerName: 'Phòng muốn đến', width: 120 },
];
