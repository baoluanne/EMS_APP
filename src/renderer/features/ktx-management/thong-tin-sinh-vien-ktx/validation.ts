import { z } from 'zod';

export const thongTinSvKtxSchema = z.object({
  id: z.string().uuid(),
  maSinhVien: z.string().optional(),
  hoTen: z.string().optional(),
  lop: z.string().optional(),
  chuyenNganh: z.string().optional(),
  tenToaNha: z.string().optional(),
  maPhong: z.string().optional(),
  maGiuong: z.string().optional(),
  trangThaiGiuong: z.string().optional(),
  ngayVaoO: z.string().nullable().optional(),
  ngayHetHan: z.string().nullable().optional(),
});

export type ThongTinSvKtx = z.infer<typeof thongTinSvKtxSchema>;
