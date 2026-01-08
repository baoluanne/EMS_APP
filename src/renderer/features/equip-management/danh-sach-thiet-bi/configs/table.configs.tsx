import { GridColDef } from '@mui/x-data-grid';
import { DanhSachThietBi } from '../validation';
import { getTrangThaiLabel } from '@renderer/features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';

export const danhSachThietBiColumns: GridColDef<DanhSachThietBi>[] = [
  {
    field: 'maThietBi',
    headerName: 'Mã thiết bị',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'loaiThietBiId',
    headerName: 'Loại thiết bị',
    minWidth: 180,
    flex: 1,
    valueGetter: (_, row: any) => row.loaiThietBi?.tenLoai || '',
  },
  {
    field: 'nhaCungCapId',
    headerName: 'Nhà cung cấp',
    minWidth: 200,
    flex: 1,
    valueGetter: (_, row: any) => row.nhaCungCap?.tenNhaCungCap || '',
  },
  {
    field: 'tenThietBi',
    headerName: 'Tên thiết bị',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'model',
    headerName: 'Model',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'serialNumber',
    headerName: 'Serial Number',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'thongSoKyThuat',
    headerName: 'Thông số kĩ thuật',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'namSanXuat',
    headerName: 'Năm sản xuất',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'ngayMua',
    headerName: 'Ngày mua',
    minWidth: 130,
    flex: 1,
    valueGetter: (_, row: any) => {
      if (!row.ngayMua) return '';
      return new Date(row.ngayMua).toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'ngayHetHanBaoHanh',
    headerName: 'Ngày hết hạn bảo hành',
    minWidth: 160,
    flex: 1,
    valueGetter: (_, row: any) => {
      if (!row.ngayHetHanBaoHanh) return '';
      return new Date(row.ngayHetHanBaoHanh).toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'nguyenGia',
    headerName: 'Nguyên giá',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'giaTriKhauHao',
    headerName: 'Giá trị khấu hao',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'hinhAnhUrl',
    headerName: 'Hình ảnh',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    minWidth: 150,
    flex: 1,
    valueGetter: (_, row: any) => getTrangThaiLabel(row.trangThai),
  },
];
