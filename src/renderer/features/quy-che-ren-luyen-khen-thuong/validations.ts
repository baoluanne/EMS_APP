import { z } from 'zod';

export const KhenThuongSchema = z.object({
  id: z.string().optional(),
  maKhenThuong: z
    .string({ required_error: 'Mã khen thưởng là bắt buộc.' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  tenKhenThuong: z
    .string({ required_error: 'Tên khen thưởng là bắt buộc.' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  diemCong: z.coerce.number().optional(),
  diemCongToiDa: z.coerce.number().optional(),
  noiDung: z.string().nullable().optional(),
  isViPhamNoiTru: z.boolean(),
  ghiChu: z.string().nullable().optional(),
  idLoaiKhenThuong: z.string().nullable().optional(),
});

export type KhenThuong = z.infer<typeof KhenThuongSchema>;