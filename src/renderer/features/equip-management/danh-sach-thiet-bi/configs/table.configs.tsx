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
    align: 'left',
    headerAlign: 'left',
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
    valueFormatter: (_, row: any) => {
      if (!row.ngayMua) return '';
      return new Date(row.ngayMua).toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'ngayHetHanBaoHanh',
    headerName: 'Ngày hết hạn bảo hành',
    minWidth: 160,
    flex: 1,
    valueFormatter: (_, row: any) => {
      if (!row.ngayHetHanBaoHanh) return '';
      return new Date(row.ngayHetHanBaoHanh).toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'nguyenGia',
    headerName: 'Nguyên giá',
    type: 'number',
    minWidth: 130,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (value) => {
      if (!value) return '0 ₫';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(Number(value));
    },
  },
  {
    field: 'giaTriKhauHao',
    headerName: 'Giá trị khấu hao',
    minWidth: 150,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (value) => {
      if (!value) return '0 ₫';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(Number(value));
    },
  },
  {
    field: 'hinhAnhUrl',
    headerName: 'Hình ảnh',
    minWidth: 100,
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt="thiết bị"
          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
        />
      ) : (
        <span style={{ color: '#ccc', fontSize: '12px' }}>Không có ảnh</span>
      ),
  },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    minWidth: 150,
    flex: 1,
    valueGetter: (_, row: any) => getTrangThaiLabel(row.trangThai),
  },
  {
    field: 'phongHocId',
    headerName: 'Phòng',
    minWidth: 150,
    flex: 1,
    valueGetter: (_, row: any) => row.phongHoc?.tenPhong || 'Chưa phân phòng',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi chú',
    minWidth: 200,
    flex: 1,
  },
];
