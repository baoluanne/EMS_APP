import { GridColDef } from '@mui/x-data-grid';
import { DanhSachThietBi } from '../validation';
import { getTrangThaiLabel } from '@renderer/features/equip-management/danh-sach-thiet-bi/TrangThaiThietBiEnum';

export const danhSachThietBiColumns: GridColDef<DanhSachThietBi>[] = [
  { field: 'maThietBi', headerName: 'Mã thiết bị', minWidth: 120 },
  {
    field: 'loaiThietBiId',
    headerName: 'Loại thiết bị',
    minWidth: 150,
    valueGetter: (_, row: any) => row.loaiThietBi?.tenLoai || '',
  },
  {
    field: 'phong',
    headerName: 'Vị trí hiện tại',
    minWidth: 200,
    flex: 1,
    renderCell: (params: any) => {
      const { phongHoc, phongKtx } = params.row;
      if (phongKtx) return `KTX: ${phongKtx.maPhong}`;
      if (phongHoc) return `Phòng: ${phongHoc.tenPhong}`;
      return <span style={{ color: '#94a3b8' }}>Chưa phân bổ</span>;
    },
  },
  {
    field: 'nhaCungCapId',
    headerName: 'Nhà cung cấp',
    minWidth: 180,
    valueGetter: (_, row: any) => row.nhaCungCap?.tenNhaCungCap || '',
  },
  { field: 'tenThietBi', headerName: 'Tên thiết bị', minWidth: 180 },
  {
    field: 'trangThai',
    headerName: 'Trạng thái',
    minWidth: 130,
    valueGetter: (_, row: any) => getTrangThaiLabel(row.trangThai),
  },
];
