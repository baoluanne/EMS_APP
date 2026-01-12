import { z } from 'zod';

export const phongKtxSchema = z.object({
  id: z.string().nullable().optional(),
  maPhong: z.string().min(1, 'Mã phòng là bắt buộc'),
  toaNhaId: z.string().min(1, 'Tòa nhà là bắt buộc'),
  tenToaNha: z.string().optional(),
  soLuongGiuong: z.coerce.number().int().min(1).max(20),
  soLuongDaO: z.coerce.number().int(),
  trangThai: z.string().min(1, 'Vui lòng chọn trạng thái'),
  giaPhong: z.coerce.number().min(0, 'Giá phòng không được âm').int(),
  ghiChu: z.string().optional(),
});
export type PhongKtxs = z.infer<typeof phongKtxSchema>;
