import { z } from 'zod';

export const HinhThucXuLyViPhamQuyCheThiSchema = z.object({
  id: z.string().optional(),
  maHinhThucXL: z
    .string({ required_error: 'Mã hình thức xử lý là bắt buộc.' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  tenHinhThucXL: z
    .string({ required_error: 'Tên hình thức xử lý là bắt buộc.' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  phanTramDiemTru: z.coerce.number().optional(),
  diemTruRL: z.coerce.number().optional(),
  mucDo: z.any().optional(), // Replace with a stricter schema if available
  idMucDo: z
    .string({ required_error: 'Mức độ là bắt buộc.' })
    .min(1, { message: 'Trường này không được để trống.' }),
  ghiChu: z.string().nullable().optional(),
});
export type HinhThucXuLyVPQCThi = z.infer<typeof HinhThucXuLyViPhamQuyCheThiSchema>;
