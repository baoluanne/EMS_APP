import { z } from 'zod';

export const giuongKtxSchema = z.object({
  id: z.string().uuid().optional(),
  maGiuong: z.string().min(1, 'Mã giường là bắt buộc'),
  phongId: z.string().uuid('Vui lòng chọn phòng'),
  sinhVienId: z.string().uuid().nullable().optional(),
  trangThai: z.number().int().optional(),
});

export type GiuongKtxSchema = z.infer<typeof giuongKtxSchema>;

export interface GiuongKtxDTO {
  id: string;
  maGiuong: string;
  phongKtxId: string;
  sinhVienId?: string | null;
  trangThai?: number;
}
