import { z } from 'zod';

export const giuongKtxSchema = z.object({
  id: z.string().nullable().optional(),
  maGiuong: z.string().min(1, 'Mã giường là bắt buộc'),
  phongKtxId: z.string().min(1, 'Vui lòng chọn phòng'),
  trangThai: z.string().min(1, 'Vui lòng chọn trạng thái'),
});

export type GiuongKtxSchema = z.infer<typeof giuongKtxSchema>;
