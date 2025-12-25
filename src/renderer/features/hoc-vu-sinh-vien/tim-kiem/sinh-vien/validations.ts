import { z } from 'zod';

export const TimKiemSinhVienFilterSchema = z.object({
  id: z.string().optional(),
  maSinhVien: z.string().nullable().optional(),

  hoDem: z.string().nullable().optional(),
  ten: z.string().nullable().optional(),
  diaChi: z.string().nullable().optional(),

  gioiTinh: z.coerce.number().min(0).optional(),

  ngaySinhTu: z.string().nullable().optional(),
  ngaySinhDen: z.string().nullable().optional(),

  idCoSo: z.string().nullable().optional(),
  idKhoaHoc: z.string().nullable().optional(),
  idBacDaoTao: z.string().nullable().optional(),
  idLoaiDaoTao: z.string().nullable().optional(),
  idNganh: z.string().nullable().optional(),
  idChuyenNganh: z.string().nullable().optional(),
  idLopHoc: z.string().nullable().optional(),

  trangThai: z.coerce.number().min(0).nullable().optional(),
  diaChiLienLac: z.string().nullable().optional(),
  lopHoc: z.any().optional(),
});

export type TimKiemSinhVienFilterType = z.input<typeof TimKiemSinhVienFilterSchema>;
