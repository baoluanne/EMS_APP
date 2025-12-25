import { z } from 'zod';

export const HanhViViPhamSchema = z.object({
  id: z.string().optional(),
  maHanhVi: z
    .string({
      required_error: 'Mã hành vi là bắt buộc',
    })
    .trim()
    .min(1, { message: 'Mã hành vi là bắt buộc' }),
  tenHanhVi: z
    .string({
      required_error: 'Tên hành vi là bắt buộc',
    })
    .trim()
    .min(1, { message: 'Tên hành vi là bắt buộc' }),
  diemTru: z.coerce.number().optional(),
  noiDung: z.string().nullable().optional(),
  diemTruToiDa: z.coerce.number().optional(),
  isViPhamNoiTru: z.boolean(),
  isKhongSuDung: z.boolean(),
  mucDo: z.coerce.number().optional(),
  ghiChu: z.string().nullable().optional(),
  idLoaiHanhVi: z
    .string({
      required_error: 'Loại hành vi là bắt buộc.',
    })
    .min(1, { message: 'Trường này không được để trống.' }),
});

export type HanhViViPham = z.infer<typeof HanhViViPhamSchema>;