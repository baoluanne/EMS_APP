export interface RowData {
  id: number;
  maLoaiHanhVi: string;
  tenLoaiHanhVi: string;
  diemTruCaoNhat: boolean | number;
  nhomLoaiHanhVi: string;
  diemTruToiDa: string;
  ghiChu: string;
}

export const quyCheRenLuyenPhanLoaiViPhamData: RowData[] = [
  {
    id: 1,
    maLoaiHanhVi: 'HV01',
    tenLoaiHanhVi: 'Đi học muộn',
    diemTruToiDa: '10',
    nhomLoaiHanhVi: 'Nhóm 1',
    diemTruCaoNhat: false,
    ghiChu: 'Lần đầu vi phạm',
  },
  {
    id: 2,
    maLoaiHanhVi: 'HV02',
    tenLoaiHanhVi: 'Không mặc đồng phục',
    diemTruToiDa: '10',
    nhomLoaiHanhVi: 'Nhóm 2',
    diemTruCaoNhat: true,
    ghiChu: '',
  },
];
