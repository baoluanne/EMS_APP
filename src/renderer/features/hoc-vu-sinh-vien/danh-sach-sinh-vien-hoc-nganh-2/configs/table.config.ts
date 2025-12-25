import { GridAlignment, GridColDef } from '@mui/x-data-grid';

export const dsSinhVienHocNganh2Columns: GridColDef[] = [
  {
    field: 'maSinhVien',
    headerName: 'Mã sinh viên',
    width: 130,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.maSinhVien || '',
  },
  {
    field: 'hoDem',
    headerName: 'Họ đệm',
    width: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.hoDem || '',
  },
  {
    field: 'ten',
    headerName: 'Tên',
    width: 100,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.ten || '',
  },
  {
    field: 'ngaySinh',
    headerName: 'Ngày sinh',
    width: 120,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) =>
      row?.sinhVien?.ngaySinh ? new Date(row.sinhVien.ngaySinh).toLocaleDateString('vi-VN') : '',
  },
  {
    field: 'noiSinh',
    headerName: 'Nơi sinh',
    width: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.noiSinhTinh?.tenTinhThanh || '',
  },

  // --- NGÀNH 2 ---
  {
    field: 'nganh2_lopHoc',
    headerName: 'Lớp học',
    width: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.lopHoc2?.tenLop || '',
  },
  {
    field: 'nganh2_nganh',
    headerName: 'Ngành',
    width: 180,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.lopHoc2?.nganhHoc?.tenNganhHoc || '',
  },

  // --- NGÀNH 1 ---
  {
    field: 'nganh1_lopHoc',
    headerName: 'Lớp học',
    width: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.lopHoc?.tenLop || '',
  },
  {
    field: 'nganh1_nganh',
    headerName: 'Ngành',
    width: 180,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.sinhVien?.lopHoc?.nganhHoc?.tenNganhHoc || '',
  },

  // --- THÔNG TIN QUYẾT ĐỊNH ---
  {
    field: 'soQuyetDinh',
    headerName: 'Số quyết định',
    width: 150,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.soQuyetDinh || '',
  },
  {
    field: 'ngayRaQD',
    headerName: 'Ngày ra QĐ',
    width: 120,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) =>
      row?.ngayQuyetDinh ? new Date(row.ngayQuyetDinh).toLocaleDateString('vi-VN') : '',
  },
  {
    field: 'nguoiKy',
    headerName: 'Người ký QĐ',
    width: 160,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.nguoiKy || '',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    width: 180,
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    valueGetter: (_, row: any) => row?.ghiChu || '',
  },
];

export const dsSinhVienHocNganh2ColumnGroupingModel = [
  {
    groupId: 'Ngành 2',
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    children: [{ field: 'nganh2_lopHoc' }, { field: 'nganh2_nganh' }],
  },
  {
    groupId: 'Ngành 1',
    align: 'center' as GridAlignment,
    headerAlign: 'center' as GridAlignment,
    children: [{ field: 'nganh1_lopHoc' }, { field: 'nganh1_nganh' }],
  },
];
