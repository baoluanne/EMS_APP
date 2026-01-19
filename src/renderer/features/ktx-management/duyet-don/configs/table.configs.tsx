import { GridColDef } from '@mui/x-data-grid';
import { Chip, IconButton, Tooltip } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

export const duyetDonColumns = (onApprove: (id: string) => void): GridColDef[] => [
  {
    field: 'maDon',
    headerName: 'Mã đơn',
    width: 130,
    valueGetter: (_, row: any) => row.maDon || '',
  },
  {
    field: 'idSinhVien',
    headerName: 'Họ tên sinh viên',
    flex: 1,
    valueGetter: (_, row: any) => row.sinhVien?.fullName || '',
  },
  {
    field: 'loaiDon',
    headerName: 'Loại đơn',
    width: 150,
    renderCell: (params) => {
      const options: any = { 0: 'Đăng ký mới', 1: 'Gia hạn', 2: 'Chuyển phòng', 3: 'Rời KTX' };
      return options[params.value] || '';
    },
  },
  {
    field: 'idGoiDichVu',
    headerName: 'Gói dịch vụ',
    width: 150,
    flex: 1,
    valueGetter: (_, row: any) => row.goiDichVu?.tenKhoanThu || '',
  },
  {
    field: 'ngayGuiDon',
    headerName: 'Ngày gửi',
    width: 150,
    flex: 1,
    valueGetter: (_, row: any) => row.ngayGuiDon || '',
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    width: 130,
    renderCell: (params) => {
      const statusMap: any = {
        0: { label: 'Chờ duyệt', color: 'warning' },
        1: { label: 'Đã duyệt', color: 'success' },
        2: { label: 'Từ chối', color: 'error' },
        3: { label: 'Đã hủy', color: 'default' },
      };
      const opt = statusMap[params.value] || statusMap[0];
      return <Chip label={opt.label} color={opt.color} size="small" variant="outlined" />;
    },
  },
  {
    field: 'actions',
    headerName: 'Thao tác',
    width: 100,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Tooltip title="Xử lý đơn">
        <IconButton
          color="primary"
          size="small"
          onClick={() => onApprove(params.row.id)}
          disabled={params.row.trangThai !== 0}
        >
          <CheckCircleOutline fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];
