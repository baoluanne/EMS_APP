import { z } from 'zod';

export const HinhThucThiSchema = z.object({
  id: z.string().uuid().optional(),
  maHinhThucThi: z
    .string({ required_error: 'Mã hình thức thi là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã hình thức thi là bắt buộc' }),
  tenHinhThucThi: z
    .string({ required_error: 'Tên hình thức thi là bắt buộc' })
    .trim()
    .min(1, { message: 'Tên hình thức thi là bắt buộc' }),
  stt: z.coerce.number().min(0).optional(),
  heSoChamThi: z.coerce.number().min(0).optional(),
  soGiangVien: z.coerce.number().min(0).optional(),
  ghiChu: z.string().nullable().optional(),
  idBieuMauDanhSachDuThi: z
    .string({ required_error: 'Biểu mẫu danh sách dự thi là bắt buộc' })
    .min(1, { message: 'Biểu mẫu danh sách dự thi là bắt buộc' })
    .uuid(),
});

export type HinhThucThi = z.infer<typeof HinhThucThiSchema>;
