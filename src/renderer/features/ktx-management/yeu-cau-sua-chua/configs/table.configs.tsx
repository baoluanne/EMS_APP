import { GridColDef } from '@mui/x-data-grid';

export const yeuCauSuaChuaColumns: GridColDef[] = [
  { field: 'tieuDe', headerName: 'Tiêu đề', minWidth: 220, flex: 1.5 },
  { field: 'hoTenSinhVien', headerName: 'Sinh viên', minWidth: 160, flex: 1 },
  { field: 'maPhong', headerName: 'Phòng', minWidth: 110, flex: 0.7 },
  { field: 'tenToaNha', headerName: 'Tòa nhà', minWidth: 130, flex: 0.9 },
  {
    field: 'tenTaiSan',
    headerName: 'Tài sản',
    minWidth: 160,
    flex: 1,
    valueGetter: (_, row) => row.tenTaiSan || 'Không có',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    minWidth: 140,
    flex: 0.9,
    renderCell: (params) => {
      let color = 'black';
      let text = params.value;
      if (params.value === 'MoiGui') {
        color = 'orange';
        text = 'Mới gửi';
      } else if (params.value === 'DangXuLy') {
        color = 'violet';
        text = 'Đang xử lí';
      } else if (params.value === 'DaXong') {
        color = 'green';
        text = 'Hoàn thành';
      } else if (params.value === 'Huy') {
        color = 'red';
        text = 'Từ chối';
      }
      return <span style={{ color, fontWeight: 600 }}>{text}</span>;
    },
  },
  {
    field: 'ngayXuLy',
    headerName: 'Ngày xử lý',
    minWidth: 140,
    flex: 0.9,
    renderCell: (params) =>
      params.value ? new Date(params.value).toLocaleDateString('vi-VN') : '-',
  },
  { field: 'ghiChuXuLy', headerName: 'Ghi chú xử lý', minWidth: 180, flex: 1.2 },
];
