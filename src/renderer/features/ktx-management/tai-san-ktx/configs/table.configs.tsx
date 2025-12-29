import { GridColDef } from '@mui/x-data-grid';
//import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const taiSanKtxColumns: GridColDef[] = [
  {
    field: 'maTaiSan',
    headerName: 'Mã tài sản',
    minWidth: 120,
    flex: 0.8,
  },
  {
    field: 'tenTaiSan',
    headerName: 'Tên tài sản',
    minWidth: 200,
    flex: 1.5,
  },
  {
    field: 'maPhong',
    headerName: 'Phòng',
    minWidth: 120,
    flex: 0.8,
    valueGetter: (value: any, row: any) => {
      return row.maPhong || 'Chưa gán';
    },
  },
  {
    field: 'tenToaNha',
    headerName: 'Tòa nhà',
    minWidth: 120,
    flex: 0.8,
    valueGetter: (value: any, row: any) => {
      return row.tenToaNha || '-';
    },
  },
  {
    field: 'tinhTrang',
    headerName: 'Tình trạng',
    minWidth: 130,
    flex: 0.8,
    renderCell: (params) => {
      let color = 'black';
      let text = params.value;
      if (params.value === 'BinhThuong') {
        color = 'orange';
        text = 'Bình thường';
      } else if (params.value === 'Tot') {
        color = 'green';
        text = 'Tốt';
      } else if (params.value === 'Hong') {
        color = 'red';
        text = 'Hỏng';
      } else if (params.value === 'CanSuaChua') {
        color = 'yellow';
        text = 'Cần sửa chữa';
      }

      return <span style={{ color, fontWeight: 600 }}>{text}</span>;
    },
  },
  {
    field: 'giaTri',
    headerName: 'Giá trị (VNĐ)',
    minWidth: 130,
    flex: 0.8,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (value) => {
      if (value == null) return '';
      return new Intl.NumberFormat('vi-VN').format(value);
    },
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 150,
    flex: 1,
  },
];
