import { z } from 'zod';

export const phongSchema = z.object({
  id: z.string().optional(),
  tangKtxId: z.string().min(1, 'Vui lòng chọn tầng'),
  maPhong: z.string().min(1, 'Mã phòng không được để trống'),
  soLuongGiuong: z.coerce.number().min(1, 'Số lượng giường phải >= 1'),
  loaiPhong: z.string().min(1, 'Vui lòng chọn loại phòng'),
  trangThai: z.coerce.number().int(),
});

export type PhongKtx = z.infer<typeof phongSchema>;
