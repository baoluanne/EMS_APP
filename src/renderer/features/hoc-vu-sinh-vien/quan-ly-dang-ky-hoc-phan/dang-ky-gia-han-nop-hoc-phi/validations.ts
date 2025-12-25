import { z } from 'zod';

export const DangKyGiaHanNopHocPhiSchema = z.object({
  idDot: z.string().optional(),
  idCoSo: z.string().optional(),
  idKhoaHoc: z.string().optional(),
  idBacDaoTao: z.string().optional(),
  idLoaiDaoTao: z.string().optional(),
  idNganh: z.string().optional(),
  lopHoc: z.string().optional(),
  sinhVien: z.string().optional(),
  ngayHetHanTu: z.string().optional(),
  ngayHetHanDen: z.string().optional(),
  idTrangThai: z.string().optional(),
});

export type DangKyGiaHanNopHocPhiSchema = z.input<typeof DangKyGiaHanNopHocPhiSchema>;

