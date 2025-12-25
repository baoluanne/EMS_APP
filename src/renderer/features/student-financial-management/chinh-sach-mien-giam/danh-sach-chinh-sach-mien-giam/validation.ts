import { z } from 'zod';

export const mienGiamSchema = z.object({
  tenChinhSach: z.string().min(1, 'Tên chính sách là bắt buộc'),
  loaiChinhSach: z.enum(['PhanTram', 'SoTien']),
  giaTri: z.coerce.number().min(0, 'Giá trị không được âm'),
  namHocHocKyId: z.string().optional(),
  apDungCho: z.enum(['TatCa', 'Lop', 'Nganh', 'SinhVien', 'DoiTuong']),
  doiTuongId: z.string().optional(),
  ngayBatDau: z.any().optional(),
  ngayKetThuc: z.any().optional(),
  ghiChu: z.string().optional(),
  dangKichHoat: z.boolean().optional(),
});

export type MienGiamSchema = z.infer<typeof mienGiamSchema>;
