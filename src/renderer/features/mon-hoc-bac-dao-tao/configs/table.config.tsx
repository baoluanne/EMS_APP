import { GridColDef } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';
import { MonHocBacDaoTao } from '@renderer/shared/types';
import { renderEditCellSelection } from '@renderer/shared/utils';

const bacDaoTaoOptions = ['Đại học', 'Cao đẳng', 'Thạc sĩ'];
const loaiMonHocOptions = ['Bắt buộc', 'Tự chọn'];

export const monHocBacDaoTaoTableColumns: GridColDef<MonHocBacDaoTao>[] = generateTableConfigs([
  {
    field: 'bacDaoTao',
    headerName: 'Bậc đào tạo',
    width: 80,
    editable: false,
    sortable: true,
    renderEditCell: renderEditCellSelection(bacDaoTaoOptions),
    valueGetter: (_, row: any) => row.bacDaoTao?.tenBacDaoTao || '',
  },
  {
    field: 'maMonHoc',
    headerName: 'Mã môn học',
    width: 75,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row.monHoc?.maMonHoc || '',
  },
  {
    field: 'maTuQuan',
    headerName: 'Mã tự quản',
    width: 90,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row.monHoc?.maTuQuan || '',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    flex: 1,
    minWidth: 90,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row.monHoc?.tenMonHoc || '',
  },
  {
    field: 'tenTiengAnh',
    headerName: 'Tên tiếng Anh',
    flex: 1,
    minWidth: 90,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row.monHoc?.tenTiengAnh || '',
  },
  {
    field: 'loaiMonHoc',
    headerName: 'Loại môn học',
    width: 90,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row.monHoc?.loaiMonHoc?.tenLoaiMonHoc || '',
    renderEditCell: renderEditCellSelection(loaiMonHocOptions),
  },
  {
    field: 'dvhT_TC',
    headerName: 'DVHT / TC',
    width: 90,
    editable: false,
    sortable: true,
  },
  {
    field: 'TCLT',
    headerName: 'TC LT',
    width: 65,
    editable: false,
    sortable: true,
  },
  {
    field: 'TCTH',
    headerName: 'TC TH',
    width: 65,
    editable: false,
    sortable: true,
  },
  {
    field: 'tuHoc',
    headerName: 'Tự học',
    width: 70,
    editable: false,
    sortable: true,
  },
  {
    field: 'soTietThucHanh',
    headerName: 'Số tiết TH',
    width: 80,
    editable: false,
    sortable: true,
  },
  {
    field: 'soGioThucTap',
    headerName: 'Số giờ thực tập',
    width: 80,
    editable: false,
    sortable: true,
  },
  {
    field: 'soTietTuHoc',
    headerName: 'Số tiết tự học',
    width: 80,
    editable: false,
    sortable: true,
  },
]);

export const importMonHocBacDaoTaoColumns: GridColDef<MonHocBacDaoTao>[] = [
  { field: 'maMonHoc', headerName: 'Mã môn học', width: 100 },
  { field: 'tenMonHoc', headerName: 'Tên môn học', width: 100 },
  { field: 'maBacDaoTao', headerName: 'Mã bậc đào tạo', width: 100 },
  { field: 'ghiChu', headerName: 'Ghi chú', width: 100 },
];
