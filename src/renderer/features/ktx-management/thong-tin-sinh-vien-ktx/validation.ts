import { z } from 'zod';

export const thongTinSvKtxSchema = z.object({
  id: z.string(),
  sinhVienId: z.string(),
  maSinhVien: z.string(),
  hoTen: z.string(),
  lop: z.string().optional(),
  chuyenNganh: z.string().optional(),
  tenToaNha: z.string().optional(),
  maPhong: z.string().optional(),
  maGiuong: z.string().optional(),
  ngayBatDau: z.string().optional(),
  ngayRoiKtx: z.string().optional(),
  trangThai: z.string(),
});

export type ThongTinSvKtx = z.infer<typeof thongTinSvKtxSchema>;
