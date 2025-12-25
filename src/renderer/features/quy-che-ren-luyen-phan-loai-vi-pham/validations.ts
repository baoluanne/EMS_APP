import { z } from 'zod';

export const LoaiHanhViViPhamSchema = z.object({
  id: z.string().optional(),
  maLoaiHanhVi: z
    .string({
      required_error: 'Mã loại hành vi là bắt buộc.',
    })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  tenLoaiHanhVi: z
    .string({
      required_error: 'Tên loại hành vi là bắt buộc.',
    })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  stt: z.coerce.number().optional(),
  diemTruToiDa: z.coerce.number().optional(),
  isDiemTruCaoNhat: z.boolean().optional(),
  ghiChu: z.string().nullable().optional(),
  idNhomLoaiHanhVi: z
    .string({
      required_error: 'Nhóm loại hành vi là bắt buộc.',
    })
    .min(1, { message: 'Trường này không được để trống.' }),
});

export type LoaiHanhViViPham = z.infer<typeof LoaiHanhViViPhamSchema>;
