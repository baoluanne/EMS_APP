import { GridColDef } from '@mui/x-data-grid';
import { MonHoc } from '@renderer/shared/types';
import { z } from 'zod';

export const addMonHocBacDaoTaoTableColumns: GridColDef<MonHoc>[] = [
  {
    field: 'maMonHoc',
    headerName: 'Mã môn học',
    flex: 1,
    width: 75,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row?.maMonHoc || '',
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    flex: 1,
    minWidth: 90,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row?.tenMonHoc || '',
  },
  {
    field: 'tenTiengAnh',
    headerName: 'Tên tiếng Anh',
    flex: 1,
    minWidth: 90,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row?.tenTiengAnh || '',
  },
  {
    field: 'maTuQuan',
    headerName: 'Mã tự quản',
    flex: 1,
    width: 90,
    editable: false,
    sortable: true,
  },
  {
    field: 'loaiTiet',
    headerName: 'Loại tiết học',
    flex: 1,
    width: 90,
    editable: false,
    sortable: true,
    valueGetter: (_, row: any) => row?.loaiTiet?.tenLoaiTiet || '',
  },
];

export const addMonHocBacDaoTaoSchema = z.object({
  idBacDaoTao: z.string(),
  ghiChu: z.string().nullable().optional(),
});

export type AddMonHocBacDaoTaoForm = z.infer<typeof addMonHocBacDaoTaoSchema>;
