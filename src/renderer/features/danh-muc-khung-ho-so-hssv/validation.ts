import { z } from 'zod';

export const DanhMucKhungHoSoHssvSchema = z.object({
  id: z.string().uuid().optional(),

  idBacDaoTao: z
    .string({ required_error: 'Bậc đào tạo là bắt buộc' })
    .uuid()
    .min(1, 'Bậc đào tạo là bắt buộc'),
  idLoaiDaoTao: z
    .string({ required_error: 'Loại đào tạo là bắt buộc' })
    .uuid()
    .min(1, 'Loại đào tạo là bắt buộc'),
  idHoSoHSSV: z.string({ required_error: 'Hồ sơ là bắt buộc' }).uuid().min(1, 'Hồ sơ là bắt buộc'),

  stt: z.coerce.number().min(0).optional(),
  isBatBuoc: z.boolean().default(false).nullable().optional(),
  ghiChu: z.string().nullable().optional(),

  idTieuChiTuyenSinh: z.string().uuid().nullable().optional(),
  idKhoaHoc: z.string().uuid().nullable().optional(),
  idLoaiSinhVien: z.string().uuid().nullable().optional(),
});

export type DanhMucKhungHoSoHssv = z.infer<typeof DanhMucKhungHoSoHssvSchema>;
