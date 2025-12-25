import { z } from 'zod';

export const viPhamNoiQuyKtxSchema = z.object({
  id: z.string().nullable().optional(),
  sinhVienId: z.string().uuid('Vui lòng chọn sinh viên'),
  maSinhVien: z.string().optional(),
  hoTenSinhVien: z.string().optional(),
  noiDungViPham: z.string().min(1, 'Nội dung vi phạm là bắt buộc'),
  hinhThucXuLy: z.string().optional(),
  diemTru: z.coerce.number().min(0, 'Điểm trừ không được âm').default(0),
  ngayViPham: z.string().min(1, 'Ngày vi phạm là bắt buộc'),
  tenToaNha: z.string().optional(),
  maPhong: z.string().optional(),
});

export type ViPhamNoiQuyKtx = z.infer<typeof viPhamNoiQuyKtxSchema>;

export interface ViPhamFilterState {
  searchTerm?: string;
  maPhong?: string;
  tuNgay?: string;
  noiDungViPham?: string;
}

export const viPhamDefaultFilters: ViPhamFilterState = {
  searchTerm: undefined,
  maPhong: undefined,
  tuNgay: undefined,
  noiDungViPham: undefined,
};
